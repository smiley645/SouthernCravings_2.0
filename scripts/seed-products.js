/* eslint-disable */
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI not found in .env.local');
  console.log('Please set MONGODB_URI in your .env.local file');
  process.exit(1);
}

// Product Schema (inline to avoid ESM import issues)
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  state: { type: String, required: true },
  stateName: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'Snacks' },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  // === ANDHRA PRADESH ===
  { name: 'Kakinada Kaja', slug: 'kakinada-kaja', price: 120, image: '/Ap_img/kkd_kaja1.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Crispy, flaky pastry soaked in sugar syrup — a legendary sweet from Kakinada.', category: 'Sweets' },
  { name: 'Ladoo', slug: 'ladoo', price: 150, image: '/Ap_img/Andhra_ladoo.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Golden, melt-in-your-mouth Boondi Ladoo made with pure ghee and love.', category: 'Sweets' },
  { name: 'Mango Jelly', slug: 'mango-jelly', price: 200, image: '/Ap_img/Andhra_mango_jelly.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Sweet and tangy mango jelly candy — a nostalgic Andhra treat.', category: 'Sweets' },
  { name: 'Ariselu', slug: 'ariselu', price: 180, image: '/Ap_img/Andhra_ariselu.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Traditional rice flour sweet fried to golden perfection with jaggery.', category: 'Sweets' },
  { name: 'Jagery Potarakulu', slug: 'jagery-potarakulu', price: 150, image: '/Ap_img/Andhra_potarakulu.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Paper-thin rice sheets layered with jaggery and ghee — Atreyapuram specialty.', category: 'Sweets' },
  { name: 'Bobatlu', slug: 'bobatlu', price: 160, image: '/Ap_img/bobatlu.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Soft flatbreads stuffed with sweet chana dal and jaggery filling.', category: 'Sweets' },
  { name: 'Jantikalu', slug: 'jantikalu', price: 140, image: '/Ap_img/jantikalu.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Crunchy, spiced rice flour snack shaped by hand — perfect tea-time treat.', category: 'Snacks' },
  { name: 'Kaja', slug: 'kaja', price: 200, image: '/Ap_img/andhra_kaja.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Diamond-shaped layered pastry dipped in sugar syrup — Andhra classic.', category: 'Sweets' },
  { name: 'Mango Pickle', slug: 'mango-pickle', price: 150, image: '/Ap_img/pickle_img.jpg', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Fiery Andhra-style raw mango pickle with mustard and red chili.', category: 'Pickles' },

  // === TELANGANA ===
  { name: 'Peanut Chikki', slug: 'peanut-chikki', price: 200, image: '/hyb_img/Peanut-Chikkihyb.jpg', state: 'telangana', stateName: 'Telangana', description: 'Crunchy peanut brittle made with jaggery — a beloved Hyderabadi snack.', category: 'Snacks' },
  { name: 'Sakinalu', slug: 'sakinalu', price: 150, image: '/hyb_img/sakinaku.webp', state: 'telangana', stateName: 'Telangana', description: 'Crispy spiral rice flour snack — a Telangana Sankranti festival essential.', category: 'Snacks' },
  { name: 'Rava Laddu', slug: 'rava-laddu', price: 300, image: '/hyb_img/ravaladdu.jpeg', state: 'telangana', stateName: 'Telangana', description: 'Melt-in-mouth semolina balls with cashews, raisins, and cardamom.', category: 'Sweets' },
  { name: 'Gavvalu', slug: 'gavvalu', price: 300, image: '/hyb_img/gavvalu.webp', state: 'telangana', stateName: 'Telangana', description: 'Shell-shaped sweet snacks coated in sugar syrup — festive Telangana favorite.', category: 'Sweets' },
  { name: 'Boondhi', slug: 'boondhi', price: 300, image: '/hyb_img/boondhi.jpg', state: 'telangana', stateName: 'Telangana', description: 'Tiny crispy gram flour drops — perfect as a snack or sweet base.', category: 'Snacks' },
  { name: 'Chegodilu', slug: 'chegodilu', price: 300, image: '/hyb_img/Chegodilu.jpg', state: 'telangana', stateName: 'Telangana', description: 'Ring-shaped crunchy rice flour snack with sesame and cumin.', category: 'Snacks' },
  { name: 'Nuvvula Laddu', slug: 'nuvvula-laddu', price: 300, image: '/hyb_img/Nuvvula Laddu 1-800x800.jpg', state: 'telangana', stateName: 'Telangana', description: 'Nutritious sesame seed balls bound with jaggery — winter delicacy.', category: 'Sweets' },
  { name: 'Nalla Karam', slug: 'nalla-karam', price: 300, image: '/hyb_img/karamhyb.jpg', state: 'telangana', stateName: 'Telangana', description: 'Fiery black sesame chutney powder — the soul of Telangana meals.', category: 'Spices' },

  // === KARNATAKA ===
  { name: 'Kadubali', slug: 'kadubali', price: 200, image: '/kar_img/kadubali.webp', state: 'karnataka', stateName: 'Karnataka', description: 'Steamed rice dumplings wrapped in jackfruit leaves — a Karnataka festive treat.', category: 'Sweets' },
  { name: 'Kobbarimittai', slug: 'kobbarimittai', price: 150, image: '/kar_img/kobbarimittai.webp', state: 'karnataka', stateName: 'Karnataka', description: 'Sweet coconut candy flavored with cardamom — childhood nostalgia.', category: 'Sweets' },
  { name: 'Antinundi', slug: 'antinundi', price: 180, image: '/kar_img/Antinundi.webp', state: 'karnataka', stateName: 'Karnataka', description: 'Crispy, flaky wheat-based sweet from North Karnataka — melt-in-mouth goodness.', category: 'Sweets' },
  { name: 'Avalakki Mixture', slug: 'avalakki-mixture', price: 140, image: '/kar_img/avalakki mixture8.JPG', state: 'karnataka', stateName: 'Karnataka', description: 'Crunchy flattened rice snack mix with peanuts, curry leaves, and spices.', category: 'Snacks' },
  { name: 'Ravaladdu', slug: 'ravaladdu', price: 180, image: '/kar_img/ravaladdu.jpeg', state: 'karnataka', stateName: 'Karnataka', description: 'Soft semolina laddu with ghee, coconut, and cardamom — pure bliss.', category: 'Sweets' },
  { name: 'Nippattu', slug: 'nippattu', price: 180, image: '/kar_img/nippattu.webp', state: 'karnataka', stateName: 'Karnataka', description: 'Thin, crispy rice crackers seasoned with peanuts, dill, and chili — Karnataka specialty.', category: 'Snacks' },
  { name: 'Mysorepak', slug: 'mysorepak', price: 180, image: '/kar_img/mysorepak tamil.jpeg', state: 'karnataka', stateName: 'Karnataka', description: 'Rich, buttery gram flour fudge from the Mysore Palace kitchens.', category: 'Sweets' },
  { name: 'Belgaum Kunda', slug: 'belgaum-kunda', price: 180, image: '/kar_img/BelgaumKunda.webp', state: 'karnataka', stateName: 'Karnataka', description: 'Caramelized milk sweet from Belgaum — rich, dense, and unforgettable.', category: 'Sweets' },

  // === KERALA ===
  { name: 'Unniyappam', slug: 'unniyappam', price: 200, image: '/ker_img/unniyappam0.webp', state: 'kerala', stateName: 'Kerala', description: 'Sweet banana fritters with jaggery and cardamom — a Kerala temple offering.', category: 'Sweets' },
  { name: 'Achappam', slug: 'achappam', price: 150, image: '/ker_img/achappam.jpg', state: 'kerala', stateName: 'Kerala', description: 'Delicate rose-shaped cookie fried crispy — a Syrian Christian Christmas treat.', category: 'Snacks' },
  { name: 'Sharkara Varatti', slug: 'sharkara-varatti', price: 200, image: '/ker_img/sharkara varatti.png', state: 'kerala', stateName: 'Kerala', description: 'Jaggery-coated banana chips — sweet, crunchy Sabarimala prasadam.', category: 'Snacks' },
  { name: 'Kaya Varuthathu', slug: 'kaya-varuthathu', price: 200, image: '/ker_img/banana-chips.jpg', state: 'kerala', stateName: 'Kerala', description: 'Thin, crispy banana chips fried in coconut oil — the taste of Kerala.', category: 'Snacks' },
  { name: 'Chakku Varuthathu', slug: 'chakku-varuthathu', price: 200, image: '/ker_img/jackfruitchips.jpg', state: 'kerala', stateName: 'Kerala', description: 'Crispy jackfruit chips with a hint of salt — tropical Kerala goodness.', category: 'Snacks' },
  { name: 'Avalose Unda', slug: 'avalose-unda', price: 200, image: '/ker_img/Avalose-Unda-1.jpg', state: 'kerala', stateName: 'Kerala', description: 'Sweet rice flake balls with jaggery and cardamom — traditional Kerala sweet.', category: 'Sweets' },
  { name: 'Kuzhalappam', slug: 'kuzhalappam', price: 200, image: '/ker_img/kuzhalappam.avif', state: 'kerala', stateName: 'Kerala', description: 'Hollow tube-shaped rice snack — crispy and addictive Kerala specialty.', category: 'Snacks' },
  { name: 'Kozhukatta', slug: 'kozhukatta', price: 200, image: '/ker_img/kozhukattai.jpg', state: 'kerala', stateName: 'Kerala', description: 'Steamed rice dumplings with sweet coconut filling — Onam festival essential.', category: 'Sweets' },

  // === TAMIL NADU ===
  { name: 'Ribbon Pakoda', slug: 'ribbon-pakoda', price: 200, image: '/tamil_img/ribbon-pakoda1.jpg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Long ribbon-shaped crispy snack made with rice and gram flour.', category: 'Snacks' },
  { name: 'Murukku', slug: 'murukku', price: 150, image: '/tamil_img/murukku-recipe.jpg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Spiral-shaped crunchy rice snack — the king of South Indian snacks.', category: 'Snacks' },
  { name: 'Manoharam', slug: 'manoharam', price: 150, image: '/tamil_img/manoharam.jpg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Flaky, melt-in-mouth sweet made with rice flour and jaggery.', category: 'Sweets' },
  { name: 'Pori Undai', slug: 'pori-undai', price: 150, image: '/tamil_img/murmuralado.jpg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Puffed rice balls bound with jaggery — light, sweet, and crunchy.', category: 'Sweets' },
  { name: 'Kadalaurundda', slug: 'kadalaurundda', price: 150, image: '/tamil_img/kadalaurunddai0.jpg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Roasted peanut balls with jaggery — protein-packed Tamil Nadu snack.', category: 'Snacks' },
  { name: 'Palakova', slug: 'palakova', price: 150, image: '/tamil_img/palkovasrivalliputhurtamil.jpg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Slow-cooked milk fudge from Srivilliputhur — rich and creamy.', category: 'Sweets' },
  { name: 'Tirunelveli Halwa', slug: 'tirunelveli-halwa', price: 150, image: '/tamil_img/tirunlvelihalwa.jpeg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Famous wheat halwa from Tirunelveli — bouncy, sweet, and aromatic.', category: 'Sweets' },
  { name: 'Verkkadalai Laddu', slug: 'verkkadalai-laddu', price: 150, image: '/tamil_img/Verkkadalai laddu.jpg', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Crunchy peanut laddu with jaggery — a Tamil Nadu festival favorite.', category: 'Sweets' },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log('Connected to MongoDB!');

    console.log('Clearing existing products...');
    await Product.deleteMany({});

    console.log('Seeding products...');
    await Product.insertMany(products);

    console.log(`✅ Successfully seeded ${products.length} products!`);
    console.log('Products by state:');
    const states = [...new Set(products.map(p => p.stateName))];
    states.forEach(s => {
      const count = products.filter(p => p.stateName === s).length;
      console.log(`  ${s}: ${count} items`);
    });
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
