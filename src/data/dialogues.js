export const introDialogue = [
  { text: '今日って確か、落合先生が授業をやってるメディアアートの展覧会が開催されてる日だっけ。', emotion: 'neutral' },
  { text: 'SNSで宣伝されてて、ちょっと興味があったんだよね。部練の時間まで暇だし、覗いてみようかな。', emotion: 'smile' },
  { text: '確かSNSによると、展覧会の名前は「stArt」でー……で、どんな展覧会なんだ？', emotion: 'neutral' },
  { text: 'あんまよく知らないまま来ちゃったから、公式サイト見てみよ。えーっと、どれどれ……', emotion: 'neutral' },
  { text: '……へー！ 作品を意味する「art」と、星を意味する「star」、それから表現の始まりを表す「start」が込められているんだ～！', emotion: 'happy' },
  { text: '30人の作品が3つの部屋に展示されて、星座みたいにつながってるんだって。1階に明るい部屋がひとつ、2階には薄暗い部屋と真っ暗な部屋があるらしい。', emotion: 'happy' },
  { text: 'サイトによると、202、207、101の順で行くのがおすすめなんだね。じゃあまずは、7A202教室に行ってみようかな！', emotion: 'happy' },
]

export const after202Dialogue = [
  { text: '202の展示、面白かったなー。よし、207も行ってみよう！', emotion: 'happy' },
]

export const before207PhoneDialogue = [
  { text: 'ここの展示もどれもいいなー。', emotion: 'happy' },
  { text: 'この「03:00の展覧会」ってやつもやってみよう。', emotion: 'smile' },
]

export const phoneIntroDialogue = [
  { text: 'この作品は、普段訪れることのない深夜の展覧会を警備するっていう、ホラゲー形式のメディアアートなんだよね。', emotion: 'neutral' },
  { text: 'やってみるかあ。', emotion: 'happy' },
  { text: 'まず、最初に名前を登録するんだね。了解～。', emotion: 'smile' },
]

export const phoneStartDialogue = [
  { text: 'よし！ ゲームスタート♪', emotion: 'happy' },
]

export const phoneClearDialogue = [
  { text: 'クリアした～。ホラゲー久しぶりにやったなぁ。', emotion: 'happy' },
]

export const phoneScareDialogue = [
  { text: 'えッ、何？', emotion: 'fear2' },
]

export const phoneAfterDialogue = [
  { text: 'びくった……最後の何だったんだろう。エラー？', emotion: 'fear1' },
  { text: 'まぁ、いいっか！ 他の作品も見よ！', emotion: 'smile' },
]

export const after207Dialogue = [
  { text: '2階は全部見たから、次は1階の101に行こう。1階の展示は明るいんだよねー。', emotion: 'smile' },
]

export const after101Dialogue = [
  { text: '展示面白かったなー。どの作品も個性が出てて見応えがあった！ 来てよかったー。', emotion: 'happy' },
  { text: 'あッ、もう部練の時間だから行かなきゃッ。', emotion: 'nervous' },
]

export const homeDialogue = [
  { text: 'あー、今日も夜まで部練頑張ってへとへと……。', emotion: 'nervous' },
  { text: '明日も部練あるから、早く寝よ……おやすみぃ……。', emotion: 'neutral' },
]

export const nightAwakeDialogue = [
  { text: '……ん。ここどこ？さむ。', emotion: 'neutral' },
  { text: 'え、ここ……春日キャンパスじゃん？ 私、家で寝てたよね？？そして靴下のままじゃん！', emotion: 'nervous' },
  { text: 'ってさすがに夢でしょ。でもこんなに悪寒がするリアルな夢は初めて見たぞ………', emotion: 'fear1' },
  { text: 'おっ、ポケットにスマホあんじゃん', emotion: 'neutral' },
]

export const nightMessageDialogue = [
  { text: 'え、スマホの画面が急におかしくなっちゃった！？', emotion: 'fear1' },
  { text: '赤い文字が表示されてる……', emotion: 'fear1' },
  { text: 'いや、ちょっと待って。これ、確か、昨日の展覧会の何かの作品がエラーになったときと同じこと書いてる！', emotion: 'nervous' },
  { text: 'ゲームの続きが夢に出てくるタイプなの、聞いてないんだけど。', emotion: 'fear1' },
  { text: '「全ての展示会場を巡回してください」……律儀に業務指示まで出すなあ。私、警備員じゃないぞ。', emotion: 'nervous' },
  { text: '……とりあえず無視して出口から帰れるか試してみよう。', emotion: 'nervous' },
]

export const lockedExitDialogue = [
  { text: '……開かないか。', emotion: 'fear1' },
  { text: '押しても引いてもダメ。', emotion: 'nervous' },
  { text: '明かりがついてるの、展示室だけか。露骨に「入れ」って言ってるなあ。', emotion: 'fear1' },
  { text: '……仕方ない。巡回を終わらせて帰ろう。終わって目を覚ませたら夜食食べるぞ、絶対に。', emotion: 'nervous' },
]

export const finalBeforeDialogue = [
  { text: 'やっぱり最後はこれだよね。昼間に遊んだ「03:00の展覧会」。', emotion: 'fear1' },
  { text: 'これをかまったら終わるっぽいな。頼むから「二周目」とか言うなよ。', emotion: 'fear1' },
]

export const clearAfterDialogue = [
  { text: '……終わった？', emotion: 'fear1' },
  { text: '帰れるならなんでもいい。夜食はもう疲れたからいいや。朝ごはん、大盛りにしよ。', emotion: 'nervous' },
]

export const epilogueDialogue = [
  { text: '……自分の部屋だ。', emotion: 'neutral' },
  { text: 'いやな夢のせいで体がドッと疲れてるな。', emotion: 'fear1' },
  { text: '……あれ？靴下、汚れてる。', emotion: 'fear2' },
  { text: 'いや、考えるのやめよう。お腹すいた。', emotion: 'smile' },
]
