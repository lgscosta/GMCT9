const request = require('request-promise');
const cheerio = require('cheerio');

const pages = {
    "goiabeiras": "http://ru.ufes.br/cardapio/",
    "alegre": "http://ru.alegre.ufes.br/cardapio/",
    "saomateus": "http://restaurante.saomateus.ufes.br/cardapio/",
}


async function gatherData(req, res) {
        const page = pages[req.params.university || "goiabeiras"]
        var cardapios = [];
        var _cardapio = {};
        var now = new Date;
        var pageNow = page + now.getFullYear() + '-';
            pageNow = (now.getMonth() + 1) > 9 ?
    
        pageNow + (now.getMonth() + 1) + '-' :
    
        pageNow + '0' + (now.getMonth() + 1) + '-';
            pageNow = now.getDate() > 9 ?
    
        pageNow + now.getDate() :
    
        pageNow + '0' + now.getDate();
    
            await request(pageNow, (error, response, html) => {
                if( error ) console.log(error);
                
                var $ = cheerio.load(html);
                var divs = $('div.field-content');
                var data = [];
                divs.each(function(num, thElem){
                    data.push($(thElem));
                });
                if(data.length >= 4){
                    cardapios.push({dia: data[0].text(), noite: data[1].text()});
                }
                if(data.length >= 6){
                    cardapios.push({dia: data[2].text(), noite: data[3].text()});
                }
                if(data.length >= 8){
                    cardapios.push({dia: data[4].text(), noite: data[5].text()});
                }
                // console.log(data.length, {dia: data[0].text(), dado: data[1].text()});
                cardapios.forEach(cardapio => {
                    const cardapioDiaArray =  cardapio.dia.split('\n')
                    const cardapioNoiteArray =  cardapio.noite.split('\n')
                    const cardapioDiaFormatado = {
                        salada: [],
                        pratoPrincipal: [],
                        opcao: [],
                        acompanhamento: [],
                        guarnicao: [],
                        sobremesa: []
                    }
                    const cardapioNoiteFormatado = {
                        salada: [],
                        pratoPrincipal: [],
                        opcao: [],
                        acompanhamento: [],
                        guarnicao: [],
                        sobremesa: []
                    }


                    
                    cardapioDiaArray.forEach((_cardapio, index) => {
                        let isSalada = false
                        let isPratoPrincipal = false;
                        let isOpcao = false;
                        let isAcompanhamento = false;
                        let isGuarnicao = false;
                        let isSobremesa = false;

                        if(_cardapio === 'Salada') {
                            isSalada = true
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }

                        if(_cardapio === 'Prato Principal') {
                            isSalada = false
                            isPratoPrincipal = true;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }

                        if(_cardapio === 'Opção') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = true;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Acompanhamento') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = true;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Guarnição') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = true;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Sobremesa') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = true;
                        }
                        
                        if(isSalada) {
                            if(cardapioDiaArray[index+1] !== 'Prato Principal' ) {
                                cardapioDiaFormatado.salada.push(cardapioDiaArray[index+1])
                            }
                        }
                        if(isPratoPrincipal) {
                            if(cardapioDiaArray[index+1] !== 'Opção' ) {
                             cardapioDiaFormatado.pratoPrincipal.push(cardapioDiaArray[index+1])
                            }
                        }
                        if(isOpcao) {
                            if(cardapioDiaArray[index+1] !== 'Acompanhamento' ) {
                                cardapioDiaFormatado.opcao.push(cardapioDiaArray[index+1])
                            }

                        }
                        if(isAcompanhamento) {
                            if(cardapioDiaArray[index+1] !== 'Guarnição' ) {
                                cardapioDiaFormatado.acompanhamento.push(cardapioDiaArray[index+1])
                            }
                        }
                        if(isGuarnicao) {
                            if(cardapioDiaArray[index+1] !== 'Sobremesa') {
                                cardapioDiaFormatado.guarnicao.push(cardapioDiaArray[index+1])
                            }
                        }
                        if(isSobremesa) {
                            if(cardapioDiaArray[index+1] !== '*cardápio sujeito a alterações' && cardapioDiaArray[index+1] !== ''  && cardapioDiaArray[index+1] !== undefined ) {
                                cardapioDiaFormatado.sobremesa.push(cardapioDiaArray[index+1])
                            }
                        }
                    })
                    cardapioNoiteArray.forEach((_cardapio, index) => {
                        let isSalada = false
                        let isPratoPrincipal = false;
                        let isOpcao = false;
                        let isAcompanhamento = false;
                        let isGuarnicao = false;
                        let isSobremesa = false;
                        
                        if(_cardapio === 'Salada') {
                            isSalada = true
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }

                        if(_cardapio === 'Prato Principal') {
                            isSalada = false
                            isPratoPrincipal = true;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }

                        if(_cardapio === 'Opção') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = true;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Acompanhamento') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = true;
                            isGuarnicao = false;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Guarnição') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = true;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Sobremesa') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isGuarnicao = false;
                            isSobremesa = true;
                        }


                        if(_cardapio === 'Salada') {
                            isSalada = true
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isSobremesa = false;
                        }

                        if(_cardapio === 'Prato Principal') {
                            isSalada = false
                            isPratoPrincipal = true;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isSobremesa = false;
                        }

                        if(_cardapio === 'Opção') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = true;
                            isAcompanhamento = false;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Acompanhamento') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = true;
                            isSobremesa = false;
                        }
                        if(_cardapio === 'Sobremesa') {
                            isSalada = false
                            isPratoPrincipal = false;
                            isOpcao = false;
                            isAcompanhamento = false;
                            isSobremesa = true;
                        }
                        
                        if(isSalada) {
                            if(cardapioNoiteArray[index+1] !== 'Prato Principal' ) {
                                cardapioNoiteFormatado.salada.push(cardapioNoiteArray[index+1])
                            }
                        }
                        if(isPratoPrincipal) {
                            if(cardapioNoiteArray[index+1] !== 'Opção' ) {
                                cardapioNoiteFormatado.pratoPrincipal.push(cardapioNoiteArray[index+1])
                            }
                        }
                        if(isOpcao) {
                            if(cardapioNoiteArray[index+1] !== 'Acompanhamento' ) {
                                cardapioNoiteFormatado.opcao.push(cardapioNoiteArray[index+1])
                            }

                        }
                        if(isAcompanhamento) {
                            if(cardapioNoiteArray[index+1] !== 'Guarnição' ) {
                                cardapioNoiteFormatado.acompanhamento.push(cardapioNoiteArray[index+1])
                            }
                        }
                        if(isGuarnicao) {
                            if(cardapioNoiteArray[index+1] !== 'Sobremesa') {
                                cardapioNoiteFormatado.guarnicao.push(cardapioNoiteArray[index+1])
                            }
                        }
                        if(isSobremesa) {
                            if(cardapioNoiteArray[index+1] !== '*cardápio sujeito a alterações' && cardapioNoiteArray[index+1] !== ''  && cardapioNoiteArray[index+1] !== undefined ) {
                                cardapioNoiteFormatado.sobremesa.push(cardapioNoiteArray[index+1])
                            }
                        }
                    })
                    
                    _cardapio =  {cardapioNoiteFormatado, cardapioDiaFormatado}
                })    
            });
            res.status(200).json({ msg: 'cardapio', cardapio: _cardapio})
}


module.exports = {gatherData}