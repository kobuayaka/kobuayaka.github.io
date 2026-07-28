export const NIGHT_SEQUENCES = {
  '101': [
    {
      id: 'chameleon-altered',
      type: 'altered',
      title: 'カメレオン',
      subtitle: '展示作品の別の姿',
      description: '展覧会で展示されていた「カメレオン」の、制作途中にだけ存在した姿です。完成した表面の内側から、骨組みと試行錯誤が現れています。',
      images: ['assets/night/chameleon/chameleon-1.webp', 'assets/night/chameleon/chameleon-2.webp'],
      intro: [
        { text: 'あれ、展覧会で展示されてあった「カメレオン」が別の姿になっている気がする…！', emotion: 'fear1' },
      ],
      reaction: [
        { text: '昼間は見えなかった制作途中の姿だ。骨組みからこんなに丁寧に試行錯誤して考えられてたんだ…', emotion: 'fear1' },
        { text: 'このカメレオン、フォルムがとてもかわいい…家で飼いたいなぁ', emotion: 'smile' },
        { text: 'これ、昼に見た作品の「別の顔」みたいだ。', emotion: 'neutral' },
      ],
    },
    {
      id: 'rose-bouquet',
      type: 'generative',
      art: 'roses',
      title: '03｜薔薇の花束',
      subtitle: '深夜の追加アート',
      description: '静かな花束が、鮮やかでショッキングな色彩へと一気に変化します。',
      intro: [
        { text: 'あッ、この作品、昼間見に行った時はなかったよなぁ。ちょっと確認しよう。', emotion: 'nervous' },
      ],
      reaction: [
        { text: '触った瞬間に色が変わった……。', emotion: 'fear1' },
        { text: '綺麗！！', emotion: 'smile' },
      ],
    },
    {
      id: 'ink-altered',
      type: 'altered',
      title: '色水玉で何ができる？？',
      subtitle: '展示作品の別の姿',
      description: '展覧会で展示されていた「色水玉で何ができる？？」の、完成作になる前に検討されていた別案です。',
      images: ['assets/night/ink/ink-1.webp', 'assets/night/ink/ink-2.webp', 'assets/night/ink/ink-3.webp'],
      intro: [
        { text: 'あれ、展覧会で展示されてあった「色水玉で何ができる？？」が別の姿になっている気がする…！', emotion: 'fear1' },
      ],
      reaction: [
        { text: 'これ、完成作になる前の別案か。', emotion: 'neutral' },
        { text: '作品のifの姿が見れて、とても興味深かった！', emotion: 'fear1' },
        { text: 'それにしても、夜中に色水玉を見るとラムネに見える。腹減った。', emotion: 'smile' },
      ],
    },
  ],
  '202': [
    {
      id: 'cybercity-altered',
      type: 'altered',
      title: 'CyberCity',
      subtitle: '展示作品の別の姿',
      description: '展覧会で展示されていた「CyberCity」の、Unity版を作り直している途中の記録です。完成前の道路や試行が露出しています。',
      images: [
        'assets/night/cybercity/city-1.webp', 'assets/night/cybercity/city-2.webp',
        'assets/night/cybercity/city-3.webp', 'assets/night/cybercity/city-4.webp',
        'assets/night/cybercity/city-5.webp', 'assets/night/cybercity/city-6.webp',
        'assets/night/cybercity/city-7.webp',
      ],
      intro: [
        { text: 'あれ、展覧会で展示されてあった「CyberCity」が別の姿になっている気がする…！', emotion: 'fear1' },
      ],
      reaction: [
        { text: '昼間は見えなかった制作途中の姿だ。道路や試行が露出してる……', emotion: 'fear1' },
        { text: 'このCyberCity、夜景がとても綺麗……。', emotion: 'smile' },
        { text: 'でも、こういう夜景って、ラーメン屋の看板を探しちゃうんだよな。……ないか。', emotion: 'happy' },
      ],
    },
    {
      id: 'ring-mandala',
      type: 'generative',
      art: 'mandala',
      title: '04｜円環曼荼羅',
      subtitle: '深夜の追加アート',
      description: '円と対称性で構成された曼荼羅が、発光しながら多層的に変容します。',
      intro: [
        { text: 'これも昼間にはなかった作品だ。円が何重にも重なって動いてる……ちょっと確認しよう。', emotion: 'fear1' },
      ],
      reaction: [
        { text: '触った場所から色と形が一気に変わった。ずっと見てると中心に引き込まれそうだ。', emotion: 'fear1' },
      ],
    },
    {
      id: 'noise-face',
      type: 'generative',
      art: 'signal',
      title: '02｜ノイズの顔',
      subtitle: '深夜の追加アート',
      description: 'ノイズの海から、顔の輪郭がゆっくりと生成されていきます。',
      intro: [
        { text: 'このノイズ……今、顔の輪郭が出てこなかった？', emotion: 'fear1' },
      ],
      reaction: [
        { text: 'やっぱり顔だった。しかも、触った瞬間にこっちへ近づいてきた……。', emotion: 'fear2' },
        { text: '顔じゃないって思い込むには、目も口もはっきりしすぎてるぞ。', emotion: 'fear1' },
      ],
    },
  ],
  '207': [
    {
      id: 'emotion-altered',
      type: 'altered',
      title: '感情出力装置（仮）',
      subtitle: '展示作品の別の姿',
      description: '展覧会で展示されていた「感情出力装置（仮）」の、開発画面、人形、コードが残された制作途中の姿です。',
      images: [
        'assets/night/emotion/emotion-1.webp', 'assets/night/emotion/emotion-2.webp',
        'assets/night/emotion/emotion-3.webp', 'assets/night/emotion/emotion-4.webp',
        'assets/night/emotion/emotion-5.webp',
      ],
      intro: [
        { text: 'あれ、展覧会で展示されてあった「感情出力装置（仮）」が別の姿になっている気がする…！', emotion: 'fear1' },
      ],
      reaction: [
        { text: '段ボールの人形と、開発画面と、コード。昼間の完成作の裏側が全部出てる。', emotion: 'neutral' },
        { text: '私の今の感情も出せるかな。「帰りたい」「腹減った」「でもちょっと面白い」の三色で。', emotion: 'smile' },
      ],
    },
    {
      id: 'watching-eye',
      type: 'generative',
      art: 'eye',
      title: '01｜監視の目',
      subtitle: '深夜の追加アート',
      description: '警備員を監視する目。深淵を監視する者は、深淵にもまた監視されています。',
      intro: [
        { text: 'これは昼にはなかった作品だ。……目みたいに動いてないか？', emotion: 'fear2' },
      ],
      reaction: [
        { text: '私が作品を見てたんじゃない。あれが、こっちを見てた。', emotion: 'fear2' },
        { text: '警備しているつもりだったのに、私も監視されてたのか……？', emotion: 'fear1' },
      ],
    },
  ],
}

export const NIGHT_ROOM_INTROS = {
  '101': [
    { text: '現実で訪れた時と雰囲気が全然違う！！明るかった部屋が真っ暗になってるし、展示されてる作品も変わってるよね？夢特有のハチャメチャ具合だ…！', emotion: 'fear1' },
    { text: 'とりあえず、入口から順番に異変がないか確認しよう。', emotion: 'nervous' },
  ],
  '202': [
    { text: '202も昼間と雰囲気が全然違うな。', emotion: 'fear1' },
    { text: '101の時と同じように、出てくる異変を順番に確認すればOKな感じかな。', emotion: 'fear1' },
  ],
  '207': [
    { text: 'よし、最後の巡回だ！これ終わったら、目を覚ませますように！', emotion: 'fear1' },
  ],
}

export const NIGHT_ROOM_ENDS = {
  '101': [
    { text: '101の異変は全部確認した。よし、ここはもう良さそう。', emotion: 'smile' },
    { text: '次は2階か。寝起きで階段はちょっとしんどいな……夜食のためだ。', emotion: 'nervous' },
  ],
  '202': [
    { text: '202の確認は終わった。残りは207。', emotion: 'neutral' },
    { text: 'あのゲームがあった部屋か。嫌な予感しかしない。', emotion: 'fear1' },
  ],
  '207': [
    { text: 'この部屋の異変も確認した。あとは、昼間に遊んだ「03:00の展覧会」だけだ。', emotion: 'fear1' },
  ],
}
