const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });
const mongoose = require('mongoose');

// We have to define the schema again since we run this raw from node
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameJa: { type: String, default: '' },
  descriptionJa: { type: String, default: '' },
}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const MONGODB_URI = process.env.MONGODB_URI;

const productTranslations = {
  // Andhra
  'Kakinada Kaja': { jaName: 'カキナダ・カジャ', jaDesc: 'シロップに浸したカリカリのパイ生地 — カキナダの伝説的なスイーツ。' },
  'Ladoo': { jaName: 'ラドゥ', jaDesc: '純粋なギーと愛情で作られた、口の中でとろける黄金のブーンディ・ラドゥ。' },
  'Mango Jelly': { jaName: 'マンゴージェリー', jaDesc: '甘酸っぱいマンゴージェリーキャンディ — 懐かしいアーンドラのお菓子。' },
  'Ariselu': { jaName: 'アリセル', jaDesc: '黒糖を使って黄金色に揚げた伝統的な米粉のスイーツ。' },
  'Jagery Potarakulu': { jaName: 'ジャガリー・ポタラクル', jaDesc: '黒糖とギーを重ねた紙のように薄いお米のシート。' },
  'Bobatlu': { jaName: 'ボバトゥル', jaDesc: '甘いチャナ豆と黒糖のフィリングが詰まった柔らかいフラットブレッド。' },
  'Jantikalu': { jaName: 'ジャンティカル', jaDesc: '手で作られたサクサクのスパイス入り米粉スナック。' },
  'Kaja': { jaName: 'カジャ', jaDesc: 'シロップに浸したひし形の層状ペストリー。' },
  'Mango Pickle': { jaName: 'マンゴーピクルス', jaDesc: 'マスタードと赤唐辛子を使ったアーンドラスタイルの激辛マンゴーピクルス。' },

  // Telangana
  'Peanut Chikki': { jaName: 'ピーナッツ・チッキ', jaDesc: '黒糖で作られたカリカリのピーナッツブリトル。' },
  'Sakinalu': { jaName: 'サキナル', jaDesc: 'サクサクした螺旋状の米粉スナック — サンクランティ祭りの必需品。' },
  'Rava Laddu': { jaName: 'ラヴァ・ラドゥ', jaDesc: 'カシューナッツ、レーズン、カルダモンが入った口溶けの良いセモリナボール。' },
  'Gavvalu': { jaName: 'ガヴァル', jaDesc: 'シロップでコーティングされた貝殻型の甘いスナック。' },
  'Boondhi': { jaName: 'ブーンディ', jaDesc: '小さなサクサクのひよこ豆粉の粒 — スナックやスイーツのベースに最適。' },
  'Chegodilu': { jaName: 'チェゴディル', jaDesc: 'ごまとクミンが入ったリング状のカリカリ米粉スナック。' },
  'Nuvvula Laddu': { jaName: 'ヌヴラ・ラドゥ', jaDesc: '黒糖で固めた栄養価の高いごまボール。' },
  'Nalla Karam': { jaName: 'ナラカラム', jaDesc: '激辛の黒ごまチャツネパウダー — テランガーナの食事の魂。' },

  // Karnataka
  'Kadubali': { jaName: 'カドゥバリ', jaDesc: 'ジャックフルーツの葉で包まれた蒸し米のダンプリング。' },
  'Kobbarimittai': { jaName: 'コッバリミッタイ', jaDesc: 'カルダモン風味の甘いココナッツキャンディ。' },
  'Antinundi': { jaName: 'アンティヌンディ', jaDesc: '北カルナータカのサクサクでフレーク状の小麦スイーツ。' },
  'Avalakki Mixture': { jaName: 'アヴァラッキ・ミクスチャー', jaDesc: 'ピーナッツ、カレーリーフ、スパイスが入ったサクサクの平打ち米スナック。' },
  'Ravaladdu': { jaName: 'ラヴァラドゥ', jaDesc: 'ギー、ココナッツ、カルダモンが入った柔らかいセモリナラドゥ。' },
  'Nippattu': { jaName: 'ニッパットゥ', jaDesc: 'ピーナッツ、ディル、唐辛子で味付けされた薄くてサクサクの米クラッカー。' },
  'Mysorepak': { jaName: 'マイソールパク', jaDesc: 'マイソール宮殿のキッチンから生まれた、リッチでバターのようなひよこ豆粉のファッジ。' },
  'Belgaum Kunda': { jaName: 'ベルガウム・クンダ', jaDesc: 'ベルガウム産のキャラメル化されたミルクスイーツ。' },

  // Kerala
  'Unniyappam': { jaName: 'ウンニヤッパム', jaDesc: '黒糖とカルダモンが入った甘いバナナのフリッター。' },
  'Achappam': { jaName: 'アチャッパム', jaDesc: 'カリカリに揚げられた繊細なバラ型のクッキー。' },
  'Sharkara Varatti': { jaName: 'シャルカラ・ヴァラッティ', jaDesc: '黒糖でコーティングされたバナナチップス。' },
  'Kaya Varuthathu': { jaName: 'カヤ・ヴァルタトゥ', jaDesc: 'ココナッツオイルでカリカリに揚げられた薄いバナナチップス。' },
  'Chakku Varuthathu': { jaName: 'チャック・ヴァルタトゥ', jaDesc: '塩味がほんのり効いたサクサクのジャックフルーツチップス。' },
  'Avalose Unda': { jaName: 'アヴァロス・ウンダ', jaDesc: '黒糖とカルダモンが入った甘い米フレークのボール。' },
  'Kuzhalappam': { jaName: 'クジャラッパム', jaDesc: '空洞のチューブ型ライススナック。' },
  'Kozhukatta': { jaName: 'コズカッタ', jaDesc: '甘いココナッツフィリングが入った蒸し米のダンプリング。' },

  // Tamil Nadu
  'Ribbon Pakoda': { jaName: 'リボンパコダ', jaDesc: '米とひよこ豆粉で作られた長いリボン状のサクサクスナック。' },
  'Murukku': { jaName: 'ムルック', jaDesc: '南インドのスナックの王様、螺旋状のカリカリ米スナック。' },
  'Manoharam': { jaName: 'マノハラム', jaDesc: '米粉と黒糖で作られた、口の中でとろけるサクサクのスイーツ。' },
  'Pori Undai': { jaName: 'ポリ・ウンダイ', jaDesc: '黒糖で固められたポン菓子のボール — 軽くて甘くてサクサク。' },
  'Kadalaurundda': { jaName: 'カダラウルンダ', jaDesc: '黒糖で固められたローストピーナッツボール。' },
  'Palakova': { jaName: 'パラコバ', jaDesc: 'スリヴィリプトゥル産のゆっくり調理されたミルクファッジ。' },
  'Tirunelveli Halwa': { jaName: 'ティルネルヴェリ・ハルワ', jaDesc: 'ティルネルヴェリの有名な小麦ハルワ。' },
  'Verkkadalai Laddu': { jaName: 'ヴェルカダライ・ラドゥ', jaDesc: '黒糖入りカリカリのピーナッツラドゥ。' },
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');
    let count = 0;
    
    for (const [enName, trans] of Object.entries(productTranslations)) {
      const result = await Product.updateOne(
        { name: enName },
        { $set: { nameJa: trans.jaName, descriptionJa: trans.jaDesc } }
      );
      if (result.modifiedCount > 0) count++;
    }
    
    console.log(`Updated ${count} products with Japanese translations.`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

run();
