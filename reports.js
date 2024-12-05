function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const reportDate = document.getElementById('reportDate').value;
    
    if (!reportDate) {
        alert("Iltimos, sana tanlang");
        return;
    }

    let hisobotMalumotlari = [];
    const tanlganSana = new Date(reportDate);

    switch(reportType) {
        case 'kunlik':
            hisobotMalumotlari = kunlikHisobotTayyorlash(tanlganSana);
            break;
        case 'oylik':
            hisobotMalumotlari = oylikHisobotTayyorlash(tanlganSana);
            break;
        case 'yillik':
            hisobotMalumotlari = yillikHisobotTayyorlash(tanlganSana);
            break;
    }

    hisobotniKorsatish(hisobotMalumotlari, reportType);
}

function kunlikHisobotTayyorlash(sana) {
    const formatlganSana = sana.toISOString().split('T')[0];
    return kutubxonaData.kitoblar.map(kitob => ({
        ...kitob,
        hisobotSanasi: formatlganSana
    }));
}

function oylikHisobotTayyorlash(sana) {
    const oy = sana.getMonth() + 1;
    const yil = sana.getFullYear();
    return kutubxonaData.kitoblar.map(kitob => ({
        ...kitob,
        hisobotSanasi: `${yil}-${oy.toString().padStart(2, '0')}`
    }));
}

function yillikHisobotTayyorlash(sana) {
    const yil = sana.getFullYear();
    return kutubxonaData.kitoblar.map(kitob => ({
        ...kitob,
        hisobotSanasi: yil.toString()
    }));
}

function hisobotniKorsatish(malumotlar, hisobotTuri) {
    const natijalarDiv = document.getElementById('reportResults');
    
    if (malumotlar.length === 0) {
        natijalarDiv.innerHTML = '<p class="no-data">Ma\'lumot topilmadi</p>';
        return;
    }

    let html = `
        <div class="report-table">
            <h3>${hisobotTuri.charAt(0).toUpperCase() + hisobotTuri.slice(1)} hisobot</h3>
            <table>
                <thead>
                    <tr>
                        <th>Kitob nomi</th>
                        <th>Muallif</th>
                        <th>Nashriyot</th>
                        <th>Holati</th>
                        <th>Qidirilgan</th>
                        <th>Oxirgi o'zgarish</th>
                    </tr>
                </thead>
                <tbody>
    `;

    malumotlar.forEach(kitob => {
        html += `
            <tr>
                <td>${kitob.nomi}</td>
                <td>${kitob.muallif}</td>
                <td>${kitob.nashriyot}</td>
                <td>${kitob.mavjud ? 'Mavjud' : 'Mavjud emas'}</td>
                <td>${kitob.qidirilganSoni || 0}</td>
                <td>${kitob.oxirgiOzgartirilganSana || '-'}</td>
            </tr>
        `;
    });

    html += '</tbody></table></div>';
    natijalarDiv.innerHTML = html;
} 