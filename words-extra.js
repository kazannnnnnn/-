// 备考试用词条：日语词形和读音参考 JMdict；中文释义及例句为自编，详见 SOURCES.md。
const additionalWords = [
  {
    "id": "prep:赴く",
    "word": "赴く",
    "reading": "おもむく",
    "meaning": "前往",
    "example": "現場に赴いて状況を確認した。",
    "translation": "前往现场确认了情况。",
    "collocation": "現地に赴く · 前往当地"
  },
  {
    "id": "prep:携わる",
    "word": "携わる",
    "reading": "たずさわる",
    "meaning": "从事；参与",
    "example": "地域の教育に携わっている。",
    "translation": "从事地区教育工作。",
    "collocation": "研究に携わる · 参与研究"
  },
  {
    "id": "prep:補償",
    "word": "補償",
    "reading": "ほしょう",
    "meaning": "补偿；赔偿",
    "example": "会社は損失を補償した。",
    "translation": "公司补偿了损失。",
    "collocation": "損害を補償する · 赔偿损失"
  },
  {
    "id": "prep:遂行",
    "word": "遂行",
    "reading": "すいこう",
    "meaning": "执行；完成",
    "example": "与えられた任務を遂行する。",
    "translation": "完成被赋予的任务。",
    "collocation": "任務を遂行する · 执行任务"
  },
  {
    "id": "prep:遂げる",
    "word": "遂げる",
    "reading": "とげる",
    "meaning": "完成；实现",
    "example": "彼は著しい成長を遂げた。",
    "translation": "他取得了显著成长。",
    "collocation": "目的を遂げる · 达到目的"
  },
  {
    "id": "prep:著しい",
    "word": "著しい",
    "reading": "いちじるしい",
    "meaning": "显著的；明显的",
    "example": "技術は著しい進歩を遂げた。",
    "translation": "技术取得了显著进步。",
    "collocation": "著しい変化 · 显著的变化"
  },
  {
    "id": "prep:著す",
    "word": "著す",
    "reading": "あらわす",
    "meaning": "著述；撰写",
    "example": "彼女は歴史について本を著した。",
    "translation": "她写了一本关于历史的书。",
    "collocation": "本を著す · 著书"
  },
  {
    "id": "prep:顕著",
    "word": "顕著",
    "reading": "けんちょ",
    "meaning": "显著；明显",
    "example": "二つの地域には顕著な差がある。",
    "translation": "两个地区之间有显著差异。",
    "collocation": "顕著な違い · 显著的差别"
  },
  {
    "id": "prep:衰える",
    "word": "衰える",
    "reading": "おとろえる",
    "meaning": "衰退；减弱",
    "example": "年齢とともに体力が衰えた。",
    "translation": "体力随年龄增长而下降。",
    "collocation": "勢いが衰える · 势头减弱"
  },
  {
    "id": "prep:衰退",
    "word": "衰退",
    "reading": "すいたい",
    "meaning": "衰退；衰落",
    "example": "かつて栄えた町が衰退した。",
    "translation": "曾经繁荣的城镇衰落了。",
    "collocation": "産業の衰退 · 产业衰退"
  },
  {
    "id": "prep:妨げる",
    "word": "妨げる",
    "reading": "さまたげる",
    "meaning": "妨碍；阻碍",
    "example": "騒音が勉強を妨げている。",
    "translation": "噪音正在妨碍学习。",
    "collocation": "成長を妨げる · 阻碍成长"
  },
  {
    "id": "prep:阻む",
    "word": "阻む",
    "reading": "はばむ",
    "meaning": "阻挡；阻碍",
    "example": "強風が船の出航を阻んだ。",
    "translation": "强风阻碍了船只出航。",
    "collocation": "行く手を阻む · 阻挡去路"
  },
  {
    "id": "prep:阻害",
    "word": "阻害",
    "reading": "そがい",
    "meaning": "阻碍；妨碍",
    "example": "過度の負担は成長を阻害する。",
    "translation": "过重的负担会阻碍成长。",
    "collocation": "発展を阻害する · 阻碍发展"
  },
  {
    "id": "prep:緩和",
    "word": "緩和",
    "reading": "かんわ",
    "meaning": "缓和；减轻",
    "example": "対策によって混雑が緩和された。",
    "translation": "通过对策，拥挤状况得到了缓解。",
    "collocation": "緊張を緩和する · 缓和紧张"
  },
  {
    "id": "prep:緩やか",
    "word": "緩やか",
    "reading": "ゆるやか",
    "meaning": "平缓；缓慢",
    "example": "坂はここから緩やかになる。",
    "translation": "坡从这里开始变缓。",
    "collocation": "緩やかな変化 · 缓慢的变化"
  },
  {
    "id": "prep:緩む",
    "word": "緩む",
    "reading": "ゆるむ",
    "meaning": "松弛；放松",
    "example": "靴ひもが緩んでいる。",
    "translation": "鞋带松了。",
    "collocation": "気が緩む · 松懈"
  },
  {
    "id": "prep:緩める",
    "word": "緩める",
    "reading": "ゆるめる",
    "meaning": "放松；拧松",
    "example": "速度を緩めて曲がる。",
    "translation": "减速转弯。",
    "collocation": "速度を緩める · 放慢速度"
  },
  {
    "id": "prep:促進",
    "word": "促進",
    "reading": "そくしん",
    "meaning": "促进；推动",
    "example": "交流は相互理解を促進する。",
    "translation": "交流促进相互理解。",
    "collocation": "成長を促進する · 促进成长"
  },
  {
    "id": "prep:推進",
    "word": "推進",
    "reading": "すいしん",
    "meaning": "推进；推动",
    "example": "地域の再生を推進する。",
    "translation": "推进地区振兴。",
    "collocation": "計画を推進する · 推进计划"
  },
  {
    "id": "prep:維持",
    "word": "維持",
    "reading": "いじ",
    "meaning": "维持；保持",
    "example": "適度な運動で健康を維持する。",
    "translation": "通过适度运动保持健康。",
    "collocation": "秩序を維持する · 维持秩序"
  },
  {
    "id": "prep:維新",
    "word": "維新",
    "reading": "いしん",
    "meaning": "维新；革新",
    "example": "明治維新について学んだ。",
    "translation": "学习了明治维新。",
    "collocation": "明治維新 · 明治维新"
  },
  {
    "id": "prep:懸念",
    "word": "懸念",
    "reading": "けねん",
    "meaning": "担忧；忧虑",
    "example": "環境への影響が懸念される。",
    "translation": "人们担心对环境的影响。",
    "collocation": "安全を懸念する · 担忧安全"
  },
  {
    "id": "prep:懸命",
    "word": "懸命",
    "reading": "けんめい",
    "meaning": "拼命；竭尽全力",
    "example": "彼は懸命に走り続けた。",
    "translation": "他拼命地继续奔跑。",
    "collocation": "懸命に努力する · 竭尽全力"
  },
  {
    "id": "prep:念頭",
    "word": "念頭",
    "reading": "ねんとう",
    "meaning": "心中；念头",
    "example": "安全を念頭に置いて作業する。",
    "translation": "工作时把安全放在心上。",
    "collocation": "念頭に置く · 放在心上"
  },
  {
    "id": "prep:念願",
    "word": "念願",
    "reading": "ねんがん",
    "meaning": "夙愿；心愿",
    "example": "念願の店を開くことができた。",
    "translation": "终于开了心心念念的店。",
    "collocation": "念願がかなう · 夙愿实现"
  },
  {
    "id": "prep:措置",
    "word": "措置",
    "reading": "そち",
    "meaning": "措施；处理",
    "example": "安全のために必要な措置を取る。",
    "translation": "为安全采取必要措施。",
    "collocation": "適切な措置 · 适当的措施"
  },
  {
    "id": "prep:施す",
    "word": "施す",
    "reading": "ほどこす",
    "meaning": "施行；施加",
    "example": "壁に特別な加工を施した。",
    "translation": "对墙壁进行了特殊加工。",
    "collocation": "加工を施す · 进行加工"
  },
  {
    "id": "prep:施行",
    "word": "施行",
    "reading": "しこう",
    "meaning": "施行；实施",
    "example": "新しい法律が来月施行される。",
    "translation": "新法律将于下个月施行。",
    "collocation": "法律を施行する · 施行法律"
  },
  {
    "id": "prep:施策",
    "word": "施策",
    "reading": "しさく",
    "meaning": "施策；政策措施",
    "example": "子育てを支援する施策を考える。",
    "translation": "考虑支持育儿的政策措施。",
    "collocation": "施策を進める · 推进措施"
  },
  {
    "id": "prep:尽くす",
    "word": "尽くす",
    "reading": "つくす",
    "meaning": "竭尽；用尽",
    "example": "問題の解決に力を尽くす。",
    "translation": "竭尽全力解决问题。",
    "collocation": "力を尽くす · 竭尽全力"
  },
  {
    "id": "prep:趣旨",
    "word": "趣旨",
    "reading": "しゅし",
    "meaning": "宗旨；要旨",
    "example": "会議の趣旨を参加者に説明した。",
    "translation": "向参加者说明了会议的宗旨。",
    "collocation": "趣旨を理解する · 理解主旨"
  },
  {
    "id": "prep:趣向",
    "word": "趣向",
    "reading": "しゅこう",
    "meaning": "构思；巧思",
    "example": "催しにはさまざまな趣向が凝らされた。",
    "translation": "活动中设计了各种巧思。",
    "collocation": "趣向を凝らす · 精心构思"
  },
  {
    "id": "prep:趣",
    "word": "趣",
    "reading": "おもむき",
    "meaning": "情趣；风情",
    "example": "古い町並みには趣がある。",
    "translation": "古老的街景很有韵味。",
    "collocation": "趣がある · 有风情"
  },
  {
    "id": "prep:顧みる",
    "word": "顧みる",
    "reading": "かえりみる",
    "meaning": "回顾；反省",
    "example": "過去の失敗を顧みる。",
    "translation": "反省过去的失败。",
    "collocation": "自分を顧みる · 反省自己"
  },
  {
    "id": "prep:意向",
    "word": "意向",
    "reading": "いこう",
    "meaning": "意向；意愿",
    "example": "本人の意向を確認する。",
    "translation": "确认本人的意愿。",
    "collocation": "意向を示す · 表明意向"
  },
  {
    "id": "prep:意義",
    "word": "意義",
    "reading": "いぎ",
    "meaning": "意义；价值",
    "example": "この研究には大きな意義がある。",
    "translation": "这项研究有重大意义。",
    "collocation": "意義を見いだす · 发现意义"
  },
  {
    "id": "prep:意欲",
    "word": "意欲",
    "reading": "いよく",
    "meaning": "积极性；意愿",
    "example": "学生の学習意欲を高める。",
    "translation": "提高学生的学习积极性。",
    "collocation": "意欲が高い · 积极性高"
  },
  {
    "id": "prep:意図",
    "word": "意図",
    "reading": "いと",
    "meaning": "意图；用意",
    "example": "発言の意図を説明した。",
    "translation": "说明了发言的意图。",
    "collocation": "意図が伝わる · 意图被理解"
  },
  {
    "id": "prep:顧慮",
    "word": "顧慮",
    "reading": "こりょ",
    "meaning": "顾虑；考虑",
    "example": "住民の意見を顧慮して計画を修正した。",
    "translation": "考虑到居民意见后修改了计划。",
    "collocation": "事情を顧慮する · 考虑情况"
  },
  {
    "id": "prep:把握",
    "word": "把握",
    "reading": "はあく",
    "meaning": "掌握；了解",
    "example": "現状を正確に把握する。",
    "translation": "准确掌握现状。",
    "collocation": "状況を把握する · 掌握情况"
  },
  {
    "id": "prep:掌握",
    "word": "掌握",
    "reading": "しょうあく",
    "meaning": "掌握；控制",
    "example": "組織の実権を掌握する。",
    "translation": "掌握组织的实权。",
    "collocation": "実権を掌握する · 掌握实权"
  },
  {
    "id": "prep:掌る",
    "word": "掌る",
    "reading": "つかさどる",
    "meaning": "掌管；主管",
    "example": "この部署は予算を掌る。",
    "translation": "这个部门主管预算。",
    "collocation": "業務を掌る · 主管业务"
  },
  {
    "id": "prep:見込む",
    "word": "見込む",
    "reading": "みこむ",
    "meaning": "预计；估计",
    "example": "来月は売り上げの増加を見込む。",
    "translation": "预计下个月销售额会增加。",
    "collocation": "増加を見込む · 预计增长"
  },
  {
    "id": "prep:見通し",
    "word": "見通し",
    "reading": "みとおし",
    "meaning": "展望；预测",
    "example": "今後の見通しを説明する。",
    "translation": "说明今后的展望。",
    "collocation": "見通しが立つ · 有了眉目"
  },
  {
    "id": "prep:見積もる",
    "word": "見積もる",
    "reading": "みつもる",
    "meaning": "估计；估价",
    "example": "修理にかかる費用を見積もる。",
    "translation": "估算修理所需费用。",
    "collocation": "費用を見積もる · 估算费用"
  },
  {
    "id": "prep:見合わせる",
    "word": "見合わせる",
    "reading": "みあわせる",
    "meaning": "暂缓；推迟",
    "example": "大雨のため出発を見合わせた。",
    "translation": "因大雨暂缓出发。",
    "collocation": "実施を見合わせる · 暂缓实施"
  },
  {
    "id": "prep:見落とす",
    "word": "見落とす",
    "reading": "みおとす",
    "meaning": "看漏；忽略",
    "example": "書類の小さな誤りを見落とした。",
    "translation": "漏看了文件中的一个小错误。",
    "collocation": "重要な点を見落とす · 忽略要点"
  },
  {
    "id": "prep:見過ごす",
    "word": "見過ごす",
    "reading": "みすごす",
    "meaning": "忽视；放过",
    "example": "問題を見過ごすわけにはいかない。",
    "translation": "不能对问题视而不见。",
    "collocation": "異変を見過ごす · 忽视异常"
  },
  {
    "id": "prep:見なす",
    "word": "見なす",
    "reading": "みなす",
    "meaning": "视为；看作",
    "example": "その行為は違反と見なされる。",
    "translation": "该行为被视为违规。",
    "collocation": "同じものと見なす · 视为相同"
  },
  {
    "id": "prep:見据える",
    "word": "見据える",
    "reading": "みすえる",
    "meaning": "注视；着眼于",
    "example": "将来を見据えて準備を進める。",
    "translation": "着眼于将来推进准备工作。",
    "collocation": "将来を見据える · 着眼未来"
  },
  {
    "id": "prep:見極める",
    "word": "見極める",
    "reading": "みきわめる",
    "meaning": "看清；辨明",
    "example": "状況を見極めて判断する。",
    "translation": "看清情况后作出判断。",
    "collocation": "原因を見極める · 查明原因"
  },
  {
    "id": "prep:見計らう",
    "word": "見計らう",
    "reading": "みはからう",
    "meaning": "估量；选择适当时机",
    "example": "時期を見計らって連絡する。",
    "translation": "选择适当的时机联系。",
    "collocation": "時機を見計らう · 瞅准时机"
  },
  {
    "id": "prep:見守る",
    "word": "見守る",
    "reading": "みまもる",
    "meaning": "守望；看护",
    "example": "子どもたちの成長を見守る。",
    "translation": "守望孩子们的成长。",
    "collocation": "成長を見守る · 守望成长"
  },
  {
    "id": "prep:見直す",
    "word": "見直す",
    "reading": "みなおす",
    "meaning": "重新审视；修改",
    "example": "計画を見直す必要がある。",
    "translation": "有必要重新审视计划。",
    "collocation": "制度を見直す · 重新审视制度"
  },
  {
    "id": "prep:見抜く",
    "word": "見抜く",
    "reading": "みぬく",
    "meaning": "看穿；识破",
    "example": "相手のうそを見抜いた。",
    "translation": "识破了对方的谎言。",
    "collocation": "本質を見抜く · 看透本质"
  },
  {
    "id": "prep:取り組む",
    "word": "取り組む",
    "reading": "とりくむ",
    "meaning": "致力于；着手处理",
    "example": "環境問題に取り組んでいる。",
    "translation": "正在致力于解决环境问题。",
    "collocation": "課題に取り組む · 着手处理课题"
  },
  {
    "id": "prep:取り扱う",
    "word": "取り扱う",
    "reading": "とりあつかう",
    "meaning": "处理；经营",
    "example": "この店は古い本を取り扱う。",
    "translation": "这家店经营旧书。",
    "collocation": "商品を取り扱う · 经销商品"
  },
  {
    "id": "prep:取り除く",
    "word": "取り除く",
    "reading": "とりのぞく",
    "meaning": "去除；排除",
    "example": "危険の原因を取り除く。",
    "translation": "排除危险的原因。",
    "collocation": "不安を取り除く · 消除不安"
  },
  {
    "id": "prep:取り巻く",
    "word": "取り巻く",
    "reading": "とりまく",
    "meaning": "围绕；包围",
    "example": "企業を取り巻く環境が変化した。",
    "translation": "围绕企业的环境发生了变化。",
    "collocation": "企業を取り巻く · 围绕企业"
  },
  {
    "id": "prep:取り締まる",
    "word": "取り締まる",
    "reading": "とりしまる",
    "meaning": "取缔；管制",
    "example": "警察が違法駐車を取り締まる。",
    "translation": "警方取缔违法停车。",
    "collocation": "違反を取り締まる · 查处违规行为"
  },
  {
    "id": "prep:取り繕う",
    "word": "取り繕う",
    "reading": "とりつくろう",
    "meaning": "掩饰；粉饰",
    "example": "失敗をごまかそうと取り繕った。",
    "translation": "为了掩盖失败而加以粉饰。",
    "collocation": "体裁を取り繕う · 粉饰体面"
  },
  {
    "id": "prep:取り戻す",
    "word": "取り戻す",
    "reading": "とりもどす",
    "meaning": "取回；恢复",
    "example": "休養して体力を取り戻した。",
    "translation": "休息后恢复了体力。",
    "collocation": "自信を取り戻す · 恢复自信"
  },
  {
    "id": "prep:取り入れる",
    "word": "取り入れる",
    "reading": "とりいれる",
    "meaning": "引入；吸收",
    "example": "新しい方法を授業に取り入れる。",
    "translation": "在课堂上引入新方法。",
    "collocation": "意見を取り入れる · 采纳意见"
  },
  {
    "id": "prep:取り沙汰",
    "word": "取り沙汰",
    "reading": "とりざた",
    "meaning": "议论；谈论",
    "example": "新しい制度の導入が取り沙汰されている。",
    "translation": "人们正在议论引入新制度的事。",
    "collocation": "取り沙汰される · 被议论"
  },
  {
    "id": "prep:取り決め",
    "word": "取り決め",
    "reading": "とりきめ",
    "meaning": "约定；协议",
    "example": "両者の取り決めを確認した。",
    "translation": "确认了双方的约定。",
    "collocation": "取り決めを守る · 遵守约定"
  },
  {
    "id": "prep:備える",
    "word": "備える",
    "reading": "そなえる",
    "meaning": "准备；防备",
    "example": "災害に備えて水を用意する。",
    "translation": "准备水以防灾害。",
    "collocation": "万一に備える · 以防万一"
  },
  {
    "id": "prep:備わる",
    "word": "備わる",
    "reading": "そなわる",
    "meaning": "具备；具有",
    "example": "この機械には安全装置が備わっている。",
    "translation": "这台机器配备了安全装置。",
    "collocation": "能力が備わる · 具备能力"
  },
  {
    "id": "prep:備蓄",
    "word": "備蓄",
    "reading": "びちく",
    "meaning": "储备；储存",
    "example": "非常用の食料を備蓄する。",
    "translation": "储备应急食品。",
    "collocation": "水の備蓄 · 水的储备"
  },
  {
    "id": "prep:憂慮",
    "word": "憂慮",
    "reading": "ゆうりょ",
    "meaning": "忧虑；担忧",
    "example": "環境の悪化を憂慮している。",
    "translation": "对环境恶化感到担忧。",
    "collocation": "事態を憂慮する · 对事态感到忧虑"
  },
  {
    "id": "prep:蓄える",
    "word": "蓄える",
    "reading": "たくわえる",
    "meaning": "积蓄；储存",
    "example": "冬に備えて食料を蓄える。",
    "translation": "储存食物以备过冬。",
    "collocation": "知識を蓄える · 积累知识"
  },
  {
    "id": "prep:蓄積",
    "word": "蓄積",
    "reading": "ちくせき",
    "meaning": "积累；积蓄",
    "example": "経験を蓄積して技術を磨く。",
    "translation": "积累经验，磨炼技术。",
    "collocation": "知識の蓄積 · 知识的积累"
  },
  {
    "id": "prep:憂う",
    "word": "憂う",
    "reading": "うれう",
    "meaning": "忧虑；担忧",
    "example": "将来のことを憂う。",
    "translation": "为将来的事忧虑。",
    "collocation": "国の将来を憂う · 忧虑国家的未来"
  },
  {
    "id": "prep:築く",
    "word": "築く",
    "reading": "きずく",
    "meaning": "建立；构筑",
    "example": "長い時間をかけて信頼関係を築いた。",
    "translation": "花了很长时间建立信任关系。",
    "collocation": "関係を築く · 建立关系"
  },
  {
    "id": "prep:構築",
    "word": "構築",
    "reading": "こうちく",
    "meaning": "构建；建立",
    "example": "安全な仕組みを構築する。",
    "translation": "构建安全的机制。",
    "collocation": "体制を構築する · 构建体制"
  },
  {
    "id": "prep:構想",
    "word": "構想",
    "reading": "こうそう",
    "meaning": "构想；设想",
    "example": "新しい施設の構想を練る。",
    "translation": "构思新设施的方案。",
    "collocation": "構想を練る · 推敲构想"
  },
  {
    "id": "prep:構成",
    "word": "構成",
    "reading": "こうせい",
    "meaning": "构成；组成",
    "example": "委員会は十人で構成される。",
    "translation": "委员会由十人组成。",
    "collocation": "組織を構成する · 构成组织"
  },
  {
    "id": "prep:構造",
    "word": "構造",
    "reading": "こうぞう",
    "meaning": "结构；构造",
    "example": "建物の構造を調べる。",
    "translation": "调查建筑物的结构。",
    "collocation": "複雑な構造 · 复杂的结构"
  },
  {
    "id": "prep:構える",
    "word": "構える",
    "reading": "かまえる",
    "meaning": "摆出姿势；设立",
    "example": "彼は駅前に店を構えた。",
    "translation": "他在车站前开了一家店。",
    "collocation": "店を構える · 开店"
  },
  {
    "id": "prep:兼ねる",
    "word": "兼ねる",
    "reading": "かねる",
    "meaning": "兼任；兼具",
    "example": "彼は事務と経理を兼ねている。",
    "translation": "他兼管事务和财务。",
    "collocation": "役割を兼ねる · 兼任职务"
  },
  {
    "id": "prep:兼ね備える",
    "word": "兼ね備える",
    "reading": "かねそなえる",
    "meaning": "兼备；同时具备",
    "example": "彼女は知識と経験を兼ね備えている。",
    "translation": "她兼具知识和经验。",
    "collocation": "才能を兼ね備える · 兼具才能"
  },
  {
    "id": "prep:兼ね合い",
    "word": "兼ね合い",
    "reading": "かねあい",
    "meaning": "平衡；相互关系",
    "example": "費用との兼ね合いを考える。",
    "translation": "考虑与费用之间的平衡。",
    "collocation": "他との兼ね合い · 与其他方面的平衡"
  },
  {
    "id": "prep:伴侶",
    "word": "伴侶",
    "reading": "はんりょ",
    "meaning": "伴侣；伴随者",
    "example": "人生の伴侶と共に暮らす。",
    "translation": "与人生伴侣共同生活。",
    "collocation": "人生の伴侶 · 人生伴侣"
  },
  {
    "id": "prep:凝る",
    "word": "凝る",
    "reading": "こる",
    "meaning": "热衷；讲究",
    "example": "彼は料理に凝っている。",
    "translation": "他热衷于烹饪。",
    "collocation": "細部に凝る · 讲究细节"
  },
  {
    "id": "prep:凝らす",
    "word": "凝らす",
    "reading": "こらす",
    "meaning": "集中；倾注",
    "example": "知恵を凝らして問題を解く。",
    "translation": "集中智慧解决问题。",
    "collocation": "工夫を凝らす · 精心设计"
  },
  {
    "id": "prep:配慮",
    "word": "配慮",
    "reading": "はいりょ",
    "meaning": "考虑；关照",
    "example": "周囲への配慮を忘れない。",
    "translation": "不要忘记考虑周围的人。",
    "collocation": "安全に配慮する · 考虑安全"
  },
  {
    "id": "prep:配分",
    "word": "配分",
    "reading": "はいぶん",
    "meaning": "分配；配给",
    "example": "予算を各部署に配分する。",
    "translation": "将预算分配给各部门。",
    "collocation": "資源を配分する · 分配资源"
  },
  {
    "id": "prep:配布",
    "word": "配布",
    "reading": "はいふ",
    "meaning": "分发；发放",
    "example": "参加者に資料を配布した。",
    "translation": "向参加者发放了资料。",
    "collocation": "資料を配布する · 发放资料"
  },
  {
    "id": "prep:配属",
    "word": "配属",
    "reading": "はいぞく",
    "meaning": "分配到；调配",
    "example": "新人は営業部に配属された。",
    "translation": "新人被分配到了营业部。",
    "collocation": "部署に配属される · 被分配到部门"
  },
  {
    "id": "prep:催す",
    "word": "催す",
    "reading": "もよおす",
    "meaning": "举办；产生某种感觉",
    "example": "地域の文化祭を催す。",
    "translation": "举办地区文化节。",
    "collocation": "会を催す · 举办聚会"
  },
  {
    "id": "prep:匹敵",
    "word": "匹敵",
    "reading": "ひってき",
    "meaning": "匹敌；相当",
    "example": "彼の実力は専門家に匹敵する。",
    "translation": "他的实力足以与专家匹敌。",
    "collocation": "専門家に匹敵する · 与专家匹敌"
  }
];
