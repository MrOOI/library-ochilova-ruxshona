import booksData from '../assets/data/books.json';

// Doimiy ma'lumotlar
const defaultData = booksData;

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

// ... (qolgan kodlar o'zgarishsiz)

export { 
    kutubxonaData, 
    malumotlarniYuklash, 
    saqlash, 
    qidirish, 
    kitobniYangilash, 
    excelMalumotlariniTayyorlash 
}; 