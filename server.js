const http = require('http');
const url = require('url');
 
http.createServer(function (req, res) {
    const urlParts = url.parse(req.url);

    switch(urlParts.pathname) {
        case "/":
            homepage(req, res);
            break;
        case "/dodaj":
            dodaj(req, res);
            break;
        case "/izlistaj":
            izlistaj(req, res);
            break;
            case "/obrisi":
                obrisi(req, res);
                break;
        default:
            homepage(req,res);
            break;
    }
}).listen(3333);
console.log("Server running at http://localhost:3333/");

let lista = [{
    id: 1,
    naziv: 'artikal',
    cena: 2000,
    imeKompanije: 'Samsung'
}];

function dodajArtikal(id, naziv, cena, imeKompanije) {
    const artikal = {
        id: id,
        naziv: naziv,
        cena: cena,
        imeKompanije: imeKompanije
    }
    return artikal
}

function prikaziListu() {
    let html = ``;
    lista.map(l => {
        html += `\nid: ${l.id} `;
        html += `naziv: ${l.naziv} `;
        html += `cena: ${l.cena} `;
        html += `imeKompanije: ${l.imeKompanije} \n`;
    })
    return html;
}

function obrisiArtikal(id) {
    let novaLista = lista.filter(l => l.id != id);
    return novaLista;
}

function homepage(req, res) {
    res.end("Home page"); 
}
 
function dodaj(req, res) {
    const artikal = dodajArtikal(2, 'artikal 1', 3000, 'Samsung');
    lista.push(artikal);
    res.end(`Dodali smo sledeci artikal u listu: ${artikal.naziv}`);    
}

function izlistaj(req, res) {
    const lista = prikaziListu();
    res.end("Svi artikli su: " + lista);
}

function obrisi(req, res) {
    const id = 1;
    lista = obrisiArtikal(id);
    res.end("Obrisan je artikal sa id: " +  id);
}