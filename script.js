// Sahifa yuklanganda ma'lumotlarni yuklash
document.addEventListener('DOMContentLoaded', async function() {
    await localStorageYuklash();
    
    // Qidiruv tugmasiga event listener qo'shamiz
    document.getElementById('searchButton').addEventListener('click', function() {
        const qidiruvSozi = document.getElementById('bookSearch').value;
        const natijalar = qidirish(qidiruvSozi);
        natijalarniKorsatish(natijalar);
    });
});

// Natijalarni ko'rsatish funksiyasi
function natijalarniKorsatish(natijalar) {
    const natijalarDiv = document.getElementById('searchResults');
    
    if (natijalar.length === 0) {
        natijalarDiv.innerHTML = '<p>Kitob topilmadi</p>';
        return;
    }

    let html = '<div class="kitoblar-royxati">';
    natijalar.forEach(kitob => {
        html += `
            <div class="kitob-element">
                <h3>${kitob.nomi}</h3>
                <p><strong>Muallif:</strong><br>${kitob.muallif}</p>
                <p><strong>Nashriyot:</strong><br>${kitob.nashriyot}</p>
                <p><strong>Nashr yili:</strong><br>${kitob.yil}</p>
                <p><strong>Holati:</strong><br>${kitob.mavjud ? 'Mavjud' : 'Mavjud emas'}</p>
                <p><strong>Qidirilgan:</strong><br>${kitob.qidirilganSoni || 0} marta</p>
            </div>
        `;
    });
    html += '</div>';
    
    natijalarDiv.innerHTML = html;
}
