export const roomWorks = {
  '101': [
    { id: '101-1', title: '転RE:封（Telephone Booth Portal）', x: 10, y: 16 },
    { id: '101-2', title: 'デジタル時計', x: 30, y: 16, form: 'シングルチャンネル', materials: '木' },
    { id: '101-3', title: '視点', x: 50, y: 16, form: 'インタラクティブ', materials: 'パソコン', statement: 'ディスレクシア視点を再現しようとしたものである。これらの文字を時間経過2倍の感覚で普段読んでいるのと近いと考える。', notes: '起動されている表現用のウィンドウ以外には触れないでください。' },
    { id: '101-4', title: 'カメレオン', x: 70, y: 16, materials: 'PETGフィラメント／マイコン（ESP32）／カラーセンサー／LEDテープ', statement: 'カメレオンは背景色に合わせて自身の体色を変化させる能力を持ちます。また、目立つ色に変化することで、気になる相手にアピールすることもできます。机に置いてあるスマホを操作して、カメレオンに話しかけてみてください。あなたを見たカメレオンは、どのような色に変化するのでしょうか。', notes: '落下させないように慎重に扱ってください。ケーブルを外さないでください。' },
    { id: '101-5', title: '夏の思い出し方', x: 90, y: 16 },
    { id: '101-6', title: 'Fragments', x: 10, y: 51, form: '参加型', materials: '3Dプリント樹脂素材', statement: 'ぜひ「記録用紙」へのご記入をお願いします。', notes: '作品が転がりやすいため、紛失しないよう注意してください。' },
    { id: '101-7', title: '外在する心臓', x: 50, y: 51, materials: '3Dプリントした心臓（PLA）／モニター／PC／カメラ' },
    { id: '101-8', title: 'ぬるぬる相撲', x: 90, y: 51, form: 'パフォーマンス記録映像（カラー、サウンド）', statement: '二人の参加者がぬるぬる相撲を行い、ヌルの神へ奉納する。' },
    { id: '101-9', title: 'あいつ、誰だっけ？（仮）', x: 10, y: 82 },
    { id: '101-10', title: '作品タイトル未定', x: 50, y: 82 },
    { id: '101-11', title: '本', x: 70, y: 82 },
    { id: '101-12', title: '色水玉で何ができる？？', x: 90, y: 82 },
  ],
  '202': [
    { id: '202-1', title: 'No.ise', x: 14, y: 18, materials: 'レコードプレーヤー／レコード', statement: 'ここにあるものを使って、レコードをめちゃくちゃにしてください。', notes: 'ノイズができるように、思い切りやってください。' },
    { id: '202-2', title: 'CyberCity', x: 50, y: 18 },
    { id: '202-3', title: '作品タイトル未定', x: 86, y: 18 },
    { id: '202-4', title: 'ホログラフィックアイス（仮）', x: 14, y: 51 },
    { id: '202-5', title: 're:vision', x: 50, y: 51, notes: '光が出ます。' },
    { id: '202-6', title: '作品タイトル未定', x: 86, y: 51 },
    { id: '202-7', title: 'もしもし', x: 14, y: 82, materials: 'iPad／段ボール／水彩／紙', notes: 'iPadを持ち上げ、耳元に近づけて音声を聞いてください。音声の後、扉付きの額を開いて中の水彩画を鑑賞してください。水彩画には触れず、鑑賞後は扉を閉め、iPadを机に戻してください。' },
    { id: '202-8', title: '香景', x: 50, y: 82, materials: '映像', statement: '香りを視る。', notes: 'お手を触れないでください。' },
  ],
  '207': [
    { id: '207-1', title: '03:00の展覧会', x: 14, y: 20, materials: 'React＋Vite', notes: 'QRコードをスマートフォンで読み取ってください。', special: true },
    { id: '207-2', title: 'BRAIN IS WAITING.', x: 50, y: 20 },
    { id: '207-3', title: '夢制作装置', x: 86, y: 20 },
    { id: '207-4', title: 'Landscape at depth time', x: 14, y: 55 },
    { id: '207-5', title: '次の一手', x: 50, y: 55, statement: '棋は対話なり。' },
    { id: '207-6', title: 'max-flow min-cut', x: 86, y: 55 },
    { id: '207-7', title: '未定形の知', x: 50, y: 84 },
    { id: '207-8', title: '感情出力装置（仮）', x: 86, y: 84 },
  ],
}

export const nightWorks = {
  '101': [
    {
      id: 'night-chameleon', title: 'カメレオン', x: 70, y: 16,
      subtitle: '完成する前の星',
      description: 'Blenderで作られた、制作途中のカメレオンです。完成した姿の内側に残っている、形を探していた時間が現れます。',
      images: ['assets/night/chameleon/chameleon-1.webp', 'assets/night/chameleon/chameleon-2.webp'],
      dialogue: [
        { text: 'うわ、骨組みが透けてる。昼間は見えなかった制作途中だ。', emotion: 'fear1' },
        { text: '完成前の姿が見えてるんだ。骨組みまで見えると、ちょっと不思議だな。', emotion: 'neutral' },
        { text: 'これ、昼に見た作品の「別の顔」みたいだ。', emotion: 'fear1' },
      ],
    },
    {
      id: 'night-ink', title: '色水玉で何ができる？？', x: 86, y: 82,
      subtitle: '完成する前の星',
      description: '1回目と2回目に考えられ、完成作品にはならなかった案です。選ばれなかった形も、深夜には星として残っています。',
      images: ['assets/night/ink/ink-1.webp', 'assets/night/ink/ink-2.webp', 'assets/night/ink/ink-3.webp'],
      dialogue: [
        { text: 'これ、完成作になる前の別案か。', emotion: 'neutral' },
        { text: 'ボツになった案なのに、消えずに残ってる。今になって見えてるの、昔の光みたいだな。', emotion: 'fear1' },
        { text: 'それにしても、夜中に色水玉を見るとラムネに見える。腹減った。', emotion: 'smile' },
      ],
    },
  ],
  '202': [
    {
      id: 'night-cybercity', title: 'CyberCity', x: 50, y: 18,
      subtitle: '建設途中の星座',
      description: '現在のWeb版の奥で、より高品質なUnity版を最初から作り直している途中の記録です。街が完成する前の道路、試行、体験の流れが光ります。',
      images: [
        'assets/night/cybercity/city-1.webp', 'assets/night/cybercity/city-2.webp',
        'assets/night/cybercity/city-3.webp', 'assets/night/cybercity/city-4.webp',
        'assets/night/cybercity/city-5.webp', 'assets/night/cybercity/city-6.webp',
        'assets/night/cybercity/city-7.webp',
      ],
      dialogue: [
        { text: '街の光が、星みたいに増えていく。', emotion: 'fear1' },
        { text: '完成前の街が、夜中だけ先に開いてるみたいだな。', emotion: 'neutral' },
        { text: '完成した展示の裏側を、夜だけ見せられてる感じがする。', emotion: 'fear1' },
        { text: 'こういう夜景、ラーメン屋の看板を探しちゃうんだよな。……ないか。', emotion: 'smile' },
      ],
    },
  ],
  '207': [
    {
      id: 'night-emotion', title: '感情出力装置（仮）', x: 86, y: 84,
      subtitle: '感情になる前の形',
      description: '開発画面と人形の制作途中画像です。完成作品の裏側で、コードと素材と迷いがひとつの感情へ組み上がっていきます。',
      images: [
        'assets/night/emotion/emotion-1.webp', 'assets/night/emotion/emotion-2.webp',
        'assets/night/emotion/emotion-3.webp', 'assets/night/emotion/emotion-4.webp',
        'assets/night/emotion/emotion-5.webp',
      ],
      dialogue: [
        { text: '段ボールの人形と、開発画面と、コード。昼間の完成作の裏側が全部出てる。', emotion: 'neutral' },
        { text: '感情を出力する作品なのに、夜は作っていた人の迷いまで出力してるみたいだ。', emotion: 'fear1' },
        { text: '私の今の感情も出せるかな。「帰りたい」「腹減った」「でもちょっと面白い」の三色で。', emotion: 'smile' },
      ],
    },
  ],
}

export const portraitPaths = {
  smile: 'assets/portraits/smile.png',
  neutral: 'assets/portraits/neutral.png',
  happy: 'assets/portraits/happy.png',
  nervous: 'assets/portraits/nervous.png',
  fear1: 'assets/portraits/fear1.png',
  fear2: 'assets/portraits/fear2.png',
}
