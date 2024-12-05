let kutubxonaData = {
    kitoblar: [],
    foydalanuvchilar: [],
    hisobotlar: []
};

// Ma'lumotlarni yuklash
async function malumotlarniYuklash() {
    try {
        const response = await fetch('books.json');
        if (!response.ok) {
            throw new Error('Ma\'lumotlarni yuklashda xatolik');
        }
        const data = await response.json();
        kutubxonaData = data;
        saqlash();
        return data;
    } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error);
        return null;
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

// LocalStorage'dan yuklash
async function localStorageYuklash() {
    try {
        const data = localStorage.getItem('kutubxonaData');
        if (data) {
            kutubxonaData = JSON.parse(data);
        } else {
            await malumotlarniYuklash();
        }
    } catch (error) {
        console.error('LocalStorage xatoligi:', error);
        await malumotlarniYuklash();
    }
}

// Dastur ishga tushganda ma'lumotlarni yuklash
document.addEventListener('DOMContentLoaded', async function() {
    await localStorageYuklash();
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

// Excel faylini yaratish va yuklash
function excelgaExport() {
    const malumotlar = excelMalumotlariniTayyorlash();
    const ws = XLSX.utils.json_to_sheet(malumotlar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kitoblar");
    
    // Fayl nomini yaratish
    const sana = new Date().toISOString().split('T')[0];
    const filename = `Kutubxona_hisobot_${sana}.xlsx`;
    
    // Excel faylini yuklash
    XLSX.writeFile(wb, filename);
} 