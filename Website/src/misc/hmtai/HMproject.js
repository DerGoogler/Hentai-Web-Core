// Import Neko Contents //
const sfwNeko = require('./images/sfwNeko.json');
const nsfwNeko = require('./images/nsfwNeko.json');
const jahyImages = require('./images/jahy.json');

// Import SFW Wallpapers //
const wallpaper = require('./images/wallpaper.json');
const mobileWallpaper = require('./images/mobileWallpaper.json');

// Load NSFW Wallpapers //
const nsfwMobileWallpaper = require('./images/nsfwMobileWallpaper.json');

// Import NSFW content//;
const bdsmImages = require('./images/bdsm.json');
const creampieImages = require('./images/creampie.json');
const cumImages = require('./images/cum.json');
const mangaImages = require('./images/manga.json');
const hentaiImages = require('./images/hentai.json');
const eroImages = require('./images/ero.json');
const pantyImages = require('./images/panties.json');
const assImages = require('./images/ass.json');
const orgyImages = require('./images/orgy.json');
const femdomImages = require('./images/femdom.json');
const elvesImages = require('./images/elves.json');
const incestImages = require('./images/incest.json');
const cuckoldImages = require('./images/cuckold.json');
const hentaiGifs = require('./images/hnt_gifs.json');
const blowjobImages = require('./images/blowjob.json');
const boobjobImages = require('./images/boobjob.json');
const ahegaoImages = require('./images/ahegao.json');
const footImages = require('./images/foot.json');
const pussyImages = require('./images/pussy.json');
const uniformImages = require('./images/uniform.json');
const gangBangImages = require('./images/gangbang.json');
const glassesImages = require('./images/glasses.json');
const tentaclesImages = require('./images/tentacles.json');
const thighsImages = require('./images/thighs.json');
const yuriImages = require('./images/yuri.json');
const zettaiRyouikiImages = require('./images/zettaiRyouiki.json');
const masturbationImages = require('./images/masturbation.json');
const publicImages = require('./images/public.json');
const lickImages = require('./images/lick.json')
const slapImages = require('./images/slap.json')
const depressionImages = require('./images/depression.json')

function randomizer(images) { // Select Random Image from JSON //
    return images[Math.floor(Math.random() * images.length)];
}

module.exports = class HM {
    static wallpaper() { // Returns you SFW Anime Wallpapers for Desktops ! //
        return randomizer(wallpaper);
    }
    static mobileWallpaper() { // Returns SFW Anime Wallpapers for Mobile Users ! //
        return randomizer(mobileWallpaper)
    }
    static neko() { // Returns Safe for Work Neko Images! //
        return randomizer(sfwNeko)
    }
    static jahy() { // Returns Safe for Work Jahy Images! //
        return randomizer(jahyImages)
    }
    static slap() { // Returns Safe for Work Slap Gifs! //
        return randomizer(slapImages)
    }
    static lick() { // Returns Safe for Work lick Gifs! //
        return randomizer(lickImages)
    }
    static depression() { // Returns Safe for Work Depression Gifs! //
        return randomizer(depressionImages)
    }

    static nsfw = { // Returns a NSFW category //
        ass() { // Returns you ass Images ! //
            return randomizer(assImages)
        },
        bdsm() { // Returns you lewd ... and dirty ... BDSM Images ! //
            return randomizer(bdsmImages)
        },
        cum() { // Returns you cumshot and creampies Images ! //
            return randomizer(cumImages)
        },
        creampie() { // Returns a dirty creampie Images ! //
            return randomizer(creampieImages)
        },
        manga() { // Returns you Hentai-Manga Images ! //
            return randomizer(mangaImages)
        },
        femdom() { // Returns how Womans fucked Mans ! /// 
            return randomizer(femdomImages)
        },
        hentai() { // Returns you simple Hentai Images ! //
            return randomizer(hentaiImages)
        },
        incest() { // Returns you incest Images ! //
            return randomizer(incestImages)
        },
        ero() { // Returns you Erotic(ecchi) Images ! //
            return randomizer(eroImages)
        },
        orgy() { // Returns you lewd ... and dirty ... Orgy Images ! //
            return randomizer(orgyImages)
        },
        elves() { // Returns lewd ... and dirty ... Elves Images ! //
            return randomizer(elvesImages)
        },
        pantsu() { // Returns you panties Images ! //
            return randomizer(pantyImages)
        },
        cuckold() { // Return you a cuckold's moment ! //
            return randomizer(cuckoldImages)
        },
        blowjob() { // Returns you blowjobs Images ! //
            return randomizer(blowjobImages)
        },
        boobjob() { // Returns you boobjob Images ! //
            return randomizer(boobjobImages)
        },
        foot() { // Returns you lewd ... and dirty ... FootFetish Images ! //
            return randomizer(footImages)
        },
        vagina() { // Returns you lewd ... and dirty ... Pussy Images ! //
            return randomizer(pussyImages)
        },
        ahegao() { // Returns you lewd ... and dirty ... Ahegao Images ! //
            return randomizer(ahegaoImages)
        },
        uniform() { // Returns you NSFW Images with uniform ! //
            return randomizer(uniformImages)
        },
        gangbang() { // Returns you lewd ... and dirty ... GangBang Images ! //
            return randomizer(gangBangImages)
        },
        gif() { // Returns Hentai Gifs ! //
            return randomizer(hentaiGifs)
        },
        nsfwNeko() { // Returns you lewd ... and dirty ... Neko Images ! //
            return randomizer(nsfwNeko)
        },
        glasses() { // Returns you lewd ... and dirty ... Anime Girls with Glasses Images ! //
            return randomizer(glassesImages)
        },
        tentacles() { // Returns you lewd ... and dirty ... Tentacles Hentai Images ! //
            return randomizer(tentaclesImages)
        },
        thighs() { // Returns you sweet Thighs Images ! //
            return randomizer(thighsImages)
        },
        yuri() { // Returns you lewd ... two girls Images ! //
            return randomizer(yuriImages)
        },
        zettaiRyouiki() { // Returns you beatifull <3 ZettaiRyouiki Images ! //
            return randomizer(zettaiRyouikiImages)
        },
        masturbation() { // Returns you lewd masturbation Images ! //
            return randomizer(masturbationImages)
        },
        public() { // Returns you hentai on a Public Images ! //
            return randomizer(publicImages)
        },
        nsfwMobileWallpaper() { // Returns SFW Anime Wallpapers for Mobile Users ! //
            return randomizer(nsfwMobileWallpaper)
        }
    }
}