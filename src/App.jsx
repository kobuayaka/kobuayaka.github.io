import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import TypewriterDialogue from './components/TypewriterDialogue'
import NightWorkModal from './components/NightWorkModal'
import { NIGHT_ROOM_ENDS, NIGHT_ROOM_INTROS, NIGHT_SEQUENCES } from './data/nightSequence'
import {
  after101Dialogue,
  after202Dialogue,
  after207Dialogue,
  before207PhoneDialogue,
  clearAfterDialogue,
  epilogueDialogue,
  finalBeforeDialogue,
  homeDialogue,
  introDialogue,
  lockedExitDialogue,
  nightAwakeDialogue,
  nightMessageDialogue,
  phoneAfterDialogue,
  phoneClearDialogue,
  phoneIntroDialogue,
  phoneScareDialogue,
  phoneStartDialogue,
} from './data/dialogues'

const INITIAL_POSITIONS = {
  floor2: { x: 50, y: 49 },
  floor1: { x: 40, y: 49 },
}

function App() {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('exhibitionPlayerName') || '')
  const [nameDraft, setNameDraft] = useState(() => localStorage.getItem('exhibitionPlayerName') || '')
  const [scene, setScene] = useState('title')
  const [dialogue, setDialogue] = useState(null)
  const [phone, setPhone] = useState(null)
  const [characterPos, setCharacterPos] = useState(INITIAL_POSITIONS.floor2)
  const [dayVisited, setDayVisited] = useState({ '202': false, '207': false, '101': false })
  const [nightExitChecked, setNightExitChecked] = useState(false)
  const [nightComplete, setNightComplete] = useState({ '101': false, '202': false, '207': false })
  const [nightProgress, setNightProgress] = useState({ room: null, index: 0 })
  const [activeNightWork, setActiveNightWork] = useState(null)
  const timers = useRef([])

  const schedule = (fn, delay) => {
    const id = window.setTimeout(fn, delay)
    timers.current.push(id)
    return id
  }

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const startDialogue = useCallback((lines, onComplete, night = scene.includes('night') || ['clear', 'post-clear'].includes(scene)) => {
    setDialogue({ lines, onComplete, night })
  }, [scene])

  const finishDialogue = () => {
    const callback = dialogue?.onComplete
    setDialogue(null)
    callback?.()
  }

  const quickLine = (text, emotion = 'neutral', night = scene.includes('night')) => {
    startDialogue([{ text, emotion }], undefined, night)
  }

  const moveTo = (x, y, callback) => {
    setCharacterPos({ x, y })
    schedule(() => callback?.(), 620)
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    const safeName = nameDraft.replace(/[<>]/g, '').trim().slice(0, 12) || 'ゲスト'
    setPlayerName(safeName)
    setNameDraft(safeName)
    localStorage.setItem('exhibitionPlayerName', safeName)
    setScene('corridor2-day')
    setCharacterPos(INITIAL_POSITIONS.floor2)
    schedule(() => startDialogue(introDialogue, undefined, false), 420)
  }

  const finishDayVisit = (room) => {
    setDayVisited((previous) => ({ ...previous, [room]: true }))
    if (room === '202') {
      setScene('corridor2-day')
      setCharacterPos(INITIAL_POSITIONS.floor2)
      schedule(() => startDialogue(after202Dialogue, undefined, false), 260)
      return
    }
    if (room === '207') {
      setScene('corridor2-day')
      setCharacterPos(INITIAL_POSITIONS.floor2)
      schedule(() => startDialogue(after207Dialogue, undefined, false), 260)
      return
    }
    setScene('corridor1-day')
    setCharacterPos(INITIAL_POSITIONS.floor1)
    schedule(() => startDialogue(after101Dialogue, () => {
      setScene('home')
      schedule(() => startDialogue(homeDialogue, () => setScene('clock'), false), 700)
    }, false), 260)
  }

  const enterDayRoom = (room) => {
    setScene(`room${room}-day`)
    schedule(() => {
      if (room === '207') {
        startDialogue(before207PhoneDialogue, beginPhoneSequence, false)
      } else {
        finishDayVisit(room)
      }
    }, 2400)
  }

  const beginPhoneSequence = () => {
    setPhone({ stage: 'login', typed: '' })
    startDialogue(phoneIntroDialogue, () => {
      let index = 0
      const letters = 'kasuga'
      const typeNext = () => {
        index += 1
        setPhone({ stage: 'login', typed: letters.slice(0, index) })
        if (index < letters.length) {
          schedule(typeNext, 130)
          return
        }
        schedule(() => startDialogue(phoneStartDialogue, () => {
          setPhone({ stage: 'playing', typed: letters })
          schedule(() => {
            setPhone({ stage: 'clear', typed: letters })
            startDialogue(phoneClearDialogue, () => {
              schedule(() => {
                setPhone({ stage: 'warning', typed: letters })
                navigator.vibrate?.([120, 80, 240])
                schedule(() => startDialogue(phoneScareDialogue, () => {
                  setPhone({ stage: 'login', typed: '' })
                  startDialogue(phoneAfterDialogue, () => {
                    setPhone(null)
                    finishDayVisit('207')
                  }, false)
                }, false), 1700)
              }, 450)
            }, false)
          }, 1900)
        }, false), 280)
      }
      typeNext()
    }, false)
  }

  const handleDayFloor2 = (target) => {
    if (dialogue) return
    moveTo(target.moveX ?? target.x, target.moveY ?? target.y, () => {
      if (target.kind === 'stairs') {
        if (!dayVisited['207']) quickLine('1階へ行くのは、207を見終わってからにしよう。')
        else {
          setScene('corridor1-day')
          setCharacterPos(INITIAL_POSITIONS.floor1)
        }
        return
      }
      if (target.room === '202') {
        if (dayVisited['202']) quickLine('202の展示はもう見終わった。次は207だ。')
        else enterDayRoom('202')
      } else if (target.room === '207') {
        if (!dayVisited['202']) quickLine('おすすめ順では202が先だったな。まず202へ行こう。')
        else if (dayVisited['207']) quickLine('207の展示も見終わった。次は1階の101だ。')
        else enterDayRoom('207')
      } else {
        quickLine(`ここは${target.label}だ。展示会場ではないみたいだ。`)
      }
    })
  }

  const handleDayFloor1 = (target) => {
    if (dialogue) return
    moveTo(target.moveX ?? target.x, target.moveY ?? target.y, () => {
      if (target.room === '101') enterDayRoom('101')
      else if (target.kind === 'stairs') quickLine('2階の展示は見終わった。101を見てから帰ろう。')
      else if (target.kind === 'exit') quickLine('101の展示を見てから帰ろう。')
      else quickLine(`ここは${target.label}だ。展示会場ではないみたいだ。`)
    })
  }

  useEffect(() => {
    if (scene !== 'clock') return undefined
    const id = window.setTimeout(() => {
      setScene('corridor1-night')
      setCharacterPos(INITIAL_POSITIONS.floor1)
      startDialogue(nightAwakeDialogue, () => {
        setPhone({ stage: 'warning-full', typed: 'kasuga' })
        schedule(() => startDialogue(nightMessageDialogue, () => setPhone(null), true), 700)
      }, true)
    }, 3600)
    return () => window.clearTimeout(id)
  }, [scene, startDialogue])

  const beginNightEvent = (room, index) => {
    const work = NIGHT_SEQUENCES[room][index]
    if (!work) {
      finishNightRoom(room)
      return
    }
    setNightProgress({ room, index })
    schedule(() => startDialogue(work.intro, () => setActiveNightWork(work), true), 650)
  }

  const enterNightRoom = (room) => {
    if (nightComplete[room]) {
      quickLine(`${room}の異変確認は終わっている。`, 'neutral', true)
      return
    }
    setScene(`room${room}-night`)
    setNightProgress({ room, index: 0 })
    schedule(() => startDialogue(NIGHT_ROOM_INTROS[room], () => beginNightEvent(room, 0), true), 850)
  }

  const closeNightWork = () => {
    const room = nightProgress.room
    const index = nightProgress.index
    const work = NIGHT_SEQUENCES[room][index]
    setActiveNightWork(null)
    startDialogue(work.reaction, () => beginNightEvent(room, index + 1), true)
  }

  const finishNightRoom = (room) => {
    startDialogue(NIGHT_ROOM_ENDS[room], () => {
      setNightComplete((previous) => ({ ...previous, [room]: true }))
      if (room === '101') {
        setScene('corridor1-night')
        setCharacterPos(INITIAL_POSITIONS.floor1)
      } else if (room === '202') {
        setScene('corridor2-night')
        setCharacterPos(INITIAL_POSITIONS.floor2)
      } else {
        startDialogue(finalBeforeDialogue, () => setScene('clear'), true)
      }
    }, true)
  }

  const handleNightFloor1 = (target) => {
    if (dialogue) return
    moveTo(target.moveX ?? target.x, target.moveY ?? target.y, () => {
      if (target.kind === 'exit') {
        if (nightExitChecked) quickLine('やっぱり開かない。巡回を終わらせるしかなさそうだ。', 'fear1', true)
        else startDialogue(lockedExitDialogue, () => setNightExitChecked(true), true)
      } else if (target.kind === 'stairs') {
        if (!nightComplete['101']) quickLine('先に101の異変を確認しよう。巡回は1階からだ。', 'nervous', true)
        else {
          setScene('corridor2-night')
          setCharacterPos(INITIAL_POSITIONS.floor2)
        }
      } else if (target.room === '101') {
        if (!nightExitChecked) quickLine('その前に、出口が開くか確かめよう。', 'nervous', true)
        else enterNightRoom('101')
      } else {
        quickLine(`${target.label}は真っ暗だ。巡回対象は展示室だけみたいだ。`, 'fear1', true)
      }
    })
  }

  const handleNightFloor2 = (target) => {
    if (dialogue) return
    moveTo(target.moveX ?? target.x, target.moveY ?? target.y, () => {
      if (target.kind === 'stairs') {
        quickLine('今は2階の巡回を終わらせよう。', 'nervous', true)
      } else if (target.room === '202') {
        enterNightRoom('202')
      } else if (target.room === '207') {
        if (!nightComplete['202']) quickLine('順番が決められてるみたいだ。先に202を確認しよう。', 'fear1', true)
        else enterNightRoom('207')
      } else {
        quickLine(`${target.label}の中からは何も聞こえない。`, 'fear1', true)
      }
    })
  }

  useEffect(() => {
    if (scene !== 'clear') return undefined
    navigator.vibrate?.([80, 60, 80])
    const id = window.setTimeout(() => {
      setScene('post-clear')
      startDialogue(clearAfterDialogue, () => {
        setScene('epilogue')
        schedule(() => startDialogue(epilogueDialogue, () => setScene('end-card'), false), 650)
      }, true)
    }, 3400)
    return () => window.clearTimeout(id)
  }, [scene, startDialogue])

  useEffect(() => {
    if (scene === 'end-card') {
      const id = window.setTimeout(() => setScene('end-glitch'), 5600)
      return () => window.clearTimeout(id)
    }
    if (scene === 'end-glitch') {
      navigator.vibrate?.([45, 35, 90, 25, 150])
      const id = window.setTimeout(() => setScene('final'), 1450)
      return () => window.clearTimeout(id)
    }
    return undefined
  }, [scene])

  const restart = () => {
    setScene('title')
    setDialogue(null)
    setPhone(null)
    setActiveNightWork(null)
    setDayVisited({ '202': false, '207': false, '101': false })
    setNightExitChecked(false)
    setNightComplete({ '101': false, '202': false, '207': false })
    setNightProgress({ room: null, index: 0 })
    setCharacterPos(INITIAL_POSITIONS.floor2)
  }

  const roomMatch = scene.match(/^room(101|202|207)-(day|night)$/)
  let content = null
  if (scene === 'title') content = <TitleScene nameDraft={nameDraft} setNameDraft={setNameDraft} onSubmit={handleNameSubmit} />
  else if (scene === 'corridor2-day') content = <Corridor floor="2" period="day" pos={characterPos} onTarget={handleDayFloor2} />
  else if (scene === 'corridor1-day') content = <Corridor floor="1" period="day" pos={characterPos} onTarget={handleDayFloor1} />
  else if (scene === 'corridor1-night') content = <Corridor floor="1" period="night" pos={characterPos} onTarget={handleNightFloor1} />
  else if (scene === 'corridor2-night') content = <Corridor floor="2" period="night" pos={characterPos} onTarget={handleNightFloor2} />
  else if (roomMatch) {
    const [, room, period] = roomMatch
    content = <AutoRoom room={room} period={period} progress={nightProgress} />
  } else if (scene === 'home') content = <HomeScene time="23:00" />
  else if (scene === 'clock') content = <ClockScene />
  else if (scene === 'clear') content = <ClearScene playerName={playerName} />
  else if (scene === 'post-clear') content = <PostClearScene />
  else if (scene === 'epilogue') content = <HomeScene time="06:18" morning />
  else if (scene === 'end-card') content = <EndScene />
  else if (scene === 'end-glitch') content = <EndGlitchScene />
  else if (scene === 'final') content = <FinalScene playerName={playerName} onRestart={restart} />

  const nightTheme = scene.includes('night') || ['clear', 'post-clear', 'end-card', 'end-glitch', 'final'].includes(scene)
  return (
    <div className={`game-root ${nightTheme ? 'night-theme' : ''}`}>
      <div className="game-stage">
        {content}
        {phone && <PhoneOverlay phone={phone} />}
        {activeNightWork && <NightWorkModal work={activeNightWork} onClose={closeNightWork} />}
        {dialogue && (
          <TypewriterDialogue
            key={dialogue.lines.map((line) => line.text).join('|')}
            lines={dialogue.lines}
            onComplete={finishDialogue}
            night={dialogue.night}
            portraitSide={scene.startsWith('corridor1') ? 'right' : 'left'}
          />
        )}
      </div>
    </div>
  )
}

function TitleScene({ nameDraft, setNameDraft, onSubmit }) {
  return (
    <main className="title-scene">
      <div className="title-grain" />
      <section className="entry-card">
        <div className="title-overline">NIGHT PATROL / KASUGA CAMPUS</div>
        <div className="title-time">03:00</div>
        <h1>03:00の展覧会</h1>
        <p>誰もいない展示室で、昼には見えなかった作品の姿を確認する。</p>
        <form onSubmit={onSubmit}>
          <label htmlFor="player-name">あなたの名前（ニックネーム）</label>
          <input
            id="player-name"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value.slice(0, 12))}
            maxLength={12}
            autoComplete="nickname"
            placeholder="12文字まで"
          />
          <small>この名前は巡回記録に使用されます。</small>
          <button className="primary-button" type="submit">巡回を開始する</button>
        </form>
      </section>
    </main>
  )
}

function Corridor({ floor, period, pos, onTarget }) {
  const night = period === 'night'
  const targets = floor === '2' ? [
    { kind: 'room', room: '211', label: '7A211', x: 16, y: 26, w: 17, h: 31, moveX: 16, moveY: 49 },
    { kind: 'room', room: '210', label: '7A210', x: 35, y: 26, w: 17, h: 31, moveX: 35, moveY: 49 },
    { kind: 'room', room: '207', label: '7A207', x: 58, y: 26, w: 15, h: 31, moveX: 58, moveY: 49 },
    { kind: 'room', room: '206', label: '7A206', x: 70, y: 26, w: 13, h: 31, moveX: 70, moveY: 49 },
    { kind: 'room', room: '201', label: '7A201', x: 15, y: 70, w: 24, h: 31, moveX: 15, moveY: 50 },
    { kind: 'stairs', label: '階段', x: 31, y: 70, w: 10, h: 30, moveX: 31, moveY: 51 },
    { kind: 'room', room: '202', label: '7A202', x: 50, y: 70, w: 13, h: 31, moveX: 50, moveY: 51 },
    { kind: 'room', room: '203', label: '7A203', x: 63, y: 70, w: 12, h: 31, moveX: 63, moveY: 51 },
    { kind: 'room', room: '204', label: '7A204', x: 77, y: 70, w: 13, h: 31, moveX: 77, moveY: 51 },
  ] : [
    { kind: 'room', room: '106', label: '7A106', x: 18, y: 25, w: 26, h: 31, moveX: 18, moveY: 49 },
    { kind: 'room', room: '105', label: '7A105', x: 59, y: 25, w: 28, h: 31, moveX: 59, moveY: 49 },
    { kind: 'room', room: '101', label: '7A101', x: 14, y: 70, w: 24, h: 31, moveX: 14, moveY: 50 },
    { kind: 'stairs', label: '階段', x: 29, y: 69, w: 9, h: 31, moveX: 29, moveY: 51 },
    { kind: 'room', room: '102', label: '7A102', x: 56, y: 70, w: 23, h: 31, moveX: 56, moveY: 51 },
    { kind: 'room', room: '103', label: '7A103', x: 79, y: 70, w: 23, h: 31, moveX: 79, moveY: 51 },
    { kind: 'exit', label: '出口', x: 40, y: 91, w: 13, h: 15, moveX: 40, moveY: 83 },
  ]

  return (
    <main className={`corridor-scene ${night ? 'is-night' : ''}`}>
      <SceneHeader time={night ? '03:00' : '14:20'} place={`筑波大学 春日キャンパス / 7A棟${floor}階`} night={night} />
      <div className="scene-image" style={{ backgroundImage: `url(assets/backgrounds/corridor${floor}-${period}.png)` }}>
        {targets.map((target) => (
          <button
            key={`${target.kind}-${target.room || target.label}`}
            className={`invisible-target target-${target.kind}`}
            type="button"
            aria-label={`${target.label}へ移動`}
            style={{ left: `${target.x}%`, top: `${target.y}%`, width: `${target.w}%`, height: `${target.h}%` }}
            onClick={() => onTarget(target)}
          />
        ))}
        {floor === '1' && <div className="exit-marker" aria-hidden="true"><strong>出口</strong><span>↓</span></div>}
        <MiniKasuga pos={pos} night={night} />
        <div className="tap-hint">教室・階段・出口をタップ</div>
      </div>
    </main>
  )
}

function AutoRoom({ room, period, progress }) {
  const night = period === 'night'
  const total = NIGHT_SEQUENCES[room]?.length || 0
  const current = night && progress.room === room ? Math.min(progress.index + 1, total) : 0
  return (
    <main className={`auto-room ${night ? 'is-night' : ''}`}>
      <SceneHeader time={night ? '03:00' : '14:35'} place={`7A${room} 展示室`} night={night} />
      <div className="room-image" style={{ backgroundImage: `url(assets/backgrounds/room${room}-${period}.png)` }}>
        <div className={`room-mode-chip ${night ? '' : 'is-viewing'}`}>
          {night ? `異変確認 ${current} / ${total}` : <><span className="viewing-dot" />展示鑑賞中……</>}
        </div>
        {night && <div className="auto-note">展示室内は自動で確認します</div>}
      </div>
    </main>
  )
}

function MiniKasuga({ pos, night }) {
  return (
    <div className={`mini-kasuga ${night ? 'is-night' : ''}`} style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
      <span className="kasuga-sprite" />
      <span className="mini-shadow" />
    </div>
  )
}

function SceneHeader({ time, place, night }) {
  return <header className={`scene-header ${night ? 'is-night' : ''}`}><strong>{time}</strong><span>{place}</span></header>
}

function PhoneDevice({ stage, typed = '', borderless = false }) {
  return (
    <div className={`phone-device stage-${stage} ${borderless ? 'is-borderless' : ''}`}>
      <div className="phone-screen">
        {stage === 'login' && (
          <div className="phone-login">
            <span>03:00</span><h3>03:00の展覧会</h3><label>NAME</label>
            <div className="phone-input">{typed}<i /></div><button type="button">GAME START</button>
          </div>
        )}
        {stage === 'playing' && (
          <div className="phone-playing"><div className="phone-map"><i /><i /><i /><b /></div><strong>巡回中</strong><small>CHECKING EXHIBITION ROOMS</small></div>
        )}
        {stage === 'clear' && <div className="phone-clear"><span>03:00の展覧会</span><h3>CLEAR</h3><p>巡回完了</p></div>}
        {(stage === 'warning' || stage === 'warning-full') && (
          <div className="phone-warning is-alert">
            <p>kasugaさん、<br />警備が完了していません</p>
            <p>次の巡回時刻：<strong>03:00</strong></p>
            <p>全ての展示会場を<br />巡回してください。</p>
            <p className="anomaly-warning">展示室内に異変がないか<br />確認してください。</p>
          </div>
        )}
        {stage === 'complete' && (
          <div className="phone-warning complete"><p>kasugaさん、<br />警備が完了しました。</p><p>全展示会場の巡回を確認しました。</p><small>03:00 PATROL CLOSED</small></div>
        )}
      </div>
    </div>
  )
}

function PhoneOverlay({ phone }) {
  return <div className={`phone-overlay phone-${phone.stage}`}><PhoneDevice stage={phone.stage} typed={phone.typed} /></div>
}

function PlayerWarningScreen({ playerName }) {
  return (
    <div className="player-warning-screen" role="alert">
      <div className="phone-warning is-alert">
        <p>{playerName}さん、<br />次の巡回記録が作成されました</p>
        <p>巡回時刻：<strong>03:00</strong></p>
        <p className="anomaly-warning">異変を確認してください。</p>
      </div>
    </div>
  )
}

function HomeScene({ time, morning = false }) {
  return (
    <main className="home-scene">
      <SceneHeader time={time} place="春日さんの家" night={!morning} />
      <div className="home-image" style={{ backgroundImage: `url(assets/backgrounds/home-${morning ? 'morning' : 'night'}.png)` }} />
    </main>
  )
}

function ClockScene() {
  return <main className="clock-scene"><div className="clock-before">02:59</div><div className="clock-after">03:00</div><p>THE NEXT PATROL</p></main>
}

function ClearScene() {
  return <main className="clear-scene"><div className="clear-scan" /><PhoneDevice stage="complete" /></main>
}

function PostClearScene() {
  return <main className="post-clear-scene"><div className="door-line" /><p>PATROL COMPLETED</p></main>
}

function EndScene() {
  return (
    <main className="end-scene">
      <div className="end-scanlines" aria-hidden="true" />
      <div className="end-content">
        <p className="end-kicker">END</p>
        <h1>03:00の展覧会</h1>
        <div className="end-divider" aria-hidden="true" />
        <p className="end-thanks">
          作品の「別の姿」の素材を送ってくださった皆さまへ。
          <br />
          制作途中の姿や、普段は見えない記録を共有してくださり、
          <br />
          本当にありがとうございました。
        </p>
        <p className="end-credit-note">
          皆さまのご協力によって、この深夜の展覧会は完成しました。
        </p>
      </div>
    </main>
  )
}

function EndGlitchScene() {
  return (
    <main className="end-glitch-scene" aria-label="画面が乱れている">
      <div className="glitch-noise" aria-hidden="true" />
      <div className="glitch-word" data-text="END">END</div>
      <div className="glitch-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    </main>
  )
}

function FinalScene({ playerName, onRestart }) {
  return (
    <main className="final-scene">
      <PlayerWarningScreen playerName={playerName} />
      <button type="button" onClick={onRestart}>CLOSE</button>
    </main>
  )
}

export default App
