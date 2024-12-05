import { malumotlarniYuklash, qidirish } from './data.js';
import '../css/styles.css';

// Sahifa yuklanganda ma'lumotlarni yuklash
document.addEventListener('DOMContentLoaded', async function() {
    await malumotlarniYuklash();
    
    // Qidiruv tugmasiga event listener qo'shamiz
    document.getElementById('searchButton')?.addEventListener('click', function() {
        const qidiruvSozi = document.getElementById('bookSearch').value;
        const natijalar = qidirish(qidiruvSozi);
        natijalarniKorsatish(natijalar);
    });
});

// ... (qolgan kodlar o'zgarishsiz)