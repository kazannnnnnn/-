# 词库来源与使用状态

## N1 备考词表

词库从 npm 包 [@polyglot-bundles/ja-jlpt-syllabi 0.1.5](https://www.npmjs.com/package/@polyglot-bundles/ja-jlpt-syllabi) 导入了标记为 N1 的 4,082 条词目。该包标注的上游是 [egg rolls JLPT 10k 卡组](https://github.com/5mdld/anki-jlpt-decks)，由 **egg rolls** 制作；卡组作者将内容按 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans) 授权，仅限非商业用途。许可文件副本见 [licenses/eggrolls-cc-by-nc-4.0.txt](licenses/eggrolls-cc-by-nc-4.0.txt)。本网站为非商业个人学习用途，不应将该词库用于收费产品或广告推广。

导入后对原内容作了修改：选取 N1 类别和每个词条的第一条例句及译文，清理注音标记，并修订部分读音显示、释义和译文。中间 npm 包元数据声明 MIT，但其卡组上游许可为 CC BY-NC 4.0；本项目遵循上游署名及非商业限制，不将卡组内容视作可无条件商业使用的 MIT 材料。下载包的 SHA-512 校验值与 npm 元数据一致。源卡组说明内容来自公开互联网资源及个人创作，未细列每个词条的原始出处。

JLPT 不提供完整现行官方词汇表，该包的 N1 标签属于第三方分类；包含部分较常见词汇，分级、中文释义和例句尚未逐条校对。源数据中带方括号的注音标记已从显示词形去除，纯片假名外来词的英文读音改为片假名；抽样校对时修正了九个词条的释义或例句翻译，其他译文和例句保留原数据内容。某些同形词有不同含义，作为独立词条保留。

## 先前的试用词

先前整理的 100 条试用词按日语写法和读音与导入词表合并，沿用旧 ID 以保留学习记录和收藏；未匹配的旧词条仍保留。其日语写法及假名读音与 JMdict 对照，使用 [jamdict-data 1.5](https://pypi.org/project/jamdict-data/1.5/) 收录的 2021 年版本（归档 SHA-256：`a4247dd9bb3148ab17c1b32fc56d7a7f1c35293b0d6ff2838c811f896d13f415`）。词典来自 [Electronic Dictionary Research and Development Group 的 JMdict 项目](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)，遵循 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)；许可文件副本见 [licenses/edrdg-dictionary-license.md](licenses/edrdg-dictionary-license.md)。中文释义、例句、译文及搭配是新编内容，未经过专业人工校对。

## 2026-10-27 校对记录

对 4,082 条导入词条做了字段、唯一标识和词形读音自动检查；其中 4,060 条的写法与读音可在 2021 版 JMdict 中直接匹配，另外 22 条包括前后缀、片假名与平假名写法差异、短语等，需要另行核对。抽查前 100 个词条的释义和首条例句，并按每 100 条抽取一条，对 41 个词条的释义作词典比对（合计覆盖 140 个不重复词条）；共修订九个词条的释义或例句翻译。另与另一份第三方 JLPT 词表交叉比对，发现 20 个词形读音同时被该表归到 N4 或 N5；由于分级非官方且含义可能不同，暂不自动删除。上述检查不等于对全部释义、例句和 N1 难度完成专业逐条校对。
