// Doimiy ma'lumotlar
const defaultData = {
    kitoblar: [
        {
            id: 1,
            nomi: "O'tkan kunlar",
            muallif: "Abdulla Qodiriy",
            nashriyot: "Sharq",
            yil: 2018,
            mavjud: true,
            soni: 5,
            kategoriya: "Roman",
            til: "O'zbek",
            ISBN: "978-9943-26-144-5",
            sahifalar: 400,
            qidirilganSoni: 0,
            oxirgiOzgartirilganSana: "2024-03-15"
        },
        // ... (barcha 20 ta kitob ma'lumotlari)
    ],
    foydalanuvchilar: [],
    hisobotlar: []
};

let kutubxonaData = JSON.parse(JSON.stringify(defaultData));

// Ma'lumotlarni yuklash
async function malumotlarniYuklash() {
    try {
        const data = localStorage.getItem('kutubxonaData');
        if (data) {
            kutubxonaData = JSON.parse(data);
        } else {
            kutubxonaData = JSON.parse(JSON.stringify(defaultData));
            saqlash();
        }
        return kutubxonaData;
    } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error);
        return defaultData;
    }
}

// Ma'lumotlarni saqlash
function saqlash() {
    try {
        localStorage.setItem('kutubxonaData', JSON.stringify(kutubxonaData));
    } catch (error) {
        console.error('Ma\'lumotlarni saqlashda xatolik:', error);
    }
}

// Dastur ishga tushganda ma'lumotlarni yuklash
document.addEventListener('DOMContentLoaded', async function() {
    await malumotlarniYuklash();
});

// Kitoblarni qidirish
function qidirish(qidiruvSozi) {
    if (!qidiruvSozi) return [];
    qidiruvSozi = qidiruvSozi.toLowerCase();
    
    return kutubxonaData.kitoblar.filter(kitob => {
        const topildi = kitob.nomi.toLowerCase().includes(qidiruvSozi) ||
            kitob.muallif.toLowerCase().includes(qidiruvSozi) ||
            kitob.kategoriya.toLowerCase().includes(qidiruvSozi);
            
        if (topildi) {
            kitob.qidirilganSoni = (kitob.qidirilganSoni || 0) + 1;
            saqlash();
        }
        return topildi;
    });
}

// Kitob ma'lumotlarini yangilash
function kitobniYangilash(id, yangiMalumot) {
    const index = kutubxonaData.kitoblar.findIndex(k => k.id === id);
    if (index !== -1) {
        kutubxonaData.kitoblar[index] = {
            ...kutubxonaData.kitoblar[index],
            ...yangiMalumot,
            oxirgiOzgartirilganSana: new Date().toISOString().split('T')[0]
        };
        saqlash();
        return true;
    }
    return false;
}

// Excel uchun ma'lumotlarni tayyorlash
function excelMalumotlariniTayyorlash() {
    return kutubxonaData.kitoblar.map(kitob => ({
        'Kitob ID': kitob.id,
        'Nomi': kitob.nomi,
        'Muallif': kitob.muallif,
        'Nashriyot': kitob.nashriyot,
        'Nashr yili': kitob.yil,
        'Mavjud': kitob.mavjud ? 'Ha' : 'Yo\'q',
        'Nusxalar soni': kitob.soni,
        'Kategoriya': kitob.kategoriya,
        'Til': kitob.til,
        'ISBN': kitob.ISBN,
        'Sahifalar': kitob.sahifalar,
        'Qidirilgan soni': kitob.qidirilganSoni || 0,
        'Oxirgi o\'zgartirilgan sana': kitob.oxirgiOzgartirilganSana || '-'
    }));
} 