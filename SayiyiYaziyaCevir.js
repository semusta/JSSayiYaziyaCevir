/**
 * Ondalık kısımlı ve tam sayıları yazıya çevirir
 * Çevrilcek sayi '' işaretleri içinde ondalık kısım virgül
 * olacak şekilde girilmelidir.
 * Örnek SayiCevir.cevir('123456,12');
 * string olarak geri dönüş sağlar
 */

var SayiCevir = {
    cevir: function (sayi) {
        //sayı kontrolu geçerli değilse mesaj döndür
        if (!sayi.match(/^\d+,\d+$|^\d+$/)) {
            return 'Girilen sayı geçerli değil !';
        }

        if (sayi.indexOf(',') > 0) {
            sayi = sayi.split(',');
            if (sayi[0].length > 18 || sayi[1].length > 18) {
                return 'Sayılar tam veya ondalıklı kısım ayrı olarak enfazla 18 basamaklı olabilir !';
            }
            var tam = this.cevir2(sayi[0]);
            var ondalik = this.cevir2(sayi[1]);
            return tam + ' tl ' + ondalik + ' kuruş';
        } else {
            if (sayi.length > 18) {
                return 'Sayılar tam veya ondalıklı kısım ayrı olarak enfazla 18 basamaklı olabilir !';
            }

            return this.cevir2(sayi) + ' tl';
        }


    },

    /**
     * @param sayi
     * @return string
     * verilen sayıyı yazı olarak geri döndürür
     */
    cevir2: function (sayi) {
        //rakamların ve kısımların yazı karşılıkları
        var trRakam = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
        var trOnlar = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
        var trBinler = ['', 'bin', 'milyon', 'milyar', 'trilyon', 'kattrilyon'];
        var bSay = sayi.length;
        var rakamlar = sayi.split('');
        var basamaklar = [];
        var b = 0;

        /*
         * 3lü kısım halinde rakamlar parçalanıyor
         * ve diziye ekleniyor
         */
        for (var i = 0; i < rakamlar.length; i++) {
            if (basamaklar[b] == undefined) {
                basamaklar[b] = rakamlar[--bSay];
            } else {
                basamaklar[b] += rakamlar[--bSay];
            }
            if (((i + 1) % 3) == 0)
                b++;
        }

        var islem = [];

        /*
         * dizideki her üçlü hane yazıya çeviriliyor
         */
        for (i = 0; i < basamaklar.length; i++) {
            var birler = basamaklar[i][0] == undefined ? 0 : basamaklar[i][0];
            var onlar = basamaklar[i][1] == undefined ? 0 : basamaklar[i][1];
            var yuzler = basamaklar[i][2] == undefined ? 0 : basamaklar[i][2];

            var yuz = yuzler == 0 ? '' : ' yüz ';

            if (yuzler == 1) yuzler--;

            islem[i] = trRakam[yuzler] + yuz + trOnlar[onlar] + ' ' + trRakam[birler];
            islem[i] = islem[i].trim();
        }

        /*
         * islem dizisinde elden edilen kısımlar
         * bin milyon milyar ... olarak
         * son kısım elde ediliyor
         */
        var sonuc = '';
        for (i = 0; i < islem.length; i++) {
            if (islem[i] == '') continue;
            if (i == 1) {
                if (islem[i] == 'bir') {
                    islem[i] = '';
                }
            }
            sonuc = islem[i] + ' ' + trBinler[i] + ' ' + sonuc;
        }

        sonuc = sonuc.replace(/\s+/g, ' ');
        sonuc = sonuc.trim();

        return sonuc;
    }
}

//örnek kullanım
console.log(SayiCevir.cevir('12334'));
console.log(SayiCevir.cevir('1001,1001'));
console.log(SayiCevir.cevir('13456213'));
console.log(SayiCevir.cevir('1000000100,100'));
console.log(SayiCevir.cevir('1541510101510'));
console.log(SayiCevir.cevir('1000100100100'));
console.log(SayiCevir.cevir('123456,12'));
console.log(SayiCevir.cevir('1234a56,12')); // hatalı kullanım
console.log(SayiCevir.cevir('100000000000000000,123')); // hatalı kullanım


