let joriyKitobId = null;

function searchForEdit() {
    const qidiruvSozi = document.getElementById('searchBook').value;
    const natijalar = qidirish(qidiruvSozi);
    
    if (natijalar.length > 0) {
        const kitob = natijalar[0];
        joriyKitobId = kitob.id;
        
        document.getElementById('bookTitle').value = kitob.nomi;
        document.getElementById('bookAuthor').value = kitob.muallif;
        document.getElementById('bookPublisher').value = kitob.nashriyot;
        document.getElementById('bookYear').value = kitob.yil;
        document.getElementById('bookCount').value = kitob.soni;
        
        document.getElementById('editForm').classList.remove('hidden');
    } else {
        alert('Kitob topilmadi');
    }
}

document.getElementById('bookEditForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!joriyKitobId) {
        alert('Avval kitobni tanlang');
        return;
    }
    
    const yangilanganMalumot = {
        nomi: document.getElementById('bookTitle').value,
        muallif: document.getElementById('bookAuthor').value,
        nashriyot: document.getElementById('bookPublisher').value,
        yil: parseInt(document.getElementById('bookYear').value),
        soni: parseInt(document.getElementById('bookCount').value)
    };
    
    if (kitobniYangilash(joriyKitobId, yangilanganMalumot)) {
        alert("Kitob ma'lumotlari muvaffaqiyatli yangilandi!");
        document.getElementById('editForm').classList.add('hidden');
        document.getElementById('searchBook').value = '';
    } else {
        alert('Xatolik yuz berdi');
    }
}); 