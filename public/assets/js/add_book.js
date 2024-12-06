document.getElementById('addBookForm').innerHTML = `
    <div class="form-group">
        <label for="newBookTitle">Kitob nomi:</label>
        <input type="text" id="newBookTitle" required>
    </div>
    <div class="form-group">
        <label for="newBookAuthor">Muallif:</label>
        <input type="text" id="newBookAuthor" required>
    </div>
    <div class="form-group">
        <label for="newBookPublisher">Nashriyot:</label>
        <input type="text" id="newBookPublisher" required>
    </div>
    <div class="form-group">
        <label for="newBookYear">Nashr yili:</label>
        <input type="number" id="newBookYear" required>
    </div>
    <div class="form-group">
        <label for="newBookCount">Nusxalar soni:</label>
        <input type="number" id="newBookCount" required>
    </div>
    <div class="form-group">
        <label for="newBookISBN">ISBN:</label>
        <input type="text" id="newBookISBN" required>
    </div>
    <div class="form-group">
        <label for="newBookCategory">Kategoriya:</label>
        <select id="newBookCategory" required>
            <option value="Roman">Roman</option>
            <option value="Ilmiy">Ilmiy</option>
            <option value="Tarixiy">Tarixiy</option>
            <option value="Detektiv">Detektiv</option>
        </select>
    </div>
    <button type="submit">Kitobni qo'shish</button>
`;

document.getElementById('addBookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const yangiKitob = {
        id: kutubxonaData.kitoblar.length + 1,
        nomi: document.getElementById('newBookTitle').value,
        muallif: document.getElementById('newBookAuthor').value,
        nashriyot: document.getElementById('newBookPublisher').value,
        yil: parseInt(document.getElementById('newBookYear').value),
        soni: parseInt(document.getElementById('newBookCount').value),
        ISBN: document.getElementById('newBookISBN').value,
        kategoriya: document.getElementById('newBookCategory').value,
        mavjud: true,
        olinganSana: null,
        til: "O'zbek",
        sahifalar: 0
    };

    kutubxonaData.kitoblar.push(yangiKitob);
    saqlash();
    alert("Kitob muvaffaqiyatli qo'shildi!");
    this.reset();
});