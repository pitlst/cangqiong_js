// @ts-nocheck
/* Paste entire file into Cosmic page JS didMount. */
(function () {
    try {
        if (window.frameElement && window.frameElement.getAttribute("data-cq-fetch") === "1") return;
    } catch (eSkip) { }
    function utf8FromBytes(bytes) {
        var out = "";
        var i = 0;
        while (i < bytes.length) {
            var c = bytes[i++];
            if (c < 128) {
                out += String.fromCharCode(c);
            } else if (c < 224) {
                var c2 = bytes[i++];
                out += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            } else if (c < 240) {
                var c2 = bytes[i++];
                var c3 = bytes[i++];
                out += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            } else {
                var c2 = bytes[i++];
                var c3 = bytes[i++];
                var c4 = bytes[i++];
                var u = ((c & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
                u -= 65536;
                out += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023));
            }
        }
        return out;
    }
    function dec(bytes) {
        if (typeof TextDecoder !== "undefined") return new TextDecoder("utf-8").decode(bytes);
        return utf8FromBytes(bytes);
    }
    function b64ToU8(b64) {
        var bin = atob(b64);
        var bytes = new Uint8Array(bin.length);
        var i;
        for (i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
    }
    function u32(bytes, off) {
        return ((bytes[off] << 24) | (bytes[off + 1] << 16) | (bytes[off + 2] << 8) | bytes[off + 3]) >>> 0;
    }
    function unpack(bytes) {
        var o = 0;
        function next() {
            var n = u32(bytes, o);
            o += 4;
            var s = dec(bytes.subarray(o, o + n));
            o += n;
            return s;
        }
        return { css: next(), html: next(), bundle: next() };
    }
    function inflateGzip(bytes, done) {
        if (typeof DecompressionStream === "undefined") {
            try { console.error("[cq-demo] DecompressionStream unavailable"); } catch (e0) { }
            return;
        }
        var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
        new Response(stream).arrayBuffer().then(function (buf) {
            done(new Uint8Array(buf));
        }).catch(function (err) {
            try { console.error("[cq-demo] inflate failed", err); } catch (e1) { }
        });
    }
    var PACK = "";
    PACK += "H4sIAAAAAAACCuy9a3fkRnYg6HP2W/+B/QrCUh6gGZlEZvKJJIquYhWl";
    PACK += "kuqlekklNocGE5GZEJGBVCDAR5HZZ9bjdqv9aq/f4/XYbo/H7Znd6bZn";
    PACK += "fKZfau9/2aMqSR/29F/YcyMCQAAJJDOrWJLaO6VuJhCIx42IGzfuvXHv";
    PACK += "jV/5ld/7f7+myX/2IIyYdpa+wz/Pj0aBe2prB0HYPezkvh37HhvYWtOy";
    PACK += "Xs9/GGC/P2BlX+r1A7d72KdhTDxbCw+D7sBoapZmmcV8vZDifD6r0Vxe";
    PACK += "Kc3bdekFtUGOuaochaPwCNPptcpM81VM/aFLT7OMK9aKZjVazbbWWmus";
    PACK += "NNerSpS2srHW1KyG1WxrzbVGe7JshLsh8XLtbayuQRGrqbXWVxvttZXq";
    PACK += "QqVNtniL1qrWWl9prK9PFh/GDOdALB0Hnqu0gZWV1dISbreLCbuwYpGt";
    PACK += "HHSrfE48HDEad5l/hBUw1mCcWssrMC/t1mQ/D0LqZRhiNTZardLafTKK";
    PACK += "2cXZqE/6Wa41a70ckQcuZfVmlnEdMjaazWWtudFYWWtWlGhlJVbbvGPt";
    PACK += "Na210mi3q0q05xgKUWJ5DqQWJVayEsvLy9CPtTWttdpY39iYHB/X8+PI";
    PACK += "1qzGamuF4uEE1voePnDV+Vgvn22Zca5Vm5SZXL0XDU2h5IutYlnHjCsg";
    PACK += "n32ulZAUnRW3k/yzIW8vJKweuSSytdjnD/UIU7+HtOg0YnhYj32k1d3R";
    PACK += "KMB1kYI0/QHuh1h7dFNH2v3wIGQh0t7EwRFmftdF2lXquwHS9Hs+6e+4";
    PACK += "pK892NaRpt/2uzSMwh7TnrhvYl9HWtZaKVTDkIQcKniIRm4XI+3Bzu2Q";
    PACK += "hPX7uB8HLkXadkiiMHAjpOm3/ANMXeaHRIM8OtJuYxKESEuLl/fdf4pt";
    PACK += "rbk8Oil+ZviE1U8iW+u6Qdc4cqmhFDG1r2tWo4RS81LRcFqp9apiB26E";
    PACK += "ba1YpjRr0K9uodlotipaOAmmFasq1ZpebLKUx+rdMKgPfWJrq40y0pDk";
    PACK += "cE9srdWayMBb6LlDPzjND4hLIrMkq5jF6SMX+ATXUz6osVIA6RgfHPpM";
    PACK += "lh6GIRvwBeQS5ruB70bYywqMv5bn0IyG59JDs8Co5TmrX7Vc+G8WpqqK";
    PACK += "TKpMVTXBqGSsqqotMFbVNU9jriorL5LnC3eVS2auWmvLKXe02rDa7TmZ";
    PACK += "q6qOFXiq1urGnExVFUkubilVNU/ZS6pgLuWq1iw+IRtNrdVqtJqrF3BV";
    PACK += "nO/WlrSm9fp0virNuPL6BZxVFXv5/1/OaoJzuog7mAcLKjmnCwfrVXJO";
    PACK += "VWg+A+t0UUdnR+By5mkSP5UN4Osoe7TtAwwA5pLcHsO0sDUchCewRfFW";
    PACK += "BHT1g7DAgQxd2ocN1Monj1zP4+WsUnAGbBhkzR+E3mmh6WpNwBe/6ar7";
    PACK += "o6gnSylU1A2DkGatJUhgXs4u3hi5fVwYqFEY+cBO2hrFgQs0c1aVSqqh";
    PACK += "6QW4MKmQUvd8irui6m4YxEOSz+MGfp/UfYaHka1FjGLWHVyMAy87g5Jx";
    PACK += "nWv+ZpsUZZZz6fAPREg3qPfhFxNmNFuWNTrRVvlfl2kr1utavWm9jkRb";
    PACK += "9aF/YvhErEwkG5bUyNSardeRxqhLopFLMWGmZuUTtFXrdRNNADEF9SZw";
    PACK += "5Ir29Tnx5GndJx4+sbVmebXuaFSPBjgICvUCquQKcaLgk3Q6rJmxbjpG";
    PACK += "qcBIAlgARaoVWy1rVIbP0YD65HAegGZZBpIuUol7oxMtCgPfk7OVp+3V";
    PACK += "GDcFb2QVprZRxJvJ2jwajuo9P2CwjxwEMTWaq6MTU4tcFlOXYaPZaFbQ";
    PACK += "ohcoXjIj9QPqEq+IegkdgInRoMoSSTbdXxgLh3MMZBkQzGcBnkMfXU5l";
    PACK += "QM4tI0fHErFXrQImBZgxTOsgxfPu1htWqygy5mjRJFs0na61p3c7ig/m";
    PACK += "6LTYuOssHNlaa2LBlI7ISTRtuyvKEBdMEnGPXh0pmWXl9t2RrU3gYYqs";
    PACK += "zRbg6QQpAdGyF4THtubGLCzvInGPOBmbkwTPShqBw8R0xiMVdfza65W9";
    PACK += "tUR/rcqVaWskJLic9kkFq6J7EUmmVocBnkL2FHL2MusE0NXWfDLA1Gcv";
    PACK += "xEHkVvZKcWXzMnwObC3AvSKsMY0A2FHoT04M76Gc9qznWqO5EklugT9P";
    PACK += "R6SEYy8gVDckjEsnut6pwDT3IAqDmOEipepNLidOCVaK+CMRq13Eioo1";
    PACK += "WUAJC0gL/791EU9dkNrMkmHshXQocSZwGX5i1FcmpCN1vAWMs4zvAJZ1";
    PACK += "UfqpBFEIeeYMGDshDprTAWn4Ud3lmo8pwFzIKxR4zVLgXy30FQibbmU5";
    PACK += "QlSsCtoa1QP3AAdVnETTkkzEJAGfceuabytvWKtTd/Ipex/8iyOoDAe4";
    PACK += "y4p0VO08xa4XkuC0PvAJK9kcq1jYGWncPBBPl6jSeViHaWhV7RhFJq6c";
    PACK += "C37pTaR6PfBOmtqyVck5q8Mf0n79yMfH9WgU+OwlmJMplfJ3RjGu0/C4";
    PACK += "SM7lPuLhnhsH7IL6mHsQ4PoxdUezQDrzJl5Oz/necOF0lrF5vTCsNA15";
    PACK += "AT6HM23rFzBtVcJFaS9mkiyGrk9mRQi5Y74CZnWSG806DiuxNdn7Yifq";
    PACK += "A+x6E1vdy8zIB3HE/N5pPWVG+Clm/QCzY4xLe9GaVTyfAL5MsKug98FL";
    PACK += "i24rRYpfoImtUkCXvq5dx3j0AOND7U2XEhxF2vO/+LPPvvPffvHxX8jT";
    PACK += "NW1R+/wP//azP/oPn/z8jz79/g+ffes72qL2/K/+t+c/+t6nP//fn//N";
    PACK += "x7/4+KPP/uUnn378589/9L1n3/7pLz7+jvb1pfLDvDKdYEYc65Lmlx7r";
    PACK += "Kdn8odvHZdQhE3cGvuep8zmeAs+khrksT5nK+YVZWp9EeJIdlSx5HR9h";
    PACK += "wqKyDqZ6L2u+rlXzZxdqD3EQ+KMIaxvW69qa9TpXIK6/rrWBV6P9A9do";
    PACK += "NteR1lxuIa25vorgsKM1qSRcWS9TEla1tbLyura8wttqrr+ura0nba1Z";
    PACK += "SNuwkNZsW9BSs6yllblasl7X2qKl9dbr2nraEm+lCX9WeFPWeklTOX5+";
    PACK += "PDf6TKD0BNiwiF2agc1CjevukqGHAW9Zy0hrtVMom6OTPJjN0UnJiJRU";
    PACK += "LdRZc9dduU4FndsA7ndjUjUB1IudgqVTu1Wu5Ru60WGy2KsmcF1BS5hL";
    PACK += "mMBftSxrQnGtrbWK0terrL+o5J5jN2h9adtBg7kH9ZFLcBB9edquUngu";
    PACK += "C5xJkvqC/EwplJUCccVwqJV4LnMFm/xyrNuUUahUu10Gu7deKtomB2cX";
    PACK += "abtKv+dwtjSHZBgmvpUPbH0YxoT90g3vV2YgWZ2FYTB5lHWpDDkfEUy8";
    PACK += "mSSKWXhxj8lTImFKM/Mx3NA9qVdOqcAaMHrIK9ZVvVG7NU2Bbc2qh+BQ";
    PACK += "X7oa4lJMA15Okz1lkuxe2I2Le1AYM0DkcrUAoIHrAetv8f9AuJzoI5If";
    PACK += "QRVXrYcBQxVTa8+mhvFYfYiZO9PG/lI6ruOBzzDf5PkIgCqlepnOpW2Z";
    PACK += "m9gVWhu5fZ8IK+EvU1Cf6xxdrsSSA8XJzuG6T3rhq53hslah9gqVdGv9";
    PACK += "Xwn1mGEIFaK5OmWi8HDEinZZ6klYGZLNs/4yu4BlqUbWFvzhKKTMJVO0";
    PACK += "nyBVhP26x74yDHWANTZosEE9CimrUOqWHg7OeC5QbOLC46pqSixPf7TV";
    PACK += "lZlosWyw7hNSrTT0CeeGXlSbO6GtnZkup9B1qwllJXCzSymVcnajvTKF";
    PACK += "K7SmAs0Fm6ib7wQqzebhYr7iNp4A1JyyGCfPVadBxZvywuOpIPFM8Wgy";
    PACK += "i01CZsi6zPQFCpkvVQoAqup7pQBe1rN4NMMQVtSi9H0aPFUVTef3+9Qv";
    PACK += "8unU9+oMD0dw5F0XWBrZQNiG7okB6rQeNUt45gsXn6iqXqGTp+FxvUIK";
    PACK += "nUFCkL3kontIokvkYnjrQBJsLU8YqsXmcm6sDFyuCfySRLHKI3FY8PUD";
    PACK += "RsrFrEmRqFpYmoVLaU1yKXOd5l42SzN1/7yELWhiisoyzWjEg5IRvsiu";
    PACK += "J5nSGe1OLrY3mdVSI8Ul8RTFlftmJTeSV8XPXmHBBHHWGodhOD+MS1/X";
    PACK += "hj51tWuu18fa//Nv/zg5U1eP0RoH/OulMzWFVbaxsbFxsWhRaQiXMcmg";
    PACK += "8381xi4FK9OVUiVcz2fJIrloyZebcJVxIxdibDqTMWMhyU8fI5c/eTOR";
    PACK += "g/JtZirb+uLk91IMGGdToC2/BJ5ehhFkCf1ECUM1hZoCIeXarfqRH/mT";
    PACK += "6v6vpJYLgPb8CCS7CXv5Cw+tM6Z3pbL2ekLyzr641aq2+xJCamq+uD7z";
    PACK += "WNblJE9prxJ1VaSzpzE3F3MslbvabCBWD4lQOs2BXElrLzENss2Vmdpc";
    PACK += "+roGC6lLtIeA07/4+KNPf/ZHz//qN5/98Cef//wPROIS//smt0ASz/fD";
    PACK += "4yxRPF0LvVPxtI2D4Bcf/64K+fO/+dGzj7/76R//w6e//4/P//I72vaD";
    PACK += "B9qz7/7559/+7ic//tnnf/vnv/j4dz/56Q+Evc1n3/4vz377Hz770V9/";
    PACK += "/hffLVjQNF6xOvcLMoKs8kWYfYoVGqctv4h/ERzy5B2EVuZyMJpeflIJ";
    PACK += "VioDwblSKWuiTNzkgZPAgcA9DcEbfHIEZ9x4M+oRuCOIjJE8FWiHO4L9";
    PACK += "j5sb2tIuZE6/iDKVIHZhT57w253qS3Wh4DZz65UOLhHzu4enJf4F1sVe";
    PACK += "h8V11WqUhO1JPk5OW8rQNJYpHmqlQX+m+3McYQoxYoIkx9D3vADPw27N";
    PACK += "7XE66xJd/8ot0cIyEzBnkVXMyhPgSa7mQgY6oXdS/0NCOnSDQh0h9eoH";
    PACK += "FLuH5d8Lss7yVPzmfulfzOq6gEueBUw7cCNW7w78wJsOsTVTbS/ONygI";
    PACK += "r63Odswgmq50HIVoc5WLeZbl+kuMoSslhOfIpb5LWJ3EQ0z9rg17GYSa";
    PACK += "goToEug6qLu74XDkdhmanKUG85Kvxf34ovFR5mG5JOLS1MG/aJ6rOgJQ";
    PACK += "VPSihAEsdGFyflSeojWtB3lEc6uYN4kqHCPqgBzV6FKVpzgyLBxNX2eN";
    PACK += "bq8/mxl9qSapJHYDhC8zZyW1L3iMn4kYVwNM2S8+/ujZd//7Jz/+7c++";
    PACK += "/4fPPv4Jt5P/3RXt0+//4bM/+P3n/+OjZ3/3T0W234Vy9ZJopRnn0vNP";
    PACK += "sFfCuDQn9D3S5b81oVJJmZq1cnO2oU+M9kYLDH85o9+0rKNjYPBhozW/";
    PACK += "ADvC6QqGcWG8LtBOlHBgs/o5z3zYJWIG9F7sAGviSyHOhEvZjFaHBSkt";
    PACK += "J6Bd6pkJBEebpnsoBE8zp3pDrc6mNC4RbFLd2ISpu1CHNaeqw6axAaik";
    PACK += "Rg4tKCiFtTxYyPP/NZrLBchc4g9d6QzCV7RPtEYr0rAbYdB7TMHlK1p0";
    PACK += "1C+XIicHKiVeq6OTOYInyKnqxhT6ug1v1RCVWrHzZSDQ29Za80ge1REj";
    PACK += "Kuzam+oONgEcnHVTf1RiiTYNxMtxNC0DJokLN+E1pDSoZDOnKfqqMVet";
    PACK += "QWutpy7UcvWaM8J44RjOB8haBsjEmE4BCUwWAuwe+aSI9xPLKIyZ1mit";
    PACK += "yIXkE60X0mOXelFZ7b92iE971B3iKFuEBZaChkPtTHFL6ZS68RvrsBPW";
    PACK += "10G9pdQvdl61fDNXnm9aSv4pkIUTNspF0JrTW54O+WoB8lKW5Tq3Wiuq";
    PACK += "RUXq0t0jTAP3dGlbKLGWEhUpkIal6xn+LO2EIcN0aTsIIzy3ajTPC0kz";
    PACK += "ulA0PQ8/VO5ql3I9K1bn1RlQlB64KvtnfuuwGivlKyPf+V3h27g36zlz";
    PACK += "sRoJXcW2MhmSJZMRgBVstletmXjBhEpCodX1fJnBq+Ef5+B4LpmJuUzu";
    PACK += "o2nNwH7w4FQwhBM4NBFdcxan2AQ3XsrfWphaTXKoc5tyT/GYB9ZaBOaa";
    PACK += "wy+72MvZXfGC/st64jUvcMRrT12qQDkrHFaWq/i/1jwxkeaObnQBg/SV";
    PACK += "MICa33ShYui/IIunYtslEUZfobk4DY/njZUphNjVKdYZJWt0sp89H09o";
    PACK += "fy89TFpVszxij6Jp84I+132VRfK5dGePcpCEbT2q+AptuhS7peryXyrH";
    PACK += "DwVP1l9Q3J/uEzl9gCt8atozYWvFLKgxhuaJTUSx7KtUik4FgLPTs6+X";
    PACK += "F7bnnVTLpLEwZ/ewmjMWT9rZ7uCwgjWt3PEmv0h6e4FLwdQNa5wnDeDL";
    PACK += "0w2DLz+szmoVlgaAIXRYCSVwoe31CS+5xDJ78sulBAFqldm3lzqd5HsC";
    PACK += "iw1iqx1/mX5TGVL2+pcbh+AyFeRfcACzC7aAXNS7WaORTg40F0W+TH/S";
    PACK += "9ReQLzLoZxcx5rSNncWqr2w0S2L0XW7U3IvsFSqAAoUfpjSk8ytJp9YZ";
    PACK += "Hs6rvkztONes10vk8uqGAz9ir4CLrSL00OQkXXzpMHUXNcf5yV12OsKO";
    PACK += "Dpii76HpmUg8PMBU36tit/41BED4IjnZ6ol4caZk/EJTKOtZKw/EPaO5";
    PACK += "x2TT5aLXFBYzUYWsv+KA4EUjPH6WPrUnUdzr+ScvHRT1JUKY50DilX3R";
    PACK += "0nah4dnl6svcgtors8BWFhjmf9KpF6RTYM5f4vZduVirY1pcLF5+VZje";
    PACK += "XzoV6QsEep+Y4C9aO5q02/Bc0sflNp/zsY0g1L9s+OQLyOgX6lhRPOCZ";
    PACK += "A4sLo8KDPgNHXbWKrSl+663VacG0VlYvW9Mwg2SW9OklJ3qaD0tKY6s2";
    PACK += "xCnBtF+ae29VqHVezNnkMg+MXuE1GNMdI15sMaWzuAJXZk0YS02j3dOt";
    PACK += "mS6IE1OKJYLEofKPM92+cMkkeKb2qxUYVYvhCmhjSLVLwFQhYN5xZWG/";
    PACK += "X+WbNY9V3UzXdL3ibfwF5IHCOHD9S0noLO6c7AfcoGiK3UBxVCftFVVO";
    PACK += "IzVLqmYuSsALR5hUVSxsnGjIwMBpw/Jw/4Jec/SimJSf39TFXTOVB5dp";
    PACK += "NSUXBbzgtW0voJ3RJi61sOa5Q6CU9XiRI84XY3GnhhHLjbQ4HKNVlkrz";
    PACK += "LMgEIjjhFdV+wWZf80gIcwgecp4l2s7DY5ZfATjtZE6ZktKNSX7jUaeo";
    PACK += "2+9P2nC+6p2J+8iWcK1f3DFdKUS//FG0UmoD9lcvcjLCJS2+5rFXFjD1";
    PACK += "ssLzvaj7wAtspCCOBj45rLDHuAzeufzI+uUZ56n0ufwy5Ilul4rfvDkP";
    PACK += "d0MqTbVj4mEKM1qJFRDqlH4R2FDa7lSLkP8ZZbWCoH3F7nEq9wgdHFZ5";
    PACK += "g1ZZmEzGG5oWQLYwMsQd4pLAd18qOZh7nU+Xqit6fBmUIImj1oiGL6c3";
    PACK += "FnX+yq+s/vGm5x9p3cCNIkeHxa5fSTOpn9KropXvPI8LwS+SXPLerUKe";
    PACK += "Yl25e4VL8vL8IOoWC3BzAf3Ks2/9xaf/8nef/uw/P/+Tjz758e8/++j/";
    PACK += "ePatjz756Xc++fjPP/vhb37ysx9tLkHpOSqO4gNe7bPv//GnP/vNT3/2";
    PACK += "7c//3T+I+j/7lz969u2ffvqD7336B79VVe3mkucflSTDbbiFhoh7pGs0";
    PACK += "DOBQ0j2AI3Fdg4NAcajn6J/8+GfPfvjxZx/9l6phORAx02S16aW0qZJB";
    PACK += "13yP113/MHYpwzQ41TVxTCmKKs3rpU3wfQNAShgRR2c0xhJO4N5pGHBk";
    PACK += "AUMCpZXkBglHzxKvPPuv//HZT/9eTAv3kvnLzSUByFwdzLrlEhK7wcv3";
    PACK += "qecGUVWnkjayHsmUK89+8s+X251uSHp+/9V2J2kj645MufL5t37v05//";
    PACK += "4PPv/SRB8Kl9UVdO4U5P/Yr2/D/8p+c//YPnf/KPz3/vB9rUFXjRmHjY";
    PACK += "i7ng8GqHRWkmG5ks8crz7/zHZx/91uff+8mz7/7jZ//89y850SOXstPL";
    PACK += "XJTTusYbe6dsaRa+yPWpUtSX7GdIXzE28wayDsEr3xE43X7+1//psx/+";
    PACK += "bXUXNpeIezTb7gS6q9mocLIry0EYYLHhF4dBpfPPPvr289/7WxHT7Pk/";
    PACK += "fO/Zx9/VNb67lX66Ujlum6DwU8GIYqILZsDRmyu63P7FM1wxei08cXQe";
    PACK += "E3FZay3rWs8PAkcHtksHJ4bwEDu66uRcPWXwT5Soy/ZaSRUg+eCuO3J0";
    PACK += "zrjlkj8IfZKm8yERelO5y1yZ2t5m16fdAGvdE0dvtnSteyp+qaMv69rS";
    PACK += "BYVHLhtonqPfbra01lFrzgLWPCWGy42Ntsb/NBvLTf5njtLNtcbqqib/";
    PACK += "zl/+dktrtgbzdLBlzVliuNpoLwsI6y/Uw42GtcYHaMbim0vRUX+OhQAx";
    PACK += "hv81rwQVN9vuqrYqPSg35H+W1tSa9Y36xvsvOqxzbQR5Gsjdwi6kgd/6";
    PACK += "75//2X/N6B5/1YwbUde8iOJd5rROTN0s8/wFTOu6BpPaXJ9nTUIBWPuX";
    PACK += "P+UlMs7mEpf9rnzta1VbKdzvWyYLSv9ZJZd0qa3abwfNXGYhB3JMU95L";
    PACK += "ZY1Bs6wvorUC5EXos1seizJvJPTaExmLYtiEiJRyQvyLuhwC7B2cFgW3";
    PACK += "6YyK1JdXjdlkzuTmhmmrK7+qQVGjhP+VDM6B0qc6wceFRX7l+Z/+47O/";
    PACK += "/avp5GNKYzLIbVlj2PNZsbVP/u8fPP/jn7yK1jxclDOvPPvobz7/93/3";
    PACK += "KhoDxWc96oYUF9v87Aff+/QHfyaY82f/8mfPPvqtV9Y+PpoQrXPNzy74";
    PACK += "vgwQJ11YD6RbMRKqvufVgYJP4NKqifn/4cfPvv3TC3bGcnVQ1aLkR4wC";
    PACK += "gux6P4UGVGmXKpKVFopXeqaNTK99c0nStyJlryJ7KrFLVCczUboks9gg";
    PACK += "v7rUTsD5RZA62dIXQedkU18AkZMtfTkUTm38yyFvOQi+RNqW4NaXStgS";
    PACK += "ReoroGpTqn4pkpaoT2ciaUnmrzhJ+wJImRiJL4SUyaa+AFKWdOpLXUOJ";
    PACK += "9v4VrKEpVb/UGlJ07TMtIyX/V2wlTaBECuqXjBXKycUrQIzptb8UbhQP";
    PACK += "K2ZCkInjlK86muR7+SXjSvEU6BUgzAxNvBTW8GOgmVCF55wFPTI/J3gC";
    PACK += "ZaJ4Fc0W0i6egZyDUKGOLH0KZpXUVVJN5ezNgSx5s9B5YFItNy/Sbb7Q";
    PACK += "+pp3nYW0/xiG5sUXWOWZ94R1ZmE2eNKVZz//o2ff+b3Pfvs3Pv2Nn3zy";
    PACK += "49/59KffF0eT047EZ5iuude4HIip6DFDm9MWu5a7ujsFYJaWZ6c4CpWY";
    PACK += "KXcuSXmVj1+bsGxK48fLs4sP62qSICn+EXb0URj4LFtvEzXlA5DK4QiU";
    PACK += "hCIRKiksreMT0iZSJRTD0HODnDWOSuqgJakIr1TI5+JXlmrmW4Wsiqpd";
    PACK += "aUDICqn1yObSoFVSWX7FqhEDswrl65ynRJVGY1/a2dArPBea90xonvOg";
    PACK += "irOgcgJZttwmkQvCMl5wcqFECpvF/C8Xc1Ax9phqZFS2r2f0etoePuM+";
    PACK += "PssWfvE2fuEOnlYjIkMUYeJWKhDTW6T5pBvEHoZtqjfLpipCOshKu4PD";
    PACK += "DLBcTXJ9dge4e3gQnlx4JAn/nv3ut579wf/5/C//r09/+v0LNj3etUvZ";
    PACK += "oRQHm6wraYKkIc9/50/hEsF//HfP/+Sfn/3g589++vcXTaFKVyyFriwX";
    PACK += "6EoTLlxN6Eqeksx7Elw0d2kLa5c2N3ZpzjQDavG1lysuW197udbXXq71";
    PACK += "ZvPlmp+5/EW2JvPh40yM9csy1y/PYM/JZIso95fEZs/Aas9WCSc8P/pv";
    PACK += "n//b78j6UoKfVNblUuoVaxZ2fPrQcP+ejMp0A+zSCaXqj7/16X+edyBm";
    PACK += "hGyGTWNegUFM6mz70Xyiyuyiw4wwXIpsUcaYJNFBZ5Dw1ZC305gJsXXz";
    PACK += "TZoz0acjnNhef/pPP3v2V79z8RYoPbBSPpxXMX30Q3E9yZEbxFixyd/n";
    PACK += "mpn9Eaa9MvNfcQb22fd/89lH/35zSdTxgg0ph11JQxOuGpfSUJ+6UUTD";
    PACK += "kEVpQ3/902f/9BsppzjZLti8/8ZPXqhdcc6UH0buFnCpwyhbyY2haOUy";
    PACK += "x1C2khtA0cplDSCI74C6L6WfysWWzge+vXDdXXn2rR998vM/Esvt4oWm";
    PACK += "tJqGy1TEVXH+I1IvS78xi1QlolrrF0rZpVs2h9wl3ZLzse/+6fP/McXk";
    PACK += "f5bjRC7NHRZr/vR7P3j2g7+YSZCcUNL8yv/yv/6zYZjOlbMjl2p3es7d";
    PACK += "gw9wlzW6FLsMdyDxaZwkerjnE3yPhiNM2Sn/eCst0cfs7jFJPia37oSU";
    PACK += "Z3tcke0OXDPEc1xXc9yjIQuhk3d76LX0wyhJbQzcSKmEl7/JHAMjZjpX";
    PACK += "oDcGOz/HhsGcM8E1RfbZeGw25AtiJmLJi8mLP+zx4oggCoPh9wxWq0Fb";
    PACK += "YU9jjqOHHAT9/FxJ68VEnNOYvZAaAWZaoIU97XHPYKa58Fqv0XWDwMAo";
    PACK += "MGu1YMFxSK32NIZ3dNbHzAY42W6whzAPTAkbtr1gUOdWz2AoMM3zc9rI";
    PACK += "Po3NDsUspkTDYw7xKZUQQ3eJgxccEgfB1p2ecb1nYNO0z8boYQ8GYgHD";
    PACK += "/xv7+zi6HXpxgLeexgZBeoJa6IyTKBvnILHGpk0QNsX4PIqdm8x46lw5";
    PACK += "0+MIg7LF7zKdf7pPnAenw4MwaMAw6BS7XdbAAR6Ccs1Ed3sln2Hk3UA3";
    PACK += "0ZtlX3vU7cvSV8u+i9b3h6GHdRN9UNoADXt+gKluomsV3498j39/VPad";
    PACK += "KwdPAII3SiEUN3vtU9zTTfRuKZBxNMIkAgjfKfs+xMNQN9HbZd8C9+mp";
    PACK += "bqI7cfLNZ5i6sJgSnNPeg0k+S1DCcfjsp+iJF1KU3YIPtoGdO3Gthnfv";
    PACK += "xHvn53hX/7VfS+rU91BSSkXqLWxDSXPMV2fsnPnRbWAnsWcneYwEgIXm";
    PACK += "GGHyYYxjvBPSLn408lyG1Xzp9/t4FLhd/IBVZXiA2eTHMXotpUJuFPl9";
    PACK += "gh7Gztk4G493mFwNZ2zgRzC/o8jBiL/IyXSYeKW4FzkPY/ESc1CpQ87P";
    PACK += "r8fjd1Qq40f3YTa2w+EoJJgwaC+XIZKgOimoQIE48ZiYhpSaQFo6yLWa";
    PACK += "XLcmG0DcqRsQeNrQk4qNRqNhQrzaQ7iMjWiiLiAyEXzWeGTbgwBHcOGa";
    PACK += "6IkWUs3V0mE5HvjdgSZmaXoVDd3sqCPSKMyHAR8RjHEKnm4WBqSXTb4y";
    PACK += "JnJKCvUqiJJUrSvloe60F3djQIK7cdaUo7arrIrgMrAAMP7DwHkvUNoj";
    PACK += "+Fi7G3c+DKAeEcUxpM57Qee12PgwQCo4JuTyo3sxxQUEWrDEphk7Vyl1";
    PACK += "Txt+xH/Rm/FFexx6EjhnUs3F1+UYXY2ds0N8ai9YiOIe/OzvgwpRPoUx";
    PACK += "7XIyno3OB3EyOgAFRYFzNkYhxz/k858O4K7ESKBHVPOJxmCsFhznKPQ9";
    PACK += "zarVDN/hSbCJHuJT9Uvo6PoiTzURM9+MxRbIEDVrtYWrcaFTBiQbwS7d";
    PACK += "c9gu3RM7Tey4tB8D+Y8aASZ9Nqi3AKzYcZymGTSSeFkO6eAgwprfM5qb";
    PACK += "sXkG4EL5SIytEZvIdayOuxl33MVFM9p197Kad93F1l5HqSwa+z0D12q4";
    PACK += "IXdFgDHKxiB28l9QbHK4lb7z95j3Q6y3s9deE2vevk84ibUxggkL+Xz5";
    PACK += "iGOnHaD98Jhgaj8JGnKCx+N0yj7sCZpSWWMDfni1jFeLYWZk1VgsgKQB";
    PACK += "3BAPSvXvB8ououwCKdHCC2JngZFJGncc5z7J6njCdyIYeuac6Y5u646l";
    PACK += "I92Gh5Y+loOhv6YvAmyc+htLu469t9RHKZEgGRS7ZG8sdp3HsbP0jaXF";
    PACK += "pX6Gwm8H6nhcCDJHT84XPekZOkAAqGmzBgsfMOqTvtFeNbOuHNOECUSB";
    PACK += "6FLoJE10jNBxHB2iRgAX7Onn5zzhIAwD7BIdUBmLlcPx2HcWmoC3yd5s";
    PACK += "+rD8OcpGxz7rDozQPOu6EdYjDolu8xcZ4dzmufmN5R2eLrtny7LZbIhK";
    PACK += "tPuEl9fu9njRMeCzb8ph8h2MAicwfBNhhwLU+pbe0BffDgwfWaZN0a3Y";
    PACK += "CMwtgzi6juSWVKsBW5lO2eMY6a/VlnRzUV/STXRMjYAPla5ns+imE+OO";
    PACK += "TdMO0oreD4yAr3Xnw54RILJoLAQwFefnfq3mw5PjODxlS9dtmCn+Yla0";
    PACK += "vohNID6jOBoYgWkiPtC+YyGq9M6mi7qtQ8+waSbUIXasTryJJWXpxIuL";
    PACK += "5lno4N14ryOIB4VBCVFsdvxF55gaIe9khAJznJCbyOHMV8I1RROiAHYi";
    PACK += "yfubCBpcMEIHNwg+YYZpNjwIvGKGTtjgbDfK2lxcNFGx1ZTIcWSTWCC5";
    PACK += "BeZIJMYmkpyD2EYizaVYIyED5YPvaW6kuRrfizQRzdLoiTAv+qLBoN5d";
    PACK += "yRaI4nv6lmxJO/bZQDvEp5F2pi/KPQpeDWw24JjV0JEGkzLWbWYu6mZD";
    PACK += "u9nTTsNYG2KXMGBLKIY4K5oLkWMCaW0U9rSE8iIIvweMiQtUGy5HZdj1";
    PACK += "gBlJcDdbng9osn+JdcWXVcIC8/mjzu4eChwrKcwXNAUcVdE0zOiHmCeC";
    PACK += "QhQsLppjE1GFOHLCBk019oFZiiPHcerNhNbhxj7FURywDnOYAfjIBpgY";
    PACK += "KknLlbTOzwsVAcVIU5oordAh5hi9aD2tfD0mymfO5bWUvMwcF7raTMc2";
    PACK += "yZRsgR2Bf2k6p9YxLnIo29Q5U6JtisS3es6ZYItE3ut+NHJZd4CpHWOk";
    PACK += "frkGydtcDWRv09ynu3LHVJiba8Aj5rhot8s4A635EV8LUTwCuRNDeH1t";
    PACK += "RENpZqkdxH7gRYCUvImGbo6fNrYTzuBs6I7sBxT1QnrD7Q5sldcHVORI";
    PACK += "qcgqrOGORsGp4GlThsMcI5hUfiRiq6yxwKUUYSdqW1wcm4iNEQs5W5Mr";
    PACK += "W1pG2RzH5vn57t4YhSTIF/R7xgLf+vNih+h+0vMGFNPwyYif5oil3MUQ";
    PACK += "XdfVIp9AcFVBUqSsL5a0snLxeNx52si433dY52ljR8r2zpu9ztPGPSmm";
    PACK += "Ox/wt5jiLPt7Qedp4wEX9W+HHnauQpYHUqp23oW3/f0HN7bv33i4f/PO";
    PACK += "wxv371y99WD/+t39O3cf7j96cGP/7v39J3cf7b9789at/Ws39ndu3r9x";
    PACK += "3XkLyrld5lyLO08b3SAk+IaA3ynOrEJkSoZJLSrltIcDrCUzrg3jiGkH";
    PACK += "OCW8cpSQdhAzTiFHbhRhT9MX8aIOoybo12uxAbKw4NxMFDicZUGhIxg7";
    PACK += "30m4OJVV5yJnkUsPBZeOfCfjLEtY9kBh2QU3CYwTF0FyrLDYPUu+dGDL";
    PACK += "i7igoHD8UTnHD8kG3Y2A449U9jlOYdqKd6M9Gz4LLjCqEAgkiSoXCCLz";
    PACK += "TApZRmR2kt1fCAQRFwjiEoFAqSwez8ByB5zlDiW7TRNG2+eIL1So21Lq";
    PACK += "LFm32Mkqf9RD+3KOHktlXO69BQlsQLHrbXMaYqF7UoXF6SraDkkEyjvx";
    PACK += "ti8nSNQlkvpBeOAGoHGVlBg3kioUQK4BIAJmG0OepGIHZ51KVswHcZq0";
    PACK += "44JAfOpM0rYP4saBTzyDQ4FT6sD4MIJwntV7H/ecCeVSflOBzFL7lsuN";
    PACK += "J2WkN3pIMB+2oER+9Bi4oQT494G+gKZtaiVv99D+yD0NQtezz+TeaNeb";
    PACK += "SO58MEb7PvGZ/X6PNwJqvYI+qFjlO71EGuyGQ4ixZ7N0IQhtHeNV8Zur";
    PACK += "H6b7Z8nQbtNGtr92cm+grGL09Awb5rjnEzcITs/yGUQjMYn4WfF+ShPj";
    PACK += "CG+7QQDRAEs7osU4ISdqXp5lLMtXI32hsMho4KTkdXwQ9znWqoiQfuxh";
    PACK += "SrFX+F5VeS571sSNXg932SxdEznVjt30JvGzUOimZ6S5hyNQsfpH+E2X";
    PACK += "eAGe2GHKKyiUkpmTOkkEN7OGZPZuFIqo/bnlnoYxm70qNb9az+0qrC+U";
    PACK += "h3xqufvg64LpbAMjM+fHo5wITJTsZfNfVNlWlBFKz6zUKeneOGGYEjd4";
    PACK += "wEI642ROFMtDX7a6K2rKsgr8OsI0gnJ6c73RbjT1seAg9ikc1Bjvj9Ab";
    PACK += "sVk8rnkjTk69nEexYcoiOIIi14uZU86aiSnjNAc0AlJ2xkL+ZmYH27DB";
    PACK += "dqxN0pGqRYfUm1euXGkC/7JL92C7tjbvc5WBaWKu8EN4l+w5ASIOFfs2";
    PACK += "V3YA05g2fAuru6VsFyQgQSXxrrWXZb5BU2kty5hIMFy3KcW2XWsPQTdG";
    PACK += "4cgwATKy4DjMPIMPwEPYCbdAHYvzX6I6FDoBdKlDN0PZTd9pfd2gi02z";
    PACK += "3kSxg3f9PRQ5/mITuQ7ejUSvr9ynRoyIaUabQa3GX10Um1sGHwUXQUaH";
    PACK += "IOpEpi3SYgQ18TQ/E//V4kSOoVq6MIapCJCOz32an8UopOwm8fBJnWXP";
    PACK += "yeYMQ2JtERs3IO53w/fGUtkBRhghHcIJtzN5tqF8bZDwOHecZLwbO8p3";
    PACK += "dD3beiDrJPq/G0MdgKW28VbgXHcZRu/EzluBSL64giRn/Z1YYvq7MXor";
    PACK += "QO/E6BoGRUHM4O9Bz2miE6G6Qww7bXRCnYUmesrg7w0Cfz+MEz1ghNlD";
    PACK += "f4jDOHcCvJUlC27rSVqAG6uVFVE/iEJvq63cHA6x57sMzosypeOW+oWX";
    PACK += "6sgixD3y+3Cel8tfq6Xpjag7wF4c+KSv8P9lnxt+dBOsle9h4s2dWzJ7";
    PACK += "JRnNjKSQEBZrstCYcwsbEK6aSdVtR0o03YQPkWLYDcqzJWuCSRbJH+JN";
    PACK += "B8uvSEFnh5/y+yLiL2RDLDSuwTJQlksnaV6hPDSUxERMPwcXLTxlpt8z";
    PACK += "bmHjGjYlpCZgiYXC0AhCUelZaY9qNT80aIgUkOtYbTGQRDbBulpNtv0k";
    PACK += "Nk6IiU4IaHo4aopDJOIwzDk8GEUSGswEJBbAdU4yJbixYJzgwjBcYeb5";
    PACK += "Oa7VFg5iwzRTon2C0xHvZIeYNKffPFMypUvmBORVP6Q+O72Fj7AgtYFD";
    PACK += "J1vedGBQnPzaNVJdapBbIWpTgX0CmnTRv1rtBoVfxPstFLMipZOOAWiz";
    PACK += "0mEwhS5fKuAl8ZZT5BemyFemiJkodBaaCTkNU1ZaoRdE0IsxF1bvcdJx";
    PACK += "SMVXPmno/dhZQW/FTr2ZLQAY+OTw3CiORv2tePP9WDmXOAgMjo2HNOkP";
    PACK += "7wKeGMfOW7GD5Ua3YHH0YM4hNRYshDM5gG0dEsO0jRyw5liMI0/kfTkk";
    PACK += "CW15O87Ny2GOW3k7Ng4Cc2zLvLdxFLl9vD1wCcFBnngZOOQHqfk86L3Y";
    PACK += "wSG3CWkh+dBshGQocjkHAcq3+F7cGIURk7UYAnrTzmf6EMBClimsZXCI";
    PACK += "3ouz4Q/5+j6kDkb36Pk5HwkLwagoo+7LJXlCnA9jQ6kaT8yYOQaeVkm9";
    PACK += "6QX4nlwSzkpH/ZJQ7/RzU/18KzxOPyyrH+7Axhmk39rqN6FG80lfUE/l";
    PACK += "y6MI02tB2D30ST8t21JzCGu1EonPPCus9HGuWEiYT2J84wR34yID+5Sd";
    PACK += "n5/AuKrU0cyV50f9O9Qd4vtFdty6gs/Pm62VTbwFZ+1hgBtYaN7yhRK7";
    PACK += "CG0UAmN8hDW4U1xeoK5Zmks8rdlaQWAO3IW7X3pQUqMuw5E28PsDTDU2";
    PACK += "cAlk0nqjaEJPrJv2+7FjbeKt2y4bNHpBGFKjidtL2LRXcr3p40QzfU+l";
    PACK += "gyVMCcPFgjs+jVgy/ndA0zlZSpI0tSQpCtjyZJBheSLYFAeCLfHTtgVV";
    PACK += "aMtDRakgspnD8DjbT7DDONVImG5FewCkbpwDYeSCkFyGALlsFH8Y44jd";
    PACK += "c31VyVrMFJN3fTZIcTQvTCannhVd4z/L4mfFzncQO+1c/7DaPza1f5J1";
    PACK += "KVeHpGYUk0Q4mQnJmKmMMpEEHI5aScPDgXuKiKPklOe/tZq1SbboIrGp";
    PACK += "aROHoqzrYm+tN5XTYa1lB05rRT0w1lbswGlaa+215eZ6q61+WYYveLmA";
    PACK += "CIGzgtvJRhc4ZDFA2DnzPfugt7iIEkJgM5Tb6W2M0t0SzAVzm70doJQV";
    PACK += "s+vNMSJX6JahiB4OAYYsZgibSKC4k57di80+ZibnhLaMHB9kA29kIbFh";
    PACK += "kzo1TZCelIoDyelhE5UTIxPlF2I0COPAewLGzs5BrH6Bu0VKyaNYUAwn";
    PACK += "QpOC2tULquJ0KI+EYymvEC6ZGwcjxKIJYZ5FqTCPo1SYj3tQ5D4us9TE";
    PACK += "nrNPDRNtY4dEhsKOH+e5cX3A2Ciyl5a4NeIHEVyuseSF3WiJ02F+i4aH";
    PACK += "aWPAhsGWT+T96o6+iBFxmh2yWVTYd8jioskWHb3m0n60uwdZCdTx6P7N";
    PACK += "9MDHyJTxJLWh0W/7xO/52EtOUQAA7Vf5oUmH3wnINH2RLXLHTI0NsNaL";
    PACK += "g0CTrAMYw8EgQDqBSMVJZR4+0jA58ilwGYTxwrwgrz/iWwfcRgKj4wba";
    PACK += "AAejXhxoxy4lPulHDZ2TFNfl3MwDzNB7JGeN+IbQjp2NBP1C8Luob7sj";
    PACK += "FlOsA6+QZpVZ+PC/R3YxV404VgdvslTTsrhoum7D9TyD7WJ5LHKAnYWE";
    PACK += "xBz7xOPitmqdkvvW8MIuH9yZMhXU/GoRE90MLzRWY56z9G927av19/fd";
    PACK += "+tNvxJa1bdXh5/oq/7vOX3b4yw5/ae3sfCO22ms8W3vtOv+7U/9G3NyB";
    PACK += "Ly3L2q7zn+vwl2drNdfhy7bFX3Zu7HwjbltWs/6N+PoalNnZ4F92rm/D";
    PACK += "y/Ud/rKzc33vqwrYN+oNq74BTV9bg2Ys0eYqb6a9w5tZtva+/toSohGY";
    PACK += "7gVRDumIp6jLbobiJC6IEDa3Fiw7SaAioWnD3UM4At37VhAB3i1YtkHl";
    PACK += "E1poKjhKvdQ4/kwqzASVJuIQJ9O0LTQLux+TRk6p9CDMnCJu16zbspQl";
    PACK += "jJwSWyqZrFGAM90yF0gD7t4bseiayBeBWTNusPBWeIzpththw2xEgd/F";
    PACK += "hoVWTDBkku5w0ixM567Buplueqn5siKI5/vKiqbVxRWkjI2Z9sbvGTQb";
    PACK += "EWXITDk6YuDknt5O4GDJBp2wJ44DVmRyP08MYqI77h1Qu/Lk1WLy+Xnz";
    PACK += "ChunHUv71cWZbRsKkS9NZAsj6kCTrfNz+GmLn2VhIusyRv2DmGE4QXRo";
    PACK += "SSK/8hZ2XvgCx9+PotRZBHb6xCI3cfxIDHM5Ckmr3MglPvOf4kf3bzlh";
    PACK += "Yqg7DI/wDbgSVpg7OT4ngBgD9uvp/aniEvYwjoLTB5jdJATTNx/evqWp";
    PACK += "R6HJyza413NDkCQXMP0UR9G2iApyw/P57v+uoPjp5zdPPcHfpB/YaYD1";
    PACK += "Bo9yYOiabjakoYiRk6QwLCvYLPg0wPJCGHEdwUKTrzWzs7uri8nYHrg0";
    PACK += "wkxH8r3elQl7aFfn7kEwejoSzzwVduKdkOrchFqmsNGND2P/SEf8uY75";
    PACK += "y95eKXyZaryD8S5LQWWoyUHdbe4VodW7+ZHSkc4v2ZTP0QgHAR9mHenc";
    PACK += "0E3fm2VoWry9/JqeaBoumryP4QQEmsLyfOU+FkbP0X3oK8UeH45uHEmQ";
    PACK += "YAIxPcJXg9HAnQeaQvu6GwTh8U4cBA+6FERNNzolXX775Q40x5/uBe6p";
    PACK += "llyokqAd/GIKtwkCSF7ycM/vAl9wk8iHJP0+HoYMQ03AewKTMrwT8jNs";
    PACK += "kH5FhAMtCMORRkLh2aOR7Du/pRhuLYxu8ksLNTAeuAs2PVSOj0bFGHpa";
    PACK += "1A1H8IPdYYCjSIOLZh5A2ryY3Z5l+rpi9elIH8YB80d8dvgdl4A40n18";
    PACK += "tglqI1BtTbaQcFq6Fx4TOLyfrbrl0oWpd8Mg0pFOw2P4gRAXHMNdMlut";
    PACK += "q+W10vD4AdSBdC5CzVbXysUDzI8BfWdp9xt1e8/YdetP90zVhvq+rx6r";
    PACK += "7Tb3Gix8NBoltY11ecOtiL0hbrYEPrB+4EaYY5JL3QO/y/23tSSxHg38";
    PACK += "HtO67igp2A38UZ1HyOFPFPCTXx9Y55f/jcLAFTvTZJp0lI/kN+nNJd+E";
    PACK += "UQcQXy8c+sRVIcOEO75nVxnyCCH1cOR2fXYqXjggoMyBEAUBcP78Oc0D";
    PACK += "91P23KEfnGZ3VWZPddeD+5VlAqOYdQfJy2kgM0qRSL15XusHp6MBv6NQ";
    PACK += "PobUx4SJ/g5C6j8NCXODko9HcHzfBTkEctVd76h+Ip9D6vd9Uj/R/KHb";
    PACK += "x8rQBJhBpAHYk/krgAD3iYseD116iGkdEy95HPrpI8dGjYfSgnkV2jVQ";
    PACK += "miYpbOB3DwnQiRHodOr8Rklt5BK4iqSZXO5Yx0cgzGkpTHyKCdOigTtS";
    PACK += "QY1YOJJw8cdkIkB0PcRgehf3BxkY+eQMFhkAynOjgbAlVhLCXi/CrBA6";
    PACK += "qhgyKnkfgmdc4A/9tIACURqjSl5LSboDEDzzl0uK96yH6VWTWS+ypKwH";
    PACK += "MfFBKK4f+J6fvlBga+CNRfURjOpQO6q7sIUdYOZ3taP6wCX8auujuu/h";
    PACK += "sE/d0YCnD124IMsVqHOEwT6rjrnphgYYxfHoVDymaKS+nWrHIfVSFDqm";
    PACK += "PscgcLvUToYBiewTft3wiVzwF+4Vid10YtS/76P7cMRdxnEU91zelO12";
    PACK += "WQx7m3yjXYjdJt+Ux2gQHstHHogoeT6dYUObC0jOWtlLS8fHx43jNteT";
    PACK += "NDc2NpZ4e7pK7E+GgQ1USkf8MXBJXz5ytlnfeyXAvHf7FgC0vkQS/jwH";
    PACK += "FHMPuLoMeEkaRtFdPvGzbUTNizcijBt8IN6kuJcU1NMUXVQhZ3bAUy4a";
    PACK += "Ty6Xdnb1iHYhsygjAu8I3nd4Vby8bBcstGBBF9JN89DPxEKhgcVFtYfB";
    PACK += "zC0+M+Jc3ggSwTXgIg6YVNj0/HzBaKWqHfP8nO1aeyCahmBGIZ/vgmZm";
    PACK += "t8mfCU8Xz3e4l1HgGQBIwL3qQI8MciWi5+eBlFW3iGcw8U0mYClFXU3k";
    PACK += "NYOZNndgVVKQri8ScNspCm9beDfISW57TlpzkGgA2iCr67pNbIM5QV4y";
    PACK += "RLSYwnERTYfPCBxROyJOIORR+Fmu1aDcggWuQgAyolv5rtx5YFCuoJ/s";
    PACK += "IjFNU+jPKHOw9wIW5GiHTvV3/5BN83d/wqb7u9/wL/R3fxpO93fvutP9";
    PACK += "3XvuVH/3E/9Cf/c74XR/91vTvu/zq3hNdM+vdop3WaVTfKekZi6olH3x";
    PACK += "wJp0n1G3i+XocebYKxsBYBG4OFdaU4D7bvd0X8hcpTm6bndQDgW075P+";
    PACK += "vmCvJAxhVO3bf4/M69sfRuDbH0Yv4tv/RsGxPg4zSK4n7iJxmJoom9yq";
    PACK += "QHGIMMddl+u0kv2KgAVF97DBqD80zMaQf136BjG0rxsu08wtc8nsxKHD";
    PACK += "BGU7P9d1qbD69a/9+mIcLooTyQhMLzJY3DB1r4eIFlEoFWy63onCzCqG";
    PACK += "w9QYUQyW1Q8Ajocw/52KdNkpfkYD6j6T6/xUD5xcT1FpKBRD0YWDniEc";
    PACK += "RTo6izCzKysapzYv93EPJF71lFAmZa7m5hnAN5FsMLS7lwy/m5xHuuPJ";
    PACK += "jBjt7iFpKsPrkp5vSmEoiKX7huLMrhQpmfOkHPQoTfF7hlur0dQs0BX4";
    PACK += "4DiJq2t22BQ48qNky379a78OJjd0MtF3gsT9A6wtw/Sl09x0fDgvdeJa";
    PACK += "Ldj1YacMwaHTjOt17vqh5Oj49TqK63WYZiUvhxkMgZrn5+CJ0jS9ECzM";
    PACK += "ZG5kXYnPz3P5hWcK4CskpwyarrlMAwZDR/xR8YZqeH4E6hjY/mq1qCHD";
    PACK += "fkaGvumSkJwOwzi6wjf4yImyCtWPKFeJaaJofDzwA2xkHTTFse54nB4p";
    PACK += "8mWEqtCfyJUHmvStXPXgZghso63r5hYnBLauZ/rk0FOMDnCDuX2pzU4V";
    PACK += "1VBGqLmFqrq5qnzRbwlyLr601S8P0p1Eft0o+3qLbyMih5WzB2imEGAH";
    PACK += "iIbgIRaaJsKywmZJhoYQ13L5Suux4Hv+AEHXlQOEx4ntYMFDNY2vUEKQ";
    PACK += "zTIkSSbg/LykaLKSUvfXgonEkxS2xONOF536MP1wTzAlIvlpmCYnrIT4";
    PACK += "cMNPPmS+ePLTnbRMOmXiw62JD3y2xvkuJM7MVS7tPddOcDM/LPp2wq0s";
    PACK += "6ql/kmy6qxRKHJmmlE48oGTpE9/ORC5Ah3T1OjkYED4/N7BTqJnJ6QIf";
    PACK += "eoefN+lb+k7qrGTwU2tTt5U0PUW2e3526lPor7A0TKQJZj9OkNE8P9fB";
    PACK += "pUJC74I5D24k/koARIM7J6kWCFAYAlRlm3ZqLc6NvDLzN0+VQHmclZLV";
    PACK += "3koOq/RtzgAJSJIVa7DZZ65pZYXmn7nmegLHdTzghzTYK2C+uuxZstyx";
    PACK += "U7HmdB0VmjdmnVLR3FrFAkypU+G0L78eE4qo34ew0/mzPv0hDEKRqD4O";
    PACK += "00PBdfUA8Ya/pS5dW1dWcKuVVHk3ZX9lva0KetBqpmub890FCl4kBSnx";
    PACK += "zpMCWddK2iPBI98WLHJHtfKSxL25lifyyymxz6gKK6OpFYu0QFPZJE1l";
    PACK += "5eviPlOt7SQ5k6fc6QF2LpbHZJSP7AA5Rcl8mI80dcpG03cnFmi2lzdI";
    PACK += "6HFJ2+TuvKqKAwI+8Gjkeq0mwj+k0cbFia9OXc8PdcUAIFZoAW92Kz3E";
    PACK += "seXpHiIXRQI0sBo7SeGYmYkoeCGD7qTD2ftJzUrKTJKCf0OSDM06udBa";
    PACK += "6Zco/yVR4PAiEP8IMiSEvpy/B9XPmYhIGSfx8VA/z98npnOShR744PSf";
    PACK += "kwF8YJZ1fdFHYZYJ+VwYmNKuEpWP5CIC8jiCwsV3Eg7KGy98TSEYI1C1";
    PACK += "w6oDy2C1OG7s8wnl37A0ZPdwgBnWYILAOi3Fi9tU2AnnigClLFTC8Uc1";
    PACK += "enKTMAQ4M5NIw2qoRTk+sMyyQlrWNZKeGwJ30n0a3MsliuKGxNEtEQXe";
    PACK += "1ntuEGHdxiLyCg+Gw41EyBb4kiQ1gquHZdqq8QQNUp4ONgKJWYm5VN7I";
    PACK += "PUm1pbisSuCKHZXKFeYNBPm11tL2CvYjuOZB7tZMcYfjyRmI13Neeizp";
    PACK += "ezIwb0BYAYbO8gYQEkaUcxeXaUfqi6wNjHGEhhGiSYFl5AhT7inZAD7D";
    PACK += "dwNZ8Vi1o4/ykKmNSZ5G1+18OqJZF2ST6XuWVTbWIc59ZjAxq2luAT/h";
    PACK += "AVBUSJ2zPKg2RTJBessjeWwf8KakejNHI9NEQSi3CqDaOVCUORq6YiRY";
    PACK += "1jnEkiBJXMOcnY2zvAnWa3J6ZRVyHWTdNvmI8U1AmBsJ0cPJTIq3uDrY";
    PACK += "gu1AhCQGZgbwK4FVxJGR4YpBFWyn3/h78XPqh8VbieKDoQ8RUvkbmFow";
    PACK += "HUhDUbErt4tELh6zIq1PMmw95F2WGmAI2lXMqCIMCM5qAT4yagYeMUqO";
    PACK += "bmK+VkSkNF4VLnxwFhaKedXdMVJChlT2B/Bmeg8SBU42jwsGePwkY1ur";
    PACK += "8TcxtlBdMjuJe16Wwmdf0pgO45tr+XoVq42IjV9OLyfgYqIZLJ/cgmVj";
    PACK += "8B4FHgoRjhh8uODd0XUldzZy0ynFRC1EGVkxozCyEOskReXzcyDIDR5t";
    PACK += "47okt+CRh+WhhzxTyMF9wRDY+ewqyherIfIE4TWSD+OYqSojkrMhBHZM";
    PACK += "BO+OxOoHq81UAWZ1gk2SmPpCFCq2C8HyyG6wB5aYPCdxrA7JwpaBOXXg";
    PACK += "TKITxNjbJXvp9gbPiT3NguNwzFbTnMBEAdfUiXTZ0wfJZzgD4+o/AYOu";
    PACK += "L95nBjERE1yBgB2rsPPu7gZ7KYkh4FgdKE1CuEreXlDaXkoWFhK1t8gp";
    PACK += "TaZg83UgxRxnrpV881ZAzvDnbqYzZo0KA8GSAKzHxkbTNItbZ25DLNsx";
    PACK += "E1NE+wJcUzfHqLA58kY4CXey2D5iP5cB01hhC0VEjQJU3puWyT3dX4No";
    PACK += "YjxfM0W5Yta2aXaIQ8C3njlkzLJB5usb4oZUbahiMDiKKHMwcNUe5nes";
    PACK += "SSrdIUr0QX66B/RBkiNlBwIsLOEklAieyTouWcTENBGdJPbpCqfKBLlR";
    PACK += "TsrCJ0yaiHYExaye5lqNSdKmoGpGWLMmjlxVlZpEhTzqJ2Jgyal4y7Is";
    PACK += "uDpHiMo6mHpMyc1NAMCHjf+5fUsvipVVx+5gV6qKnG+GueAeOF2jsOdP";
    PACK += "rWTryOVnzuUZ0+7UalwA7YUU+31yVx5zTa/aFsdFNyk6dcvieiSOqQ+u";
    PACK += "jkYF4ZGnNfAJ7j4ikdvDt8KuG+zIKraymGpJSNCp+Y1JIQynRcfm2MZj";
    PACK += "YyJStNj0+HH4o/s3F6aPzvm5nlos6z7RsAkYJxMc1klp9U3q3KTn5+X+";
    PACK += "HIbu+UfgyEGVwjrcvHUFIoFx/LzbM8wsSKq5qIuLmnTEnJu00eMui0CQ";
    PACK += "Olh9MRN2j78a6jcRhKvDCtlh6RBPZFe/gUyc7acfKpG1swgWSk1AI4VZ";
    PACK += "AG4ErkwF9wTQgjyUBgrmmXiXfEyy04xzq9oRwQzfJM6ZS/whN+e6yU9T";
    PACK += "/ZCI0FsLFnIjiIp3HxLh9YBbwN0EE7y7MQOZP5/4AHwSCmnvghGZSDvZ";
    PACK += "CfCJ8vgGDeORfL9LPTjHSZO6YRAPM0DEawSPPVlJT9RwnDzfk96xyfuD";
    PACK += "AQWDG/l2B/dd9etdAJBrN6jvXaXYTZ7vixrl4w3iKW9gxqq+ggFh8r7N";
    PACK += "Icy/KaVFglqBTEnqABPKd7l9GbyBxdx24A5Hycub6SdppMcfk06EdDRw";
    PACK += "xfAw9+CB/5T389j3wmOe+FT4JsJTGA55c34Q3M1q4qahyjtoTXKvYBB4";
    PACK += "PTE5zCcJo8Ms7XZqV5ilTdSVoMUYRZ6zq7+LDw59cAUYguXx7fCpjvS7";
    PACK += "+l5HDcX6Jim3ZIu8yWQhfC6CasSlV5lhmXnj30XciOIDoas0miZ6k4Cl";
    PACK += "2ZvglzbO2UM9cAtxj1iJn0yiDpVqRR3kfJLlWFAYeiYim75Jikwt8PS8";
    PACK += "/S0IC8xMaVVgs0V9dKKcRx5LNgOYbW6Jm7LYRMQmLJPNSCpzkYYPqHC3";
    PACK += "Z+j1ug46Ugj+88A1CIKI1IgCVwQ7UxC6XHFKHL0bRTv81UxMkLKKUWDa";
    PACK += "IsKRCAzhes4bxtkQkxhs6/kEn7lyeYFdIP+lcknDDx4eYL5KBjzVH/b5";
    PACK += "D+ht4eEQn/YxkauAr2a4uw1+Ry51OSqnIeARWKDwPMe8CXUer4YqaYWT";
    PACK += "e28X73GeOuE4F5KJvYCDLnCSzfYavz5kBt5bRnvJtVeobdWSVUncqa4x";
    PACK += "u6tlwdD39zmLwKPYV5Qowr3aNHnwECbQKGET04ZlaiEWc1q6ZarM7weh";
    PACK += "stNnGMYRrJ4G2E3r9qPsGKJwogsXSIXSIPwEuB6emLOPl2nSgL078V4H";
    PACK += "s8liWkz9iTQepIlNJAOnIhOHfgQxYOvcWD1142sWHessgfzXxCUDGdbt";
    PACK += "5FwQgK92aR9zbWdEu6nuU7ilIjg3oBRHo5BHGHoUJZwMD7le+RWUEer+";
    PACK += "v4UbYPxAGARZkEzjI3n9gSvMKFGXFCDtRqnmtw/KbvV6j0ehepdHARFa";
    PACK += "65a8O4dxiuQyDO12GBelngYQsOcRHOSmn2T4VQiRpmDQNhcOXLLVhf+J";
    PACK += "mGvYtLvE2cV7tkscnOXdd0WcGJckAWJckBe7BFZOlzhpLyMev1wGK5/w";
    PACK += "Ne5G0s9YOfRy84y/ocovh9AsH85u3mTrhqsoxrqhqXLFZqcbJjFqZPr9";
    PACK += "JHtqu8LrQ4ZLUm1AN/WkrNUMaBhBp1VQn5BCoLN06IVUPWmUIXaAp4FB";
    PACK += "OImhZXmIQ+F0CicB+BO/1pBsB373UC4L+ZY4eieJ18P4IMD5jEpaMfvt";
    PACK += "EKJXhsdkMqU06+3wqCSlNOujUfG9NNsNcODQbYM6CzTVvZjc5kEiKXUW";
    PACK += "+NUGyS1kUgYU54ryRShlkjdgsmHH0yH2grNAOzJYnRKpY6HJY5AXLWZI";
    PACK += "7vCvcsG1m4glhy0kU98QYeUYyvsYDjA3YHwbtHAVp25vM6RDdGb/COvi";
    PACK += "ri5FsoOKLDixkz7zrufdAEcXONbGBFNDB69qHb3N0NsszSWdWKszygMe";
    PACK += "LBoQAZjeZgod8vLuuyhGkcBxV2ohlXuJQNwQJ4xpTAXUNkU4KBmAgiA3";
    PACK += "aXMkXYFDIoZyZAqqfZXHHwsCQTPCAN7elfSy5zlnMn8usvhVHpcjCBwI";
    PACK += "uZsC75UCn6+/60nIel4uMEZ62l1ah98zPK88pga6KujOVZKMUxB0cm2K";
    PACK += "gFcFrmVj3TQ7YXB+bkCPLeixq5KXd5miD4JAkvySj4YbcCdUhk0p50rd";
    PACK += "u8mc9JmL5yB5eiEvDBJv4Paj2rK1sQ76a4vzlUl+WCZpWWHnh81xFj7Z";
    PACK += "7fNdTQbWTwE8cdNAmCJLs53pr8DA2n+KPa6t6ij+7XIrTbuBlAhyEwXh";
    PACK += "LGUhTyRhESV2N+V2E71kJ+UjyLX1haFfX8+dEefsj1LA5IGw8M3nVaGk";
    PACK += "D2X1peGmoUEZN3ScSgYOP2jsdDKTADncYB6a1Cri5IgIckEekNBRtLTg";
    PACK += "5CCKoyxOG4Q3TWJljYVpJtQtmF3HcULxJCxioX7+2glFCERefzLEvcgI";
    PACK += "wFxMptN8OuvAlSKRfwBxwMZlIwuUVAK44Dg0wTLiBIg6YaY8Sm6vQXEK";
    PACK += "TizAiYVCHy6YQUmxtE8xh0l8pDywa/IxduIUMJg9X/Q2TjpfXn0ItVRV";
    PACK += "H0L7ldUXe78BDALvfjp7MALFfBtWMkrMhaiX7WkIRTLGIgnTC+BvYVsJ";
    PACK += "unrPzfG5HKXTlbW1A18Lq3enuHpXgCkWj6uZtafg3LAcP5zFzRTrhdci";
    PACK += "bwjIL9MOl4/laKnrFAredp1tXB3/CnlR7ns+dBwaevnSWUQlNMh/UiOC";
    PACK += "oXdyn0h4jI7yuSuCq6Hbfi7bRGA9dDPfnbJYeMgPcnnyUfbQaR4SJTgf";
    PACK += "epqvXA34h+7JPe0dXJAmHnhydt/BKU/zDm6AZnE49NmOf4ApGPzlzJVg";
    PACK += "2y7LZNwLEEby7MnIgkWLPaXZWgchE34y4xGxsd/FDg9o1w2etltb2aO9";
    PACK += "76FjT3wLwj7als+37rSyLuyrUWbwlStX4BYZHpS53bLbzbpxDBmWtr1z";
    PACK += "yzy3eHtPqbO6jO5QZ7m5sdy2lrPKHqqR63CtnkU5kw00k/hm8r1ViJCy";
    PACK += "XDB4XC9aRTZXpT1lWkVb1rGaWBC21qVl4cqqDCHXTIwMrZbM1LKWZa5l";
    PACK += "a0NmW29uJPlW2+syY7u1tipzrq6stGXWZrtprcnMrdVWczkJVtdabq2v";
    PACK += "J40tr6+srSbtbaw1V1KYcQ2GrrVsye6LcZRgtNfXV62kktW1tbVWU9bS";
    PACK += "bq+sLC+3ZcOra01rfX11Oau02basVnu5tZwYcS63mmtrrXQ00wQ5C6vr";
    PACK += "y+2V5ZV0cNMEadnaXl1fszZS09EsIbHwleHoUhCylILmIBcHPA7yEt1I";
    PACK += "RBq+5RIcJUJdGurb6qixu4XXmYc9nplfozLyST959x1SSzqx0pE+IJZo";
    PACK += "KXb82jeDTsxDYVPnITFi0zbCmuOjUPJqPBWCycm7wRxS+2aA/KyEb9rF";
    PACK += "vImEqQAs6bQlDgrhdJzVAlMY6xiBQ2t1isBbqs5QcMUJhRtkcxXueEnw";
    PACK += "gnOPZkbl/Z5h0NpywlTSc4fUmqvAKuEGxBWA63vkGPCmzWRDST4KoYHV";
    PACK += "HNqxNlnHJE67Wb8Lcj8KnObmJkH03AEFJ+T5ZtBJrQ4zlYE3Q+zGLNTR";
    PACK += "IsQvlIs5WcPJyv2lW69scQW3L3Gt1pvFFVpYkIX1V77c6kX9XF0NfHXo";
    PACK += "ZYHoUt1JfvnQwvKBFZYP+SiXmLpALSVevsChEK7Fa25u+ihywHuqI64m";
    PACK += "2zKMuEZMcRBgxDUqkJpfrenvOfc9IwbdmB1tOlzzJ5qWsJw7sYnCmvPN";
    PACK += "WOnSO2FBzagCVqunA7TCeTJrC9u4lo3aljKAVlbpHddItGtPU/+Qp3Rz";
    PACK += "02ki4ylNV6Rcv3zzg2iTmSBUCH6+C/cRWJ128woRgRITJV9nMop/L70C";
    PACK += "L9+ZcwigteA4KQrwAcpPH7/uTZk+BzyZYAZBKyEmj2WrXIQYUO5X8KqJ";
    PACK += "cO2brJNPgSCGFzaP8lNY44WGMROxj1w1NU+zII0ViZWk+2p/Uja5gKTK";
    PACK += "VRWB7DEBt8Pm5mbQgTvZ4SpJ+KlD7CvxS2rON0MFt276+fHIQ3jusE4p";
    PACK += "Se1kd2SkDXOCSjtBjZ3DvQ41jt27dO8czO+gXXmG9NixMtbpVk60qDl1";
    PACK += "jJqbeGt5E28ZONvU+Braaq7aGXFYtoV66bGLnvrouotec9FDF73Nda23";
    PACK += "+BWKQ2nhNZC/R/L3fSLid7sj9Fb22OM4fOI5OrgpYgi5pPGneKSxMO4O";
    PACK += "hKAgniHmDH8QYWbc+KQLOlDNOwjEgwwfI8vIN16nfI5HGkQag4rgV9Tj";
    PACK += "0XCkwX1KMsAKfFVeRaZDfMorOsSnPJobPMQjjSstecwWfpGB1g1Hp1o3";
    PACK += "ZnBFG8OaAKs74IFYpGMSHORp3BBTk8aZSlyRbJL6UdkeKKKS+SQ9YOnG";
    PACK += "URgz3ZbDrt77KnrKUjcSeA+wCwrfwWRuPuoQpyc5puHvUPXRZGY5nEr2";
    PACK += "JAUKvM/DE2OImtCQ6Tc9Uy3fD1k6V6oOOQijiQ9vldamLKcdoqr3Srzf";
    PACK += "wVCGG8YfcYt7J9wysHN2APIc9u4SmyEvHPKP4oozxMnAg9OI4eEOSEQ2";
    PACK += "RUoNdojEmRPYfbg+wTSyd4O9MVLNCuHIh5lK0lMfXOcQ5tGGiw2cQ1TE";
    PACK += "9CwrqxcFC5nBcXIGGJjyOs70GlseoT9VHHjqTcSFM4cUfeQgDZmzQ4wh";
    PACK += "Q1kRlITUVPBH5h7w3IPS3Ar+yNxHPPdRae4cAiX6sXR2k93rfe5fY4Ro";
    PACK += "hxjvc58bIzSlU2NWaVZrCVol1y+o1aO3lHrfmlpvSTTMu4rv1GNmJJOW";
    PACK += "15lI2v4uM5iZC+IplI9cTcSVj6Bh5UknLjePTfPhRoqgDkMPXSO7KEO9";
    PACK += "5fM6FBubmUVScsEJKHjBjGlC1ZTXxzb8KPN6zLdKMj2xWkuCnDdJLxTh";
    PACK += "apK2x7nSOd3U29kVS2mWvH4JDv9SvmZyJYAokRw0JqP7HpyBqksXTa4s";
    PACK += "BIFxUI4CmLnTvDNhk55+lbwAbFBEdTqTcVfh9PFa6FBEJIjcRRCUJLy0";
    PACK += "QU0kj6zFVKQmLn2qzq+kByg3Ymih2WENHgzPSLT1Cwr7OEqdBfhwwuwm";
    PACK += "lFFZ/zse3KzBd+Rh1tzb1BjywD5yozDRIPdxwD8Oko9HuY9H/ONR8vF9";
    PACK += "kloHwUWjb+VeFQ8veZqq9tGR/HceT9Db4fm5ATBbaJoW0Ziib9vxTPUI";
    PACK += "4ICrh7KLyIwg3RhuEwNukxzzm8Vu0cSY+ew2MW5Rji3ZtZ8iKHmaiTPZ";
    PACK += "kge7RXcJ3Pupdo77kBU6B1tVCKOfjuhtQXFzU3Bb0NXcyN8W1DM34Cw3";
    PACK += "3sDkcfv+HlMhpE5PWB5dDFxH3r+WVsDPkXp81ZBccZHdvMvp1OSnWq2X";
    PACK += "4S6MUI84lDUqbmVGUcAdFFJc8Yoxsh6j0OkR9ZLK3JuTer89dproThZi";
    PACK += "KzUAeOwEKF8kx4O/TIPLL9CgUgLoYBQk7b4Xph9yZ0cPRDpFboCIiTg/";
    PACK += "SDPPqXuekW5WpglRT8IRHEO7fVdsDWlOWRKx2nKtVm9unngpKwFGKRwB";
    PACK += "gvwxQAjkKuDwhCk6PnZB/A5VgFGYzn4BXPiQnH8FTjjOGJkSUAWpTGvg";
    PACK += "JIHIo2Q3KCjClea5wYpUmGNnxwfqi/mmnB2VmGWnfVK5nowQHJzChkyy";
    PACK += "DRnDhsyUatLzE6xQd7mRyD18vr124jSWTd9l1Xb5kSQ/dxWrUtblBo6I";
    PACK += "fqiY3Zc5CAgBKbEDU2xLukEY4dQ+LBVX0pTRafIYJzZeiRSWCBlSFlNk";
    PACK += "Dkw85U0ErE3ew5EqyZTINfxVmIYkz0cQpli+SbEse+PCWfYaj1RxRskq";
    PACK += "hcxEegFpLX2O0zEA3/+8gJMbOkXCzKekFcNUC/EvSeAeeOkzxAOWTv4Y";
    PACK += "c5948SIEQ/GiyMFqSjasmUwsE47ADjrfbu5FWNf4IcmlplJsOt15GXgy";
    PACK += "OQNBSYxHEENaph9g8Mc4COJETnR7DFPlXWRQJ1j5CPdqiNASOUA5dsjn";
    PACK += "gRsNch9H4Ygvo1xXcy+yM7ljIo6aOZzNy834xGeTYnT6XpSbh5lZVSZH";
    PACK += "l4rZEmGUAqokXSFsRxC8NEOGfj814OSooFR2PMAp1vCm1Y7xBLUrsiU1";
    PACK += "j0ySuXJHZ7q8KkVPDNuOPMOUqvrbfuEY7qZbOHfzA6FqPvWK521P3clD";
    PACK += "oMIRT3N1PJnCt4u+VDfd8sXve7SwfVyVho7vpUYQ71FxxQ1izi0fvNSS";
    PACK += "a1spChzpgusTrc+2+olreJ+pjh9wv2vCfmV2kWB6BjFDHSfYxXvcOrIj";
    PACK += "VNmkLk7hqQNXwkL4LbZL6lRkDet0r0MhcwqeE8irKUBPR7eadZoECMjo";
    PACK += "/IdUNXk5xKfbYLYofbTAYh/euePPljz9F0niAFb4TjXbfEtptk3wtmL8";
    PACK += "U9NK0lC7tQkhDHhqewuriu3HNLuTUEkeRlmyIkHv4wJvXrxZYp9HP+QX";
    PACK += "PcjLH/aFsHWTRCy5JoI70svLJBT5Lbn7QRRwfPEm9+OHIlFghGTxY026";
    PACK += "QxUM/GPhEYx34z1ex26855AtOIizeRy3VMUO9cPOzvHxHuUSKPYcI0yc";
    PACK += "A9M0GWBg8oMdSpMa6Y/oLDTNrcfUHkZIVq/wSw9YOBphz5Efx6mvqRpK";
    PACK += "8Gwk6pZg5aMJ+tEEBMrdoIUB7YAXJGnk69sqJoBbRRI0RekKd5o7JLBB";
    PACK += "8lrUXkK4tKrBe0xNEWdE6bc9eUtWOaiFcltkkuPMgBUb67X44CCYgFb9";
    PACK += "Bu7BUyaDAzyCi7Wj3GCPkR/dE8mgOnxMIXojp1TbxDnj3b03ACcOCx3w";
    PACK += "diLbQqJdHrbFQswfQtS94cgucVDEjfTz+TnccywvPkYTGGYhP3pI44g/";
    PACK += "j9Fj39nHxjYxkUcd7qa8TdDZkY+PbfBQZq4f2NbYRE89yOdRE/VDNArR";
    PACK += "TYJ2AlHAo+hM7M7v2RYST08A+gDiz7+XPkHayO3j9+Qvz8No8DY+hXIg";
    PACK += "MopHN5AP4I8invoYQk/BzVvCS9a+7iNhNswHDB5gwCgOgKcWy7t8nHJZ";
    PACK += "0oikW7jRo+Ewva7KUb0ItiD6kXy2cxntQn1jBHvukHd7snU9/SgIMG5k";
    PACK += "uXlksJuAt/AHp+FBMjZiy+jDwagc6fpNkjyiUZb+JEt/Ytqj0OmHjoVu";
    PACK += "EgfDxJkZfE+mwfekCN8TexSCwfIgAizYCUx0xxOTvxOgM7gfid8t38OU";
    PACK += "I8stjix3PBM99jIcyU8O5BuGkO+xZ6LrXoZ8qdMk18JbCAfuKMIevw7Q";
    PACK += "QqMIx146G1DLa7y1656JHiq1wIURB6FLvesuc8s6m8uQdDhfSlpe5xJ5";
    PACK += "pCXe4kPPRG8qLcIwcICO+Ci96Znoquec3Yi6tn4j6rojrKMH4KV74FJb";
    PACK += "13R0C/eYrV+lNDyGRx09GsnXRyMd3edeieKdP+sIzPdlCrftR9dxYOvX";
    PACK += "ue5PR+/6xNbvPtDRbUxiO4l0By86ujoaRYWkB5x5tHXxeyuEa3Zuh0/v";
    PACK += "UZ9wxRosPP0R8T1MGL/yTh+jDzznbN3Wr7ndQxkKfsPWH7oHOmq2bH0b";
    PACK += "riPXUbNt68L6HzVXbf0BLGwdNddE+zQMdNRct/WrAaRu2Po9LmihlmXD";
    PACK += "9XaRgKS1lg1au8WHq92GvH1wQEDtZfEshqG9Ai16Omqv2vqbIdxs1F7L";
    PACK += "jWx7XRnZ9kZ+WJet3KAur9j6TRJhCp9Ws/FtQh93mvDQtvWdFjws2/pO";
    PACK += "Gx5WbH1nGR5WbX1nBR7WbH1nFR7WbX1nDR42bH1nHYbKsvWdDXhoQoUW";
    PACK += "PPGqoe4W1N2EypeXbf1OPBTj0QSo1KlqtZZt/TZmrj5G1zzn7GrAbF1Q";
    PACK += "Th3JgbZ1SV8BJ5hr65Kg6ohPiq0nRFdXLO0fKUbTExtrqqwoEuStySSD";
    PACK += "n3E518Ab0NxaWAAuOBcS67qfubk/8oSPhUIvDvFpbt3yU4NDfJoAd9Xb";
    PACK += "5e8QsRp+k4OXPNJOhOLLaGuqJgBWmDPOSDK1En9t4bzOKf62ZJRBV2bn";
    PACK += "6uBiPzexzdLikb71gYQPSkGE6hxYEAgXwe0ctoWCsCsYm9n3Q4pH2GWy";
    PACK += "LGcPynbIhLmv4BgmhoGPAXAFEuoLy1V1Pe03VHY88LuD+UCYu5Gxid7l";
    PACK += "RPkNz0TvKHtTethnc6dtNrAtJO4agb0E2owp565AdUAg8MY9JdEPOP8C";
    PACK += "v8CtsGPg6iwkKwWvQM5P3aP+0KWnnPifcuL/jmeitxVcFpqaiDcE29/D";
    PACK += "9F0oLbwsoWS2S7GiZMLHJnqPj8Lbnok+VLYm9eaFGXbUJ7ySDz0Tva9u";
    PACK += "8zhgbilfI74ke6jMJ3QO15VPddxQ0gA1eNYnlVU+yVX5RK3ySUmVuQwl";
    PACK += "39MW3+e8bcDc2wJ7TPQW7/H7nokOPGd3AzXbqLWG2q099JrvHOBaTd/O";
    PACK += "NFucFEL90rn0A3kowPMlATNuSzk7ea/VjA+Ik4bTULMJfQDui4YgMmuh";
    PACK += "hVpt4QOCPnB5BmPhNf/8/ANSq61vwt9m84rzATHRg8iBXfI4yvlPXnNL";
    PACK += "zUekSlQuxIPsJIAliwqsfqTNYKZdTcm/zLTgOK3WRqdM6VpUtGaq3DQQ";
    PACK += "45QrNB+5BbM7IYqgydjPMOQKA8eZsNQb4X2WGwzWLx2MoiYz2ZLcJBqu";
    PACK += "0rd0BDhVAw+PlrxCAQbeQg8iWUTRoiohgwE8vsk8iGq140h6ExXVWoWY";
    PACK += "f6SfeoC/z0zFrKUI+fn5wmt+rSbnHHY10HKB7uuW7yQaMT4mSHqNFD3E";
    PACK += "pQJc9Z4sDAAPKccakiSBS78gWPAkKRaPUyczgHWKyJC66Lu0Vmtuiqfk";
    PACK += "0DUdVkgU/v58gJMPZRtxkmU8AW3FhH7gAjRixwQ+4TCU11+IeSmfBX7I";
    PACK += "23fOuJs8BEAArXbyC0I3POvJS53XrovoCyA7Q1SFkIgwLSJShQiwEEVw";
    PACK += "MxY889u5eLAF7NIuz8hwIH5OeKCGpJWY8uRjjCESg8KybasBpkB6TCL3";
    PACK += "qs/5CL4dJbyzPFfZWlig/V2xze7ZLOdwmyHjG2527Lbtwkkbc7oBXP0T";
    PACK += "km2hgDdRZqQhrhfCx9pj38hyoOQcQp7xwREiFlZMQhdiExRIJ9fIZmMZ";
    PACK += "Lu+aNBPARWVu0IcBYF24GFW1PAiUcSHSn2kEyzpdRcptBNkqk9E6RWdS";
    PACK += "/hHqedcFgsLJ8AHeMl6jjh4SMXwKrUevQQTbQehMj540CPN3C6VVIV36";
    PACK += "EOomeo06kugNwobMkPPtQdep8xo17euUe9e6znUw/18o3WnOzzc2y7cg";
    PACK += "sQddp+g1igbK9S37oLq9BnqJa4QT4cTARQ9JwlUkc/mOa8LUXEvsHTIj";
    PACK += "6swjLXd7r5Oo1Ws1mCpqJpO1u9d5wzUYgujqiEd6MNEN1wj6cAGJEha2";
    PACK += "n5oyi5Bf4uxwywCo0TUwmAJUQdcIXB11Aegysli6T9VqUIviQtLPLmVw";
    PACK += "Jo7OpIe62FezF74BJigk+qgE7itiHD8wVXKr5jxuIXPOTb6Aq4Wi3X4x";
    PACK += "5JqwvlngZvLNJS70LMG9z1icJ4MUJfD9Kk6wT/q58/Ai2S1AaardVa4H";
    PACK += "ZTSF9Sq/Mzp/r/XkLUSiG/ngP+pX5hRtxITiV41hxKMBqgnSwEsSov+P";
    PACK += "uzdvbhtX+oX/fz5FrMpVkdeIR/KWhApGlThOMtljZ/fj8lEkSGZMkQpI";
    PACK += "2fFYOp/9Vje2Bkg5njnz3PvWW5WKKRIEsTZ6/TXGq3qnjfY0k7zTkw4+";
    PACK += "UxrPnoznR1KBiZvE5xXL4sViDfp0lB0zcPO2Pes2OGodlMZNv4ek2AMu";
    PACK += "8+HH6vTozIN1xKp6YFEy9gqJfuDYQx+iDKODxHpOTVPGlCUw8EH+zg0f";
    PACK += "cQXvJjnTSFPVHbHsCS6XIlHtdt8QP6tDFfQJvnLeDYPDsIT7DiBlmWvt";
    PACK += "6hLb70E6vgjQQNrtqo8LExLN23PrPUkMB6me/JuqDvLBOGlph4nSKvT0";
    PACK += "b5WtDhiDgRQG8PWtZhL6a2vRyoeAHN/dBTBvT3nxGeyHZi4E16JAxWUW";
    PACK += "xb3qVgq28nyI63wDMIL+eCIHU3MC9FQ2Jm29MNA9Oh32J6V1NFqBDchR";
    PACK += "6DB9dCSmhElQYBd5DJyl97LyaFFeN9gkYam9C/8nGLnp3+cfTAIAmw7A";
    PACK += "yemYaIMK7orD8W5VIvN+z6X/23BKCH7ssSRQKkggjs8Bp50Qv/HE9Q3m";
    PACK += "jCHuHxB5MYLZwIgkS80PgI5aD952G/75IMHt9otBFNyzg6unl2mIVGmd";
    PACK += "nd6nBja1UpmpJJhV5YbIRygOGPjlCPGS3emCGHawlvM43/Dv8oqRW/u5";
    PACK += "jrSdpuBumSsDtSF41sNJcPQ69lrvQB5jgmf9MRUXBD5pIjTGblrkCiGN";
    PACK += "3okU+wDoBw1Ep3AtM30HXyXVfWeCKRJSDAYG/MQh8KYS+ajdLn6XKpYR";
    PACK += "Y/cLBB7mZ2WUs8IY1PGXjHtZu53iSkTeGpEOVWIusaGy7b5WsmuGi9vd";
    PACK += "foNEEB8oegiPcK3oF1L7At615VNdPsbdYNg9XEwRoMyWosI5i9QXmakf";
    PACK += "uF6Nbp5lWBwYl+J32Qc8kNFI1YDF1DBEqgXMfjBOVN6B/YZnzKsj1g6o";
    PACK += "GGkjeI5h/I52ApQmoa4urOBKGFsXy8BggaYmUEOLccWqYmZvvC9mS+VH";
    PACK += "ao2qOEp+Sg19MzIeq57DquDorypMMkzyKYDlhC+Gz94XM3ATL2ZKVBtp";
    PACK += "LcpqNQzoSxp5YPZcS8g/NELNBy1ufAkgqaz7tcH9U7sEsRtyW2Xincv3";
    PACK += "AWTF33e9L8Vi8dyCHj7HyN0skgCSJPnzqokMSCQlMu5LfoU7KZEBWWAi";
    PACK += "H9Gb+/loCShMkQzpmAyJWH3jx8EuZxIwTc0OSiTZToxuIftE/WR2DyXS";
    PACK += "7SdG9pC5r34tY/YB3GZk9AH282IRfchx3w+z6EcBkqZqE0qa0kmaFZE0";
    PACK += "dQkziFrShGkLJM2KSJpolTcuI88rz5P8vaT82NXSongcBUfjMXiR+gmB";
    PACK += "LQrnujjmrQt9XcEDAOTEu1O4qJjCmvpWEfBYmNH3Mmo9NDdazF2D3Stm";
    PACK += "tmxqgGZXv2GxaOl7ajGtfEctwJg5p2bTqPf2TouRH9isJTsvACPrxwDG";
    PACK += "C6XmH4PrhWKFjUj756tCF4tIZ5L5Vm3QEXI/WEMBOyzXF8NRcD9jr0dh";
    PACK += "Q9z73qiQXySM7w+T/uW8AHOYCY2CHyhifKvIbaFB//AmyxV+/3UQpO02";
    PACK += "Pv4x8CpGYuokC6jzy4D/kUUtOnCtmH0N7qZkhTwPnpV6JXxT972uQ/KG";
    PACK += "oY3p/Fny1uBboSI091QEpIrIHA7yt9ng0vx9fyqL+eTUREmC77EJkgRT";
    PACK += "tQumBBdL/G9fB26imU5d/UzV85fgoYhXb871s0MX3jmaaxhmFYopprMq";
    PACK += "FaNbIh/Ky1mFVyP4H+B6bk2K6q2y9GiEOx3mqV2PIfTzsY4FfWtiQT/M";
    PACK += "bkHiPPxPoMOAvgQD7Mj8VC2CKMfgA1OD0qeuAIRPXb2ZV/oCejVVwHs6";
    PACK += "uhQ9lW+BjzL+l+YTE+e650XAPiYRsFizvoa6zSXUrq+hfllMsGfgv6zH";
    PACK += "TIWsKp/lW8pbGf/AZ8tqADlvdEDrLR29fQsUmB/QHVjF7e6RYN59E8yr";
    PACK += "xkS5LOtPqRP+lvJsVaWw3ReDtILPKa/WxrDZ/UoHHQ0xxA8zhD3FbLeA";
    PACK += "Sgkb6g0I/m/kg5+l4UDegOz/TPKf5dEbeczelvyZDCj5E7h31DkOII+f";
    PACK += "Se2Z2Y3ZfhW9LeGMaq0/KRVn+kyytyV7UrI3srdfRV8G8Nin4HD/q3+f";
    PACK += "0Gl4+tx/qikyPHHO9ixAilSPjV4Mnj5Bn2lyv0B9Y5E/AndrvP8NPxSQ";
    PACK += "8t4sj3xoR3bkfJoZ8Wc+9sridvx1Wb0NbM3E+Zl5js/hG7b+6954WjXo";
    PACK += "njW50YNzywyG3uMkzns+uxVq+8iSM7VbfsNWROO8TbS5+ZpffT3m/QYf";
    PACK += "fIQe88rExI5CmwdzJhtGbFFMW3jcoBCzJr4WBMDb3qwIfHdmvoYmksrV";
    PACK += "cmW1YIJ/7AOKvvhfUCEIf/cTiHOVmzNsOMhn+syCv5U+s8yBMrzJgaJO";
    PACK += "gpE7FKb0UFDj0UTMKRUeWip8Lf11hFcPAo0FMQSU9pdNJnhyH4oqaplz";
    PACK += "Go9ic9zhueaRZPo+6GKGgyp6A7ipzgITyEpKsbNYGP/aO8iDt3oi9Mxm";
    PACK += "k1EkWWWwycA1p8F523HnaPtBaPqo0qBFJHizlvrINAekzQwUEcq7CVTE";
    PACK += "RhjoiUTHwOn87ohv7tANpUsf3nnAU0gLblCf5FF6zEo+3zBaQDbgc7/5";
    PACK += "PcQjnNvPsRIACdrtrNGtOIpjA3X7qowyNmcDCK0rVRQYtCnlnV5qZaFe";
    PACK += "qhMp3agt7B9oCIIjFgY/U/BPRQD3SjTbb7x8RUdVeozA+FYHpm+a5Rgb";
    PACK += "WJb11smJco5u9RDkX8nK+RAsRWwT827noPKIJBXcLgt/DXYQQFsu+HbM";
    PACK += "8mGUM8Ek2JXQ3iF5S0UdKIxd2CTrqJaSg3xUTGlKk63dWJ/6m2TF59Lm";
    PACK += "pTx6KI8hd9VDCVm42GBQT6aQx1eYvCyk9+12NJlgF/N4sbgsIggKh12g";
    PACK += "LmFDQLS/ifPwFA2QiMxXNFTOuAKNgQxYplGXRVT7OHzKRxDPh87oqz0G";
    PACK += "nqEZ1QByKe3fqxEB97i1nWT8D3PH2NYz/jpd5jzb+Jbmo8jI5NCzTC8A";
    PACK += "tva0WCzQkY8EtOlMSC6uSd9QLOBiEWXomC/72Rrx6a4hK8O3rjQohDHE";
    PACK += "Q+qSbAnmgcbikMjzBpXepCaajfGwoPAcitCg50NUtbsG+alqb+pLCwcr";
    PACK += "ErTL9LSdx7OL9QxlqgYThKIDM8liAX+2LW1aFV3a0wip2WIxpwvqXrs9";
    PACK += "J3pCEs+rv7AdKwIkLfKtH0Rc8tQ0KCpVi0p8rd2O4NmK9rBSNaYMGlOG";
    PACK += "jTGdT3mqW4D8PcLu6WZgSz9W0TxmaTBkEIOtGogf3FGN24UstwVPLfDu";
    PACK += "LYEgscS4tZS2x8v9QRQEpQx4wWYQipzH7BTs2fo0GXExRKAR5YwwsgtL";
    PACK += "vTbkH1N2zkWv7q/l/G9+AIQE4v8ZWtwcA4vRp/wT3ZQuvvZcm7pbbMin";
    PACK += "Ra2IQvzhKgqzVuTacM6grA4DRiOiitTgnG/6Tb8+eLgxZjcMrfQjfFcH";
    PACK += "WvrhzPy0DKGSVkYs//1Y0BXxzvylNzU3i+8l/fbifflnj/h+Gaiwyq/6";
    PACK += "7/NBMuS3vSLf4NYXrwk2oJT/6d034aP8uXe7MRDcxFDzN6O/C/X01wOt";
    PACK += "/1rcLI3O5pclnvyXjnFkZ3ztst1WJks1ImzCL/sjg7o8Wm/ZnAfoQDbq";
    PACK += "XcIeN8zhmA/YtDd29GfKx0ibD/nUTyYxNRDN7fahQ42a8kM2cT8P+Zc8";
    PACK += "GrNJzA5NKplLpcKWMhqzQzaN4zhmZ5osj/nY0KXOg0unHR8hQzWMRuzc";
    PACK += "uF3NYnbqKcNHRBl+udSY11HVvqvozZVIEC+fu9gkHFbthkJHmg1pIeeq";
    PACK += "QuV0yK+2xvmjAlBlEDmdRAgtFjkNtYLT4mMVnceLxfmRqI4dIwotHC4W";
    PACK += "oxj7OHPWmFl/luAdP8trf+SbOkaaqivTuQ76YcN+c5NsJBgb8gE75+d9";
    PACK += "bFWiQO7cpJ0B1sR5jLfOFotzDQi+026by91YdRsTHyXRUOPk8UHMhnAs";
    PACK += "KHvxJT8t2SEP9CkTHihjxnqkWywKh7lhcuDLl/xSV+yrUia8po8Z27db";
    PACK += "MTvjQ7MNEpFHw5hN+Tm9cx4ztdQuo0M2Xm8pwsiGar2NjHnljI2CYLwp";
    PACK += "O1Rj8LGKZrDgBthMVdUEqlIkGNYvVHVpqpqyy6CqM3bIL6Gth2zYbp/H";
    PACK += "lXJnueRDNuHnbMw7bMove9PelH+uomkcj9fXcftOeYcd8knvsHcITw7j";
    PACK += "eKqfADjOnWkvvoT7lzEb37lj7k/vjHvxBO5PYjY196GAnkLOJ4uF29F4";
    PACK += "g+R7UCu56pmqdVXLSwL1oa57Q1vJH2V0ykZsyC5R8HFL78wvcsbOoQgk";
    PACK += "tTW7d9AXeTSI7VLnI+LxMVrh8cGGXkKWIXX6GFl/DUwiFWNcKy8m1u9g";
    PACK += "r4xGMRgvPg3iPT5QD672+HyCdHGfpxPsZkTbErfbQ78NnqPJqCmx+ihI";
    PACK += "rA4rfY+XE+S29vDHXiTYII7jq6eD6JTt4VqyHkz77fZ+JNgI5NrQHzDa";
    PACK += "5yM/WWvcbu9vuFzvdCB0WjpMKT5i5icb6cy1S83g7YeTUQN4hLHbjxeL";
    PACK += "/dXeLu129Lzi+2C4HhirddzM0n3I+Y+CP1+B+6gO1i+YVck750MIGJ/l";
    PACK += "srwSWsrZPiw7N6q9ZqwRWImTmJRo5F9tXXhIn2AK4jQWyTU+/JojgvI/";
    PACK += "eZMWsufxnqGzePgOqEVXvmFATsKXtDbSLqufxhMON8TXqo8++mC4i5q+";
    PACK += "p31RzYiA14SOuOAYcdHwmrEH/IRAkwG84Tm6t9vR12qx+Ak/G97r/+S8";
    PACK += "oR3t9lfQlZxgHEGcRJOKzwBS40ZoGBBo0AHHXTDbD9hPMNbvO3bkJxL2";
    PACK += "8zL6ycRKfuQn4Uf2lzE76f9EX31+kkQn/ANikJ24Q9c8RH4oOuFi0seY";
    PACK += "jzxOcvUXRnygGhTo0KF5A9e8mWleqGr3oGpWNnxGGj5YxmxmW7ashtEp";
    PACK += "6JuIMkBKPxXmlVHWgdONriepmKe1S3KioBlmIfJ25XhUJlEA9aVygIgC";
    PACK += "vBLHjmaOF3VgX1GGzlaYEQ3gvNYsetc8Vyhv2PYCcTJ1ucorZxhVXUgB";
    PACK += "Rmv+tA75/rkiXta1FGqj4pZ72yQ0wnB5xVxZt0ShUDwJzltJ1S1mmApe";
    PACK += "EZARlsI45bbvmOOmZxQnOWpRXXYjUKN6vHxpXywx0YwibXM3qgM3qnM+";
    PACK += "YFk/KmHAwIENtK7qUUoHNmclm8dxnEAyqcbCZnRNSXCrMvAay9T5Pndg";
    PACK += "lFa5vaRLRV5nE/7bf8v/zvu/TdgUruedTqez+O/5kydPHv9GHLz/LF14";
    PACK += "VkRisrSPal9g/vp4Q4pZNhiKaDZh//qvf7nf0wlrUSfN75Jk+av4n+Cu";
    PACK += "y/Aja+irngdpdLY3d6iGd5yZ7IFftbb5eZgu8lst7bjvSopHdlEOZTpD";
    PACK += "h3Prk6szirrONT90WWh/kV2URq5dk4LUov2uKLGh0pKqhYBdF6nxJC4F";
    PACK += "YpcXfqBI393WsEHsdGJeGULoftNL9IF57XVpXnsri2laCu8Nfc8UPrff";
    PACK += "+DEXc/EqHcqiGpRn3jv+IwPK8rr0cq33G0KIX5cbUpRFdi5QlxxvVKcY";
    PACK += "6LOhvKQvJ5AzPXXL4BK9gd1IRB4eDpouKF2+KDxTBQPjwaiwmb6oCzxG";
    PACK += "t9DU5YDKDmYUqr2MESgwU2GAmAz4t9stq8kF+dqrIovZN/A/N8i68s4d";
    PACK += "xUCgzeB2S5Go1u2+vVprLRZyfb2X82ypyGMe97AOYg+pXFTCmgZABBsC";
    PACK += "dfAPDQsmz1tXeWFvOQ1whf1S+1aFXyK8Yuu2SdmMbVJX/Zb/Hvbei7ar";
    PACK += "h0G8RFKDvqpSnKfFvDQj7mCCOz3R0/FF3mhbZH0M79Mgjdiy3LYsNy27";
    PACK += "0o3qOC+syo63bmy7Xa2vLxsaU8uDdZLzG5iN2CfBWyfqBMKkTLdb6yc5";
    PACK += "y6S9Cya4Ut0Vlb1r8ZDVkyq1T9DqoF84nNjbxg6hn1y4J88G+SgT6r7b";
    PACK += "Jx9pisKjT8pJrXLJYWiGD+JDrKNFKp6DimaxyOFVFUDCK3J2atJpU7KS";
    PACK += "M9d7onPKvFTBL54+P1ftssunp4u58AYADfPb15xVEJPyklhjqHaxENAD";
    PACK += "tiZ07jSlujGXu+4SwNLM9ZbNDmjqFvlNcrHR3L7eObe1RY+5PzPa0KMM";
    PACK += "LHl2weXAvLAqh6Btl8ixcm9cae4xoXmRnsHzzu9VDolZbRK6PD2q8mOm";
    PACK += "/qgDtcrv3CFNua2t7fn6uilmX3eWeh1EdoaJUgvBf1bRWRWzCV6B0uJZ";
    PACK += "xc9IhtJpkHcXU5Fq4RM2NaZqWrPZDM8qm7DDY8QksJ16ef+R45rLXmkA";
    PACK += "1g/5dFCeiRESWI2HA2FHps6VL76qvaZDHqBruB+KWxinkR0V4HlZWM9L";
    PACK += "qRNj0izNf6V11ery9UZhWASBChdBHP2QlMUhZfoMcO+MgJt6Fk1EzJ5F";
    PACK += "BU0p8LEkbFphpxk0nFWY6HAXEh3ejgoUB25HE4FJma3AMwz9QrwZxBiK";
    PACK += "Wks1WyDBfkb77GX0tfQAzHNBwcgBemcwWTLGaPZMudaGPejcYylg4SB0";
    PACK += "i0KDAwGmZ3H2rpYa+NlSEm+Dcn/WY6ATq+ZRyIk/j4vFWQXbw40yw8EU";
    PACK += "ejAn9j6mJ3CYOuW1A7tWy1i5ez+OezlgBeg5eVbFTN68oVwwslZMI+NE";
    PACK += "3TQTD435oVCK2Wv0C9nzgyqyIQzdDyP19X8ITE7+Q5hMRiSdOfJwrzG1";
    PACK += "Lr5Gcl5UCtRzba9ot39YzOarvcLgGgreYRX/2HPhdz8UCOdH3gWwTprE";
    PACK += "3MR3gI/2qLgluYzWOrEWO61Bfun1S4fnZYad/EGS4P4Q/IcwEJ7r3Thm";
    PACK += "rwbRq5S9rXDPWvjwSg3OssZU5DnQeJnzDptpuOtpxjvsrYD7T6BvD3UM";
    PACK += "yxfBu+yr4K2WG+PX2ic2z49kvr5+zKcZs9ezDOoUUCGJDCzsPn0rjp4I";
    PACK += "KPhFMHv9lVw/rODjQpPkLwCQ/VVoGrm1CXmKZHyn25Nt/u8IsiTFLF/n";
    PACK += "XZ0UVxWo4nXM1r3VeVCYfF/Znex/7fQKHsk2vJbGd7qUmdqMmfz9d56y";
    PACK += "7A5PsdcPHrjKFvmDB9lCwkAU60LxcqpMQR5R1ySMhBQux62eOhy6bsxw";
    PACK += "PLqsQ4/lZ6njp8HqlPVimJ386M4dCacojPCxna2m+z378sOqFz+s+Ftx";
    PACK += "dOfOE3GsRle//FU03//SfB9XzIVem4f673fYeu/DnKLpkJ67r0S0o/Va";
    PACK += "8F8n7uUm5go569bj/Zf77/cftxjJB4LRiGrUuMAcNhgeAepYC7cOQW32";
    PACK += "LleBXmOV9gYCbHW8GT0mbgfJj4Bz0j5HOwnlEhychYsRViF/uW9BAH3C";
    PACK += "CgOHxgKxuTmgubR/F4ILGMjLCrJu29DtGD2E1jS+sU1sWbkEZ8jDgwQB";
    PACK += "ghBt3tZNP4kTQT/T3Uqae3yvXmXOH9ofV+ko+SIYGAHHWXGRfBVLZbkM";
    PACK += "0nPzK5eLGyqTQmh6n+RMikpeQo6yxKW3WzJcON173spZvUI0J8Lzxj5e";
    PACK += "gwwkU6J6AoTKkWh3TZJK4WeuJedilmpG/LsRaw4Vp2GFezwe9YJTIjni";
    PACK += "TgSKpy6wNRWsAT8kXpO9CwHOhbqWfjqMJOieTbu4ad+d7c79u4tNtR1h";
    PACK += "AGKVsef6z/6yliUZp/cWe4BoTN1h1CDUbFGhRgEUGEWrRyMf2Rw+a5xf";
    PACK += "CIemAAP43TBg+H1oWodpuAaVUlQl9VG5sdvtNfJ7J9aJ4hG4uOLo33cq";
    PACK += "BiPj6/etGF222u010OWpQm7V4h6DpPJYx6GoT+F8GMXMH1Aku1Uv1vSP";
    PACK += "VWpv03kF/wfVFSO22cQQwZYBvbbZZoKkslf7ay1MVb/VvQtTmtgpIl9l";
    PACK += "f1WlYbRISn9xpYiUr9KxpqhqhRJpjaiTFguj5yBVLPUm1cmlDgW/EH38";
    PACK += "jvPgo1+kSaEoiwoTQZATDgV0taHF7o1TUM/h99wp5p4+xK393rKO7xXr";
    PACK += "+N6xjqiQmVyThoZotnMi4ghUpY+Z2zYEuoTENNcBTTRoxgl6nmh9hfmp";
    PACK += "Kzcp4rvhwujcjw05IeRz2ci9b99lBrsHIuMLDnp3exgSNbIU47ATeNMP";
    PACK += "zsZbGydK030AT3nRx5tJVHGrK02NTSSDR2XP+FT2dUjk/Kg4TuA/ni5Z";
    PACK += "ResrwPDlQ8BotXrQs8172yrR8ZodxaDAfeUEXdcYftCBusYVXWPCWEx0";
    PACK += "yz1qUBdHFba6yuZ/pGZRY94ct/p6Wm9dpNUpBI2Ut65a6z7WzMb3Is2j";
    PACK += "FrvVitdby1YiKIv4hgJ0bZykeeqgVCOxcTIbXEJ0BcUGGgbY+BM2VmtS";
    PACK += "1TPlE8dL9aaWw5pQDmt8zCaUw5qqHTH2XLttzWvCs7UpHxarc1MtYOBc";
    PACK += "VmoFbKM2Tar64O2JCQUl1YxhvAyZnGBsHt5i4zgxPxGLcMXHJuRIV18y";
    PACK += "D/iJbuJEVcA7bGLeVmSDvFtAUTZ1b+t3pkz0oyl1zmFTy0hN+VS3bfpg";
    PACK += "DEOth3YTGj8F8zi9Q3/rRM9sTGY4jSYU/oZ80uZSIhXGtPVz1Xp2aCsY";
    PACK += "Ww//sVFR9qMxf1JEUzZBJokdxsz4BXIYpyQa8yyCQfDvkzXoPqMceqYe";
    PACK += "r73HOf9S9WeqFCJ7ldYkBl6JCNabOLoTjT05gvM9ay7bo2axPfvG3sbt";
    PACK += "26oEeINV7fabMtoDzm6MLYn70aHqg/p6zA6Rpv2Z6+nF37pnh3ESHfI8";
    PACK += "i1QvVPPMm4phdSN1bT0ElOsGE7ENlyt83Nc4n/p3/MLpdKYGDGNwsLR/";
    PACK += "Cyb51U0m2U7MYnF0vHLGZ6Y/bO+aHt2Fr76pyFfZ3l9eXKdmB7rTgKAc";
    PACK += "tduwbFrOnjp2NtbYNuxJEbVa62PTjOBjPb9mu7zGVi2kxcqxXWVatnwi";
    PACK += "bV5UWDBqsTFNpxoWzDRmU7dg8MlY3dJtmSqp7YfFlsRZW9lwLDyoEuUy";
    PACK += "PPYPDBi4w2jsDg02xSP1dh6N48XiLfxxQ/SmIp9hKm+j960PimA3m0ZG";
    PACK += "IQUwY9fHwVAcnhvmKZ3AqT+B0/oEmn2uRFZF1FqtdfhcUKmdu2k4d9Nr";
    PACK += "5g6aCFSm7whZYkFCyWS4goOmggNbECggzgVTA7MXTck0HJppmKppmMbN";
    PACK += "HXWbTPnp4QxMV8zAkO5INyiHdKQP/ZE+rI/0hE8w6GRqstvOYVXAYEO9";
    PACK += "Pb9eO9iH4WAfrh5s84VDPZbY3WmCP81HS/wofjGYgZu8PQje1vtjnx/6";
    PACK += "+8OM2H50SCZnz0zOoZqcw3jl2MzMh9z8jGFyG+fn3O0QI9LsKW5jX/05";
    PACK += "4WP2k4PD8UPFAjl3tZ8Ppkbd/BPUzSeKu/j9Zz96yE/YiRr85CE/sVwQ";
    PACK += "1P+aw+o7YdOjn8d6q7y2WWxPHPNwwh9qqW8p2u2Tdvt1A4sBPNMJcFpF";
    PACK += "9JqNwUlv34z/Hn+d7FsO6jXb56/ZCX8I4wjegtMAuzdXNX1vt19DpT9j";
    PACK += "tgdNO7FNQ4Yy6PMJB3Kme0I9+aBBJ7UGnZAGnbB9fmKtMfSzGP51wiU2";
    PACK += "KPziQz6MTtiE/bRffei+Ktrth26Q7P0Tk1/3IV2fPxP8qQbvYa2tD0lb";
    PACK += "H7J9mAzH7Z3UQ0Ff2RMX+vEqXvpjSfw3QqKMtIZs4j3PIBZIjDsdJVdN";
    PACK += "+Z6Sf+Dw0lMUFu3GzmC2z/eaFzR7zacot0cxWdtrrzdGRS5gyEmBG6/x";
    PACK += "V3qNv1aupXqZv7rRMn91/TJ/VZupV2SmXrF9/sosc9WHv7bAV3T8NS50";
    PACK += "1x322l/rN9h8N1jrKz9u1nxzA4RHG+rL/rW/7F+7Zf9Xmt287N97y/79";
    PACK += "6mV/5pb9L5iDdntq3PC/VPDDtR6Dq0JZJWZ/m9XQ+jsjHgGDuM/HvX3P";
    PACK += "VWXf8Bf4y4hRTMlPuoTSLd6Nr2CV2RGEQc6ifVZvMeHhJnxslXs2He3+";
    PACK += "PyZq7StR69qGqfZo/nc/4Gdp+/C53a6Ywlbd2ee27iWZPSNphNKlFTym";
    PACK += "ei16n/uHJL0Jd6c+SOuWa9Gzvq9mnAb6pWOlzoBxi/GHmtjtdnulEMhr";
    PACK += "QqBf2Jf4eF0IVHMz9ufmWpmPTgnaHZQWKJyXcdwjKpjldaLmhI/rQ+U4";
    PACK += "533LOattvL+Kc7YAZna3A431uGl3/oWs818TQ0Chg+KG01CY6drtR81D";
    PACK += "2rDScqMYe3Ld4MQMhiVOck/aOkPV9HnOyyG4FrDBEK+6MTvNwEdKyWvn";
    PACK += "2tafaTzK72lgv30EiZS+pzzLuS5LtKEE2/c0M04jvWfRaQY2jRN9Q6Vi";
    PACK += "pJb/1CjCjacojR4AxxJ7YKBdRxv0wCxYtiu0s/a9mwvwn3VnjvQfxXGy";
    PACK += "4qGurOEVVNbm2qWURBUQ+dU4lIFngxognSQcLDRgnhX5MFVOUNYwpky7";
    PACK += "xrXINCkSG5lrDhgbRyoXpP9CCH3/p/A0v3S0Ydi+A1aCiNHWcKU93RLB";
    PACK += "jGEJyyUVy9HwCvMKi8CcS4AmaNPEh0YEsG9lYGk9z7yu8ivsRtJhtNmJ";
    PACK += "OTqynGfKssmdHQFX6eMqWHVPcWU9ttb9xxXaXR5XdZedIcEPUbaKasPl";
    PACK += "E7bo55lVY+sm5OxpGiHIrb6R4R+W6ceA1knqgSyxFSa5J8BABghOTd+C";
    PACK += "Vz1jQnMLGAEW3VzntizCRbMGCyrA5fpr26uRebUFyzao0rCXNgE8sfq4";
    PACK += "VDZDP5XNJ+2oogLQ3oH/PL/6NiiFygUV2iZxrh8NSg3Dp2yS2aB+rzwd";
    PACK += "SDFKrrTrgrpJhti8iUtoycR4DJm0kyBjzVg7lEAvSQtZ5bVX5a6vVvfB";
    PACK += "XtfarzeduxN2Bqbbe647JjbUhW252NBX1O//uaDRIipiBrNlCew6eEQM";
    PACK += "JpjGFE8wNSggTX0bDM/UL7dlCeZLFTrnka736ngut4x+DXwZdbujl+1N";
    PACK += "pEBmJ0njZlLbRcqSzatE27SD3YN+fvpdXqmdk9ujCSom887c3jTVwt6U";
    PACK += "CoB6Ve10b7ov2PH44of9VP5acTsIHpnu5+3t7v3tze2OGgQzlJXasuBe";
    PACK += "Zv1ucMexfAHZodVjnrM/UtUI4r9V+l7HtBG1c44eUlx6ZXOM+rLJI2AR";
    PACK += "6Cgkbf4Nl2xuJQwdU5JystTyDXutFp2iSrjykFa41behr8gS3DCXZCH2";
    PACK += "CjOHGWDbJAUv1FylzCR0MEEjpmX+K5V7pdLHBdzt5XTbymu2bY3mFGZf";
    PACK += "ynBfSrsvmU/lDMEE//5wk1sfgNpgcwAu1+s2fI2yPZdZeFL5m1SRYeW0";
    PACK += "mNVmNIUE8H6TwEiuumb3KQAt2akPn6oVo3CT5mzAS2x1r9QnHpJj08uC";
    PACK += "D5JUPRiwlJf42sxbsjO3Xmd85q3XOZ/VGgtY9hieqL8wq43jIJmbL4av";
    PACK += "8zJGRr6wnYP2nALYl1kRvRR8V/mAl6orc16YgKoRgNDBAh/yuVv6yFvK";
    PACK += "9ggk0VF8FXQHG0L2zFDtlA5ukrm3Seb1TTJv2iSxQWo654Jd8rlBYgIC";
    PACK += "NuQ5gk5MLO4ZsGD80lathYxzL0HT1Sk/V6q2ITtlI+eJc8rPvcDyW1vJ";
    PACK += "uXbxOjcuXrs7O1t3F93Ne6pEJ/ziiDd9s+99MDlnIz0j5nOnKq0jbY76";
    PACK += "wGYCK7yzXLrBsUOu5sd3tVvw3W024pnZrfAlTTDMLX40P05Giimcx7Ei";
    PACK += "HMOGaRv9B9PGZvZ8GvAZH7KSn8aJXSNDli74yIAu4jk1p3x0fZe65xrA";
    PACK += "js/ZHMAp4N0R2Y3hjucj1rinl5q2ggs5pCFzGiloKiObhJcsq++7+odm";
    PACK += "rHLNpmd15agLr8B1PV0gYcoFy/Qxrb3YAdiu0lNSuBbZWtWp2Yl7j6oF";
    PACK += "T5lmovHK9xc9JQfqw9Lzoars2rBXWgqjUV7g8lY5kM6KgnRWCqTTTDsM";
    PACK += "X7ZGZs89UhVDzi+9LbLrdOH3uxjQkanNIuOlyiExkxDU8wKjlGYyZoU0";
    PACK += "V6m5coz4bRqwPqs5aN3ddhEjxEfpXeo5Nt+OUqniZAqpQjxeCAYfFMS7";
    PACK += "10CD3LqvIL263QTQTnkt/UwMnN9gKjBF94eDP5JnhUJabLXiAI5RIEjT";
    PACK += "vT7NogTcLXj+kRq0ZUwoX02Mla/4swJwN+Pls+iFabIXZppjGNELFRoi";
    PACK += "4f+UCmYj9HC6XUWptKEsGtDydhW9IPEtuf6UUkT2dGqeyBusnLpbvUDh";
    PACK += "qLD1akmDNEbnE4TZ7JDJPMyM06yW2HuVp9uriA+odhv29wGyekT04znx";
    PACK += "BGW5daXIFRyE8bYkP9dasUs5aLS59rv3wUfP83ndkOJcDLI3ciQkARNE";
    PACK += "V1viDb1GAltpvV605ZX+bTRXsBD0LQuEuNRupsKgjaEPrVX5+6Ol67Ho";
    PACK += "o+6G72sGn9Fcna3KNkJfYFvKVeG2BeKvWRSJ1HMx7fTEg5OChvacQH6E";
    PACK += "jZOLQp79AYkUEF/5o5BlWuQ6m7O21prXeEcBDMjQjfRxWs7Ak1RIdlBc";
    PACK += "42PKvle8wz4oCvVZh26oPxcYEfUUEnqxueQddjAB+GLroidsdLrV72x2";
    PACK += "6YL/kdqEe/VUeT4MskvMGUAigwcgZrbLIbNdTjLbNfjwfkkdnAYrlGN9";
    PACK += "xQv2AdZMcDSo+FGfh1e39OnCvrqd6vIAhieMPt7fTpInE8hfFAGSB3ua";
    PACK += "x1eFispPxxEZws2dB7yoacXAolms8y77wj+vbBhpziv3KX18P82RxyVl";
    PACK += "9jJW8c9203/G81X/VJMOH/tAp7qqNazTeEx8TTWcqOBziZjWugx2kRR8";
    PACK += "KmzBK2/YlDLCSWf2J/ZX/fzhLomwqL/0xQz8h2A+vnCRfOFftK6QfXGN";
    PACK += "eS1UFN5nTuUAwT8QucRzlq+3WFEowdVg6mNhVVMS1Qibtg0++YVX7DMX";
    PACK += "PRNVIVboSbsw8J9RIRcM3OdAhebG8DORcN1QqrtKtPqh7/xQigHHpd5w";
    PACK += "NA19I4NaSg/AxPhwe1w/sCIJEWbPCqd8fo2JiHil2mQiBxqHBDaJkpEP";
    PACK += "QG0sxehAjOZDIW1032fkx1x/C8j76KTbgjJnmScNpob/1GoipU5gRhGx";
    PACK += "JLVygB7KfR7aq68wKifJidKhp1zTlY2EaVZz4OTMGR8g4UHJ8nvVRqTB";
    PACK += "WezQe6JSC91KVZ502ACHMxlsqAt2Oij3BxONAZcMNrzfTNBH7geVMZnk";
    PACK += "wVt9WjQRkWTmayp5nxalVYtm/3iLeqUVn+a85Kcs5TJO7ECcsg9GJT5j";
    PACK += "IArMlgM+oBojh20EV0XsKky5THQ1c/YQehYcEDHmdEJbSnh0QFknFqX6";
    PACK += "l1odJfPXqH5jqeM2qDwkiDwkQB4qjDhku1Vgt4om+UjERtcVGghAMFL7";
    PACK += "8ShoOcs3RpovOHb7cf9/aj+6r7HMbUVWNLGnbv/kdZ1Tyu0A4DCJqGCp";
    PACK += "WYgMELbJ4IDtKot7D6HQzee08GbR6XjJRBdx49wWmiweFUySUZ1APBHx";
    PACK += "YfaCWT8wqYY64xWkVuTA48hgsjKUyAs0MfqNzZjuBZAYRc2fp9H5kMDX";
    PACK += "Aw8kYswrxBBx4DAfzMrTApMoLxbFYvHF7o0vfvXA1be7OhrIePp3tu+x";
    PACK += "gYzus9PwKxmIiBpWSVmGv65YMtsQQgTEbUupyReLKSQ6gLybVr/vRmxq";
    PACK += "g7xJPO7WvW04E0l/koopnL98ySr+wVfWO+sA0Kiy2kdBX9uUqkIKbSNi";
    PACK += "3nvILarHYDsEOx83N6y01KdFQNmtrIvUl5yYFzUYIWgA6GRwyS6HkMq3";
    PACK += "fehDBpwPfei9WznFhPLeocLtkJp1yXfQDo0tIBADlc2Xixw2mB9sFl/L";
    PACK += "WxMzEam8UoHnPWcNeSYw3UWX3aHpBL6TCKOnND+vA2cjcV4QcBjF9b1J";
    PACK += "NyGyRDcyAzJDfJxZMSBUSSlZbT8nAoLDcFNpg6iph/+ckKX/AbdXSGAF";
    PACK += "oQAD6ebfom9cgTJRMJVkMKnYSJSVLC4TSPw3KxNJ2bJ/cjm74jp8kgu9";
    PACK += "rt0TurYbykO+TmWPYcYWz/QzGXwB8BQJXhmQQgONJqLYHzNi35ShlQPX";
    PACK += "zAez/SFDrb8yBjLqLuANTX+ky9uLTu1Us/OyZkN5jSuS117qhQl2PgfM";
    PACK += "4uf6+VXwdEPPJfEn+ZFGksEDiAK+amg9tKeA5MDGSeQmnS08V4JHpceC";
    PACK += "P5fRva37nd2dXXaP+bqv56lX8mUWIVkPi+0Nw2LbbDMoc9JQZjsoczB0";
    PACK += "4n+DXBA7/B/IRgzBzBT2TnkZLbX4RM3P+gUnnHvvObgo38p9VqOoPF8z";
    PACK += "ZjmdJQqJPe4m3aGDoZcRRsSeofhb6h3x+94Rj4ur4lWwuCrLG/lLyKAy";
    PACK += "uXBYuogqJo+6x3EfkvyB14m/MI4Eq44ZPT5+/t9qipqLXzfobTD6wAVs";
    PACK += "qoQy4I9l6TuacBy1X+sy688UqG/iJHoogHvAZEv8NSRRt3xzjnxzzry6";
    PACK += "gOsjTTqb0DH62PsI6wGMSNu/5/082WbKKKLG6KAgCVR73i9IIguHqkAP";
    PACK += "uSqKCWZOzvyikizIJzekivsT3z1jz2RpybXcJY3cFQpckJvJ/Qo0KewV";
    PACK += "nOfxH5CmKnep2HNOvKKIL4CimANYSc+Ezk6VxexPxcBJ6rnws6nBLPuP";
    PACK += "Wot+9q7BGRE/i9AZwpiDlEWwsKq7wt2P8UHVJL0wqyaIDauUBiXVUT/n";
    PACK += "RZTC0IH04ou2iAFFRFolYs5ZGpvcQ76jmRNztf4hsx5m+oYSVZmWWLPQ";
    PACK += "wyyz54fi4AZAl/QqXNopzeiUIogyzCdrnE86oa88ttKNNUGt/aByY2l6";
    PACK += "ATcIyLEmRk9zDnrGjvV0M7qZfKVrkM9uYO546xpEvBmHxLIXuuL8bU8c";
    PACK += "9J7P+JUUA4Mqlvwp2LwUe9afRf00EDT4y/Bk+OOP6QyzpZ4LBWhpbuel";
    PACK += "kIhmTgu/HFwW88q7BQBn+tLwrObXWF/p7YLXj8W3+UR5Z5obYyGl8dhU";
    PACK += "91wKVfOROQL3HxZzOTSFDi/z4f5PhbJ2CJylafkILwAH/FsmTtLytbg4";
    PACK += "EHB8ppmQyVp3yd5Orh0zB5dL+IenNfqHZ0h4YB0zsaQj/icd8Udl44jT";
    PACK += "79309H8uI1hDW517q3iA2nw1dsurB5mjptlf+arhuuxK8EuqbeSJVfUz";
    PACK += "nl17Qi/pygpHSm0cv/7cpZwD+N6kYqFugug8ASPynxPWRIOsVi2ZbJbV";
    PACK += "9uuymqzLamYrUQznurQKTtAWpbQmnapBVO35Xgbb8Fta34YNgNEN619V";
    PACK += "SzZrkMpN8O+l4ji4OOq4hOr8jPZcAK/GmqpnR5UZAZ8AkO8sm0lB80L5";
    PACK += "wLS8puCstOpQW34D4KgOoAzlPI9iCzCF+oi/pjqS+PllKCflWn670noh";
    PACK += "5mmLrAkp0wunYI9KX3cmWUF0Z9drwKBsXtOA5UtNLGuT9hRlF/51Ix2J";
    PACK += "vErHqZBvpRinP3sOBSwHBEMEK8wBYBCBCR1WYewDDa6DCbqVtNar9dZB";
    PACK += "ax3AhedyfZ11HoA3QrXOW89a67n3SszgdtIyKNIHk/V1V4kMi6+3kpZd";
    PACK += "XqFqZnn9YfDk+sNgf7iSnD9PG8n52bCJhO4NawT5ZGjJ5s8hJXNnhdn1";
    PACK += "F0O3c8lEmSiYIiqlIr5/YUM7NboZsrfAsIZmOxH/cnur7x91jpmqr1FK";
    PACK += "QzresIknw+atOxvqhflkeP3Evfr/3sTt33Di9v+hifvs2NKAdiZ/d073";
    PACK += "/1/OqXPdeCysZgbzlGi/K4VWd1UpL8wq1gFJ7plz2gBsYhGDQwZNkYy/";
    PACK += "wVXDcQwO+NxBDKVEL17Dq8vRsQH9q3Iz/olqEKR6qekBmC/ueX7RhBXR";
    PACK += "aL8fM36Vlq+KeQ4YePWTGDHvfJDhMu5/AgkW3INwa4gcD45DUQUr0Jgr";
    PACK += "6lVoLcJAmXyUQFzw5wJdOHqF8SYFL3CTRCUqiPsgHBkYpgHJamgMgla7";
    PACK += "o2T3RarrOLZtPFCZTf6xdoK/V5f9z7X3SSGHxgnfZ3ZXNTZXjXVahucg";
    PACK += "zcpY5w3aZNWacx+1DaxsA7El9QYCHJ5pIArDbvN8KKmTEUs9IHOHpm5M";
    PACK += "HBvlaTEHXOrpDFJ5VdpLljpIrCgTSaw+ISBx4GfnEOPS8u1cCuXYZV7t";
    PACK += "r1USB2CxgCtwg0qoi9TrAOJ8rcsyflahUZZg2geGmoJGZxsFSb/gf4qo";
    PACK += "ACUFnwGycf9ZlRBkcOlXWTKAS+ZSK3P7CKufxckZTgZgslUqj1CNx1Cj";
    PACK += "SmADzW8tiegbiec5JflHwI+lQK9VuIK4YP8pDH72l2Dwi5gRQvi0dITQ";
    PACK += "dpO5PD5mTj+lWXYghiI9Fxq010dHXFkQF4Kr8MPrw4dP9k9uXO+vyuvq";
    PACK += "7XSIdvtjttFAeqLKlGJBIOo8rQe20NxfGBzPc6YzgtVOCwX1CI7RGHrY";
    PACK += "M+mz6FK+dg1npqhZy0XjWnbFcNkWcbyySfD5iageC5me63tPZDHFEWOk";
    PACK += "LdTwqY/EAqjOinrJPK6qnVZqQ8szagdWKePqJIiUbpp0PC8bwUWzjesL";
    PACK += "LhZRZdK5sWve8cejqUQUs1+3MaxmZcFIEX3dspXrNjOzoeU6jMPK1aHx";
    PACK += "q3kinXicjhqa54JVtJKI7ItDfew5a30LEuah/0u+zotRJJX3h5d0ThrM";
    PACK += "1VzrgQvwLfrXf6EYfWsCqXYGVZpPbpUVMPG3/rVebExFWQ4mYv1f/wW/";
    PACK += "8IHm2bT8LFip+M+KqdcyNkonoqzFkf4sgnSBwfvaTI2KU6N7Uzd1ffqo";
    PACK += "7tdqLlM3GsMiL4tMbAhUDVQmcanqb359Fq18qfW6f9j0X5/E4OzVYOad";
    PACK += "x/peghih1nxsD84ceIw7XdirKjp6i9lYR36lAU602cIon5XvhY2ptowI";
    PACK += "aeIBZNM7wPwRl+DnxnSvlywnuU6uaYVNO4PMQQORwGVAEJmkHxBmQuBV";
    PACK += "W12X6hKWjDJoVmM3TKuXxjbjyLl+uwghfwtvp+yh/s7fKdd+ymZg8SlU";
    PACK += "dGH9JS4Uf3EoquioOk3L4zi5qDYGo1EEvzRScapO4OFZD27Wm2TWGruy";
    PACK += "jw5xMafmLEmTVmsJUEFkwj7VMp/M0nyyNxie+qHVV94jbO4fE7ObVdt7";
    PACK += "EpFo0V1Ku/6hZxdgBWdUDLNvMPcGMMSngzLKwVyaYd9BmuJPPW2hkrEq";
    PACK += "na+Oee5M79CXR7ureqjpKvREw6T7h6HCS9dStIs50fcSZZO1mc0IWobO";
    PACK += "omkjfhth7l546TND9H1tXIY8Sn0XF7izs7WbONLb3bzHrJdbd6vbubtp";
    PACK += "frf5nZ3Ne50dZjAQurgSQxivvnrcvQtg1GpPdnEMUfw4rNCg1sUcmMY8";
    PACK += "3Y2ZiEkjsFFWkM2YBgf/swYO/gaRusEkTkAXSkH9zFQCA9u4Adp3ta9e";
    PACK += "nJznGLKEhYI0QZ+9wVT5OkHXbnkqKcZmGkY5LipQUrqQC5T1cg7RAQS5";
    PACK += "ZG0k+gGaQoi+YEZ7s7OzZUahzf+dsVwhE2Ai+u/tdt5uvwGzqHllwbtM";
    PACK += "dx6Nl7rzNALF6xN1uNem49zP09HIna3N51ERt9uFpwshGy5HYjGQzm80";
    PACK += "by7a1yFT3R1YH4AmVbDHQ836SdVPARBRqllMa5gxeAVEE8TGAWCoSgHA";
    PACK += "k4goM+8q1Nmk1GIWHyaLubWGprzwo7UMFIDuBkPjmDmhK8nyKGUSM0Uh";
    PACK += "Nrv6vA2VMpNkVT1udgTAX4O70i/bTXJFDcM5W/PnTNQbX0n8SthCSOaN";
    PACK += "TiSVn/RE8oKODNqJXZYOJAI+nI5yj7D9U/tUV8BqAzAgYUg0bUwgevuN";
    PACK += "UrGkBkmsuD4QBY8OXBMQnXeajkYib8Uquo5QvzjUXCIgwkttchvCSfO2";
    PACK += "KDItOFu9pfEivB3Nc3YpYnYpFjy3QStR3nYZVmIvNyV3uoEN+6kF+HqY";
    PACK += "QasI7Ax31bBrWip+3dKGcCmv8Wor9f6z4ZCNvUty/1NShy1bfHbJvbFo";
    PACK += "DESLEwgO9usxRElTuEydzDh6JJ+K5+ilaHRE6JDNZUmhpHTWBTyxzV7d";
    PACK += "6W46srrZuX+3u7NJIcXpktb7cAZpXH052bJ4ICZXoMwxJ0VeOynk/+BJ";
    PACK += "IVefFHnzSfElPCmwd6ara53eBHIymJB0lVbG9K0iWiYbna9Y09d4/AIB";
    PACK += "nKeRqZ5JqNB4XPlHUspJbWzOq5DYaZXIXINxpEYxwQZIwGtqjwFVe5h4";
    PACK += "mP4A1B2DOAFYgvo0soGav4FmjWc8X63SODWi1KxRo5DeRP/QOyXlf6V2";
    PACK += "alREpBs3Kr9YIMiJXCwgsmoQt9tPy6hiKZNsEDMHozKqx6hocX8ESgBg";
    PACK += "OFKYyTIsx3T1wOKWi4VLiLhYDKt+1DRUSv8Di2MGC6VWZcyiOR9Wi8WH";
    PACK += "EkvNmWQjVsLs9KNfDdxq1U16A9XN6pJ+B9JrFTbpTRU26XUKG1LdrxQr";
    PACK += "VahYATiov/0yC/Ygr8WK8TJmZmOCv3ep8TLs5uQDJvn8P2sF6OqNu4RH";
    PACK += "JDSsWZ1YsAGvDGhpRZFX+/PksYjUMzZ3bR/AZva5khGhMKVPYcx8lJTC";
    PACK += "mIDFfgkUpoyTqGykMKWiMEb4Hl5DYXrRzCaE//skJv6/S2FONQmgFKbU";
    PACK += "FIbVqAtrpC49BfgTUiJS/flKCjNspjBDoDDnDRRmQCnMACnMOSvBitSN";
    PACK += "+9HsF4Onhvsmw1YvuZLO1OewRmisoQzaym7QxJvQG6/SFVSnqTayZ8lb";
    PACK += "N1ia9NVuZ3N7JblqGjwABAokonZ75N3EOYZh/gvt+88/gj25Ae08b6Kd";
    PACK += "54R2lhCX/P+jIVGE3OSF8LliAk4aYFloTl+rKmsoKiqNcru9lhphLGu3";
    PACK += "H6vtDF6CmkEuIOCJHh5/TlxadBOjbvduvlKLTMdCR01pdRHxFiV6AMvk";
    PACK += "p30D78J9XRQCE1rOXD1UYGxgbUs09z5XZUKXU2WjIT3uNMhKbzw3dpLc";
    PACK += "3px42krbVwnFg7u1G5izVa9RMNLry3Zbv25OTRh9Bazkw2mTuf7aoMfE";
    PACK += "9ILsYRplRIrZ3NllRN1n+widGqdeelQtxJIMqahMsklSO8SlYUSyl/4l";
    PACK += "wZvAVf5KufHIHv0gPrGGJczmqFSe8xR01HNORdZG0JW1bhJlBneUzfsR";
    PACK += "CGpESuxu3keF2grsFqNWAo056mRvR49Y1u7GFrDRbiWUJUXt1CZZtJWr";
    PACK += "lMVUspX3A5VM3yhCuomg8Er2/r3ElnDaEaUjiFKqIoJ1PzaQcwXoGbSW";
    PACK += "sDBKFpbyK7iTGA0RMy8n6ZJFUjeJWMPBicepZzrg6UP1ZmmcFPx9BtpA";
    PACK += "ZlxdBSDho8OMvlE47R5R9BUWi0nYPV6Yq2B6R2mU13f5OAWluZgDM6WS";
    PACK += "hWR1dwA3IYCdRybEQluaOX2topSgK3NUrmAUJ8B3kGFNzZhmVqOKmHwk";
    PACK += "J0i5cozdXBmf4yi1Q+4wrjI1dap26Y+/9McfsOpcIkW9KCToWDPgf+RG";
    PACK += "Of8GW/4JojVm3s92d3v3Xqezux3bsegX8CqQVHB7eAOa2pRMo0vyR6ZU";
    PACK += "0kszpXYiuQQtmbcCRdMUA2aDzc4Js50QspN66rJrSFBKQuvKJSuCBZMy";
    PACK += "bzV7UPD/zpvWl1xa/ZWZbsHtymVSabP1fJ+ncF80T3jM/G2PIA46xChu";
    PACK += "HkQPfBBR2shku9DsiC6BI3FMVFy7McEhIFPSCH0lHe0Wcx/EB7b4yk5W";
    PACK += "gHyLe8JQgKqeP5s6OdWj4F1k6UPAamZ1RgBNk7jV/XOEpBoRLqtlY/+I";
    PACK += "RUFvdeKxB/aO2GdT2ps7u/2IqBh37jLJfxaRDVrY3AQjnu4PGETg1G86";
    PACK += "URyLYzpVeeZGtW89QpMZQiOvHXyywlhmJ0Dv3Qx2b7B36VIrfrV13ZJV";
    PACK += "xo/6vKTxapKdNpLsIu7VzRIm6sUMpTLxYhwlRRxEEE0N/KLTL4NTD/mJ";
    PACK += "xUswdMeKd5Ubo0lp1dCSz1nBXXbt+3Gs5hSsbToyhU7oEjFXo7RNaYXi";
    PACK += "TUZisZjrFn21Ef4WKjNt30k1DuZ2kvFNDWipEDF3k4zfo3d2tzVW5uY9";
    PACK += "dbG5s6sudrqb+lFnUxeCwBN1td25r4vd69435QASRV1ubd7d1SWVlVsV";
    PACK += "QHOWrmp3s7utS+9sbm/eu2c+holgzfdQ+a8/idon/cq9rXv3djvmnd27";
    PACK += "d+9udvVLW1s7O9vbW/qt3bvdzr17uzASW95Q7Gzt3rvbud/dhDHavbe9";
    PACK += "tbO9sxuAf2a8s8x4lAHFLOcl5ojQaQrSGCej3wHIbrVG4Q8ubMXWoh+y";
    PACK += "/cUzhe6eYZCrRMdjCKCxOWHmURxu8m6wyS0yDcXG7Efejq5td/7Jc6sA";
    PACK += "ZzHlI3oATeOVoQFwuhAenakU6d4Sj9kF+K5iyvr3onZKvBVHT8T6+jH/";
    PACK += "Ipi9/kquH1bsCzCn6Yh9hb/FuZDjrLhgDyvlBo1kVtK0U1Ym7tzf9QEk";
    PACK += "SgfJ4+Wt8AHpvZQpLmcF5G6xqJkekMLbom5dClg7B/keCgNXafloMDy7";
    PACK += "GMhRCfGIKIXagEP787AaSIXr3MFAwkSyapBmYJocpNkrILjZMomKDVKd";
    PACK += "Jpq6Bg2ev1GvEjllqBSSnW9AfTzXF1Axp3L9w19bgQl2KoNTAuoB6mh8";
    PACK += "HZwMALwEkawiaaQhyWW7u9j0Dh6HOkjElhCMVSQQ4yEswKrwkGaJu0+z";
    PACK += "MNVu4xqBiDhn4LIwsXHTQx/rVfhYryqqs471iiptixuucgE1or2KEO2V";
    PACK += "3HAVEMcjESK92jWLbuIG6bXNu5gdKnoEcvgvzO7YHOyxPi4ydVa0xoXE";
    PACK += "hdbCUc8t26wSNfRyl9aFE8cjsv8RGpggZAN3CZ4cRkLJeUZYx8x+wFAs";
    PACK += "TYcy9wrLPY40Zm8B5RjCBAB5JibUvPXN7BPTfBW72/iRXuYvJJ79sj/O";
    PACK += "mykzKcCc7MUy10wGvcy4WKqmdrQME7S2KiaiOhWylZgeKVYT/tO8QHAS";
    PACK += "NU2jc3IJtEva4nsV8v3eZnO+YzpWoXbDCl2u5ryiwOUk/4ifQcnPHRUj";
    PACK += "AopWJUB+Eup44XFhxp+EBliYPam3Xi0F55YSwEOgZo90sBzEJeEgG1R4";
    PACK += "mVsVLLcMqdu8ZMULtyTd8myuk9TkL9+V0/XSgpToLVmRDApbyRtAWGOg";
    PACK += "gvPYl2QE9z3mLpkZS1rcbqOTAH28nbxLXfRDPcueX1cnMWcCuvCeGBVi";
    PACK += "Flr2tI/u7eg0Y9LP3xWHN8zu0d/YSpCHDVVZlqM1rHPdW7OP1M6eNu1u";
    PACK += "3CjX2KUW8tB9qyNM6jUJbpc5I65Pei4TJSGEb3kdu686Fi515N7r5xxy";
    PACK += "8qaz9kzu0Q4hrGttoIiKKQt5g0yf/S4BgwZEU5TUa37MpMYqp/tQceCG";
    PACK += "Xd9KApezDrNOZEvf/U7HN34fsknKHg3Zh2Hv+5D7MXQOctuc7rlHlI2f";
    PACK += "6w5Av+uUg7HYGMxgs2EcU0SSgBHMICi8hukk84Ai5P5xnuNWrh/n5DRW";
    PACK += "h3neeJjn4WGe08Nch0Ioz1U8y/PwLDdPKEVZLnuTlLqVL3uP/JHzw5Nq";
    PACK += "zoewImgEF9pV/GQB2ocWe6LpTa5ZgDSfzatWkvHHhZJUpLqCDA+AHk9O";
    PACK += "sFJkYGRPMhWgmzEdYaFOL8TvxQey9iCsCajKQIoB1PXGfvdN/bv2KDQx";
    PACK += "LUW+l6WQfaXB1CvN01qcS5EP8f44i5cPCxWgiYasXq7T9xUyGkBQcYaI";
    PACK += "7xJ81d9cAAb+TMjqMgJPnazx5tHgWEcUpuMI5bOyusyEjmeYcyiA1adQ";
    PACK += "/Tyeh7WkYADIEUTsCnz3j9Jj3mppVy9wmGqNBvlEyGJeZpeHovojz4V8";
    PACK += "9v7VS+1P1TLcuPldzmczAO5HoS6v9kcphmR/GshcJf/0Sj1DIpsWefB8";
    PACK += "MK+KJ8VwXsIIfs7rfe8Xi0UEU4W6pAKzqSrt30CR4tiNqjS4UxJGQ2WW";
    PACK += "0cE2MD6JgU9sGmHw6JgD/vSa3nRzPd7hgEO1isjooV5rGOvFomy3y6b7";
    PACK += "DXPg5q2My6Z5mx+lx+BlcZQe1ycR7upphCd2uMCqoYcJnPJ5qQgZdmXV";
    PACK += "VPcBfrtfbpycnFbTzIzXnM/78+BeaeKNQcteIs6YPzdlHCf4Lbtu+saR";
    PACK += "Zo1kiCX3dGZYbL9fV6u1XsbJP7PqmhdZZPuDbS7yw6EssqzVbr+JWqW6";
    PACK += "BgVHoSzipRnkhkUJebjy2oDo1QOHLyxRgEQPnEAHse9bsVz2PjQRaDjM";
    PACK += "ZFDU2Thf5xbzYO17rImwsDK6psbaiJOoyJY0I2kqlAexPTCrhtTkIMHF";
    PACK += "NCOIgzYTjjVIfBaV0uVhkWWDWSlGrSQPWyBDmTBvaoEMJUBpUSxA9sVG";
    PACK += "NDRJXXvtSnzTBLH1StGIB0fMtfae5vWtJMFysGopd4UqNl2z1jUiJeYm";
    PACK += "OVS5yAg/x+RilWFLPRr79zKnSciI5Q53PHz+P/o0+eKqD1ncHPoeIM5R";
    PACK += "FTPAQpMYv8l1GiLDPzzT/s1OarEaYf13J9HJ2UxeJvx7V+tyjQY68ZI3";
    PACK += "bRuOU0IQNHM8adc8oOLOKAP9aVDSMq2+owkkXmLPoonKdSRiBtlwnIFz";
    PACK += "z3hPQNos7fgTPqyV1ny1Z+I3C86Y9h/JCFNPGZqQrPQH2EjLx1bmcXQE";
    PACK += "DEMoMIeePOw92Xd7afRexEZDCzrkiY5ODMdnJ3kBU6dj+4JMUwoISzlm";
    PACK += "1hAPYBz12fuIBskw49KP/v+/9Oq3esA1qRMi1dzXA3l/d9flgXHdUXq4";
    PACK += "ICsWDjdEM9K5N12yoWQ+D61XtDz6JI7BOHWUyWNeMMF9gxQzLPMoHWTF";
    PACK += "pJW8iVrDQT4UWQu4VviVFaWAH5SmpmM5mIoWLnDjp6p+iOk3oLRvohbE";
    PACK += "uYbvnacjUeiSg/koLZSWK+OdXvbgTW6SFGXr6/Gb6E1+lB0HFaiwZ6wf";
    PACK += "g5VrDZtOdPXpdDAxLczS/Mx/h61o4EgAzS6xcFVMJlm960q2SEuAEsF6";
    PACK += "0vx8kKW1qoxkITdOLiTIexq39OpiUL6aZ1U6y0SytlZsTPWP5TWVOeGi";
    PACK += "bPywkgCK2Gg5zSmAjF4BbGRR5/UMO18cpce9tJF9mnPLPvXlBrRC80Ka";
    PACK += "gS02VnE/a5yvddrt7zLy3mNzNN3wI/ctNj+OE/I9zZq12+EHW631f+yb";
    PACK += "UNdxnNT5M2SBDX+WrubPZLxsljpfSbC/z3GawGmueRpVqUEZNS8atbFm";
    PACK += "KO0ljWJjsUIwlJ5gKHmY90oSKHWPrdNe8JnNQsg5v9/PkmyjgAjZxzrz";
    PACK += "IFPhcVU1S3777eLiYuNia6OQk9+69+/f/+0ncO0q68D5AGJ9blC6n6O8";
    PACK += "M5TprGpBbHG6oZD8dY7DqDVKz1tAkFMjOvDWA1X+9wf//Zu+aulE69Pi";
    PACK += "XCi9is4cjj9iu8LkRlqSRV3/XM6uUkhKnJZLtCbWnsdMtVhNFfiBA+aN";
    PACK += "3cb91F7ytQ5yfH+CDTXFC65+x3Gc1Kp+fYgwuUxooi2QaEv2XR1Ma130";
    PACK += "e6RHi4AUtsZczr8rLcB1NF1Qmo6bQv49ul5/92/QdhH3gkrq9L2hkTei";
    PACK += "8YLQ+HodTXS+4UuW1qMOJ7NaJEp8hbeBzZ4N+6X3tbj+MJDkMMhWKZ5W";
    PACK += "f9w7JXST31zXZOcfINUJkkHIizo+CqVwAA1ESCMLi7k9PyqO0YysRc7+";
    PACK += "xSASrASfxr8s+Vup+FLVoSupi/Rk+2IKTtdvFYLWasXt9o9cNYS8ZA8W";
    PACK += "fKbk/OJGcn7xCzm/uIF2qYj7tofFdXJ/YoudpQj3VoJz5urTRuBpA+6i";
    PACK += "a93Vp43A06Z5sUpl+1izsmYpqodVJdNv80pELXyIR+ZBFemycdy8vB3p";
    PACK += "I4sZLe4K6KPQKrISpsAvA81PpIny/0hbVC/tlyPn7Crt6rX602Bsv82r";
    PACK += "CsaFDnT9eHbDK7G3dv69PNuKXGF0qrltmghBC8tlqF6pTCxxcEQ3RxOv";
    PACK += "EC13E4VDWZdyPqjDJNC5A7tpRBgC/eI0ZzeTZ1DU8sUv1izMaIOZL88E";
    PACK += "TdLHIHr1AVOil4SKshb8wolzMVU+OYsjMoL2TZYzB2SCBivfDhkMyY24";
    PACK += "zGsqXxYNDNYtMKb5HFae5D6HFWuu4L34iVmaEZZKjwWdB7lq8pU98ln0";
    PACK += "KGZ1o+SvXPdrkQF1o6VKAttuH3qGc8/N0QtEQMv4fBgp469bxPfv7ex2";
    PACK += "MHTBmr0KjuuD8KhyxfcFTeq+Vsv/2r2nlmMtMR4rKORAGNzRUBHAahdq";
    PACK += "+NUUYidqHVRjUEchIK5fPTVR0GFV0zXKDoYB8qprgVMtOiIaQC/tBB/G";
    PACK += "fYAzncm+UKFDuxlRHNpo5Wy7AA5Fl5SpUfcAXCRrHq1EUxRRQzI244ce";
    PACK += "mh98K07ANRCdqIk80iiLEP1ObGz+ehBQ5WXUQASUQUar/QFq6qJux1T3";
    PACK += "IY0Cx4CG0ndvrKdTBnPceU0LL3AHcC8rK3steCflxDOOGe/+GM3sr/MI";
    PACK += "T0xLtn8oDPfrHNGuc0NLOfoJsdTzPPGcEcwnmeSpByLhSZS+sOkFA/qx";
    PACK += "FKC0zlmT4bzgGIpjfK7bXKued3FEnI+TjXeox9hoOBkTrmD8DIMGBJg9";
    PACK += "plSD63tRR0MpfF8h8wVLn41POm1aSnXfppWp9igybdWFmprrR6rU2p8G";
    PACK += "R2gtfCNckl6v/EktVJh7qhWnmIvNdTfsvUPuAjPHlUpBYdB8lByuY+aM";
    PACK += "WK5+LgPLitoagVPKYtOF5VGPQeUOahffuyj+/SL3In837yEwiFu6hixq";
    PACK += "J2yXK2FNxniqHGbgdS/oUVOvLg9QVPJVGyD3NoBqRSc2Dq3mJeLW6qCH";
    PACK += "IO7UrfV2e+17nXCoY2Tzf7+L4jtNTrQ4HNA4F/f214an5/nu9lGJoexX";
    PACK += "oUNiiqkPlcsuc1BXtnya2JLGsTe17Ks3kZCKUd3wPIUrM2rWEtjsN/wO";
    PACK += "WQwvAign/rzoXdrPYVElOfpbwfEYnjd1d6FC+bU3R6ewX52noRkVTtKY";
    PACK += "yZBx6keXggJB6RNWNc8nn+3dWn1xEp5Hm/bcJPd26L1l6Ia4q+1fxFny";
    PACK += "sc7qttJKttqQBaeNsuUJzbeYNnPRvgN37i7Q219lCQqsXc32LVdnpCu1";
    PACK += "nIjlxm7yGTsOaDtq5p+vi09dxRlXNTjDWuYVSEUPbOTSgnz9jWHq3jcd";
    PACK += "wKa6Bz6zdFO25zpfOVz8K5eVlWfJskLPuU8KCx3h4m578LCHoqrBwx6K";
    PACK += "KgGAzQNtwjDLz8/NhHY5FDTXHDtkYus9cBJAts11ykubhPeTcvc3Pix+";
    PACK += "ZkuXWTo15mJVSVMF2MNvpQcb+X5iHSK+FrzMmOCfIYniewgGx9tahZAW";
    PACK += "OVKsFuZ8UD27KuFOAtoXWoSJfERv7uejpZKXRHKV8wiGxJcfCVbix1Rc";
    PACK += "LBYXaT4qLmxqSsBiMLVBWfpb5RqSIHdJ0N7tKQgj8O7MudwY5MPTQmKI";
    PACK += "v7K1mltvxmOIGcMAPNCBKHBa80s9xZSOTvplhb3Uw3uIGJnWf+OWWCpk";
    PACK += "BvAKutNlJfw34B024x12ygXTbvAVKpp7PeeNOeydwupYLHRE06n90hrn";
    PACK += "WxgJn65nMYNSxWIhV5QqebouY3ZKBfYtUOWv81Mn+mvNdsyiIT+lNgfL";
    PACK += "z474KTvlw55pZjqOTsF/Q8dKIPAr2tfb7fV18AlSwdZpzOBuAXdnXJ0g";
    PACK += "EDCuPkTjmdYsRBroM075iI346QbgTuaoQlie8uEy5+BNdKe7WJT4V7Nq";
    PACK += "atXNcZmVS5O/CPdDDkOoC3SwQMcrgB16XvArnGQxAjsGYFObxXQAKwiS";
    PACK += "iJcZkIADXvUO7KDAtuUHzPm2R8EB1+1oucU5/Mck+v0ArB/G5YTUe1Xx";
    PACK += "A5uRG2B5vESWTsjq6PM1bnBWD/w7ujuJ556ejqNzD0Dzkp8HnPcZuaMO";
    PACK += "jokPMMUnqzBRIg9XCnGmgL71LwnA1GXMzuLeJEyT0IiKM16Sxm+hO/yU";
    PACK += "r5SWe1O62rv9KbWk8lYr8Z7fb7enGyNNeLQZC25RO1ytQKB30wpLfXQZ";
    PACK += "kTvQ5gbKxi3IH2KJxicMB9BuyIexcqJwbKIgkVBm+ZjSsIpUIMyBvWlO";
    PACK += "5XP+rWRI4dk5QZ/OQ1ciwvArSd7Iw325EaYUl0H2VyCRsJN7owJxQDHF";
    PACK += "SltlxjFhe5nJgt2zVxr8FhOrGsjcmYKjKuJlpgN8NeKzcqYmzmaPM5dF";
    PACK += "2m+/Dy4dNr7yGp9zeJk2Pq81Ho4bpc3s5bbtMoqBtNAmwmFe0SZOU+oP";
    PACK += "p4/88PsUcaZBAbyTQOI6fyEJni+bMmf3IdVNQhJgk7Y8XZGrtbomDOkp";
    PACK += "BLXENnhfCQmh+C4CoAITK6Bhv0niG/clrELcqkAjyeyPTJIfVUp+HE7I";
    PACK += "j4vJMTbKV1I4TBHbzFCvIZoUJaIRI8CH1zD9DD8YalPI/hqSJI7ChU+Y";
    PACK += "yy13uU3wFgbwlvA4gZuGL8IX9b3Yi+AiIYyoOrtJGGNP6MiNHZAQ1OWu";
    PACK += "u+zeM43QjnChfx3pXWzCOSCacmUMJ1C7NVef7QEZdLKWT9MQO78aTAxq";
    PACK += "/s5iIVWAir/6+p7J4l4/J6zFRorp59SJg2QlyRvuRUEVESQidrVg7mXv";
    PACK += "nRwR21CBQoNlRKwURjr0uyjwaMLTy+TNWiwqY9yzUL1RRe19LsxGqhCb";
    PACK += "SDhwEmtSgim3w+VPsWU2Gp+70T7/m6PdNKb+KNy4B+e/6EHjc+S7n2vQ";
    PACK += "5wAZ30ZO6vjUmvb2nQmn8iKCXM4Dmln6nbBe+e/AJLtXTKdp9ST9JuSH";
    PACK += "fBpieKJIt6Jc9BYgTjRPMI+vrE3XOxAysVgUOaa4N4ZSNTPPWcZvi57u";
    PACK += "s+0ke84ljEDGnjsSfFuAm9Jz1T2S48pb4ILuEcoO5XES3oiT5/4dEhHm";
    PACK += "B+TdS/5qOy6KiDaF4ecph9duQxHo6zdI2hcnF0X0nK1swnZiBos9p9/1";
    PACK += "uUhcNZ2GcaRVhVz2tuW2gaRlQrner7I0AOfkGBTHWMWQn4eyVZqJQtuB";
    PACK += "YaQK1DBO0Nphc3xEhQ71h4CLtpYOkK8CcIU0Zs18le1kLxQSVB/0egNr";
    PACK += "Rz2XnQzANxsWPa56adJ2hUZyDe6Yh7GnjfVGZIN8wl7NV7R/s5s0399M";
    PACK += "cq2x7EeZgOxzmYgharBRL+oWQCa4jGt1GrbM3idHVTWgbFfAZFeEpw95";
    PACK += "iV6dO8w5iSfx2BFxcev2BK20hdwfDE9dhiMbn/jOz+ci4x4690QSI6ww";
    PACK += "7wuY6FWGlwyTL9J+fBQ+nrxlAj0tlgtJ6fTkA+suJ9fXTTPyI3lsBduC";
    PACK += "g/mrYnOe9jTXM3cisKZ9c4/2PedzGkyJZJ16qtza8os07Wj/he2bv7Cc";
    PACK += "87nhpdJx9HyVFwloRt8NETUtA6pBjiDlcUYwDnqlowYlZWFjFzmCvKVa";
    PACK += "8wNY85BufhAvl8pH31M3bN7b2cZpqKxJ0oUmvQDQeeEFIpGcOUNfQ+ks";
    PACK += "lHDkI2PWJJ9cS/8+CvXBDxAYxGR7W+kiP+XRFhOWY4/Z4wxumH19qRSU";
    PACK += "ljG9jJf6rR361urSS4+GhY3Y6W66BAjtNlI2E/8bSPUNXbj2bQM+1t7a";
    PACK += "bEpbCL34AbsLwkhXtx51l9uI2kF5qsyEVzanO2EpSc7iP0oKNtfpv1hZ";
    PACK += "J0N14sPMokSyDRo37UGGZj515rbkAPxj4U4+mFovt+kAc4uy70U0Z6mJ";
    PACK += "3cNfhY7bhCivB6UhDuk614M1w8hMdgp/1rvHvZnvkpmx0ziZXeuSeUlL";
    PACK += "OZ9LHPPTODlLo4zN2ClsHkNdfE/E20VUgwexHnKng9pD40unUgNkvmPs";
    PACK += "BvGL7V3zjNMACo16Xmgkh6FzNcwYLceG6GoIRht6G0ML6t6HDe8XNefD";
    PACK += "pKmQ9Qg/Ok5aLfhmvMxUIM7NNuDuCkKAC++XDnmbkKDM2wb1PD+wRjOn";
    PACK += "yr5pw7YaG0Y3d35NHBjujG/gtBSA9678tsd/et8NcDj8NjmEURPDCHZS";
    PACK += "DJfNmvmVjJxmafkMLfG8YGvFYpE1RGWSe431LRaRnINFOtYDhDxNwE9B";
    PACK += "YhS+cuSshdnjugaK65ox0+EMYnpr9BrNwlcYU97cQEYXkusxhAevzVCv";
    PACK += "RV0agQQdcMFmNsBz5ngOFJf5AZ9RXbwmFSN+wIZco5ew0Y3OwE95tM2g";
    PACK += "cMPx0k2KPKLPlK5/RA4MZxU8/zWLfSU5hNGa+nBbAPDYuea6Q9fUc811";
    PACK += "h8bh8+u5blzZgOobbKedsDu1BTJq9tK7koPoNHawH8uh9aEYGg5oxA74";
    PACK += "ME6w5HLGZ5Z9UWzjTK2DUy6MZcqo3FTKHutmOeOnilzwU0JSBn3cTHjU";
    PACK += "2Ey84D9u/N49Jav3BAJ7ylk2uGyxVl7k4GGeTmeFrAZ51YqTYkM/5upp";
    PACK += "nERz79MlPw09drEVKbcO9DWAA/vJuF+a+pVue67eth89HJD2gf/9asK4";
    PACK += "NLqYU4vw4g0djBppOCG3g36rlQS9uOZD5jvqQ2ucb26C1VJfby0Wp42g";
    PACK += "3ouFsjZCWR9K5tTXKoKV8rQBSoYaKzUy3GmjavU0VK2SG64CGJjTdlsv";
    PACK += "vRg/qkWD2qNQ5WpK4ksWbcbHLGo4mOp0txtYmLyXiPT2wQvMV7w80Jb2";
    PACK += "pmLIRUIwgMxsBSBAn4Y275U0FolbYklQdRrEIMNmSU+IM1Z3kgHW8s3g";
    PACK += "Z6tZZCYt6O7WloHKQR1571wFlWTecGwZ85syuMuVQt1c14KKT+RSrzfU";
    PACK += "dZ2hrgxWdBkvhWvlsmoDNiZxW+V3tjv37xI/pDc2iB8Ooc8Wtcml2xxS";
    PACK += "3aQabv8Io2eTGsoDBvRLrXlEy1VbGHaWNOnDshWH+yfM/LuWWlwcIvmV";
    PACK += "fG6P9PmK9zPRm/NPUjP6GR5anyRPGZzxkOZmbaDP3IwazvkBs56kLCUN";
    PACK += "Tpuhk7NBlGFUkT4arKycsgNexgk+V9u6sF854AUMcaG0N4WD7O4d8Ix9";
    PACK += "Ahhg4DmW+cBMA1CnKMCRuHfXpn2kgPj6+xk74EWcuCoIQB8qf0LTvtqG";
    PACK += "B54h337CaViIiU5eXjUXvpHVH9TFj7Noh4UAdcb06/Mb+iPb7fZaJmKN";
    PACK += "waVcvuvJqSLtum1SRDfa/ENp1HkABE/inmzI4RJlrK4YvIHPQLw0qAJU";
    PACK += "3nVJph9CSpDCj1HXrgVp3SCeUu+43KAyeieRnQ11HlGKZx3EyWB7c9FQ";
    PACK += "YPlQ5YfKY5/NUts0mDanG7QTCH5IJhvgCmQF7ef49wLGShcsBgw/us9E";
    PACK += "dSCDcqOUQ0yQXMohx1+hgOhJRnRYNpMaQmHVyB2obTMIHWUGnq19xgdh";
    PACK += "7r5xNPOKnPIZcYhUDlg4qt9y4DzDQ9r4eZjTOPQ8NL6qv/YDgU1qZg5V";
    PACK += "TFPw59SHzijwDhlp3Z9yUTgg3mZLjRNiATIJ4F7daySve40QMJ9fEa+m";
    PACK += "zxviZcgsVQ7/9SZk1zYByOKNCKDLgWrlosdZtM3s+JZqfPE0vwGFrBk9";
    PACK += "mlL1xZYmks82UlC/EZCwY7l0qbXtu3RB6LJF0OAdS7yufy/Fb/j3KsLR";
    PACK += "XDO5c39ybfaUq3nD5M4bJhcqeTbhrwbV6cZQpBk7ycJk5o/TcgZNE5JV";
    PACK += "8+ZM53+I8P4jeGOvyMfphL3kHfZVkegX6s833mGXAMc9z/nPKurE7Afv";
    PACK += "sKGCzmKPKgDQzABJZs477J0m72OTEQNuXuS8+1uHfdb3DtAZ8DJVvy6U";
    PACK += "7y17h77CM/3rDGp8AcBWh7qcyMD7swI4AZdBV0Q2Rf3LtnID77+L4kSA";
    PACK += "ae5Oty+yRGSgf3EbY69y7iVBXvtuEr1sG3blG1b2rX3nW3IyIUlRXJBC";
    PACK += "ZsL+Mv56gLk0Ffz8R7TAgxFRcOV5uyHOFXKGcGnLu7vJs0GkNMvgk0Oa";
    PACK += "+Iwkn0/H0U7nwYtca/e8IbFk8N4OABNKxAEH5GzsBrfhYF9jHaX3FYyc";
    PACK += "5hkYkLMFQJtBkN52uz0CG9y3OGZToSADcmUefunCG73kKxc5jOz6TqfD";
    PACK += "Xmft9lvIJ0p6MRW+UWSo83IgLTgbucxrks/BHw0b2P+WdGLjINGJnVZs";
    PACK += "VEZoI6C1GMWYufdWpoVMq0vuEgFXXLbvyIYy6G92pWgs/QJs3m5sXHA6";
    PACK += "/b1JVAy8vANxkg1r99j5JCJwp7ga1TDBsKggJwNYbijvy0EkYxtBkfNX";
    PACK += "qW9nz/kfgyDnRc7TrDn3Q87/HASiGBQGGXMc5ezH0G/vsmHUqtrwkvPk";
    PACK += "x9C6DLqdyOyuCyMcNu/qJKS1mU/H0SSPMK08vY9h3dT36hcrIwDajmR7";
    PACK += "q2Ns97ItNsTPWSoFwSteLKq44vsZLm01DxWX2ov9Ze/lgm9qMfnrMIp7";
    PACK += "0VeA6l4svuFCAUAHvdzIqn+PRus47o2KW3BcPJoYHs5Z2b/AuM1j7TEA";
    PACK += "MAWPIIblJLOehgV7yTP2wnpd8k4SfXWkt+I/1KliIZZhiW6iietdgVpu";
    PACK += "EyUEWD/8IkXo2dgsZTUxOR9K1d5OzHCjS73PQTnNcsOU7Mb6oQ0rRR26";
    PACK += "aiqRbtV4qxW+9nASISycHV5mmljoJha2iYVpYuGaeNM2WhPqOM3T8lSM";
    PACK += "PhXyjAMFMDdUkKWEheoxNEkYgAMEUwP8vYQvjQX7LAJpBtSuuhWQ122r";
    PACK += "09nc2t7cjrUnfsXlHJbBHQg463YeaFQDXLFqKWp3fD2Ift4VFmVtGSuU";
    PACK += "YzjGwG8yzScmK0utfNvi9W9U6VQU8+rZIB9lgos0ell5/gmqL1ZkXa7o";
    PACK += "4HbQQQj529zGSZUENhq0Xnh8QXAd5NK40+11Hsie0Y1sde+8AYiCXsG7";
    PACK += "Dx6k4JQAlsj0d5U7IQUFHP93sVR5h5iE3XMHUppF3c3O77Lf3ewk2/fg";
    PACK += "avteJ+l28BL+JN37qsD9zU6yJbZ+l/0tsZVsb+Fd+JN07+92/vezSSR/";
    PACK += "g6sY6u12HgBu9E0HSf5ikHYalkezLLK1eR9UXcZ33K3bgKhynvcDapz4";
    PACK += "DrAXKT043+UO79Lsw2shFjVVIuktwbVvP9Mh82tqZ1Z8LJBLI77Fe6ny";
    PACK += "WSbMEnphj21w71hwkYwFosyCQ2J2GY2Fx7s8nBi5Q6tMtVXBhl1AbiWn";
    PACK += "qQk0BTmFfQVvqUKK0kliN3SSQY0eCa7ogd+WsglrfdDaQxEVUcxs6sK1";
    PACK += "ribZqeENAZrFiIQm0tX3F4GeOJNn7EQ0VvHcoak41bdSsVWNmvMq1JxX";
    PACK += "VHOum9TpVU4cqELVuJUeqI/K0rzqpmhUOej6qs3/nc8Z/LmNftp+cijk";
    PACK += "CQhdavN/IxurjlcERUGy0Os8qHpmVhVFQIe37oMHeU8c5cfIMbT5vyVh";
    PACK += "KQoUUeHwvpaLAG6hpxaTpq1K/RckPiMHhXMB06u+ZzLmqGMIxnTTqOPx";
    PACK += "gOpJA1vCJcvVASXj2MDorz5Fq9opmuMp2nTe2G3sHV9Np2t4oFWMUCHm";
    PACK += "95SI/HNKN5Cl6SrRWX8YhNlxmg+y7PLqJc/Zy2sYeWoBQYlp5ujErDLs";
    PACK += "cbtNOF0yUfrjqiV/CCI+Mck/ml3oPVAcz0dIbGw92CPX3o8cJFevPHsJ";
    PACK += "4EABp02W1zyKry4Fn9sgT/YsmlNzgaaUV8GMaKnCn4KO5Wa9k8UQrTtd";
    PACK += "NFz4p86dLjudIAriC+rll/MXDWYiYxxyQdbKp5AGWUPeKgjaRXqkARRA";
    PACK += "X1yC96uWYrIoYGMag6j9M+5F6sNQ3trGtwLfCogyDrKD1G51kg9pJIPQ";
    PACK += "4sCcbTR8MEHUBgZBs1ywF1xgQho7a8oS+I1fQs42qnvI5/x2xlEDMRbc";
    PACK += "qB4eVz6CCe/0qgePK3NWVOvrSjP/uDqqjtEpNwVNeCYG52JE4rO8+86v";
    PACK += "NNOexayAAAYV6oJAQ54yFHyN0f9Y/QHGR12kS/sWl8vHlZdRh5y8X7S8";
    PACK += "pf2Xc/7C7BqUH75agC2+l7GLjFq8PgSaWhmavOTGDzxwvbQrplFqtI3/";
    PACK += "9PIClDUwNd9hmL/wz/yDDnDKQV8zlyCizL0wataYS0SNzQ/ehemrtHLJ";
    PACK += "8LQJ8Wm1+UTmPGclr5Ro8o3NDUeDORmZ8/0kCH8astLdQ5/cum5xwEs2";
    PACK += "43MGOmsdkRHNAvXGqVKgwJ9uV//d0VbcEZ8RbfmoH808P8CR57M+C/N6";
    PACK += "BhaZmcbcGKm/cRLUhmM6a8KWWiqHt3dllOIZN7RrcOjlXH1RRkOWQqJ3";
    PACK += "OLCGuqPt9qcyKtiAIb7+kJV80DMxswFfds79aFfwmj4UVe8SnZ/LANOJ";
    PACK += "XypPhXP91Bq8DU/kDu8r1wRAh7IlS5dhdHM3Jq4P39GaqiYKG3Pmun9m";
    PACK += "ux+dUawsM6NnHk/8oozO3KA8TKPDPCrZPHaNWBa85Pou+6HjbH5A8uZ3";
    PACK += "NgfBu5wfFcfJO50kuABTaQpRB5qOFx4gnU0ii+0CjuhOZWCATN7HCX8J";
    PACK += "ZtcS+JZnMDqT2Pe67iZzXmLRMVcupWzKC1/RHhUN8GRqT4yBNX4sZHqu";
    PACK += "19ITWUxxtOk+WSym4Qabehr4PWCXA1DFi8ru/LWLCn3kpzEEZNyk34f8";
    PACK += "I/R7bvt96M2EMRprTYolt8tv4Fyhufc9iP7eYy9ULD2RJl5wd9AQfylF";
    PACK += "fqxuxpFf0AHh8hLcqWoMB0eUN3uZBSHr72UJIeCwnK+iH4qI/FBxiz+Q";
    PACK += "8cRFtB2zrwQ3rWqb1K07Tjkb3FssRlX0lX0jzdT8LWX5NrXm7HotVqi6";
    PACK += "+h6qrjKtusqo6sqcPsA8kkGQjr/x+d5NcP8wo0Z0Wj9cD+DDykz1wh5T";
    PACK += "z4fRC9LJR7Ui7fbadBTFtZLPSaBuNaZBuUywSwiaC8JY/WBVZpZv/xtU";
    PACK += "lLwAUW6+AiLkGw0K7tljOrCiCieVWREYzy9N/pAT+TjBUJxLEROj4wtu";
    PACK += "BP+lpZs5fzxRsUTUMqgpPVR7l5HXSP7BWPiHpwiRxcLQZCW+/uC75qA2";
    PACK += "TdEh48ZIWpH2mv2xfMEhflotG1ug56AAd8iUvaz8CMmPLPMFBmR7VkgK";
    PACK += "H2wScico+EWhnMXJ9CeQvHw1Km6h9KLaPHON/qV0ChIBlR56JnTBEx96";
    PACK += "ni9IkCPyJtIH8lQORTUwg9+FltzYNqLzpmnqmxNEOmjO/giVs8zYi15w";
    PACK += "t3FjBq4IVAmy2dndNgTLrER7b7F4JxeL6J2CTBtHacaIjUQPw8RgFC1j";
    PACK += "ODttLd2d+/c7OtNg8FH3aLEo4qsikDDri0XlReMfex+1UDpXtHK7xroi";
    PACK += "gE8esxfDKAdvwPEkel7EiF+y9rVgzwv+tbBDa15kb2BXYsK30xGSxzn7";
    PACK += "yNOgIYXiYch7MNzvQJVsbZ8CDJ8I/mkpk4YKNKK6yc9y6EWJ+pryikqb";
    PACK += "EIFU5AdiCEmqAdUaVw3kDOrlD6xUlK+vxxmvjvJjJiOtLGNX9rw/rAbD";
    PACK += "swSd44dnbJRORFkl2Ya6WOI2OTDEX5l3Bb9MrY1XaMoQnWUWNpToY3AJ";
    PACK += "1LocFQYUDZbiYdp/ka+vJ5GxgAJ9hkuQ+gNFCNSHDrg+XoTgLwfRGSCy";
    PACK += "Bgsm/5VKYvd3AfZaAVOka1TUSiPXKjzaWeWbr1cSjq1uHFvDE8wRLsUD";
    PACK += "t79Dl42CH2D0qvVSjA6sOpW4vs154QcXzj1JWLkzdXrlg7mZ9tIoTgd8";
    PACK += "flSqnH4HfBB+f8YPjF5idq27yKc8usdmAEFiPIJsk40/UGxdgmfsgJ82";
    PACK += "Q/jAB42cZY6aIZ8ZtUk6jp4Oo1nMwF14UHfjcQ7O1rV5yA74yPpUDJfK";
    PACK += "m+Kcwon2GmF9bAcu3SOag1mf/Gf80jp3XPqwHpfcsJi2iuXygBd4mEZF";
    PACK += "A0FV28K6zaWmEwU7gHBPhf0VjhmCHR8wy/lvdrbvea6Oxa+m7j4rWGFD";
    PACK += "BJUsUlCXlYkdAqt0LpzLysSy6weOW18qOcUtbbXExl7L9WxPjVMrLvF0";
    PACK += "5cAYySSeUkfWKR2YNPgCZGc8YNG8NjbEE2p+7fg8zqL7YMh1ksanaM6M";
    PACK += "6w7bQ2UxhPul/nrUIGaHECjrRvLQjuSh6cPcjeQhGUkbNQv1g6UYCV6I";
    PACK += "m/C2AERVi4kAuBjNwAkNBQE5QRAJagnntcUWJxrY8GitrHWhS+SegYXO";
    PACK += "A9k5V9qFl8ozG5MSH1bmuuLK9OnkNHRi6Vq1ekUdSj7RlN0GDCbG78GZ";
    PACK += "TShJteabVkzZq3QATv42/NxqFUyRrgN1avJb05iJN5OfG33dbig1SxCa";
    PACK += "hRo/AWP2EcOP1ZgdVuZaqPGrvPGrGKjQYfwgnsH0dFk1eQk+nYT4JGDs";
    PACK += "2RsMT53aUEGwA4AQwn7yG1mrc5Ru/09z79rctpE0Cn8/v0JkeXWA1Ygh";
    PACK += "bcdxwIxYtiwn3rVsr+Vkdx+GpcDkkMQKBBBcaDMU/vtb3XMfAJScZJ/3";
    PACK += "bG3F1GDu09PT9waXyo/Hic/ZcWSGHwtmGL9YOvWPx8dfD4dnqB6uJkLL";
    PACK += "EiQVmigJaDDi/Sw551sKwsgx5SrpCKLHvMnJm/y77+iIeG8cFT40epOr";
    PACK += "QLfKXAWWN2a0LLW+1IRNtIbfiAA1BmyuTC8RW74HpFZp5bOEg8h3sFM+";
    PACK += "wYWYWol/rEyeftjmOD56FMjzMnyc3YFN+W5CY2NQR4pv9XNYyT167Pt1";
    PACK += "O2TIheAmLMfl0kknyu+tEbTTYcYx157Jjt/erjTHs8BgAkqAKCJLc9hq";
    PACK += "zTcg8NcCg4+qzPTjBaM6Lvqj0VC4A3BMwCv/x+xu+Pjp19/IALMp3MJN";
    PACK += "jMGKFuyzr23BZSpxO3ekmXl+/DGXQeud5JOcEtwkYJVqpLdeQAEEzqD/";
    PACK += "jrilQEly4DJkWteU/g9ocuzsALd0JN3wYlMgHrvSPJlo3UZG8eDBA15B";
    PACK += "WyoK7DgibfkNHMkvl1WDPQj4BfaGZBWDTUEAOQ8a7YWzreFNK/8WI4sC";
    PACK += "7qD3T4zSG4vhcvpTbGXDAN9d27EB9KYVxMTLEeWDjNvYyN6QpCLIFC5v";
    PACK += "COeeHh+/xWEKJmvGvKkwAvBJqYzxcttpw0jF1XXUkF9qcB0lUUlyGnv5";
    PACK += "4DoLd5CiCsMpg+NHTsDsGebzrxUoABl9wbwcHXwVZVLS0AKIpCEfLum/";
    PACK += "i4M1oMq/Dld5HJT0V6MKzEOEgveN2o7n2qPhE5KDA5oKbVzKWD9GBlPs";
    PACK += "Jm5ujusEk0/iANcf+yTkcapyDv922Onf2+e/i0afjwIWAIZ5O/eMBBMu";
    PACK += "B/cUBC5uFtmWlA8xTeXwZMk1emQXI0hyTZlI2e425HaOkWqb2v7zSOrv";
    PACK += "xccgJ+bHoDcic3jAg2iA/xIxxyt8oQv2PK2SRZhHrAiiQec3ouk8qGf8";
    PACK += "VdtXfvAxLBi/z2njhqfETPi6j4Gi0YqdRyCrgMv1P/IcEuWWKLRFMsJZ";
    PACK += "3Gj8+B6NgRi8YnRXdicHMeP1kk+gYf4PoC2RhoUkNAScz23ZERNI3m+c";
    PACK += "QLZoHqNbyqxOH92CD6OV0UA+WZg1BmxXYyBaEjsOEmi8mFyGXyt041wi";
    PACK += "FbF8YUHn8XEccXubrmuQUuUM6Ly6HLdG0gUyZwn5mOLtmHDhTaC9vvBD";
    PACK += "amUOf/TQJx8EYIsVRMY2SS8lFebcnrAVcl3GMpc+nE4s839EnpX+qJHj";
    PACK += "xV2z0svII9sm5kkGxobb0x39YbzyryZeUTlkxLBOf+4cnh6srs+qMfeH";
    PACK += "v7fhUCA+uWZlvtEGTWUjfo6UGT7w1mDrcC3IGHRz990CSAFhEIJgjCea";
    PACK += "R9yINlUThQuj/jg+7hkkYes10hc/VYZ7GoK162npG76uhvRMBz61BWha";
    PACK += "/KZFaZWVyURFo+JcZ6FSbqONLy5KMZkF/RvzTkckOT5NfFLgh4fCDTh1";
    PACK += "le/aEy+k4aBYhzlbjKVTnrRAkcEGJgW3MykCT/zKuLlKJsp9ohrRoq6V";
    PACK += "EhZsLczcOlZsLVnHJ2mk9pAgb1+pj4LTLCgfWOvs1cKHfkRVECTp4Yo4";
    PACK += "RqYkcls8FbmJ1JhRV0oFkKlGejEVNZKnEO2K7VX2YiK+ikgLusS0TXFr";
    PACK += "iyROSxsimo4jJ5USdy5xpJIpjXTmEnWmCiIjvcRUNlKFdUoj+UTE9i3u";
    PACK += "eCtUcohYIjEXQ+puNKvxG/O49Y9nZi4bkW5k+bgFWSIetAfzRbGo4pNf";
    PACK += "mzhypN63F3OBvLB2A1e6ebl+L56WdLpkcATjwgzGBTlCuT9v5ki6QZJU";
    PACK += "zlcgc+BwFUxPUJ3BM/tRe6iw9AMVxKA7D4v2d0uE0EM0vgwdocjfDZVm";
    PACK += "uY44XmEEf96wHRh7w0+Vwgf+4G8j/pSoEesoxop3BJuHv8zd5MuGUuSH";
    PACK += "gf/l/SyNT1Y46JKXWQGmscSmG7HI5CutOkZkaV6O2RDF2ky9NpYshYpb";
    PACK += "DGwF4NY7IAxt4W/Fy8MfdlhvvdWXho+eVOiyT+YJ6LpVZUa0BiFbnpYp";
    PACK += "AmzP67Hb2x4Y8XOPTCkrNKNarISdtODcmSXZFd3iGJNRgDkDZa5Prpdi";
    PACK += "iqdHmuhzJNuMRmORSPGdLnss8chDPYPrsiO+oRQ+KHMoL6GwMxhbFWzH";
    PACK += "b9hORK7ySWLBDjP/IgmHMCZjGxgprs0cocZxgJW0cTgYYdoBNbdTCQmJ";
    PACK += "a/2QOHDhq8pKVMQT0D0mprpcRsHi+spE5pwTSc9ETRWCLGnYntg0lBOo";
    PACK += "oSlGtC4Ec6L220HbcUXmFWvLzla2ZWcr7exsRCfwYtozXlx3xv/FGI5L";
    PACK += "HqWfJEYIj1jeBQKx/4Rd7EPO26pgUTY0IxhjSvWRDnFt1BQJaf2Ifi3V";
    PACK += "PVI+KuQj/1Z5iN6WXqLfuBjt/Dj+vYiCiD4l8S19aopCf0s1o3LJvNFD";
    PACK += "oA1IDNnnLGilv6VEnDJNiRCYvHEaP+KN3aZvWpq+dpp+2970dUvTRSib";
    PACK += "fog9tUgpvLX3TskCmRN1QyMIsYfzMIjoyAn2uoTCb+2yz7CRIyeM7Dss";
    PACK += "fGwXhiUUPiG5rRpzXr1HQ0BRnE+VGZyZLU6CHYrkBtmPO9NStFJtVGnE";
    PACK += "DyobOBs3/BsI6ovyOpUz1TDk+xC3t3r4UDczZ7EIzX4MTLaX4fWC3qg2";
    PACK += "R3iZSgm52f8ToCTwkeqY2KXbDPfmscw5kbNE8/yyJJjOBFYudbK/xBKk";
    PACK += "7i3GOnADQAkcey475PKDTcZ3AF2CAjawC2rzFH5dabRgkCmCMrAGk7SL";
    PACK += "ZSDFiQqpphJEjDCpMQkOOUPjpW+4Z/DGptmU1YNg4NTE4A+DbmiYVvFy";
    PACK += "7S1JlynES+CltscUfDodyW9JGSarmJlUiOMBhHROhWnp37PQLDU9nfXm";
    PACK += "WAW2cs5a42uT2JHzgIOzJh8tWFJGy4jl73K2jD5LaqtpWEQlTcbnepVW";
    PACK += "+ZxdhCuWqzTaL8IydKipojKfCrTKLozbAJSVAhv4xB2HIYnECE2jeqgC";
    PACK += "uqVPfT8AP4UUbsIjIWNVd0h7XJtpWlkjS2qXZDURglXeoyEfFVqPLjEr";
    PACK += "rhX0F6nlXPlvR/n66LswX2GeJBng9/hYlUwfzbRexCwNDPPMvcTjwa8l";
    PACK += "uWG7IDef/X7/JCcKETBi3/PSvcRWQJulIEF7yjnrpsT0KI7KZcyFSP8E";
    PACK += "lzFueqwSnzSMFoe+dBdjhsF8aRnMl41EVSBpcdQdYOqlEk+CWMhs40S7";
    PACK += "uhQnfcnyFePZNM7tXi1VuWvE6q5hxJ0EmW0/kAiac8xnprPK5HOM0VHq";
    PACK += "58xw31sevANF5SWSwdTfidoUmi89QbtqaxuSc3V9TM9LD8O4/U2wvqlC";
    PACK += "X5DwictJORxflV6C8QH1jRHvRExQBR4ra8Pcgue3xkMpA/jIeaR8HhHM";
    PACK += "I/Y12wCTRomCkpVJka1Et0HpomNwcP0bgxDx0FJo0PSlZTXIL7T6EmE/";
    PACK += "t3NUq7XnwiAl5gkeDG0/BmGJSQS2sP/my458n0R6vZ9jcSmYseE98dZa";
    PACK += "Vr6KzmpGN9O+3U6IMyepZqOCcTurUMfmaLANd+QrNeJWcuOAsfEboxKD";
    PACK += "w+x35SQJSmPIUPiaiqEJDqzYMf/4uHJlE/+z0ja/iBBRhb2USUFzBpFf";
    PACK += "G2Y0E6M80PYEPhApRRqzAcOryEwpyRzZbXyFriNx7dEgitU/xJr3lvrv";
    PACK += "edUsM0cS7gSN7mTIjBZp5OPht74/lvdBPkJ+PbbGr0QgYmsCstAwlOa2";
    PACK += "q+0T0JGAW9arTJ+BPbST/P1YmuFq3sYyLIIxWZ+UU1bO+EttbO8P8f22";
    PACK += "t0oKJAGui/maLaqYKQLA2t5oqTf5QYi2N/uPcTq/YYu3grosw3zFSjC/";
    PACK += "FZRWUNZjHXQVDJmXpXoySw6z5XdLMGceyDZo4jxeloMii6M58xIyRE02";
    PACK += "tx95G2LUV73KpSGz4UIaZmYHHcF1Mv7+1vl7NDJjIsR/sC/0LTZKnsoe";
    PACK += "RJh62j/CR+4UYec0S6OkPJX7f9Q3DZWK0PP3hseMRYxDpBJT0pQ3PSdT";
    PACK += "mo9zFzpD+hmypo/5o+KFIgpbROOlML8YcsjqjeD//T4pQsMfviWXF40I";
    PACK += "Q+iLtBtw7h1IsRRA6F6wjIwwVRsGvofsQPjCj3074xJ37OheZNW5yMIf";
    PACK += "V/YiC4rE6xAWpunN+y+0EAstvmyh9u0tScFljj4pDN+q2Dxc6fbRMgn0";
    PACK += "X1aOy8bexG17E49jd28KAQBibyBEHs4qQq8IqVH5G/dz4hSE3BVsWP8U";
    PACK += "WkihxeaNm7xZaRF5zNW7g6LIV+4DpBww+R5/LB447xXmzrwdCbtJdKMw";
    PACK += "QguYIRJEnDPbN94+EWH3BeKGEY9Z5WT9RCPDH9Cyh4xgh2qf4JM6AiT0";
    PACK += "W9TAkJK+fKTeI+z80eOHo2++efjUb8uOKQdBY1FZE1QNfCTVtq7HL8K7";
    PACK += "R8TAeSSRlpF2fEq+YjkiOMNgjmxBJtT1+EFIm74/P9XjD6FlJijn/pMZ";
    PACK += "uOInkANYsSCSuh7/mDYMDCULYScmiZbeA5HhDJIOQsYVKRo2UrGUPcNV";
    PACK += "IqGQr1RfurGfWOkKxzL33a8Vy3c8eXaaP4tjjw86hUFo/+RvV2/fDLjM";
    PACK += "MlruvH7/pPRP/u9sioOLoWf/F+YFQQoSM0aBDAgxLWcSghgYXC7TfIO+";
    PACK += "YPBDwtNvMQRwwIxjDinyLXBZGUSaIw+4XYcVidVO0cLsZF8qei1sG9fP";
    PACK += "lyqyPmx6r5fofCclJDip6/H7kMbV+CakP3K/3o8ruq8KoN/jCHIAJ2W+";
    PACK += "ewcvFFgqXYCspAimq5ywhPwWk/OQXIckrmY1eZ3Q/TJKFmio/nz3Q1qU";
    PACK += "r+BNS+Ys+KkkHyuQ4gCODIZky/ICmNb+6Ong0WDUJ5yQY/m7cH4Trtib";
    PACK += "cMOCPn8kF+mmXxOW0b3RxetkoP9S3b1OBuJna4evk0FLsarKQ2qatUSQ";
    PACK += "TZCY5NGC/ZCmN1fawrFR/AKNa9+F5bqjwnsGgNasYJj2WEVdHeJHt7OC";
    PACK += "cbqbi8tyVSglHHa5IPJ4/GheNndjkr5ny6A7YCmctXnIz3d48hbZr9jh";
    PACK += "d0CwaRsfZPLMjKekC3JeJ4OOT7e3/7NqTKJ4mcK0c1as7YW2F6ZpqfZJ";
    PACK += "1LC2acXkwvnauDkSm6fJPIpZ/pMNxqdgR3G6HD169HT5dPh0ePpw+PDx";
    PACK += "8PHDJ/3aeKSvr99fPDv/cP3i4qcPb9++vrr+/vXb589eX//w9u3fr697";
    PACK += "tF8lC7aMErYAb4OfEnq4Aen9lMDzGRVAPS6Oj38CfVkGbFiBk+YJCd/F";
    PACK += "FOoloFPwWAYuKfSnRHiRMH+PxNFPyfg9iGCuLs7fX3y4fvXmw8X7N89e";
    PACK += "X12/eHv95u2H6x+vLq7fvr/+99sfr//56vXr6+cX1y9fvb94QT+uoCHP";
    PACK += "HP0OUoLErc/Ew4Mis4etIrOHQmQG2HJZgZLfcVofDrXTupTRcWPNWk8K";
    PACK += "OR57SqJD1ujw22+Vd0FvRHLa74Nh6FJZbve0YEIzTWUezctLHjEOxZsJ";
    PACK += "7YE4tiGLNTNYgiGE+x3aNOW0ZisQ1DRrYHhGpG1HNm2bwJ8oROKUa/kF";
    PACK += "lCtIcuew6biVcNlevL1EMaxLf3Q5S5upS1WgKMXluuJIwaPzpYpzkXql";
    PACK += "FgP4iQ6pC6Jkj9G3qDQDjUnhMX/wnzRKvD7p+0THOHgKbjaaygfUhMaZ";
    PACK += "nciJML76uCrWV7tkTlswHAbdwmqCim3zpug9i++A3/8ozr4E0WFiddmA";
    PACK += "YdltGxQ/Hn7ty3i9KmZuIrtacEF/cXvL02gBoKcA6BEAuhlm10sOAXmM";
    PACK += "QJ4cBHJgYppAntwB5BBYqAPIkUsV2zSSWaQnQviAvBzKGtugHSJIYmpw";
    PACK += "iDn8XS4JOHZy4ic0n7IZiYHlWrFSoHbIIeslg+sC9wvu5l2aEikRvave";
    PACK += "NCHxLLizHo9Tg7bSht3KD7G8kw0J2O+FtpGENiHSUqYtz8q2C99DKUkD";
    PACK += "6PzD7PPEszkvOQMxjd7IjDjQzoDzqlrUBUw0ZPTrjcTsBbB+RDJFJNYo";
    PACK += "gMY1v/Jtu+J2Ja+SMtUD2FspgnrDcpP2zdTYD8Q8rk+Lg8y0S4J1DHwo";
    PACK += "wNP8DAQVS+8mLPgdX1T0Vel55YaES5+e7ftVwY74de0bucCX3NG+dz9S";
    PACK += "hJqkiHKQPNxmMF+z+c2L84teIyXyPRt6xdLXZElDblzDIki4BD0qkDi0";
    PACK += "WkLAbh5faQm7sKrcDcCwW0u6gIhVq8qkCOZL4y+yqixUO1+af3KKYCOG";
    PACK += "umB0l3vXOQgeLpfwe7mE36/wN4wkktzlsh6IFrQJQWlZBrbZ1kzAS8+M";
    PACK += "UHTDrDYJPduXkJ8NOQsvp2fefjAY5GTKZsFLUAoBPvNrKzbkP2OTKj+K";
    PACK += "BNWcLo9eiipGPufMqPssz8PdICrwX7T5wTDD+c4r6Zl0t6W0n1Sbjyzv";
    PACK += "GxLMJOPTjll5lNAphPCL6dk+VgmcU3q2V+G4xlAtoiX8jOQbFCliMQfh";
    PACK += "k1/Lm4MY3ZjyO4n+oJccBpOq1iMYBfseJ0AdwFu4YB+rFT41L0AElaSf";
    PACK += "4NSgUkUZTgCuigy+ALGfxc/b22pQpBvmeRlZ+/Qsn66BdM18pTiMxzmt";
    PACK += "sKsQX1N3yNAcEqxevcFgUKF4W0biS5PzNSR/bZZ4aPBm92g88Vji+XwT";
    PACK += "Mp5+IgfttufpQU8j/6+j4dD/ajQcknVXpdCotKDrr0ZPyJx6W7IDHIMS";
    PACK += "fXqF0hJv64+3Yne+2439Le0f9U+2cvO39Vhe5ChZpt4vf5n/XD189HJ0";
    PACK += "9GA/99bka78++gp+ZvhzU/xCfvk/R8b/lmlSnhbRbyw4GjzJ2Wbc/PqJ";
    PACK += "Rat1GRx9TOOF/XmexmkeHK2L2Huwx5Vuws/ekPCfUQKRrU9HD4d/XZDR";
    PACK += "Q8jktmCro9Fw+JejR6O/+ONf5KlMOCYPcO+VSjg2rtdL1/Roj4cReLBf";
    PACK += "KPqRkVViyuxOGT+3Z3HsC4ImDti0nNVoGAA0jTj9wIzJm2d6RDjumKqh";
    PACK += "IjkUmMYDQQMCIc+XvUcBG6QZ2kMIGuKlULJixZqkdB8tgl8e7IFFqa8f";
    PACK += "QIDNRf0LydNPQUnmaVxtkiAhsmdcY6kHgmio2C3/yllpYbT4zoPKU1St";
    PACK += "k3RGPFSOk9AHHIbvcxDJESocsCBzFsdBqIcL1VDWOOHA+Kv2yUtPLZP0";
    PACK += "cYfPWRwXfdKHDgd6UqB1MUiXJQvLKmeFwlIRPdtH4rGALuS1NMu8FFfE";
    PACK += "/Jrsa5+khrFA5ujaSSoQDeBshhTnC65BPsd1v2DwzA0Gg7KG1HSDcD5n";
    PACK += "RZHmf2c7ElIvpl5Kq0G0kMeZBsVEoGF+Iy0laRaHc/YsttQDk8L44PUH";
    PACK += "fdK/7vuBKvW++nnw1YoXChJGAaYYqRqsWchZMmHoOZFFognJ0C1HTf9l";
    PACK += "Msmo+WdQoMNKlMzjasEKmIc/yehCYOs55Q488Ht3hBFCQR9YYj2+ldsx";
    PACK += "oCQ69+37tJ3uZvKKzusAu1xMrY2c+aQXylDRTNBmeCxrCfsCu4V+/Qsx";
    PACK += "Jp0RziYHOVmwDARwAlxfsGVQid8FGO+tWPkyDsWhFhLye8MZURd1IcBu";
    PACK += "uobz9haQ0pNXd5a0AOPm8jLMvDk9mw/srj3fn9Vt4M4/A8DjL6dZ3/dh";
    PACK += "jq9ZuHTmyIHybb4AMSh+eZl4/owsxLTnGPVlbsxWPkFz8RBwlLTVNdT8";
    PACK += "d/RsN7CH9TQ9vPC2ErtO1/delNEX3mUJNosjFB6oG+0v5I3FyvIe26Xe";
    PACK += "mjA1nzXXjjLKB/8BAbww6OrF0rIMQxDi6NPDeMXqluYBIFOJ2kqC9tiB";
    PACK += "sM8mUfEOLt46jeECgbDeKiGZ/v1qESQD628JiAP8lxTVRzFPgMJ5Gl9l";
    PACK += "YRIMAZmKX/yefp+nVaZknbCHshnCJ6fGpjNS0YKe7dFfQ1SAbL36L0Wh";
    PACK += "WYWbMPMqn0Scuis0hq3Ati6qzUfBM7A/E7MLUrVX9f3R8w8CKdkImpd6";
    PACK += "KaBnwM2oX83onn/9wMelZ3uMF/OD3pyCqguxYuWzOFYAS7Dkpwjs7JkF";
    PACK += "yvwLJ8x9Af3voiQBvByzZXnoew5kzIx4UhEsrltKIvFieCnNbcSQ40av";
    PACK += "6RmXlXuA6gbRAnLz+v5gGYGdj/c8TWMWJr5+MaYzUlAvorHdW/x7eoug";
    PACK += "txA8q/n3NT3reSrKea4R/BquA6RK9eKeiiPhfFU37zkopadAGgNqDOE/";
    PACK += "xQzfVxMnRIz0nTPr++IMzhlw4v9PHScqIsU2pV3blB7cJv7VJ7g/oL3t";
    PACK += "z3GdsOyWnWlugtqf12z53wZ2uXhNA3P86MXtcBwpyKvoWcUhL+qGvDiY";
    PACK += "zix4SWE/YOB+O5y4S1Z78R6O6r+4GRYo/K/uBo7csR2NVav9eJmmZetW";
    PACK += "mLWBJCjpGVzScjbIQSZQgOloy0hmfxYAdg7kHtUXDOb262CEziGbd+UL";
    PACK += "Bm32bQNX56iNQ/iCQRs96wOMQ9HpnedXIrAlAGz86S0wI1HZcZK6Y/sg";
    PACK += "OwbsOMcvG9QZwD3QjqE7z/PLBm8M4hxsx+hd5/plg7tDOEs3qLaWpRvt";
    PACK += "1OACeSQCB+VjaeyI9Kom4Hz9MgmSvj6wO8Y8LKjomp9zoP+12TlzsE+u";
    PACK += "a3Lunv/XZufOwti67m2zQYp0QjrphkLnGZIuCiSU7CgwoyhnKKfDmcOK";
    PACK += "pgpsjXcH2deIehVNmi0qt0UkWxTUC2nebBG6LYCVmeHFyehZ5myR58sb";
    PACK += "1PHomxtsWg4/j9tFMxGk0NXKoAWZ+/s5NTSUczoCDwklUIzI3CcLCR9b";
    PACK += "eraFKb4qBJmAExTcylbs+m7sYcxah4HeKW6q8tRXMj8Z+TUZ+vUY1L04";
    PACK += "x4Ii1Y2TE9zalu45Jzgn0SKY5uSXB/t5/cvMJRiEavy67wteC3a3Jjs6";
    PACK += "nY0XaqI3otcVBXDYGS/RdDgjS3ojZse5TtgdwX9uyBVEW46W3vL4WNXi";
    PACK += "UpPJhjolgaeLoOHQJyAlX9kAsRI1wMhz469MRhP5yxuRBRMmfE4XkEd1";
    PACK += "Q/Z8F+ZkA5z3jd3jzSBaHNoZmyO/cjjwq8kvD/Y72fyCnl2ICeL8xBnW";
    PACK += "v0hRmDoWZPrlGdf++LxlJWTHf5379VbeA/XtZmAw73QLVsT829Yn87Ph";
    PACK += "8XHo7cj8FMAlo/ypESCCm7IgAkQiMZd57fvj0MtIBC6OhT5kIQxDDtCE";
    PACK += "ay11scAbBtoKiAH3yhs6JCs6Hc7GW0twsG0KDibeCmB57Znf9IXZ8F73";
    PACK += "UpBxpQQZ5zXdjHcn9Iqs1I75frCjI5z8kiop/2AwWCnO8obenCwJrgS6";
    PACK += "oTuyHYgu6Q1R4+zUODd1rQVCHkeMxT0RI1h5w3X/XFHbZ0xe2gqFRVIe";
    PACK += "lJM0j1ZgPBskAmpiIXB8tQgico22nQX60wb7mlxXSfRrxZ0LdKmSlIPg";
    PACK += "BoWwZjsIW/v2UwKGhCwvd16hVFd2PYgyjmosyt8YLh0rfBHoiOOr0BDo";
    PACK += "dnZDzVpeNZBrBK+0RmWc/o/GsoxVNFZ7cC2N2r97ReFAyXgHzuwmXsdI";
    PACK += "9ECj5h609eAHnX1PK61uKfxZZw+1pSEpxNsj33kvpFY/EnDDuxRERfXx";
    PACK += "ffqpgIBzWqAknlr8ACRLknnVQNQkBT0r5B8odn6HQP0+/YR1q4EE8gkn";
    PACK += "W9JPni5DIw+BSs2mhqRSPIcVT9w5lhpQVBWp+h7X62Yix6fAnJlPQppJ";
    PACK += "hYGBAhESgfcHtVHgCAQs1n/G1wdIMKRnqJmrSEhClNW0CLFh7n0kTmT3";
    PACK += "QPpdG38/3/HOXy3kwNXA+KyGzNmimjPPC0kG8qVwmkkMHS1mNCOhj/qo";
    PACK += "+0xBD2kJ0XkeAlPwamYkkNdJfYU7FkoBbKhMLD61FHkVyPPkfa1JpESy";
    PACK += "fCIBWg+gXBa25mU4ZyVbvE8/gRkaWkIKGG1+PD4+9BX8LOBoBKvs9Au7";
    PACK += "3TripLXU8wPUfb7L2Ut8J81PxGpiooDW6ZsV2pdgYZG2ZVhjNJZiYa7O";
    PACK += "L54fgFLsMszs+V9GyWX4+cD8zQrt8zdrtM7fGgOvN9qSdszC13qBjjHA";
    PACK += "iYJkS/H6Sp4nJ1L4prRAyMOVqVD7+b4rkSvT1+knlp+HSB0Jzq/n9TxM";
    PACK += "Ga6waClb3t56kMy40aMqN7oTn3xb0gu3MFsOwqpM36NLHGX07D8MOADM";
    PACK += "wdBYlDWrvGtWmJvUnZVviaAhYPp40z30umvoLx22Y3uBzPcaphd2lXq8";
    PACK += "7p7gtnOC7fPT8zD2oB5vW0e4ve3JuF1gCyVYfBx3Z4zbS7ilUO4YgLRA";
    PACK += "TIucH3Ia++Pdl07gyphAx/gd8Kp1QMYcan989aVT+GRMwRoIjKzHn7oP";
    PACK += "7by7YTI+7273rjIOO2blNCfxjCaYp8joRZmDndH8+Dj9jsb1+B3k7CjS";
    PACK += "eCtwN495ykQ/JUlmFKMxCiu3nrJym2RhXrCXcRqWYKuHoVd5paS9UuIH";
    PACK += "MCOdQOIN1hlExZvwDcQyPB19NYQwJjRprxL7E6iBtvXpWeQL7iEdpzQi";
    PACK += "Ea2k2jwl0QwX1npq8A+wLsfH+Gs0E+mNSrqXx86vaJAtiV1yxTCKypYF";
    PACK += "myVhv1ZhLKuulyTM81eidrC1/nwWx8HOKrlKNyy4kn0En5bkEwtvLvhf";
    PACK += "5zAsX/h7tHl6VxkSG1yFdi2SprfgHdhHPqvK6L7FoEaomDkj+zIJ+rA5";
    PACK += "/Rop0VdJVEZhzL27GFTjFBSHiELIqhivLDp+yx82Xj1Nzs0Gwlbrhnl9";
    PACK += "q6M+ZinjM8jTjaKVeyOyCT+LP3ndF8j5jYbD2icdFBEQblWZvhQroooS";
    PACK += "hqQVyNzkTNMhKB+D0UB2k9MGalXXBB/ksW2bahr5xOXAgROjkgR7rGSe";
    PACK += "oVHnIxe19G9vczfPQa4jn0EXAjxs89Pch08mtMXlQINPLWgJa1fQepfI";
    PACK += "FwANYQ3WTMKEP2krDdoKAdwQgCaNc/AguiFF7x5J/MhWrk1PPm3re+Yr";
    PACK += "p4a4bK8hFnkeCsiyVqnMXj0Po8uo5iwBOwcTUvVIvSFE8rNm3axeaFMW";
    PACK += "UT9u1Hdqxrxmr8cMplpM/1UhyWVBpqpzewWiEM8/Ox2Zp8lRs16qXKaA";
    PACK += "d1vvKuehqA+ueE8W8BrmXJWKoO67N2HLOVx3Om2QJA/6jtE1bQET4IuL";
    PACK += "6VlszkKdxCnEmwPTbnPRyt7bOg582LnlpwX0mKEvbxubC8/1sCSiaC2e";
    PACK += "TkRQb2nthxnElh7E1GHC1q6Si67a+kb5oOi95yyqAuky5yRB1AXfCB8t";
    PACK += "qo1wBoZQolUbbs99UgSZIa+YKoO/3NW9TKZoGl/MAhAu+XVNFANqoFPr";
    PACK += "4Oi+Jk7RJStDuleNTZsh91xoqTBxq7BAWMGjZY9ccwoHAXESGzJFsbeR";
    PACK += "EhcKOEbun5sEIMoGAZkvRCGVDQ7iNAsSCdfwSkrJeiOZFmwIRlZa6tP6";
    PACK += "pGlPl4PVgGwkYHraujHyCjX3zSsn05nAnmAsrl/lxkWat6EliJjoi5vb";
    PACK += "woxrLGM/jeZVd2p7PcFXOh+B4jVZ28Znr70dPdgMfKqIrrEJkyqMeaUo";
    PACK += "WWHo4bZOJ6xT+hC0t/BsLdhqaQen9BisT1OPE/MPjK4d9Ea+cgoq232F";
    PACK += "Sk00HB/3Sh6AJTOZEym6EpZunB2PDVJE0SH5ifRaSg0qIw2GqBQjYWbT";
    PACK += "/4rZO0qUFiHuGCFVzo75WXp7mxtavvSMYgaNnKagv81rMv9zBvruzoGW";
    PACK += "jYG0N0tiec9wdWVqDRXpoXRsteiMRlgS08gPvPyM/xX5JP4uQnfOCGKl";
    PACK += "+AS5p5os+BQ0VTkkOR3yOC73X2tKT1L/jKbHx97JSULyE75EJVjPv0pq";
    PACK += "stJDgXhWxocSdcaSqIVHIKVn1lq5QLfMdOA+7nPDezAdj0EvPea+QagW";
    PACK += "WsYpBAYRNb966KP7Z5Hmpedx9Ux6GmnHS1HvLw8xzW08zWeBF0/z09Hs";
    PACK += "BP7wv3pYk0ytg9OsyzzdeCBIu2KQ1kaZfZjz9zlKBh022aj2dzYCfxiy";
    PACK += "VvXllpGsovui2gRFRjZREoQZsBbBPCPscwnK1mVGNixMggX8u4jCJFhl";
    PACK += "hGsOgkz+Ogcf0GCTkTn+WGc12R5kq8LVKmcr8C0GQTI+i+jlTRSRVlIv";
    PACK += "MblxLRfSMremuEcJi6ywhzWR40VpcicvtwJFKfAp92Djvhd1DQ5ONkfm";
    PACK += "Df9gC758QKUQpyQFM/l+N6NWpqtVzGTXnI5EYk4W4flqHy4lfUEiaqLs";
    PACK += "RYFwlaRVADRNYrx7KEhVr995yJfSSrS2sgVyLvdgCdyqkhuwifzbW/jb";
    PACK += "UoDJhjzRjOICvuebejdlL4+iQbLbOyY6Ft26xPuX971gn98ura4/WCcq";
    PACK += "goaYDLh1CEpYjBUSTKdtdQAiaqIYyWcmbP+5XL0dSE26awoMl4GubgN1";
    PACK += "RBwF7UQkLyKPGJaDHK8/5Yz6EXgMzsxOOKKRC2ouRkIjj1DreuC0s+jW";
    PACK += "fbf5dBsVdH5p4ditubWw7Vb7w7y7VdVg4LPqQLUuXkJhihLIVU1p28jJ";
    PACK += "9SDsqofxLTgtbnZsk+EKEu9Pga8aCMMivsXta9LerSoyfV1byW/nm0N9";
    PACK += "N756ra3ooUatpLfcFUV5O40mHYtVdHej3G/nPRtoEFCn3GCpkzW2SeJQ";
    PACK += "lAsI7ZhZ3m4aoUMbt9efJpI+Kg3jiEQT4Zqx7kbrE6+zc3qoHainhUEE";
    PACK += "15m2dgEbq3BaguDWVtPg05EeUUZ+7btdWkWeD4pLZKyTjkN4ZZqG8QNj";
    PACK += "LX3YJbLpM0Ur0YZrcEs3veaIWIxKpERZVGgFkjQ4NTm8XWbGBvFUFCNF";
    PACK += "ad/e9hIdoYdDATMdVUrXAcVMJ9PnATv7kxzpEkWp86hBILqI+IamTecF";
    PACK += "oMnyGc+7zmnMLnE8uiPeXxjPvRddUTyW9rkfWLdgnRMN74Awm65zZHln";
    PACK += "JJHeGFyC58gRyUuv7PRUlF0q+16QfWLqFjQZTFqUqGLYppUZDOqLURUN";
    PACK += "9Tps6YyLBkVHRtfxVELJ6ehg7weFXbiT7hvV2PruZ6pR1XipnBEE5eYO";
    PACK += "rl4r+6kaGCfdeJ2afq2WfbUtxsWKtlePRAjGY9FgCgz7as0gT2fjjrvn";
    PACK += "pzTWxqsR5X4fpMIf8YwbNFXKLFgGxBhLYV80KNbREtwHQkxzKAFUy0sL";
    PACK += "fxyenY6Oj1Nu8FTJwMohGSGE1SkOlsLVqpQkdZehU3vut7nhIkyA33hj";
    PACK += "Q9HGmmwq/oTvwRsLbi36IYGc1iefDl904TMVbCruBn+Pyy6aNK67KD98";
    PACK += "4bOI3xqJ9lznZERnQmDfwF9jQy4vRvNiw28TpBGIIrkbFhelk0JmgcDd";
    PACK += "8byq6YgJX0wJun+3eyW4BYptBuN6r2j2ip9No/p7dsuxdC1Xw13suNie";
    PACK += "ZNZi+NDh4QWFXziyWJbnZXcsKbt3x3VtH0F6eMbplx6B1+Zda801+oK5";
    PACK += "Gpz9uyjR5LQNqLa5B1gZK7QfW+QX5+QFvDrKOtgKL+rQBDpNosCt5lRI";
    PACK += "oc9avXrwVRI+BqvcvG7C4dEn/Hhysalx3aZuE2OSlAqLl4qe5Z12PRWk";
    PACK += "hjBqxp3mL5Umc9IJh/kgmoirzDNDIQeAi2rREhq6Obl0JQw4wgR87epD";
    PACK += "uYem6dQ0bnmqTdmEqUIMhnUnp8FdhYTlPtp9Uivqw7M4Nj96EPfusAd0";
    PACK += "ebfbq3JnF48hXGolPuIkXWwYzc8MWbdSf/VSfTKRNnL18XkqO61bm+u1";
    PACK += "HNT+xI3g64RHz1ybL6nhxKCG1ezbiWLZBKN6pSRLefaigMNg7fsHV+wu";
    PACK += "y3Z6+5MWbJzsf3XF/LLdteTGyvqa126lXsUy2ulXi5q4i4K1KjdoWGMc";
    PACK += "1wylORuvnADN8yUqUAfdJkg0adkqWFoJxCpQryanDXKn9Yi5ZkU7xinb";
    PACK += "UnxLjLdRc523txCgwnrlgOiULKnuAQJuljNfC71lFdtzVEydHjK9v18I";
    PACK += "Aoy9YDIDCHA5d+pMFoY9Rt7Cox6KQtOcbtPJ9I+uw4ge8F9diDvhFmfj";
    PACK += "P+NIvihQAn9EG/oO5wVRL0ZpSi0aYTPqu3agsVDOzfwY0z2GoBt9PQTF";
    PACK += "2hX8fjgE5Rr+FIaal8/+dX317OUFRs/+/uJ9TdaSDSrKMC/fLpcFk1HH";
    PACK += "oQAb458LFpeh+R0L3rEconuEK1ELUg8X0W9KIgW2g3z/rrD0CjrlTNb5";
    PACK += "AY3dj/Ehu0feFfiRmX9j5rn13SwZb4PTZFxFliYXyaJPzA8vopzNxZNW";
    PACK += "5n0ikSkfqsHG8WJUwdk1YVIdteHTnYIe2H/Xeo6TKC1PH+93ipq2scrr";
    PACK += "LTwMlSuwo14TwKIR9I+xLCOg8Fd0stmoMFrk0AILCBpuG11z4NPkO3Qt";
    PACK += "ymp1x/JSCLISIkRBpHNt6j3PBwUKCIZEy8NAgKxsNiBLMD2LT1K5i54P";
    PACK += "lhh3CMFwOgqpPFuC7eLvn5w1tZPRH50cTodPDh9wDRsGi8+n4glxwZ4D";
    PACK += "Q5AjAVvTRBH3JsPGQf7+ulh5xe9tnuk2QI2sogHkVy3rbttduC4DF70o";
    PACK += "MaMZRqvrBmkrkZirJeKmq69vlUkzklw4b3OLuOQE/Gtjw9GYH6FmKYe1";
    PACK += "GwXWhHbtM4T80dnQV6ym4TotfXWnotrpyGA6ZF+ef2JMQMrFhmI4fq5S";
    PACK += "/aslSKb6hBmMCmkJ82NCiOYNU2EJk9/e9oD/SwcZBIUuSskRqgLPJ1sI";
    PACK += "qAZkVplW8zX4XamfYtfPRr5pSxNRZlyMirIJawRUQKpiRc+mK70Asmqc";
    PACK += "ycwPplOQGZPcKATXRJzVxIgtqyY1Hc4Gc8wv8y8/SOVPAtaVJKPeimAU";
    PACK += "a6GoXmpFNSZdcC4iQC06iKP+gJzj+i6Ma9L66KA8roz7k9NRMCLX1Fue";
    PACK += "et4V3diHsxkYb7YEvqtg6Pt/vSCfdeyH668877yjsYmfz4OhT04H3+L/";
    PACK += "1FFvBo33W92LZ8IN5Q25nNFn43D6ZmZG61UzuDy5/OtnMtQBe2ufAB+1";
    PACK += "saiK6wZJ8RlyWXntmyUi/fdl6Nn+7S3kmOqzZNFH7ZaLEjeCedtguLYa";
    PACK += "pFZkTVf0LPP6qB0iK58soGCfedgNFLSf6FL0tWwleP4cUqqdbAKukSbK";
    PACK += "iHGRzjEViZWZZSJLeUdbuof1ydwxK3q29lYKwkmVGV8gigi/wXOR5Q6z";
    PACK += "Kr2OipIlLIedqgquTCPbgdGtT+7VssqgnRrSJwtjKjWE+HDnCt8hDHgM";
    PACK += "zwnE3RhkOWbFFrSd55PVoCjTDPTIITdeAFs1WGPLhYbEUs6SMTr7+K7p";
    PACK += "Y1984bsvWzifBcDTzlz571zXwvOW1Fyaw3gvze28odeZ50/2WVgU4BfV";
    PACK += "G9VBbzTmuM8zJh4uFvdcL7mxVtzR0F0uuYEUKAfbdUHWnQO2ARaM13F3";
    PACK += "V+Lurqx7WhiXNLJu6LBxPYctd7NqYgJ4djDC/UFBD++kXc5jcht3iXnM";
    PACK += "ulzK07L4Q8NoVuV+Q+n6DaGSXlNTMyqwcTnZ152q0SuHvNzX2mCfUwBw";
    PACK += "TnJBXWPgaZeTtZBYHRgJaurR1oaE6kNahrHNhLUajdoBrJq3UoVSc4zK";
    PACK += "85PY4gG0IenQEDXddxbN6Ft/5ky46OG+c2mL+PVnzgZFQfedTEuQsT9n";
    PACK += "LnVNvo95cmRlzAIo10h8+31sOBVKG5bvORvPIA4V5B+BP0qUhxwJXO0Z";
    PACK += "XqQ9yAhb10RYKNbjT1GySD+1IV9WlH3MCk9EnfYniVeTuUxKfw8zqdXk";
    PACK += "KCPfxzpC/LYynVpVukvE9Ig2uWvr+8NqcxR/RzHkXN7X99Sb6zYNKYr+";
    PACK += "dFiKwm1ZdW1khCTr+0O0YJ5NLuqaVt4S5KO1hE+aPakIU7Uh1RaF7co2";
    PACK += "ETJN2/lK4fQk5io/6UJghq8K2hVxeq4t5p9gb21w6Jrfh0Xfn9v/IVrc";
    PACK += "j9e3K5o8/gfnCEyL5KT9kJQnl/vFSwY8hzdPysMWXQ5zLRqjRszcbjWS";
    PACK += "HlAZVikj944QY90KoJapKCFT5/xcLZkdSrHtS0PJhKEUpWoTJdQolkZh";
    PACK += "0OygvupOVRVHWELgJaYNiYRyTwn1UdLfFoZNmaqoYHaQ2uwsNiTj9gVw";
    PACK += "XQ6bG98pM098f2zus5FegJZev/VDnyjzhWdxbOcx6IqubHdmyuetzuyk";
    PACK += "Ag0tb7PD9o9Gp45ux2vTpTa77fhq9OuqWjy/Df6aPXd9Nrpu6DB43y0Y";
    PACK += "GHB1k/50H4W76FW3vpc49KrzOHDrxNYJeQnSrXk7NWmgY4UFBe3K0ZiO";
    PACK += "0y0hW4+HOtXEQJ/SHtdt43VsltcKZI7QGd+zmExT/p5BlJTUeBa0TtR8";
    PACK += "H+F13ZsPXHMd2si4MQF81BIwH7JRplauOvfZb9EOm+McHiY5gDqaONt4";
    PACK += "n5xFtb5UEjQ6jpPH2eXvU1Mhrt4rw/J5ndvJ1iYQf0VGzJ8cvHAQ10vZ";
    PACK += "uk0OoBJPmKV3XHr5ue0L0nU3rZko0IEgTj+GsRufjB2Me3boq8dI//p6";
    PACK += "hb1eQ5BT7lPQOgqHhLuckVvb3u2R3NpMRUuzvlrxzNidMdPuqnGPLeiI";
    PACK += "oNZZZ3LH90Y0NaumFe+M3RlT7a4a91jfgQhrnfXsOGud1Xi0tYsuRoVP";
    PACK += "i0OFjOd4p0+m0cb0yzSKuW+mUaCcQonSxIA3njm6awej+OpOBzs7lkh7";
    PACK += "rEbPn5bIGHR64h2IraOkzoZ3Xn1Qfe0sytFkK5udDpdPo+V93D5bqn9x";
    PACK += "IBiwLbWiArYejr15d9cH7y3T3rQRcKZNQqjAuBFFqRHiyLpDjchCIBEB";
    PACK += "XbADgHmtb7Ph1pj7kzzIHXfE5kRApibkK3eFEUrA/VzJTOJyms9ECBlr";
    PACK += "T0tcteEm2LhXbeE9mrUg+bDyKGwO4JR6paYbLYrO3C1EGp+7kAb7nIXJ";
    PACK += "gi3uI9W4EHUNRCGbI5LIQnAxK5msx+Nv6ShbLgMGmZFBhsQG1zwERsFK";
    PACK += "2VZDAFiNCGM5Nrj+tWIV87jhAIW+xemD8byXU898wFWndu7H5nc5qEW/";
    PACK += "2o8zrwIiAsDn0p1rDLnoiT0tcXqyT8/HRdbcDdlcYW6zB/budrMFdj1I";
    PACK += "B2lQdLDl5gB7w3bUoMnNap4PPr/mjCEesF1iyrCt7qX5ol09Rz4DI3kf";
    PACK += "tLNMB8zZ+ViyHBz/Ag2t56rp53c5e8eBLUqTlgdF2epLGwDeQZNmNjfC";
    PACK += "JJdhbblrF5AbdgEde+7Z1qHWcSg7DscuVO6BsrrAHPC3t8JTXESwyAWT";
    PACK += "IK0NTXbmdw3TEjVuwocOel5PDH7Ddji0tECV4aPbNzxGq0CclQFdcqqy";
    PACK += "CMPvmdMcype0db44pYk5H3cSefqpeL57tfCDRi23MyNVhBnfRae+HOfa";
    PACK += "9iAnkZFhJNf+1waCcxywr9K8bLpft9aX/tfuR4cKbX722tvRg81afbAV";
    PACK += "UlMch9ts0rVkxWw0P3T4YfP7osBURV3TWMNJ3MWBcQLwaDrvCOEwiege";
    PACK += "A5zlTQApuwBEHT5kMo+m1QyfkCCiOagnYi3BiINeSnrp8bHE9CB5iKQk";
    PACK += "vTfkodWOj3s8JbY0VcNsekVNpWfQUaECp9X6xjbfuMT0De+4sNyy26LX";
    PACK += "XhXv00+qt266zqpn0HNJIHFNY3s1DjZwbzMKojOh9+kn3aJ7PmY1azpt";
    PACK += "pLF+eW26uCci/XY7aRsYkgepb0GS+IDnlHFH0AScw2Rc/LEvDgSCqedW";
    PACK += "uHyS0NzFc8rAzdIbtD0uThwT+TZ1BDIxnhag5M4rOiTXFR0NyU6aP2fh";
    PACK += "iqGpZnBeARXG0BLguqp98q6L8ANiT1JsYCoMBTtpgOxSH7pefYhA1G+y";
    PACK += "QSLqtpaq6z7E4Du5rv9ValCNeoAc1Cu9Lz2oem0QhLovqmNOpvTsZenl";
    PACK += "JPW1R4umAd2N7qYW3ZperCk5Z2COe50peflkhzYIsSs11ueqd3MnrQ+s";
    PACK += "w8sl72J0q323cZnxQMEwYHZBm+iFwFcMnOWEw2utQU9Hkw6fgaClwelI";
    PACK += "W4a2JbGHeGXc5C8m+qaldW3tpLFWiyjW555PzqtDVDH696TmvrrUcuZC";
    PACK += "ZhycV/Ys0J6gdRJoApBPrv+EOdiG8deVeeRqAt0nrjZ5RIzDx07h8PWf";
    PACK += "fzXAglRmZLnoK3Ux3IMxMKA8IzE1Dh7IdjWnxs2jOUGIs8ItagCLFoWc";
    PACK += "jlxpU2SZ0xoJzE5HDgjxGHBRLX13YXYCl1pqVDVrUIZq5KAzkebHxznk";
    PACK += "pfKEEw/7dCQjOWP6rdjD9AM8UxUPvAcziQ8FHbDno72UwuRdzrZRWhXw";
    PACK += "2aB5Bb2igUaf2tlQNX7DPpeqIRJN+sxQnNPaFREuvsZOKDcAftN7wwB+";
    PACK += "DSe9UZB/F/MQv1lzpvZdpGc5pORig8ScVkutE6y1hIAiXdWGUCMOuyu4";
    PACK += "K+Ajd/GxemebtLUCl7Y2kqNofnZ4irYKXldbekfTVs5CV1OsRbPl5BAv";
    PACK += "H3S1Uky8vtJeax6KzrubB3gz5yyKFS8pTuarQxBt+v7IJneMnYtqeuiD";
    PACK += "8gtgVGT6uromV5LAK1MIvUA+pmWZbrgH2ssuwi5PP8kYH1f3ifHxXtU3";
    PACK += "iDbdiUW02RwdhPZwnc9z7e4AVLnwdSjEjY8WQVhTJbENax+WFVEJCir1";
    PACK += "1L3aVVRG8pwid4axr8HDeSYCh+ileSo5F8lU1BC+nSLSxppIRgt32/PW";
    PACK += "tLDfvmJQppk8yLUZXmIH+uFKMiAVxAbzdqAKlgeGUTsWzQ75d9nn4l59";
    PACK += "DgYDIwBq5RuBQ8o0E6uZk625Gj6B+cEVzX/f6HKNnre9a33b+4ygIofw";
    PACK += "UwgPzjn8klOA+CZ3zDC73wxb4oVoNn4v/Mz0NcyJFb2Dx9lwlBeGNE6q";
    PACK += "1/sT0L2A9a+W4cYtRnFtgT84F09wE3O5AW58D33J/8vBPQAuIbaHuHC/";
    PACK += "O7gHMH6xYLVORzK/ewKRYDjwT0rOeWcch/DUYc9xVF7SUB2KTPASy1SG";
    PACK += "7KZS7CS4krp0cGt4kBwyDHRYzGuAcA3ZXQzczc25NQ3jdbv71nAIBjos";
    PACK += "J1f3joWgwUQD31UjEALs732iIOjeDodA0Le8EQHBurNfHgLhWgEezJk6";
    PACK += "6ZqNmD56528Yy3QTxStBlJlGtACdS0DlWoxAZqTAqkso5fmTiodghoNp";
    PACK += "61dEIRDheyA5gd8R7CMSIp5IB/vIa8MxAC+InZbbpkJIx6HBuahYCe5e";
    PACK += "4lbyV+hgTkQxvmIt9A39XVPi8HDHrORjf3BieiJOcIY/sl33mrcZjsGk";
    PACK += "ag6GZfA74jLAS9UdksGN3iOWW9fk8gBNecViEVTgHpri90Z9m6pUxagx";
    PACK += "Vk+l7h3kZ1h6WcVl1P7pCkW+5ocWsaJEeapaC9p1JnkQ8Tp1bdRrDWLF";
    PACK += "wj5qzKPLfcjcnYb7kKVt5NUEpm32j6oVM6ua4V1Zumpg2ZfISZ1TQBtJ";
    PACK += "rfjulgC8SuunwG8SW2o1aYDJ+/Yw+wI32qQYsCywqy9YzEp2JKqgqs1e";
    PACK += "M3B67rrbly3UKHcv3e3SAwdyvnR9cM17bs37fQV2qeifTQA2gU+Ka83a";
    PACK += "y77vlyOlUbstdKYJI6SlK4UELXWY1N9OPlUegwwjcKEx9Zo8SYwhKbRk";
    PACK += "AQT4PSgecqeqkKU0Sfyda2laNP7vrKdr2mpd4gr8zmW5SuH/nUV1zNmI";
    PACK += "kutiE8U/lLTjONTNJ/aTkNjyO5LTXs8rVVRVc52Jr9JZahlmqewH4gbq";
    PACK += "6CXTGFWSmFEFPKBzW7Pn4AZ3FYcNRRx3D2Nk/x5rlEtsXcqhiUuK2Z41";
    PACK += "GryJjCzmnnkl7QQxbZy2r31nOgmIhpPv7jpMKXEyJ/fHttVCoR34FuS1";
    PACK += "im6Rpu/m/rtG8bop5DVRM9XFtseWA92mArY0DBLcZ7BseGg5nborOdBx";
    PACK += "Y9HlPd2/eA967y3ykLnboYRd+i1MBTSJELlG8lTjQUyCXqxNrdSFA25a";
    PACK += "xSvnKpEKn8ZUPY3vK8guDi9fQryoGXilwM7O11G8yFmi45n2huDcWRm2";
    PACK += "EA34alw6U2Qhx3/JUaQFsb+vpxveEwgQANz6JmrhZGbxhzsO47hfOxvd";
    PACK += "TJoiRUCu/YNFXZrSoUMVheDoUJV290r+Waz8/pN0KPKD83TqdkzVqdU+";
    PACK += "W+QRvnRDG4zFwdk2anfMt1GvZcYfrGt9wCREXkZtEiilE4ZhiEIAXF7S";
    PACK += "5rcTm347NXkvUzlLmb2p9IyltKJEaUUy8aLmLgPutYzsLJMqQcizaQX2";
    PACK += "WU0mgE1L5AD8QNUsZyTHTGZRw5AnNaKytwAn9KgambN4Dzev4sgJ1ukb";
    PACK += "HktIW5W+ud2tdFtOp+DWua9JSmVjLyKV8nWKlH6CZ9eEDjP6svIKSAcQ";
    PACK += "Lb0MXn0eEb7wSTwtkP0pfAIi7cZaQ7VWr0BcWxBRJUg9Xb32SeYr07KG";
    PACK += "6EfiZ045pl6JPIuvCchc049xrV3kX4pdcXM4NfywR7oN4jfMesGVXxh/";
    PACK += "H4WJ7tpyFYtfpsUU4t3ekKRg8qMZZecwIxGpCy3tYoCgFqB6WXkRKf1J";
    PACK += "SlETDHSWAgsTQuQkhHDuhjcbVxJD8w68Sj0FCJZg7IWdgq4+nmDNIJ3w";
    PACK += "GrAhsPqLin7lTYen385O/K9WG/LKSDB4vfQuS8/KrOIPyvR1+onl52EB";
    PACK += "lORlyS0WO7775Lc7+mv24JM3RpvL6o/P4fUd/bXN4adGokVqNYK07ubf";
    PACK += "Ct2dxRNU5k8w2jZ5YY9t92EPqq/6ZWU5J0LQh3IyDNhZORmBmF5XLI0A";
    PACK += "EdLyyMiEyRPEQ3p36GP01ZD/gIzyk34/EGn0mB8YbWVCbxb0+3qk66WN";
    PACK += "fbjZ8UXVDCULloedX4WtokIZuZ20AjPXiKQVIC6XvyOahXnBXiWlF5PR";
    PACK += "EILTqYIUCwo6jUg143kaEYvxtaODFhq6xWepxD8jNIE9M/Qx8zQpo6Ri";
    PACK += "tdFwNFOJkXhR5GNgOOz8rLI6q84i1VntpIY8lYvEC7fJ6T6Ms3WYVBuW";
    PACK += "R/PgVUbMvwFor1gCku8tC37LSMk+l8Eb/q/98XVGFmHJymjDgp8y8jEs";
    PACK += "onnwIqvJgy5hKOxOV8pDN3ejqKtd5qDgR0mCB6NDQtQr3taQn4reUHQa";
    PACK += "FfxZTvMS46OAz13Jz/rvbHdnZvsrObFGErxDjCIPDQqgAgwtwiFC3BEw";
    PACK += "F77MVurSIM1EeXckwUsPJMHb5AN5XkbKvdTMhwvc9pCkxgVyIzVCLya8";
    PACK += "KCvtySYfIKxs8gGCgpE7ELbsRZR/yYZBVlQLsXh3ZBH0DdzRD4t5P+gv";
    PACK += "WDGX7INzar8n25+CSDvTnwbU1tKWDH9qLi3Z/VS7w5n9VDWDxth0VdES";
    PACK += "YTFyG1sMRmbiM89iBCiwlfs9Pk56fG6cfRatDPVdZE894sq3OT2bm5mp";
    PACK += "ivZ63PDLrRwCWZmRNU0nCVqt8dNFZCjJpUjhdZvLQZx8fJxPqkkG2m7Y";
    PACK += "iX6Q0X64WPSDluZFD7KXy1xU0ChnGSQ66wduF/IDybgmHT8A/XN7Cyah";
    PACK += "mUpC5vu8CozJKb/FOKTc/Ealn4c1Bet6RkKZCmlIJIF7CnYwpWEt9lmt";
    PACK += "7jyNLVupRVfgb9+vIaLtkTnZSUg5SW5v+QRo6bmcUTD3g8xMqQaNxOMq";
    PACK += "2qkcsCGdNhZk2B/VUmKdF6WFGJpRiZAotiH6BSvm2FQbDtiXp1EhCVw8";
    PACK += "5PkKfvwJ/zdAlCGm5l4FHa1DheFuLAGpBCVTyUvTryGaRD2KuaZbnDTE";
    PACK += "QJjFPIyVgjzH1LVeggaq7RwznoRYpX97G6NcMFJLs7BgkJqugXl5/zhQ";
    PACK += "Yn738MR2auatLs+kcTVbp9I4e2Ph0Kjt9DuqJEHrFOQxNV2J3By8ApE2";
    PACK += "DGCcvAb8iVbPYT6AjbfAS1vvwNAttjvm4u8xhdzAl848zKw7MOY8ZmGu";
    PACK += "sL8KHi5Rt53pWWhT7OBXxgXXGVU/mK/KIakMJ4sNmUzCmfy73UTlpJ3I";
    PACK += "YHLmIlpDC8I35FEuxdflYOXW83I/6I0OxPKUk3P04xb92a0at6oZWnGj";
    PACK += "Vzsfrlz0/dPhFu7ttbLh2uo1rWRt6K3btHGW4bT9yTGadj96bW3ogSat";
    PACK += "htJiM5SVtN1k0r5GZR3tFoM+4UNGp2lG3mfkKiOfMhJlpMrITUYuMvIg";
    PACK += "I9uMfM7Iu4y8zMhlRs6zmWaZ3y+BEzbCLhzl+LZ/yIDTQS3U9ZKFZZWz";
    PACK += "QuudpjMUlakvQQ5Ss1hXVVGcFmSutZ4QKXKVQNmgwQLZANBSwYt9jOpE";
    PACK += "IroAnKE2leXKc2HSXuylZOEHe5mRcVETLnHjZi0NswzTEqMem6uSUqqF";
    PACK += "APD5uKDenC4GDtdoL6bx2St8bYJb1NwMgxOK4BS3tnaWiBXp+bOamNMN";
    PACK += "CsKdzwKYVsgFkAufZEjG9YbkXZ5uogLvaBpDpM5BuWYJd1VDuUKopAmh";
    PACK += "FB14/jhDl7UBD7k5p2cFKz9EG5ZWpXC/Q+ZjziOT4/0POAbFG4/rjO19";
    PACK += "rUnBFMu7EMh2Dr43C6JOzh+rnzTy5n5N5HuC3esTLqCMyLF4fyaSglI7";
    PACK += "EEfHZw80ftdcFP5qEQB8kq183nbycdvR2HFofbVw2V73u+hKHvYu+OXB";
    PACK += "fjuZboHCnM9EPMFB3w/m9S81cUw7uDwhxltvlt/ethTak7MsRODeNBuA";
    PACK += "gM8wdhF726HlFTUDcZ3x3LbUm0/iQ+4csW1No52ypwuevHV7fOxtuRbC";
    PACK += "CRNk1CS9rd/F6G75uTUkMcJIQ+/JwqwxI/r+io4WeI31pdzXZM+j6wZb";
    PACK += "sd4d3YqAuzKepiLyZC87Ra39ne0m1l/BzqDkJrtBtOB2n2QOCbW3EtjI";
    PACK += "jQY374ZuBzlLFiwXoY4UkX2jpCc2BOpyzwA6PhB4orUg6C3ZNRD0luwG";
    PACK += "Ldtqj9VaxRM4GrEsWqs0MsO0HRgwmdcqGtELtiycuy6C0BIRJIr/pY/Z";
    PACK += "bgvmNhq7KF3OluzIjZL63lBK+UqOj70bOvQhijvP0YENlzTOvJisyA3Z";
    PACK += "+WRDV/KQl3IyVKaaKCZzT/0mS3JzMkJnlWWt1DNHc0QybfthLanPb6Ud";
    PACK += "xlOv06orlrlA0dOl5IOBvbMjgHYPasYQFSdgl6LayBnd6l3MQAITx5ve";
    PACK += "HDHcjG7JnIPDvaYAg+n1G2H9Otcv0JqdLhmNrSw8pXdoR892jfyovj6j";
    PACK += "7cEzchK5KZgLkB5p3z3Pny5m9di+XzFZ+0qSuqDD8eI782qKx3hxcuIL";
    PACK += "GDa+Au400gsY1H1rITh/qxxKWpO3NMN1nymbNoUuwzKckVKxQ3fbpeX6";
    PACK += "nmGeXH+fmhcspUNfmJVMZ2rpIR2Ow++kqf84lAvO6GfQ5HCClz+k8TSc";
    PACK += "kZBEoFfFXykRHFRDFicEzomWYSNFlPkk0e9KhgCakUp9tMl4odBErFyM";
    PACK += "s0GaR/DCSQMR2lZbTNInXkEbLZRutNB630xqKmnuNRqQ9GREMu0ddVTV";
    PACK += "OqFSzhuVmKvpoE2gMgIU8WxbQi1gwB4FG28z4Ai42dcUgklrS4SSb1aO";
    PACK += "mdPyzjAcoJ5yImVAkavq1crrI2Zb2ibcEK8ISg1wTBsiKsBj6jwNzfYP";
    PACK += "mdRSq91yIr7l6UY6K06eydrBf+Qv3ZX6KBTe0hWbpGAmEGEAXFOuKXrl";
    PACK += "2gGMeaTFPaPhkFT6khQk9PeheUVCeUUy84pw7GDjBPRdHHPMAPiAbOG+";
    PACK += "JGSOZKWCI/gb3ejngwXMRV6YuYprgvdkK14uEWCQzu2/ibem88ZRr9VR";
    PACK += "h99FqCbcKliuPFWfhOBLPadbUnpzkKltXd38PuMwNfdJOp3jpZxDdABe";
    PACK += "ZukXoYvb29/dAxcg67l4B9sprJnZFhaQWUADZaxhMTVA8D//b8KNhpix";
    PACK += "2E4JSxA75R7HzMng3wtru0MQsqv1ccTNg6n/yHFcdLx2XTF129Kpyttg";
    PACK += "fTJjLpo+PejlZnp2Q9jqhpwS7kPu7+0TK10TXTw6XTpdzJz7uq/Jgc+X";
    PACK += "rIREcEolWRuwOJ2NHaezpnyDU1DMyMC3kA9sb2smwQP2SGlGgQob7+BF";
    PACK += "wJMErQo0IzLkZrAjQhixQNYGUi3tpHyCd4HlLsfRrOEteLQ8Q6AiSmpf";
    PACK += "CFYi2uJah2Qr6OeEz54djNQDJV972G4hWsb2zYixSE0eH1fWMx/xXbDD";
    PACK += "CLcJk9Ku7aqa21XduV1tNbzc2CjwufGF8Ilk4/sAosAhFsABLMybQKmC";
    PACK += "csl+t3Q43mpqbwvdhTSebmcCgMJBtBg7PU13MxqqUK3enOxIOLA2g9xA";
    PACK += "Grgm1EPLm9qHl0O5i+7tuaTWXDKa6rkAfYg2ffbY2ReN7bvfBhoEaG84";
    PACK += "/piz8Kauuyv1IFTb8bF3qBuwU4M5r0EsqhY4p8Px/DupCx7PT078aOkt";
    PACK += "nM2NpvPZDOLBjbShnvgxVDjjh0xYFZI1ODzdz6/mi8nOz0vTJEth6bIj";
    PACK += "Rkx5QPBESjMQSCM+rVaftETeU0lxeb5QE4lLQxJ8z/cq4pAdIYomgnSN";
    PACK += "9LNU6WepqGlOQhr/NSUZDU/icQRWsKgwD0nG7+J6fMf81/TwEMGavs28";
    PACK += "w3V8slZ3GB4CfvHn9Gy/dvimuU/mDs11fDxvUPMLTc2vbWp+4ZN13ZK9";
    PACK += "xQ4+5Jxi34SNd90PuKNoJF3aE+WAheeauI9zKR/n0rFcbfdol6OJhzSX";
    PACK += "r4I2DhZSvNB6Ogth72Ni6dDSNNYiyGWqdk/EQzlq6WkcwuMizIz3tplZ";
    PACK += "6JgfqC8kSrYslxo5q571hWjzoNCyQ4JJ1pKZ17Mr8FnNhBN6VmuxSsiN";
    PACK += "C72MrP0Ghko1hqIjaV7CMXQ6nc/IjkZcmERu6M5ZyYp6C7q1t3OL2mtt";
    PACK += "T9IbkSUdAia/4Y/XhmbaAGuLJMAVXbtFmH9W0Njkgl6pP6Cn89vbC+R5";
    PACK += "QIbYxzhRylbtXJk64kcIEWV8AyvU8ZKeHx9fTIbB+eQmOL3BWC5LCGd1";
    PACK += "fOwtxSL5TmdkTXA+Pln2KB3KjlZQ868UYkrt7FPTH5aKYhb5mNf839on";
    PACK += "oQKuTMDrehwrOYi3ptkBRsAQWlT6N6ZcCV3aPHGN0Q0CPTF49ztcT62r";
    PACK += "fO8H5R+xbQw8eQ6Cjck2F+Kxi5hBzlmsFPActrox1pVNf8zQFNiw9VW+";
    PACK += "I7e338NH3fDHrN2yWLUAExTtVyfkgoizhGEkBBgxvPyVwSTgJm09Cdk7";
    PACK += "w3l5nm6yNGFJWfueMYvvO2bBzSv7x8cq2uKDB/wnGCHuNh/TuH98PO3n";
    PACK += "0PdgwzZpn4g/lmn+KcwX1zlb9mc66ovuAS9eHuEpGlN5udTipD2q7EC5";
    PACK += "YunfuNoQdIig63gZxvHHcH7DKV3MCMx1ntNkRrf5oCoYR8Pc3HZe5cBg";
    PACK += "Bu+XEEjf98k0J3GzYjIQFW2NpJaoyc9aQwkedZ5WuhIxeZmRjHEFpLsW";
    PACK += "NCb0IpQntukgnWIvAjcDEE2KCaCx8yt6waTOygZXrbn/Z6YfxVdev8jC";
    PACK += "pE/28zgsijfhhgX9cn0KqOQ0mkPohX6YR+HpOlosWNIP+mVegecbNNyu";
    PACK += "7HbYCPLTfooW5Tp4StYMEvEEX5NtxD49Tz8H/eHR8Ojp0dd94FDioC+m";
    PACK += "fp7Gac47zcJy3Sf7RdC/fMzr/jD8rQ8L7RxxkX5K/rwxvz4aHg3XT3FM";
    PACK += "Eylkpjm+DqpYAluumK8+d2bsE6ECVNKX3NzxKMmqsk8ws3rQR6+rj+nn";
    PACK += "PjEWNl/f9InwxwrAYetjfDAeQc6WerDY34PNSYx4u2T5BilBanXT5reL";
    PACK += "HtR3D+YD5AqgNWrf5fTq+QKU4vAji/tB/+fq69GTpz9X3w6H3/5cff3y";
    PACK += "60c/V18/fPzi5+rbp9983Qe7SdRx/lmbmKefXG9YcyHic6vfXcvc+ayf";
    PACK += "PLz49ufq6dPH5zhfyywQSIhmxhYwifOJx25vTbmJuUYJT6YSOAcXOglV";
    PACK += "+QCn4YzGTZ9CzDcGxiAbVobB/mO4wNXhv2STJmmQD+AfIt0h8oH4RW7U";
    PACK += "QPN0k4XzEnJ58V/kUx5mQT6Af9xjiTn1lVLDep/HZnXV3QOY0+0tj8Ue";
    PACK += "8Tn5hzAR1ujXJBVkmVBRp37Q73OfEzn54+NU+QL2KO33kc6KYDVATn1C";
    PACK += "rKAIKtXPGGZeUW487OkAylWP0soYDoNAhh8Lr/rLyP9uxE6/lR/xS55W";
    PACK += "EGvJ94OW0r+OhkP/K/hPrR0C0ySdtK0KDjdKbiavvP7HqiwBAQsQl38a";
    PACK += "25Pmq9Mk3LDTj2XSB1iOo/lNkA/S5HWU3OBfE3VM/t764MUI8VIO69ci";
    PACK += "DVTHZgdtpRDdDhRJCkv+BvwWpPmNlp5Iy3t9Pf/1Rfk+TUtFPDS+YPxS";
    PACK += "/kwBXWdSPfLEGm1ERl/m7+WuLtJ5BV3o6fw9UzZqpmltQcBwC1SVcAkh";
    PACK += "orsK2Xl7OxpiOBvOl70DS/d1Gi9Yfnvb/7l68nh0/nP1zYuHDzXyungK";
    PACK += "aGv0zc/Vw+HDJ31wU+wx4dUOtxGtpAuBT14tCoB/UlFvSC6YIjV8bzoD";
    PACK += "0WE1Hc5ISKvpCEy62uqsaQZ1FjSDOvNGnX7fJ1s6hzo7Ooc6N406oFlf";
    PACK += "0Ruos6Q3UGfTrKOFE0MdJTmvgevZQMtzupmOZmPV7mK5ZPPS9wyAAwka";
    PACK += "3/9L4E1NZ+CoBfd98PfR9MPs+Ni7nH4Q4X/I0rsES8VpRCBUJ3pQ6rle";
    PACK += "sk1qjShA4R+ZV5LUr8m0hGbkmr5cens48SAROe2L4EISZtJJqyCWkCtY";
    PACK += "EztNGrF8+VdmRPyrui0+VUqUbZia4yX5oKZ5ObjO4at9tWSpH1yiDbL9";
    PACK += "LcLyJHXLE8BSg3kqU1vqL1AG366jxefGSNHis0JaH/Blt13JQiKTi4pd";
    PACK += "EeUL0poQbkdaA3rp1fv7pXXgyEQy6XZzabnXX3of/ODSiGmfOP2i1a1b";
    PACK += "6K2ZT9YgxSctWQbOG8ZyYNJAGtxi8E4Uu3LJ4EJ8aIqegs/4yUl/Z2cw";
    PACK += "69c++UxfeQaZ/jIPV4C3CLIsBmljYPpFecox0qn4yN+EgoX5fN0nmcZT";
    PACK += "QUxQixFsVSTVfp+0nsTOu5QxRrgqBPyWW9/hRXkKT3e/Jki1fTM66p9I";
    PACK += "bdRJ/+jn6sk3T0ZHP39+/s3Rz9U3z79+rqi6x8OLo/7JdYfvmyFMU92A";
    PACK += "hcwz4WyV7/YSFf+QFuWrxfGx94zCK+M8GZ5dzZcJ3y/9PfJFb+iziTck";
    PACK += "r5aCKXoHpFLse5/JMz945fUX0bax4jJN448h8AifFV3QWjUsw1NE9f2a";
    PACK += "vCFtVfDrKRBPR9Cx+ovzH7xts4H4ClRfnwMH7uMPSAWixbqMfWyeqp5p";
    PACK += "mffJHog6wBo1uRRWiIXdRF/CD90EG9kan025I3lVWR+0LxCJSupt2USy";
    PACK += "k30gI068V9WkfxQVp/2TVxVScWK+H7gvh+SgJlFJoSXQ8MGaIeEJZV5U";
    PACK += "TqLypH/Eu4MquJGBt2aSWL29XTNJF+JvTmiCzLO1A9Gs7/PtFpv2ARXV";
    PACK += "6kiiUhFYWzYxl9zmEuL5ipzasslhLjtJIL0k+UfstRwAPzLygYtwE/A3";
    PACK += "9ZAZ/meGIOH7wZc0BEGHYKbLj+liZ8JV+72ctH77AqBzkqy7EHtv8Ov3";
    PACK += "NaiIijbEQJ1yoSAGSGwwE2a0P1+u+vAmcCjaMrplky076R+VCwE9ffXr";
    PACK += "XnBkdyHhB3uxgWnRDkxb1nXewFq1H1ogNle+Etj3PI2vsjAJLsRpERuF";
    PACK += "sU1W7jjWfvLk6cOfqydfXwzhv9/Afx89uej78D/SgQGNdDx158MAtOFp";
    PACK += "lCxTPs43zx+eH/VPvOu70j2cjPyT/tFXR/0TI8fHtZP9wMdnAeUBHU8T";
    PACK += "8EDQp5DlKKbJqAJyLGCRjoqNfDhltUVUAKZdBL3rlrwVXECAd96gMa+t";
    PACK += "jBGQxc+VDTy+GD7D/w6lLENLr7icavRYCqpGj21J1cPHRw8fS1lVkias";
    PACK += "T4oyT2+YI7kSpf/E7h46cqzN6Ouj0dPTJ6dPjp6cPkFRFs5ASKfaTrCI";
    PACK += "fmN9QToIevD6rvwG7WTFtZVFRrDWDqXRsmlPnp+/5NvF6QAOpv2aTEdD";
    PACK += "8nBIvh6S0XA4O4B6uCJAoh97LZd+TS5P+rzrryRICVT4h4FG5ivpAphE";
    PACK += "fW8Fluf//wLLt0ejpwAnpxJWAOWgSKcEtk2x0//KjIhQQubTRouV3MpH";
    PACK += "Rv/A2B/llM24aAB/DnJg+6tkw6+5oNYyf1+LaE9YCwlACJ+esPyHD5ev";
    PACK += "ab9v1MQpRjRHJr6iMT4UBTCHl5LMA0GBD2IdtYYQtYn7DJPuZD4BxVRF";
    PACK += "bStr4M/J2gdTG65Z8F55f88Q2Uong4QgMxlpzrhS14I0ZAdB1ZQnEC0h";
    PACK += "CCpTXGCICtQH/Is0WJ2garI/xKSD1cD8T3hHcGPpni8sCAkcRFDUJITk";
    PACK += "Sn5tylnCMuT24Xs8puBfGThNQbGGbmGuiL0eH4uz5ZuGJrFEnPEzU2Lo";
    PACK += "701RQFq2yALYncBSOsACSdLGroTp/B/XH549f31x/fzt2w+2Nq29jueP";
    PACK += "QSM2/j//H8c9s2FB3AMA";
    var ROOT_ID = "shadcn-hello-inject-root";
    function mountOverlay(css, html, bundle) {
        try {
            if (typeof window.__cqDisposeOverlay === "function") window.__cqDisposeOverlay();
        } catch (eDisp0) { }
        try {
            var leftoverFrames = document.querySelectorAll("iframe[data-cq-fetch='1'],#cq-fetch-frame");
            var fi;
            for (fi = 0; fi < leftoverFrames.length; fi++) {
                try { leftoverFrames[fi].src = "about:blank"; } catch (eF1) { }
                if (leftoverFrames[fi].parentNode) leftoverFrames[fi].parentNode.removeChild(leftoverFrames[fi]);
            }
        } catch (eDisp1) { }
        try {
            var leftoverScripts = document.querySelectorAll("script[data-cq-dt-bundle='1']");
            var si;
            for (si = 0; si < leftoverScripts.length; si++) {
                if (leftoverScripts[si].parentNode) leftoverScripts[si].parentNode.removeChild(leftoverScripts[si]);
            }
        } catch (eDisp2) { }
        var oldRoot = document.getElementById(ROOT_ID);
        if (oldRoot && oldRoot.parentNode) oldRoot.parentNode.removeChild(oldRoot);
        var host = document.createElement("div");
        host.id = ROOT_ID;
        host.setAttribute("style", "position:fixed;inset:0;z-index:2147483647;display:block;background:#fff;");
        var shadow = host.attachShadow({ mode: "open" });
        window.__cqDtRoot = shadow;
        var styleEl = document.createElement("style");
        styleEl.textContent = css;
        shadow.appendChild(styleEl);
        var wrap = document.createElement("div");
        wrap.style.cssText = "height:100%;font:inherit;color:inherit;";
        wrap.innerHTML = html;
        shadow.appendChild(wrap);
        (document.documentElement || document.body).appendChild(host);
        function uiEl(id) { return shadow.getElementById(id); }
        function uiAll(sel) { return shadow.querySelectorAll(sel); }
        function unmountHost() {
            window.__cqDtRoot = null;
            if (host && host.parentNode) host.parentNode.removeChild(host);
        }

        // 日志写到父页面控制台，方便在苍穹环境里定位问题
        function clog() {
            try {
                var c = (window.parent && window.console) || window.console;
                c.log.apply(c, ["[cq-demo]"].concat([].slice.call(arguments)));
            } catch (e) { }
        }
        var cqDebugLog = [];
        function errToInfo(err) {
            if (err == null) return null;
            if (typeof err !== "object") return { message: String(err) };
            return {
                name: err.name || "",
                message: err.message || String(err),
                stack: err.stack ? String(err.stack) : ""
            };
        }
        function safeHref(win) {
            try { return win.location.href; } catch (e) { return "(cross-origin)"; }
        }
        function snapshotCq(extra) {
            var snap = {
                extra: extra || {},
                href: "",
                parentHref: "",
                topHref: "",
                consolePageId: "",
                suffix: "",
                watchedTenantPageId: typeof watchedTenantPageId === "undefined" ? "" : watchedTenantPageId,
                lastAppHomeLen: 0,
                lastDeductionLen: 0,
                lastPartyLen: 0,
                lastOrgLen: 0,
                lastAppHomeHead: "",
                lastDeductionHead: "",
                lastPartyHead: "",
                lastOrgHead: "",
                clicks: {},
                iframeSrcs: [],
                hasJQuery: false,
                parentWinHref: ""
            };
            try { snap.href = String(location.href || ""); } catch (e0) { }
            try { snap.parentHref = String(window.parent.location.href || ""); } catch (e1) { snap.parentHref = "(blocked)"; }
            try { snap.topHref = String(window.top.location.href || ""); } catch (e2) { snap.topHref = "(blocked)"; }
            try {
                snap.consolePageId = findConsolePageId();
                snap.suffix = extractRootSuffix(snap.consolePageId);
            } catch (e3) { }
            try {
                var dSess = cqFetchSessions && cqFetchSessions["cq-fetch-frame-deduction"];
                var pSess = cqFetchSessions && cqFetchSessions["cq-fetch-frame-party"];
                var oSess = cqFetchSessions && cqFetchSessions["cq-fetch-frame-org"];
                snap.lastAppHomeLen = String((dSess && dSess.lastAppHome) || (pSess && pSess.lastAppHome) || (oSess && oSess.lastAppHome) || "").length;
                snap.lastDeductionLen = String((dSess && dSess.lastList) || "").length;
                snap.lastPartyLen = String((pSess && pSess.lastList) || "").length;
                snap.lastOrgLen = String((oSess && oSess.lastList) || "").length;
                snap.lastAppHomeHead = String((dSess && dSess.lastAppHome) || (pSess && pSess.lastAppHome) || (oSess && oSess.lastAppHome) || "").slice(0, 500);
                snap.lastDeductionHead = String((dSess && dSess.lastList) || "").slice(0, 500);
                snap.lastPartyHead = String((pSess && pSess.lastBill) || (pSess && pSess.lastList) || "").slice(0, 500);
                snap.lastOrgHead = String((oSess && oSess.lastList) || "").slice(0, 500);
            } catch (e4) { }
            try {
                var pw = parentWin();
                snap.parentWinHref = safeHref(pw);
                snap.hasJQuery = !!(pw && (pw.jQuery || pw.$) && (pw.jQuery || pw.$).ajax);
                var doc = pw.document;
                snap.clicks = {
                    app: !!findClickAnywhere("应用"),
                    party: !!findClickAnywhere("党费"),
                    deductionMenu: !!findClickAnywhere("扣分项台账"),
                    partyMenu: !!findClickAnywhere("季度党群绩效贡献度"),
                    orgMenu: !!findClickAnywhere("党组织查询")
                };
                snap.sessionHref = sessionWin ? safeHref(sessionWin) : "";
                var fetchDedEl = hostWin().document.getElementById("cq-fetch-frame-deduction");
                var fetchPartyEl = hostWin().document.getElementById("cq-fetch-frame-party");
                var fetchOrgEl = hostWin().document.getElementById("cq-fetch-frame-org");
                var fetchOldEl = hostWin().document.getElementById("cq-fetch-frame");
                snap.fetchFrameSrc = fetchDedEl ? String(fetchDedEl.src || "") : (fetchOldEl ? String(fetchOldEl.src || "") : "");
                snap.fetchPartyFrameSrc = fetchPartyEl ? String(fetchPartyEl.src || "") : "";
                snap.fetchOrgFrameSrc = fetchOrgEl ? String(fetchOrgEl.src || "") : "";
                var ifs = doc.querySelectorAll("iframe[src]");
                var i;
                for (i = 0; i < ifs.length && i < 25; i++) {
                    snap.iframeSrcs.push(String(ifs[i].src || "").slice(0, 300));
                }
            } catch (e5) {
                snap.parentScanError = e5 && e5.message ? e5.message : String(e5);
            }
            return snap;
        }
        function reportError(kind, err, extra) {
            var payload = {
                kind: kind,
                at: (new Date()).toISOString(),
                error: errToInfo(err),
                snapshot: snapshotCq(extra)
            };
            cqDebugLog.push(payload);
            try {
                window.__cqLastError = payload;
                window.__cqDebugLog = cqDebugLog;
            } catch (e0) { }
            var text = "";
            try { text = JSON.stringify(payload, null, 2); } catch (e1) { text = String(kind) + " " + String(err); }
            clog("ERROR_JSON");
            clog(text);
            return payload;
        }
        // 安全绑定：元素不存在时记日志而不是中断整个脚本
        function bind(id, handler) {
            var el = uiEl(id);
            if (!el) {
                clog("未找到元素 #" + id + "，跳过绑定");
                return;
            }
            el.onclick = handler;
        }
        function unmount() {
            disposeCqResources();
        }
        bind("close-btn", unmount);
        function syncThemeButton() {
            var btn = uiEl("theme-btn");
            if (!btn) return;
            var dark = host.classList.contains("dark");
            btn.setAttribute("aria-label", dark ? "切换亮色模式" : "切换暗色模式");
            btn.title = dark ? "切换亮色模式" : "切换暗色模式";
        }
        bind("theme-btn", function () {
            host.classList.toggle("dark");
            syncThemeButton();
        });

        // ---------- 页签 + 可排序表格 ----------
        var STATUS = [["A", "暂存"], ["B", "已提交"], ["C", "已审核"]];
        var QUARTERS = ["2026-Q1", "2026-Q2", "2025-Q4", "2025-Q3", "2025-Q2"];
        var YEARS = ["2026", "2025", "2024"];
        var GRADES = ["优秀", "良好", "合格", "待改进"];
        var activeTab = "quarterly";

        var ORG_TREE = {
            id: "all",
            name: "全部",
            status: "已审核",
            children: [{
                id: "crrc-dw",
                name: "中车株洲电力机车有限公司党委",
                status: "已审核",
                children: [
                    { id: "org-kj", name: "科技管理部党支部", status: "已审核" },
                    { id: "org-zl", name: "质量保证部党支部", status: "已审核" },
                    { id: "org-gy", name: "工艺技术部党支部", status: "已审核" },
                    { id: "org-zz", name: "制造中心党支部", status: "已审核" },
                    { id: "org-cg", name: "采购中心党支部", status: "已审核" },
                    { id: "org-cw", name: "财务部党支部", status: "已审核" },
                    { id: "org-rl", name: "人力资源部党支部", status: "已审核" },
                    { id: "org-dwgz", name: "党委工作部党支部", status: "已审核" },
                    { id: "org-jw", name: "纪委办公室党支部", status: "已审核" },
                    { id: "org-aq", name: "安全环保部党支部", status: "已审核" },
                    { id: "org-yy", name: "运营管理部党支部", status: "已审核" },
                    { id: "org-sc", name: "市场营销部党支部", status: "已审核" }
                ]
            }]
        };
        var ORGS = [];
        (function collectOrgNames(node) {
            if (node.id !== "all") ORGS.push(node.name);
            (node.children || []).forEach(collectOrgNames);
        })(ORG_TREE);

        var TABLE_DEFS = {
            quarterly: {
                label: "季度评价结果",
                sortKey: "quarter",
                sortDir: "desc",
                columns: [
                    { key: "no", label: "单据编号", sortable: true },
                    { key: "quarter", label: "评价季度", sortable: true },
                    { key: "org", label: "党组织", sortable: true },
                    { key: "partyScore", label: "党群绩效得分", sortable: true, numeric: true },
                    { key: "excellenceScore", label: "创先争优得分", sortable: true, numeric: true },
                    { key: "totalScore", label: "综合得分", sortable: true, numeric: true },
                    { key: "grade", label: "评价等级", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true }
                ],
                rows: []
            },
            annual: {
                label: "年度评价结果",
                sortKey: "year",
                sortDir: "desc",
                columns: [
                    { key: "no", label: "单据编号", sortable: true },
                    { key: "year", label: "评价年度", sortable: true },
                    { key: "org", label: "党组织", sortable: true },
                    { key: "partyScore", label: "党群绩效得分", sortable: true, numeric: true },
                    { key: "excellenceScore", label: "创先争优得分", sortable: true, numeric: true },
                    { key: "totalScore", label: "综合得分", sortable: true, numeric: true },
                    { key: "grade", label: "评价等级", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true }
                ],
                rows: []
            },
            config: {
                label: "配置项管理",
                sortKey: "no",
                sortDir: "desc",
                columns: [
                    { key: "no", label: "单据编号", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true },
                    { key: "org", label: "党组织", sortable: true },
                    { key: "typeName", label: "配置类型", sortable: true },
                    { key: "config", label: "配置json", sortable: true, mono: true }
                ],
                rows: []
            },
            deduction: {
                label: "扣分项台账",
                sortKey: "code",
                sortDir: "asc",
                readonly: true,
                columns: [
                    { key: "code", label: "单据编号", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true },
                    { key: "year", label: "年份", sortable: true },
                    { key: "quarter", label: "季度", sortable: true },
                    { key: "name", label: "扣分事项", sortable: true },
                    { key: "standard", label: "扣分依据", sortable: true },
                    { key: "score", label: "扣分分数", sortable: true, numeric: true },
                    { key: "org", label: "被扣分组织", sortable: true },
                    { key: "dept", label: "输出部门.名称", sortable: true }
                ],
                rows: []
            },
            partyQuarterly: {
                label: "季度党群绩效",
                sortKey: "org",
                sortDir: "asc",
                readonly: true,
                columns: [
                    { key: "org", label: "党组织", sortable: true },
                    { key: "quarter", label: "评价季度", sortable: true },
                    { key: "itemName", label: "项点名称", sortable: true },
                    { key: "contribution", label: "贡献度得分", sortable: true, numeric: true },
                    { key: "weight", label: "权重(%)", sortable: true, numeric: true },
                    { key: "remark", label: "备注", sortable: true }
                ],
                rows: []
            },
            org: {
                label: "党组织",
                readonly: true
            }
        };

        function randNo(prefix) {
            return (prefix || "CQ") + new Date().getFullYear() + String(Math.floor(Math.random() * 9000) + 1000);
        }
        function randStatus() {
            var st = STATUS[Math.floor(Math.random() * STATUS.length)];
            return { code: st[0], text: st[1] };
        }
        function randScore() {
            return Number((70 + Math.random() * 28).toFixed(1));
        }
        function randQuarterlyRow() {
            var party = randScore();
            var excellence = randScore();
            var st = randStatus();
            return {
                no: randNo("QJ"),
                quarter: QUARTERS[Math.floor(Math.random() * QUARTERS.length)],
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                partyScore: party,
                excellenceScore: excellence,
                totalScore: Number(((party + excellence) / 2).toFixed(1)),
                grade: GRADES[Math.floor(Math.random() * GRADES.length)],
                statusText: st.text,
                statusCode: st.code
            };
        }
        function randAnnualRow() {
            var party = randScore();
            var excellence = randScore();
            var st = randStatus();
            return {
                no: randNo("ND"),
                year: YEARS[Math.floor(Math.random() * YEARS.length)],
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                partyScore: party,
                excellenceScore: excellence,
                totalScore: Number(((party + excellence) / 2).toFixed(1)),
                grade: GRADES[Math.floor(Math.random() * GRADES.length)],
                statusText: st.text,
                statusCode: st.code
            };
        }
        function randConfigRow() {
            var st = randStatus();
            var types = [
                "季度党群绩效评价规则",
                "季度创先争优评价规则",
                "年度党群绩效评价规则",
                "年度创先争优评价规则"
            ];
            return {
                no: randNo("CQ"),
                statusText: st.text,
                statusCode: st.code,
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                typeName: types[Math.floor(Math.random() * types.length)],
                config: JSON.stringify({ auto: Math.random() < 0.5, level: Math.floor(Math.random() * 5) + 1 })
            };
        }
        var DEDUCTION_NAMES = [
            "未按时参加组织生活",
            "党建工作台账不完整",
            "党员教育管理不到位",
            "组织关系转接不及时",
            "党费缴纳不规范",
            "民主评议程序缺失",
            "意识形态工作落实不力"
        ];
        var PARTY_ITEMS = ["理论学习", "组织建设", "服务群众", "作风建设", "创新实践"];
        function randDeductionRow(idx) {
            var st = randStatus();
            return {
                code: "KF" + String(1001 + idx),
                name: DEDUCTION_NAMES[idx % DEDUCTION_NAMES.length],
                standard: "每发生一次扣 " + (1 + (idx % 3)) + " 分",
                score: Number((1 + (idx % 5) * 0.5).toFixed(1)),
                quarter: QUARTERS[idx % QUARTERS.length],
                statusText: st.text,
                statusCode: st.code
            };
        }
        function randPartyQuarterlyRow() {
            var weight = [40, 30, 20, 10][Math.floor(Math.random() * 4)];
            return {
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                quarter: QUARTERS[Math.floor(Math.random() * QUARTERS.length)],
                itemName: PARTY_ITEMS[Math.floor(Math.random() * PARTY_ITEMS.length)],
                contribution: randScore(),
                weight: weight,
                remark: Math.random() < 0.3 ? "—" : "按季度统计"
            };
        }

        var ORG_TABLE_COLUMNS = [
            { key: "_idx", label: "序号", sortable: true },
            { key: "name", label: "组织名称", sortable: true },
            { key: "status", label: "数据状态", sortable: true, badge: true },
            { key: "parentName", label: "上级名称", sortable: true },
            { key: "orgType", label: "党组织类别", sortable: true, compact: true },
            { key: "foundedAt", label: "成立时间", sortable: true, compact: true },
            { key: "number", label: "编码", sortable: true, compact: true },
            { key: "level", label: "级次", sortable: true, compact: true }
        ];
        var ORG_DIALOG_COLUMNS = [
            { key: "_idx", label: "序号", sortable: true },
            { key: "name", label: "组织名称", sortable: true, link: true },
            { key: "status", label: "数据状态", sortable: true, badge: true },
            { key: "parentName", label: "上级名称", sortable: true },
            { key: "orgType", label: "党组织类别", sortable: true, compact: true },
            { key: "foundedAt", label: "成立时间", sortable: true, compact: true },
            { key: "number", label: "编码", sortable: true, compact: true },
            { key: "level", label: "级次", sortable: true, compact: true }
        ];

        function mapOrgRows(rows) {
            return rows.map(function (r, idx) {
                return {
                    id: r.id,
                    name: r.name,
                    status: r.status,
                    parentName: r.parentName,
                    orgType: r.orgType || "",
                    foundedAt: r.foundedAt || "",
                    number: r.number || "",
                    level: r.level == null || r.level === "" ? "" : r.level,
                    _idx: idx + 1
                };
            });
        }
        function onOrgDialogSelectionChange(selection) {
            orgState.selected = {};
            Object.keys(selection || {}).forEach(function (id) {
                if (selection[id]) orgState.selected[id] = true;
            });
            var countEl = uiEl("org-selected-count");
            if (countEl) countEl.textContent = String(selectedOrgNames().length);
        }
        function refreshOrgDialogTable() {
            var rows = mapOrgRows(orgTableSource());
            if (!window.__cqDataTable) return;
            window.__cqDataTable.setData("orgDialog", rows, {
                selectedIds: orgState.selected,
                onSelectionChange: onOrgDialogSelectionChange
            });
            var countEl = uiEl("org-selected-count");
            if (countEl) countEl.textContent = String(selectedOrgNames().length);
        }
        function refreshDataTable(tabId) {
            if (window.__cqDataTable && TABLE_DEFS[tabId] && TABLE_DEFS[tabId].columns) {
                window.__cqDataTable.setData(tabId, TABLE_DEFS[tabId].rows);
            }
        }
        window.__CQ_TABLE_BOOT = function () {
            try {
            if (!window.__cqDataTable) return;
            var dt = window.__cqDataTable;
            ["quarterly", "annual", "config", "deduction", "partyQuarterly"].forEach(function (id) {
                dt.mount(id, "dt-" + id, TABLE_DEFS[id].columns, TABLE_DEFS[id].rows, {
                    pageSize: 10,
                    filterPlaceholder: "搜索" + TABLE_DEFS[id].label + "…",
                    filterHostId: "dt-filter-" + id
                });
            });
            dt.mount("orgView", "dt-orgView", ORG_TABLE_COLUMNS, [], {
                pageSize: 20,
                filterPlaceholder: "搜索组织…",
                filterHostId: "dt-filter-orgView"
            });
            ORG_DIALOG_COLUMNS[1].onLinkClick = function (row) {
                if (orgState.selected[row.id]) delete orgState.selected[row.id];
                else orgState.selected[row.id] = true;
                refreshOrgDialogTable();
            };
            dt.mount("orgDialog", "dt-orgDialog", ORG_DIALOG_COLUMNS, [], {
                pageSize: 20,
                selectable: true,
                selectedIds: orgState.selected,
                onSelectionChange: onOrgDialogSelectionChange,
                filterPlaceholder: "搜索组织…",
                filterHostId: "dt-filter-orgDialog"
            });
            renderOrgViewTable();
            refreshOrgDialogTable();
            } catch (bootErr) {
                reportError("table-boot", bootErr, { hasDt: !!window.__cqDataTable });
            }
        };

        function switchTab(tabId) {
            if (!TABLE_DEFS[tabId]) return;
            activeTab = tabId;
            uiAll(".nav-item").forEach(function (btn) {
                var on = btn.getAttribute("data-tab") === tabId;
                btn.classList.toggle("is-active", on);
                btn.setAttribute("aria-selected", on ? "true" : "false");
            });
            uiAll(".tab-panel").forEach(function (panel) {
                var on = panel.id === "panel-" + tabId;
                panel.classList.toggle("is-active", on);
                if (on) panel.removeAttribute("hidden");
                else panel.setAttribute("hidden", "");
            });
            var titleEl = uiEl("main-title");
            if (titleEl) titleEl.textContent = TABLE_DEFS[tabId].label;
            if (tabId === "org") {
                renderOrgView();
                if (!orgLoading && !orgReady) {
                    var orgMetaEl = uiEl("org-view-meta");
                    if (orgMetaEl) orgMetaEl.textContent = "正在加载党组织…";
                    loadOrgFromCq();
                }
            }
            if (tabId === "deduction" && !deductionLoading && !deductionReady) {
                loadDeductionFromCq();
            }
            if (tabId === "partyQuarterly" && !partyLoading && !partyReady) {
                loadPartyQuarterlyFromCq();
            }
        }
        function initTabs() {
            uiAll(".nav-item").forEach(function (btn) {
                btn.onclick = function () {
                    switchTab(btn.getAttribute("data-tab"));
                };
            });
            switchTab(activeTab);
        }
        function initTableData() {
            loadDeductionFromCq();
            loadPartyQuarterlyFromCq();
            TABLE_DEFS.quarterly.rows = [];
            TABLE_DEFS.annual.rows = [];
            TABLE_DEFS.config.rows = [];
            TABLE_DEFS.partyQuarterly.rows = [];
            for (var i = 0; i < 8; i++) TABLE_DEFS.quarterly.rows.push(randQuarterlyRow());
            for (var j = 0; j < 6; j++) TABLE_DEFS.annual.rows.push(randAnnualRow());
            for (var k = 0; k < 5; k++) TABLE_DEFS.config.rows.push(randConfigRow());
            ["quarterly", "annual", "config"].forEach(refreshDataTable);
        }
        var alertTimer = 0;
        var alertLeaveTimer = 0;
        var alertTimers = [];
        function makeAlertIcon(kind) {
            var ns = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(ns, "svg");
            svg.setAttribute("width", "16");
            svg.setAttribute("height", "16");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("stroke-width", "2");
            svg.setAttribute("stroke-linecap", "round");
            svg.setAttribute("stroke-linejoin", "round");
            svg.setAttribute("aria-hidden", "true");
            function node(name, attrs) {
                var n = document.createElementNS(ns, name);
                var keys = Object.keys(attrs);
                for (var i = 0; i < keys.length; i++) n.setAttribute(keys[i], attrs[keys[i]]);
                svg.appendChild(n);
            }
            node("circle", { cx: "12", cy: "12", r: "10" });
            if (kind === "destructive") {
                node("line", { x1: "12", x2: "12", y1: "8", y2: "12" });
                node("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" });
            } else {
                node("path", { d: "m9 12 2 2 4-4" });
            }
            return svg;
        }
        function showAlert(variant, title, desc) {
            if (cqDisposed) return;
            var host = uiEl("cq-alert-host");
            if (!host) return;
            var el = document.createElement("div");
            el.className = "alert" + (variant === "destructive" ? " alert-destructive" : "");
            el.setAttribute("role", "alert");
            el.appendChild(makeAlertIcon(variant));
            var t = document.createElement("div");
            t.className = "alert-title";
            t.textContent = title || "";
            el.appendChild(t);
            if (desc) {
                var d = document.createElement("div");
                d.className = "alert-description";
                d.textContent = desc;
                el.appendChild(d);
            }
            host.appendChild(el);
            var leaveTimer = 0;
            var hideTimer = setTimeout(function () {
                el.classList.add("is-leaving");
                leaveTimer = setTimeout(function () {
                    if (el.parentNode) el.parentNode.removeChild(el);
                }, 250);
                alertTimers.push(leaveTimer);
            }, 5000);
            alertTimers.push(hideTimer);
        }
        function setStatus(msg) {
            if (!msg) return;
            showAlert("default", "提示", msg);
        }
        // 模拟官方 this.wait：异步等待渲染完成后返回 { getElement() }。
        // 官方脚本的 this 绑定在苍穹页面上下文，控件 DOM 在父页面（window.parent.document）。
        // 只查父页面；跨域时访问 parent 会抛异常，记日志后 getElement() 为 null。
        function waitEl(id, ms) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var el = null;
                    try {
                        el = hostWin().document.getElementById(id);
                    } catch (e) {
                        clog("无法访问宿主页面 #" + id + ": " + (e && e.message));
                    }
                    resolve({ getElement: function () { return el; } });
                }, ms || 150);
            });
        }

        // 扣分项 / 季度党群绩效：各开一个隐藏主控台 iframe，并行点「应用 → 党费 → 菜单」。
        var CQ_DEDUCTION = {
            consoleAppId: "bos",
            consoleForm: "pc_main_console",
            appTabKey: "tabap",
            appTabArg: "appbeta",
            myAppForm: "tenant_myapp",
            myAppControl: "bizcustomlistap",
            partyApp: {
                appnumber: "crrc_party_dues",
                appid: "5NBN/3EAL5OQ",
                alluserapp: "0",
                appname: "党费"
            },
            menuAppId: "crrc_party_dues",
            menuFormId: "crrc_party_dues_apphome",
            menuControl: "navigationbar",
            menuRoot: "root",
            menuItemId: "2524686743156851712",
            dataAppId: "crrc_dj",
            dataFormId: "crrc_deduction_log"
        };
        var CQ_PARTY = {
            menuAppId: "crrc_party_dues",
            menuFormId: "crrc_party_dues_apphome",
            menuControl: "navigationbar",
            menuRoot: "root",
            menuItemId: "2546583953733611520",
            dataAppId: "crrc_dj",
            dataFormId: "crrc_dj_cb_count",
            listControl: "billlistap",
            pkField: "crrc_dj_cb_count_id",
            menuTexts: ["季度党群绩效贡献度", "季度党群绩效"],
            maxBills: 40
        };
        var CQ_ORG = {
            menuAppId: "crrc_party_dues",
            menuFormId: "crrc_party_dues_apphome",
            menuControl: "navigationbar",
            menuRoot: "root",
            menuItemId: "2546603181119401984",
            dataAppId: "crrc_dj",
            dataFormId: "crrc_dj_org_tree_ext",
            menuTexts: ["党组织查询", "党组织"]
        };
        var deductionLoading = false;
        var deductionReady = false;
        var partyLoading = false;
        var partyReady = false;
        var orgLoading = false;
        var orgReady = false;
        var STATUS_TEXT = { A: "暂存", B: "已提交", C: "已审核" };
        var ORG_TYPE_TEXT = { "1": "党委", "2": "党总支", "3": "党支部", "4": "党小组" };
        var ORG_ENABLE_TEXT = { "0": "禁用", "1": "可用" };
        var PERIOD_TEXT = { "1": "一季度", "2": "二季度", "3": "三季度", "4": "四季度", "5": "年度" };
        var watchedTenantPageId = "";
        var sessionWin = null;
        var cqDisposed = false;
        var fetchFrameTimer = 0;
        var onCqKeydown = null;
        var cqFetchSessions = {};

        function pageDoc() {
            try { return hostWin().document; } catch (e) { return document; }
        }
        function isFetchFrameWin(win) {
            if (!win) return false;
            try {
                var fe = win.frameElement;
                if (fe && fe.getAttribute("data-cq-fetch") === "1") return true;
            } catch (e0) { }
            try {
                if (win.parent && win.parent !== win) {
                    var pfe = win.parent.frameElement;
                    if (pfe && pfe.getAttribute("data-cq-fetch") === "1") return true;
                }
            } catch (e1) { }
            return false;
        }
        function unhookFetchOn(win) {
            if (!win) return;
            try {
                if (win.__cqOrigFetch) win.fetch = win.__cqOrigFetch;
                try { delete win.__cqOrigFetch; } catch (e0) { win.__cqOrigFetch = null; }
                try { delete win.__cqTenantHooked; } catch (e1) { win.__cqTenantHooked = false; }
                try { delete win.__cqOurFetch; } catch (e2) { win.__cqOurFetch = null; }
                try { delete win.__cqFetchSess; } catch (e3) { win.__cqFetchSess = null; }
            } catch (e4) { }
        }
        function walkWindows(fn) {
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                try { fn(win); } catch (e0) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e1) { }
            }
            try { walk(window, 0); } catch (e2) { }
            try { walk(hostWin(), 0); } catch (e3) { }
            try { if (sessionWin) walk(sessionWin, 0); } catch (e4) { }
            try {
                var ids = Object.keys(cqFetchSessions || {});
                var si;
                for (si = 0; si < ids.length; si++) {
                    var sw = cqFetchSessions[ids[si]] && cqFetchSessions[ids[si]].win;
                    if (sw) walk(sw, 0);
                }
            } catch (e5) { }
        }
        function removeFetchFrames() {
            var nodes = [];
            try {
                var byId = hostWin().document.getElementById("cq-fetch-frame");
                if (byId) nodes.push(byId);
            } catch (e0) { }
            try {
                var list = pageDoc().querySelectorAll("iframe[data-cq-fetch='1']");
                var i;
                for (i = 0; i < list.length; i++) nodes.push(list[i]);
            } catch (e1) { }
            var seen = [];
            var n;
            for (n = 0; n < nodes.length; n++) {
                var el = nodes[n];
                if (!el || seen.indexOf(el) >= 0) continue;
                seen.push(el);
                try { el.onload = null; } catch (e2) { }
                try { el.src = "about:blank"; } catch (e3) { }
                try { if (el.parentNode) el.parentNode.removeChild(el); } catch (e4) { }
            }
        }
        function removeBundleScripts() {
            try {
                var list = pageDoc().querySelectorAll("script[data-cq-dt-bundle='1']");
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i].parentNode) list[i].parentNode.removeChild(list[i]);
                }
            } catch (e) { }
        }
        function disposeCqResources() {
            if (cqDisposed) {
                removeFetchFrames();
                return;
            }
            cqDisposed = true;
            deductionLoading = false;
            partyLoading = false;
            orgLoading = false;
            if (alertTimer) { clearTimeout(alertTimer); alertTimer = 0; }
            if (alertLeaveTimer) { clearTimeout(alertLeaveTimer); alertLeaveTimer = 0; }
            if (alertTimers && alertTimers.length) {
                var ati;
                for (ati = 0; ati < alertTimers.length; ati++) clearTimeout(alertTimers[ati]);
                alertTimers = [];
            }
            if (fetchFrameTimer) { clearTimeout(fetchFrameTimer); fetchFrameTimer = 0; }
            try {
                var sessIds = Object.keys(cqFetchSessions || {});
                var sxi;
                for (sxi = 0; sxi < sessIds.length; sxi++) {
                    var sx = cqFetchSessions[sessIds[sxi]];
                    if (sx && sx.timer) clearTimeout(sx.timer);
                }
            } catch (eSess) { }
            cqFetchSessions = {};
            try { if (window.__cqDataTable && window.__cqDataTable.unmountAll) window.__cqDataTable.unmountAll(); } catch (e0) { }
            walkWindows(unhookFetchOn);
            sessionWin = null;
            removeFetchFrames();
            try { if (onCqKeydown) document.removeEventListener("keydown", onCqKeydown); } catch (e1) { }
            removeBundleScripts();
            try { window.__cqFetchDeduction = null; } catch (e2) { }
            try { window.__cqFetchPartyQuarterly = null; } catch (e2b) { }
            try { window.__cqFetchOrg = null; } catch (e2c) { }
            try { window.__cqDisposeOverlay = null; } catch (e3) { }
            try { window.__cqDtRoot = null; } catch (e4) { }
            try { unmountHost(); } catch (e5) { }
            try {
                var hostEl = hostWin().document.getElementById("shadcn-hello-inject-root");
                if (hostEl && hostEl.parentNode) hostEl.parentNode.removeChild(hostEl);
            } catch (e6) { }
        }

        function hostWin() { return window; }
        function parentWin() {
            var start = hostWin();
            var best = start;
            try {
                var cur = start;
                var n = 0;
                while (cur && n < 8) {
                    n++;
                    try {
                        if (cur.$ && typeof cur.$.ajax === "function") best = cur;
                    } catch (e1) { }
                    var next = null;
                    try {
                        if (cur.top && cur !== cur.top) next = cur.parent;
                        else break;
                    } catch (e2) { break; }
                    if (!next || next === cur) break;
                    cur = next;
                }
                return best || start;
            } catch (e) {
                return start || window;
            }
        }
        function cqOrigin() {
            try { return parentWin().location.origin; } catch (e) { return ""; }
        }
        function hasTimeoutText(s) {
            s = String(s || "");
            return s.indexOf("pagetimeout") >= 0 || s.indexOf("会话超时") >= 0;
        }
        function collapseWs(s) {
            var t = String(s || ""), out = "", prev = false, i, c;
            for (i = 0; i < t.length; i++) {
                c = t.charAt(i);
                if (c === " " || c === String.fromCharCode(10) || c === String.fromCharCode(13) || c === String.fromCharCode(9)) {
                    if (!prev) out += " ";
                    prev = true;
                } else {
                    out += c;
                    prev = false;
                }
            }
            return out.trim();
        }
        function takeQueryParam(url, name) {
            var u = String(url || "");
            var needle = name + "=";
            var i = u.indexOf("?" + needle);
            if (i < 0) i = u.indexOf("&" + needle);
            if (i < 0) return "";
            var start = i + 1 + needle.length;
            var end = u.indexOf("&", start);
            if (end < 0) end = u.length;
            try { return decodeURIComponent(u.slice(start, end)); } catch (e) { return u.slice(start, end); }
        }
        function findRootToken(pageId) {
            var raw = String(pageId || "");
            var s = raw.toLowerCase();
            var i = s.indexOf("root");
            if (i < 0) return "";
            var hex = "0123456789abcdef";
            var j = i + 4;
            while (j < s.length && hex.indexOf(s.charAt(j)) >= 0) j++;
            if (j - (i + 4) < 16) return "";
            return raw.slice(i, j);
        }
        function extractRootSuffix(pageId) {
            return findRootToken(pageId);
        }
        function isConsoleRootPageId(id) {
            var s = String(id || "");
            return s.indexOf("root") === 0 && findRootToken(s) === s;
        }
        function isGuidPageId(id) {
            var s = String(id || "");
            if (s.length !== 32) return false;
            var hex = "0123456789abcdef";
            for (var i = 0; i < 32; i++) {
                if (hex.indexOf(s.charAt(i).toLowerCase()) < 0) return false;
            }
            return true;
        }
        function keyLooksLikeForm(key) {
            key = String(key || "").toLowerCase();
            return key.indexOf("formid") >= 0 || key.indexOf("pageid") >= 0 || key.indexOf("form") >= 0 || key.indexOf("page") >= 0;
        }
        function collectPageIds(win, depth, out, seen) {
            out = out || [];
            seen = seen || [];
            if (!win || depth > 8) return out;
            for (var s = 0; s < seen.length; s++) if (seen[s] === win) return out;
            seen.push(win);
            try {
                var href = win.location.href;
                var u = new URL(href);
                var pid = u.searchParams.get("pageId") || u.searchParams.get("byPageId");
                if (pid) out.push(pid);
                var fid = u.searchParams.get("formId");
                if (fid === CQ_DEDUCTION.myAppForm && pid) watchedTenantPageId = pid;
            } catch (e) { }
            try {
                var doc = win.document;
                if (doc) {
                    var roots = doc.querySelectorAll("[id^='root']");
                    for (var r = 0; r < roots.length; r++) {
                        if (isConsoleRootPageId(roots[r].id)) out.push(roots[r].id);
                    }
                    var nodes = doc.querySelectorAll("iframe[src], [pageid], [data-pageid]");
                    for (var i = 0; i < nodes.length; i++) {
                        var el = nodes[i];
                        var src = el.getAttribute("src") || "";
                        var pidFromSrc = takeQueryParam(src, "pageId");
                        if (pidFromSrc) out.push(pidFromSrc);
                        if (src.indexOf(CQ_DEDUCTION.myAppForm) >= 0 && pidFromSrc) watchedTenantPageId = pidFromSrc;
                        var attr = el.getAttribute("pageid") || el.getAttribute("data-pageid");
                        if (attr) out.push(attr);
                    }
                }
            } catch (e2) { }
            try {
                var frames = win.frames;
                for (var f = 0; f < frames.length; f++) collectPageIds(frames[f], depth + 1, out, seen);
            } catch (e3) { }
            return out;
        }
        function findConsolePageId() {
            var ids = collectPageIds(parentWin(), 0, [], []);
            for (var i = 0; i < ids.length; i++) if (isConsoleRootPageId(ids[i])) return ids[i];
            return "";
        }
        function addUnique(arr, id) {
            if (!id || arr.indexOf(id) >= 0) return;
            arr.push(id);
        }
        function pickPageIdFromObj(obj, hits, depth, seen) {
            if (!obj || typeof obj !== "object" || depth > 6) return;
            if (seen.indexOf(obj) >= 0) return;
            seen.push(obj);
            var fid = obj.formId || obj.formid || obj.formID || "";
            var pid = obj.pageId || obj.pageid || obj.PageId || "";
            if (pid && String(fid) === CQ_DEDUCTION.myAppForm) addUnique(hits, String(pid));
            if (depth >= 4) return;
            if (Array.isArray(obj)) {
                for (var i = 0; i < obj.length && i < 20; i++) pickPageIdFromObj(obj[i], hits, depth + 1, seen);
                return;
            }
            var keys = Object.keys(obj);
            for (var k = 0; k < keys.length && k < 40; k++) {
                if (keyLooksLikeForm(keys[k])) pickPageIdFromObj(obj[keys[k]], hits, depth + 1, seen);
            }
        }
        function collectTenantCandidates() {
            var hits = [];
            var win = parentWin();
            var doc = null;
            try { doc = win.document; } catch (e) { }
            if (watchedTenantPageId) addUnique(hits, watchedTenantPageId);
            collectPageIds(win, 0, [], []);
            if (watchedTenantPageId) addUnique(hits, watchedTenantPageId);
            if (doc) {
                try {
                    var iframes = doc.querySelectorAll("iframe[src]");
                    for (var i = 0; i < iframes.length; i++) {
                        var src = iframes[i].src || "";
                        if (src.indexOf(CQ_DEDUCTION.myAppForm) >= 0) {
                            var pid = takeQueryParam(src, "pageId");
                            if (pid) addUnique(hits, pid);
                        }
                    }
                    var attrNodes = doc.querySelectorAll("[pageid], [data-pageid], [data-page-id], [formid], [data-formid]");
                    for (var a = 0; a < attrNodes.length; a++) {
                        var el = attrNodes[a];
                        var formAttr = el.getAttribute("formid") || el.getAttribute("data-formid") || "";
                        var pageAttr = el.getAttribute("pageid") || el.getAttribute("data-pageid") || el.getAttribute("data-page-id") || "";
                        if (formAttr === CQ_DEDUCTION.myAppForm && pageAttr) addUnique(hits, pageAttr);
                    }
                } catch (e2) { }
            }
            try {
                var wkeys = Object.getOwnPropertyNames(win);
                for (var w = 0; w < wkeys.length && w < 400; w++) {
                    var val = null;
                    try { val = win[wkeys[w]]; } catch (e3) { continue; }
                    if (!val || (typeof val !== "object" && typeof val !== "function")) continue;
                    try { pickPageIdFromObj(val, hits, 0, []); } catch (e4) { }
                }
            } catch (e5) { }
            return hits;
        }
        function collectGuidIdsNearAppTab() {
            var out = [];
            var win = parentWin();
            var doc = null;
            try { doc = win.document; } catch (e) { return out; }
            var sels = ["#homepagetabap", "#flexpanelap", "#appbeta", "[id^='root']"];
            for (var s = 0; s < sels.length; s++) {
                var nodes = [];
                try { nodes = doc.querySelectorAll(sels[s]); } catch (e2) { }
                for (var n = 0; n < nodes.length; n++) {
                    var root = nodes[n];
                    if (isGuidPageId(root.id)) addUnique(out, root.id);
                    var kids = [];
                    try { kids = root.querySelectorAll("[id]"); } catch (e3) { }
                    for (var i = 0; i < kids.length && i < 2000; i++) {
                        if (isGuidPageId(kids[i].id)) addUnique(out, kids[i].id);
                    }
                }
            }
            return out;
        }
        function findTenantMyAppPageId() {
            if (watchedTenantPageId) return watchedTenantPageId;
            var hits = collectTenantCandidates();
            return hits[0] || "";
        }
        function buildTenantTryList(consolePageId) {
            var list = [];
            function add(id, src) {
                if (!id) return;
                for (var i = 0; i < list.length; i++) if (list[i].id === id) return;
                list.push({ id: id, src: src });
            }
            var hits = collectTenantCandidates();
            for (var h = 0; h < hits.length; h++) add(hits[h], "scan");
            var guids = collectGuidIdsNearAppTab();
            for (var g = 0; g < guids.length && g < 8; g++) add(guids[g], "dom-guid");
            add(consolePageId, "console-fallback");
            return list;
        }
        function noteTenantFromUrl(url, body) {
            var u = String(url || "");
            if (u.indexOf(CQ_DEDUCTION.myAppForm) < 0) return;
            var pid = takeQueryParam(u, "pageId");
            if (pid) watchedTenantPageId = pid;
            if (body) {
                var text = typeof body === "string" ? body : "";
                try {
                    if (body && typeof body === "object" && body.pageId) watchedTenantPageId = body.pageId;
                    var sp = new URLSearchParams(text);
                    if (sp.get("pageId")) watchedTenantPageId = sp.get("pageId");
                } catch (e) { }
            }
        }
        function findParentClickTarget(doc, text, selector) {
            if (!doc) return null;
            var nodes = [];
            try { nodes = doc.querySelectorAll(selector || "div, span, a, li, button, p, td, label"); } catch (e) { return null; }
            var fallback = null;
            var best = null;
            var bestLen = Infinity;
            var i;
            for (i = 0; i < nodes.length; i++) {
                var el = nodes[i];
                var raw = collapseWs(el.innerText || el.textContent || "");
                if (raw !== text) continue;
                if (!fallback) fallback = el;
                if (el.offsetWidth === 0 && el.offsetHeight === 0) continue;
                var len = (el.innerHTML || "").length;
                if (len < bestLen) { bestLen = len; best = el; }
            }
            if (best || fallback) return best || fallback;
            try {
                var labeled = doc.querySelectorAll("[title], [aria-label]");
                for (i = 0; i < labeled.length; i++) {
                    var lab = labeled[i];
                    var t = collapseWs(lab.getAttribute("title") || lab.getAttribute("aria-label") || "");
                    if (t === text) return lab;
                }
            } catch (e2) { }
            return null;
        }
        function findClickInTree(win, text, selector, depth, seen) {
            depth = depth || 0;
            seen = seen || [];
            if (!win || depth > 8) return null;
            var s;
            for (s = 0; s < seen.length; s++) if (seen[s] === win) return null;
            seen.push(win);
            try {
                var el = findParentClickTarget(win.document, text, selector);
                if (el) return { win: win, el: el };
            } catch (e) { }
            try {
                var frames = win.frames;
                var f;
                for (f = 0; f < frames.length; f++) {
                    var hit = findClickInTree(frames[f], text, selector, depth + 1, seen);
                    if (hit) return hit;
                }
            } catch (e2) { }
            return null;
        }
        function findClickAnywhere(text, selector) {
            var roots = [];
            if (sessionWin) roots.push(sessionWin);
            try { roots.push(parentWin()); } catch (e0) { }
            roots.push(window);
            var r;
            for (r = 0; r < roots.length; r++) {
                var hit = findClickInTree(roots[r], text, selector, 0, []);
                if (hit) return hit;
            }
            return null;
        }
        function fireParentClick(el, win) {
            if (!el) return false;
            try { el.scrollIntoView({ block: "center", inline: "nearest" }); } catch (e) { }
            var view = win;
            try { if (!view) view = el.ownerDocument.defaultView; } catch (e1) { }
            if (!view) view = parentWin();
            try {
                var opts = { bubbles: true, cancelable: true, view: view };
                el.dispatchEvent(new MouseEvent("pointerdown", opts));
                el.dispatchEvent(new MouseEvent("mousedown", opts));
                el.dispatchEvent(new MouseEvent("pointerup", opts));
                el.dispatchEvent(new MouseEvent("mouseup", opts));
                el.dispatchEvent(new MouseEvent("click", opts));
            } catch (e2) {
                try { el.click(); } catch (e3) { return false; }
            }
            return true;
        }
        function consoleHomeUrl() {
            var origin = "";
            try { origin = location.origin; } catch (e) { origin = cqOrigin(); }
            return origin + "/ierp/";
        }
        function makeFetchSession(frameId) {
            return {
                frameId: frameId,
                win: null,
                lastAppHome: "",
                lastList: "",
                lastBill: "",
                requests: [],
                timer: 0,
                listPageId: "",
                dataFormId: "",
                dataAppId: "",
                billFormId: "",
                pkField: "",
                postcols: null
            };
        }
        function getFetchSession(frameId) {
            if (!cqFetchSessions[frameId]) cqFetchSessions[frameId] = makeFetchSession(frameId);
            return cqFetchSessions[frameId];
        }
        function findClickInSession(sess, text, selector) {
            if (!sess || !sess.win) return null;
            return findClickInTree(sess.win, text, selector, 0, []);
        }
        function findConsolePageIdFrom(win) {
            var ids = collectPageIds(win, 0, [], []);
            var i;
            for (i = 0; i < ids.length; i++) if (isConsoleRootPageId(ids[i])) return ids[i];
            return "";
        }
        function removeFetchFrameById(frameId) {
            var nodes = [];
            try {
                var byId = hostWin().document.getElementById(frameId);
                if (byId) nodes.push(byId);
            } catch (e0) { }
            var n;
            for (n = 0; n < nodes.length; n++) {
                var el = nodes[n];
                try { el.onload = null; } catch (e2) { }
                try { el.src = "about:blank"; } catch (e3) { }
                try { if (el.parentNode) el.parentNode.removeChild(el); } catch (e4) { }
            }
        }
        function waitMs(ms) {
            return new Promise(function (resolve) { setTimeout(resolve, ms); });
        }
        function pushSessReq(sess, url, text) {
            if (!sess) return;
            var u = String(url || "");
            var pageId = takeQueryParam(u, "pageId");
            var formId = takeQueryParam(u, "f");
            var ac = takeQueryParam(u, "ac");
            var appId = takeQueryParam(u, "appId");
            var entry = {
                t: Date.now(),
                url: u.slice(0, 500),
                pageId: pageId,
                appId: appId,
                query: { ac: ac, f: formId, appId: appId },
                response: text
            };
            sess.requests.push(entry);
            if (sess.requests.length > 240) sess.requests.splice(0, sess.requests.length - 240);
            if (ac !== "loadData" || !text || hasTimeoutText(text)) return;
            if (formId === "crrc_party_dues_apphome") sess.lastAppHome = text;
            if (formId === "crrc_deduction_log") sess.lastList = text;
            if (formId === "crrc_dj_org_tree_ext") sess.lastList = text;
            if (formId === "crrc_dj_cb_count") {
                if (isPartyBillPageId(pageId, sess.listPageId, formId)) sess.lastBill = text;
                else sess.lastList = text;
            }
        }
        function isPartyBillPageId(pageId, listPageId, formId) {
            var pid = String(pageId || "");
            if (!pid) return false;
            if (listPageId && pid.indexOf(listPageId + "_") === 0) return true;
            if (formId && pid.indexOf("_" + formId + "_") >= 0) return true;
            return false;
        }
        function openFetchFrame(sess) {
            return new Promise(function (resolve, reject) {
                if (cqDisposed) return reject(new Error("aborted"));
                removeFetchFrameById(sess.frameId);
                var hostDoc = pageDoc();
                var iframe = hostDoc.createElement("iframe");
                iframe.id = sess.frameId;
                iframe.setAttribute("data-cq-fetch", "1");
                iframe.title = sess.frameId;
                var leftPx = "0";
                if (sess.frameId.indexOf("party") >= 0) leftPx = "8px";
                if (sess.frameId.indexOf("-org") >= 0) leftPx = "16px";
                iframe.setAttribute("style", "position:fixed;left:" + leftPx + ";top:0;width:1400px;height:900px;opacity:0;pointer-events:none;border:0;z-index:1;");
                var url = consoleHomeUrl();
                iframe.src = url;
                var settled = false;
                var startedWait = false;
                sess.timer = setTimeout(function () {
                    if (settled || cqDisposed) return;
                    settled = true;
                    reject(new Error("主控台 iframe 加载超时 " + url));
                }, 30000);
                iframe.onload = function () {
                    if (startedWait || settled || cqDisposed) return;
                    startedWait = true;
                    try { sess.win = iframe.contentWindow; sessionWin = sess.win; } catch (e) { }
                    hookSessionTree(sess);
                    waitFor(function () {
                        return findClickInSession(sess, "党费") || findClickInSession(sess, "应用");
                    }, 22000, 400, "主控台 iframe 中等待「应用/党费」").then(function (hit) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(sess.timer);
                        sess.timer = 0;
                        resolve(hit && hit.win ? hit.win : sess.win);
                    }, function (err) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(sess.timer);
                        sess.timer = 0;
                        reject(err);
                    });
                };
                (hostDoc.body || hostDoc.documentElement).appendChild(iframe);
            });
        }
        function ensureFetchSession(sess) {
            if (cqDisposed) return Promise.reject(new Error("aborted"));
            if (sess.win && (findClickInSession(sess, "党费") || findClickInSession(sess, "应用"))) {
                hookSessionTree(sess);
                clog("复用隐藏主控台 iframe", sess.frameId, safeHref(sess.win));
                return Promise.resolve(sess.win);
            }
            clog("打开隐藏主控台 iframe", sess.frameId, consoleHomeUrl());
            return openFetchFrame(sess);
        }
        function hookFetchOn(win, sess) {
            if (!win || cqDisposed || !sess) return;
            if (typeof win.fetch !== "function") return;
            if (win.__cqOurFetch && win.fetch === win.__cqOurFetch) {
                win.__cqFetchSess = sess;
                return;
            }
            var orig = win.fetch.bind(win);
            win.__cqOrigFetch = orig;
            win.__cqTenantHooked = true;
            win.__cqFetchSess = sess;
            win.fetch = function (input, init) {
                if (cqDisposed) return orig(input, init);
                var url = typeof input === "string" ? input : (input && input.url);
                noteTenantFromUrl(url, init && init.body);
                return orig(input, init).then(function (res) {
                    if (cqDisposed) return res;
                    try {
                        var u = String(url || "");
                        if (u.indexOf("ac=loadData") >= 0) {
                            res.clone().text().then(function (text) {
                                if (cqDisposed) return;
                                pushSessReq(win.__cqFetchSess || sess, u, text);
                            }).catch(function () { });
                        }
                    } catch (e) { }
                    return res;
                });
            };
            win.__cqOurFetch = win.fetch;
        }
        function hookSessionTree(sess) {
            if (!sess || !sess.win) return;
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                try { hookFetchOn(win, sess); } catch (e) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e2) { }
            }
            walk(sess.win, 0);
        }
        function hookParentForTenant() {
            var dSess = cqFetchSessions["cq-fetch-frame-deduction"];
            var pSess = cqFetchSessions["cq-fetch-frame-party"];
            var oSess = cqFetchSessions["cq-fetch-frame-org"];
            if (dSess) hookSessionTree(dSess);
            if (pSess) hookSessionTree(pSess);
            if (oSess) hookSessionTree(oSess);
        }
        function waitFor(fn, timeout, step, label) {
            var t0 = Date.now();
            return new Promise(function (resolve, reject) {
                function tick() {
                    if (cqDisposed) return reject(new Error("aborted"));
                    var v = fn();
                    if (v) return resolve(v);
                    if (Date.now() - t0 > (timeout || 8000)) {
                        return reject(new Error(label || "等待超时"));
                    }
                    setTimeout(tick, step || 250);
                }
                tick();
            });
        }
        function cqInvoke(win, appId, formId, action, pageId, params) {
            var w = win || parentWin();
            var origin = "";
            try { origin = w.location.origin; } catch (e0) { origin = cqOrigin(); }
            var url = origin + "/ierp/form/batchInvokeAction.do?appId=" + encodeURIComponent(appId)
                + "&f=" + encodeURIComponent(formId) + "&ac=" + encodeURIComponent(action);
            var body = "pageId=" + encodeURIComponent(pageId)
                + "&appId=" + encodeURIComponent(appId)
                + "&params=" + encodeURIComponent(JSON.stringify(params));
            var fetchFn = (w.fetch ? w.fetch.bind(w) : fetch);
            return fetchFn(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
                    ajax: "true",
                    cqappid: appId
                },
                body: body
            }).then(function (res) {
                return res.text().then(function (text) {
                    if (!res.ok) throw new Error("HTTP " + res.status + " " + text.slice(0, 400));
                    if (hasTimeoutText(text)) throw new Error("表单会话超时");
                    try { return JSON.parse(text); } catch (e) { return text; }
                });
            });
        }
        function parseMaybeJson(data) {
            if (typeof data !== "string") return data;
            var text = data;
            if (text.indexOf(")]}',") === 0) text = text.slice(5);
            else if (text.indexOf(")]}'") === 0) text = text.slice(4);
            var brace = text.indexOf("{");
            var bracket = text.indexOf("[");
            var start = brace < 0 ? bracket : (bracket < 0 ? brace : Math.min(brace, bracket));
            if (start > 0) text = text.slice(start);
            try { return JSON.parse(text); } catch (e) { return data; }
        }
        function walkCq(obj, fn, depth, seen) {
            if (!obj || typeof obj !== "object" || depth > 14) return;
            if (seen.indexOf(obj) >= 0) return;
            seen.push(obj);
            fn(obj);
            if (!Array.isArray(obj)) {
                var mnSkip = String(obj.methodname || obj.methodName || "");
                if (mnSkip === "addNodes" || mnSkip === "updateNodes") return;
            }
            if (Array.isArray(obj)) {
                var n = Math.min(obj.length, 400);
                for (var i = 0; i < n; i++) walkCq(obj[i], fn, depth + 1, seen);
                return;
            }
            var keys = Object.keys(obj);
            for (var k = 0; k < keys.length && k < 400; k++) walkCq(obj[keys[k]], fn, depth + 1, seen);
        }
        function cqCell(val) {
            if (val == null) return "";
            if (Array.isArray(val)) {
                if (val.length >= 2 && typeof val[1] === "number") return val[1];
                if (val.length >= 2 && val[1] != null && val[1] !== "") return val[1];
                if (val[0] != null) return val[0];
                return "";
            }
            return val;
        }
        function deductionFieldLabel(key) {
            var map = {
                billno: "单据编号",
                billstatus: "单据状态",
                crrc_datefield: "年份",
                crrc_radiooptgroupfield: "季度",
                crrc_textfield: "扣分事项",
                crrc_textfield1: "扣分依据",
                crrc_decimalfield: "扣分分数",
                crrc_basedatafield: "被扣分组织",
                crrc_basedatafield_name: "被扣分组织",
                "crrc_basedatafield.name": "被扣分组织",
                crrc_orgfield: "输出部门",
                crrc_orgfield_name: "输出部门.名称",
                "crrc_orgfield.name": "输出部门.名称"
            };
            if (map[key]) return map[key];
            if (key.length > 5 && key.slice(key.length - 5) === "_name") {
                var base = key.slice(0, key.length - 5);
                if (map[base]) return map[base] + ".名称";
            }
            return key;
        }
        function deductionRowKey(dataindex) {
            return String(dataindex || "").split(".").join("_");
        }
        function shouldSkipDeductionKey(key, idx) {
            if (!key) return true;
            var low = String(key).toLowerCase();
            if (low === "rk" || low === "fseq" || low === "s" || low === "cprop") return true;
            if (low === "seq" || low === "rowkey" || low === "id") return true;
            if (key.length >= 3 && key.slice(key.length - 3) === "_id") return true;
            if (key.indexOf("entryentity") >= 0) return true;
            if (idx[key + "_name"] != null || idx[key + ".name"] != null) return true;
            return false;
        }
        function formatDeductionValue(key, raw) {
            if (raw == null || raw === "") return "";
            if (key === "billstatus" || key.indexOf("billstatus") >= 0) {
                var st = String(cqCell(raw));
                return STATUS_TEXT[st] || st;
            }
            if (key === "crrc_radiooptgroupfield" || key.indexOf("radioopt") >= 0 || key === "crrc_combofield" || key.indexOf("combofield") >= 0) {
                var pd = String(cqCell(raw));
                return PERIOD_TEXT[pd] || pd;
            }
            if (key === "crrc_datefield" || key === "crrc_datetimefield") {
                if (Array.isArray(raw)) {
                    var y0 = raw[0];
                    if (y0 != null && String(y0) !== "") {
                        var ys = String(y0);
                        if (ys.length >= 4) return ys.slice(0, 4);
                    }
                    if (raw[1] != null) return String(raw[1]).slice(0, 4);
                }
                var ds = String(cqCell(raw));
                return ds.length >= 4 ? ds.slice(0, 4) : ds;
            }
            var v = cqCell(raw);
            if (v && typeof v === "object") return "";
            return v == null ? "" : v;
        }
        function captionText(cap) {
            if (cap == null) return "";
            if (typeof cap === "string") return cap;
            if (typeof cap === "object") return cap.zh_CN || cap.en_US || cap.zh_TW || "";
            return String(cap);
        }
        function collectDeductionCaptions(payload, pack) {
            var map = {};
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var di = obj.dataindex != null ? obj.dataindex : (obj.dataIndex != null ? obj.dataIndex : obj.fieldId);
                var cap = obj.caption != null ? obj.caption : (obj.title != null ? obj.title : obj.header);
                var text = captionText(cap);
                if (typeof di === "string" && di && text) {
                    if (!map[di]) map[di] = text;
                }
            }, 0, []);
            var packCols = pack && (pack.columns || pack.cols || pack.columnMetas);
            if (Array.isArray(packCols)) {
                for (var i = 0; i < packCols.length; i++) {
                    var col = packCols[i];
                    if (!col || typeof col !== "object") continue;
                    var cdi = col.dataindex || col.dataIndex || col.fieldId;
                    var ccap = captionText(col.caption || col.title || col.header);
                    if (typeof cdi === "string" && cdi && ccap) map[cdi] = ccap;
                }
            }
            return map;
        }
        function parseDeductionTable(payload) {
            var pack = null;
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object") return;
                if (obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
                else if (!pack && obj.c === "billlistap" && obj.p && Array.isArray(obj.p.rows)) pack = obj.p;
                else if (!pack && Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) pack = obj;
            }, 0, []);
            if (!pack) return { columns: [], rows: [] };
            var idx = pack.dataindex || {};
            var captions = collectDeductionCaptions(payload, pack);
            var keys = Object.keys(idx);
            keys.sort(function (a, b) { return Number(idx[a]) - Number(idx[b]); });
            var fieldKeys = [];
            var used = {};
            var i;
            for (i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (shouldSkipDeductionKey(k, idx)) continue;
                var rowKey = deductionRowKey(k);
                if (used[rowKey]) continue;
                used[rowKey] = true;
                var known = deductionFieldLabel(k);
                fieldKeys.push({ dataindex: k, caption: known !== k ? known : (captions[k] || k) });
            }
            var columns = fieldKeys.map(function (f) {
                var key = deductionRowKey(f.dataindex);
                var label = f.caption || deductionFieldLabel(f.dataindex);
                var numeric = key.indexOf("decimal") >= 0 || label.indexOf("分数") >= 0 || label.indexOf("得分") >= 0;
                var badge = key.indexOf("billstatus") >= 0 || label.indexOf("状态") >= 0;
                var compact = numeric || badge
                    || key === "billno"
                    || key.indexOf("datefield") >= 0
                    || key.indexOf("radioopt") >= 0
                    || label === "年份"
                    || label === "季度"
                    || label === "单据编号";
                var wrap = !compact && (key.indexOf("textfield") >= 0 || key.indexOf("largetext") >= 0 || label.indexOf("依据") >= 0 || label.indexOf("事项") >= 0);
                return { key: key, label: label, sortable: true, numeric: numeric, badge: badge, compact: compact, wrap: wrap };
            });
            var rows = (pack.rows || []).map(function (row, ridx) {
                var out = { _rowId: "d" + ridx };
                for (var j = 0; j < fieldKeys.length; j++) {
                    var f = fieldKeys[j];
                    var key = deductionRowKey(f.dataindex);
                    var pos = idx[f.dataindex];
                    var raw = pos != null ? row[pos] : "";
                    var formatted = formatDeductionValue(f.dataindex, raw);
                    if (columns[j] && columns[j].numeric && formatted !== "" && typeof formatted !== "number") {
                        var num = Number(formatted);
                        out[key] = num !== num ? formatted : num;
                    } else {
                        out[key] = formatted == null ? "" : formatted;
                    }
                }
                return out;
            });
            return { columns: columns, rows: rows, fieldKeys: fieldKeys };
        }
        function remountDeductionTable() {
            var def = TABLE_DEFS.deduction;
            if (!window.__cqDataTable || !def) return;
            window.__cqDataTable.mount("deduction", "dt-deduction", def.columns, def.rows, {
                pageSize: 10,
                filterPlaceholder: "搜索" + def.label + "…",
                filterHostId: "dt-filter-deduction"
            });
        }
        function applyDeductionTable(parsed) {
            if (parsed.columns && parsed.columns.length) TABLE_DEFS.deduction.columns = parsed.columns;
            TABLE_DEFS.deduction.rows = parsed.rows || [];
            remountDeductionTable();
        }
        function loadDeductionFromCq() {
            if (cqDisposed) return Promise.resolve([]);
            if (deductionLoading) return deductionLoading;
            var sess = getFetchSession("cq-fetch-frame-deduction");
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureFetchSession(sess);
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookSessionTree(sess);
                var consolePageId = findConsolePageIdFrom(sess.win);
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    frameId: sess.frameId,
                    sessionHref: safeHref(sess.win || parentWin())
                });
                clog("扣分项 consolePageId", consolePageId, "suffix", suffix, "session", safeHref(sess.win));
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_DEDUCTION.menuAppId + suffix;
                var listPageId = CQ_DEDUCTION.menuItemId + suffix;
                sess.lastList = "";
                sess.lastAppHome = "";
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
                        sess.win,
                        CQ_DEDUCTION.menuAppId,
                        CQ_DEDUCTION.menuFormId,
                        "treeMenuClick",
                        menuPageId,
                        [{
                            key: CQ_DEDUCTION.menuControl,
                            methodName: "treeMenuClick",
                            args: [CQ_DEDUCTION.menuRoot, CQ_DEDUCTION.menuItemId],
                            postData: [{}, []]
                        }]
                    ).then(function () {
                        return cqInvoke(
                            sess.win,
                            CQ_DEDUCTION.dataAppId,
                            CQ_DEDUCTION.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                return clickAppThenParty(sess, step).then(function () {
                    var menuHit = findClickInSession(sess, "扣分项台账");
                    step("find-menu", { hasMenu: !!(menuHit && menuHit.el) });
                    if (menuHit) {
                        clog("点击扣分项台账");
                        fireParentClick(menuHit.el, menuHit.win);
                        return waitFor(function () { return sess.lastList; }, 15000, 250, "等待扣分项 loadData").catch(function () {
                            clog("点击后未捕获列表 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return [];
                    var data = parseMaybeJson(sess.lastList || res);
                    var parsed = parseDeductionTable(data);
                    var rows = parsed.rows || [];
                    var colLabels = (parsed.columns || []).map(function (c) { return c.label; }).join(",");
                    clog("扣分项 loadData 解析行数", rows.length, "列", colLabels);
                    if (!rows.length) {
                        var preview = "";
                        try { preview = JSON.stringify(data).slice(0, 1200); } catch (e) { preview = String(data).slice(0, 1200); }
                        clog("扣分项未能解析行，预览", preview);
                        reportError("deduction-empty", new Error("loadData 已返回但未能识别行"), { trail: trail, preview: preview });
                    }
                    deductionReady = !!(parsed.columns && parsed.columns.length) || rows.length > 0;
                    applyDeductionTable(parsed);
                    try { window.__cqLastDeductionParse = parsed; } catch (e3) { }
                    if (deductionReady) {
                        showAlert("default", "扣分项台账加载成功", "已加载 " + rows.length + " 条，" + (parsed.columns || []).length + " 列");
                    } else {
                        showAlert("destructive", "扣分项台账加载失败", "已返回数据但未能识别行，请查看控制台预览");
                    }
                    return rows;
                });
            }).then(function (rows) {
                deductionLoading = false;
                return rows;
            }, function (err) {
                deductionLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return [];
                clog("扣分项加载失败", err && err.message);
                reportError("deduction-load", err, { trail: trail });
                showAlert("destructive", "扣分项台账加载失败", err && err.message ? String(err.message) : String(err));
            });
            deductionLoading = task;
            return task;
        }
        function clickAppThenParty(sess, step) {
            return Promise.resolve().then(function () {
                hookSessionTree(sess);
                var alreadyParty = findClickInSession(sess, "党费");
                var appHit = findClickInSession(sess, "应用", ".kd-cq-homepage-tab-item-text") || findClickInSession(sess, "应用");
                if (step) step("before-click-app", { alreadyParty: !!alreadyParty, hasApp: !!appHit, frameId: sess.frameId });
                if (alreadyParty) return;
                if (appHit) {
                    clog("点击应用", sess.frameId);
                    fireParentClick(appHit.el, appHit.win);
                }
            }).then(function () {
                return waitFor(function () { return findClickInSession(sess, "党费"); }, 15000, 250, "等待出现「党费」入口");
            }).then(function (partyHit) {
                hookSessionTree(sess);
                clog("点击党费", sess.frameId);
                if (step) step("click-party", { ok: !!(partyHit && partyHit.el) });
                fireParentClick(partyHit.el, partyHit.win);
                return waitFor(function () { return sess.lastAppHome; }, 15000, 250, "等待党费首页 loadData").catch(function () {
                    clog("未捕获到党费首页 loadData，仍继续", sess.frameId);
                    if (step) step("app-home-payload-miss", { lastAppHomeLen: String(sess.lastAppHome || "").length });
                    return waitMs(1500);
                });
            }).then(function () {
                hookSessionTree(sess);
                return waitMs(400);
            });
        }
        try { parentWin().__cqFetchDeduction = loadDeductionFromCq; } catch (e) { }
        try { window.__cqFetchDeduction = loadDeductionFromCq; } catch (eWin) { }
        try { window.__cqDisposeOverlay = disposeCqResources; } catch (eDisp) { }

        function partyFieldLabel(key) {
            var raw = String(key || "");
            if (raw.indexOf("entry_") === 0) raw = raw.slice(6);
            var map = {
                billno: "编号",
                billstatus: "数据状态",
                crrc_datetimefield: "统计年",
                crrc_combofield: "季度",
                crrc_basedatafield: "组织类型",
                crrc_basedatafield1: "党组织",
                crrc_decimalfield13: "合计得分",
                seq: "分录序号",
                fseq: "分录序号"
            };
            if (map[raw]) return map[raw];
            if (raw.length > 5 && raw.slice(raw.length - 5) === "_name") {
                var base = raw.slice(0, raw.length - 5);
                if (map[base]) return map[base] + ".名称";
            }
            return key;
        }
        function isReservedForm(formId) {
            return formId === CQ_DEDUCTION.consoleForm
                || formId === CQ_DEDUCTION.myAppForm
                || formId === CQ_DEDUCTION.menuFormId
                || formId === CQ_PARTY.menuFormId;
        }
        function waitForSessReq(sess, pred, timeout, label) {
            return waitFor(function () {
                var arr = sess.requests || [];
                var i;
                for (i = arr.length - 1; i >= 0; i--) {
                    if (pred(arr[i])) return arr[i];
                }
                return null;
            }, timeout || 15000, 200, label || "等待苍穹请求");
        }
        function isPartyListLoad(r, sess) {
            if (!r || !r.query || r.query.ac !== "loadData") return false;
            if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false;
            if (isPartyBillPageId(r.pageId, sess.listPageId, CQ_PARTY.dataFormId)) return false;
            var f = r.query.f;
            if (!f || isReservedForm(f)) return false;
            if (sess.listPageId && r.pageId === sess.listPageId) return true;
            return f === CQ_PARTY.dataFormId && String(r.response).indexOf("billlistap") >= 0;
        }
        function isPartyBillLoad(r, sess, minTs) {
            if (!r || !r.query || r.query.ac !== "loadData") return false;
            if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false;
            if (minTs && r.t && r.t < minTs - 300) return false;
            if (isPartyBillPageId(r.pageId, sess.listPageId, CQ_PARTY.dataFormId)) return true;
            return String(r.response).indexOf("entryentity") >= 0;
        }
        function findBillListPack(payload) {
            var pack = null;
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object") return;
                if (obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
                else if (!pack && obj.c === "billlistap" && obj.p && Array.isArray(obj.p.rows)) pack = obj.p;
                else if (!pack && Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) pack = obj;
            }, 0, []);
            return pack;
        }
        function shouldSkipPartyKey(key, idx, opts) {
            if (!key) return true;
            opts = opts || {};
            var low = String(key).toLowerCase();
            if (low === "rk" || low === "s" || low === "cprop" || low === "l" || low === "vi" || low === "u") return true;
            if (!opts.keepSeq && (low === "fseq" || low === "seq")) return true;
            if (low === "rowkey" || low === "id") return true;
            if (key.length >= 3 && key.slice(key.length - 3) === "_id") return true;
            if (!opts.keepEntryKey && key.indexOf("entryentity") >= 0) return true;
            if (idx && (idx[key + "_name"] != null || idx[key + ".name"] != null)) return true;
            return false;
        }
        function mapPartyPack(pack, payload, opts) {
            opts = opts || {};
            var idx = pack.dataindex || {};
            var captions = collectDeductionCaptions(payload || pack, pack);
            var keys = Object.keys(idx);
            keys.sort(function (a, b) { return Number(idx[a]) - Number(idx[b]); });
            var fieldKeys = [];
            var used = {};
            var i;
            for (i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (shouldSkipPartyKey(k, idx, opts) || used[k]) continue;
                used[k] = true;
                var cap = captions[k] || partyFieldLabel(k);
                fieldKeys.push({ dataindex: k, caption: cap });
            }
            var rows = (pack.rows || []).map(function (row) {
                var out = {};
                var j;
                for (j = 0; j < fieldKeys.length; j++) {
                    var f = fieldKeys[j];
                    var pos = idx[f.dataindex];
                    var raw = pos != null ? row[pos] : "";
                    out[f.dataindex] = formatDeductionValue(f.dataindex, raw);
                }
                return out;
            });
            return { columns: fieldKeys, rows: rows };
        }
        function packCellAt(pack, row, key) {
            var idx = (pack && pack.dataindex) || {};
            if (idx[key] == null) return "";
            return cqCell(row[idx[key]]);
        }
        function findPkField(pack, payload) {
            var idx = (pack && pack.dataindex) || {};
            if (idx[CQ_PARTY.pkField] != null) return CQ_PARTY.pkField;
            if (idx.id != null) return "id";
            var found = "";
            walkCq(parseMaybeJson(payload), function (obj) {
                if (found || !obj || typeof obj !== "object") return;
                var pk = obj.pkFieldName || obj.pkfieldname;
                if (typeof pk !== "string" || !pk) return;
                var short = pk.split(".").pop();
                if (idx[pk] != null) found = pk;
                else if (idx[short] != null) found = short;
            }, 0, []);
            if (found) return found;
            var keys = Object.keys(idx);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (keys[i].length > 3 && keys[i].slice(keys[i].length - 3) === "_id") return keys[i];
            }
            return CQ_PARTY.pkField;
        }
        function extractPartyListBills(payload, sess) {
            var parsedPayload = parseMaybeJson(payload);
            var pack = findBillListPack(parsedPayload);
            if (!pack) return { columns: [], rows: [] };
            var table = mapPartyPack(pack, parsedPayload, {});
            var pkField = findPkField(pack, parsedPayload);
            sess.pkField = pkField;
            if (Array.isArray(pack.postcols) && pack.postcols.length) sess.postcols = pack.postcols.slice();
            var rows = (pack.rows || []).map(function (row, i) {
                var mapped = {};
                var src = table.rows[i] || {};
                var sk = Object.keys(src);
                var s;
                for (s = 0; s < sk.length; s++) mapped[sk[s]] = src[sk[s]];
                mapped._pkId = String(packCellAt(pack, row, pkField) || packCellAt(pack, row, "id") || "");
                mapped._billno = String(mapped.billno || packCellAt(pack, row, "billno") || "");
                mapped._billstatus = String(packCellAt(pack, row, "billstatus") || "");
                mapped._rowIndex = i;
                return mapped;
            });
            return { columns: table.columns, rows: rows };
        }
        function isEntryName(name) {
            var s = String(name || "").toLowerCase();
            return !!s && (s.indexOf("entry") >= 0 || s.indexOf("billentry") >= 0);
        }
        function packFromObj(obj) {
            if (!obj || typeof obj !== "object") return null;
            if (Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) return obj;
            if (obj.data && Array.isArray(obj.data.rows) && obj.data.dataindex) return obj.data;
            if (obj.p && Array.isArray(obj.p.rows) && obj.p.dataindex) return obj.p;
            return null;
        }
        function findEntryPacks(payload) {
            var packs = [];
            function add(key, data) {
                if (!data || !Array.isArray(data.rows)) return;
                var i;
                for (i = 0; i < packs.length; i++) if (packs[i].data === data) return;
                packs.push({ key: String(key || "entry"), data: data });
            }
            walkCq(parseMaybeJson(payload), function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var k = obj.k || obj.c || obj.key || "";
                if (isEntryName(k)) {
                    var p = packFromObj(obj);
                    if (p) add(k, p);
                }
                var keys = Object.keys(obj);
                var i;
                for (i = 0; i < keys.length; i++) {
                    if (!isEntryName(keys[i])) continue;
                    var pack = packFromObj(obj[keys[i]]);
                    if (pack) add(keys[i], pack);
                }
            }, 0, []);
            return packs;
        }
        function pickBestEntryPack(packs) {
            if (!packs || !packs.length) return null;
            var named = [];
            var i;
            for (i = 0; i < packs.length; i++) if (isEntryName(packs[i].key)) named.push(packs[i]);
            var list = named.length ? named : packs;
            var best = list[0];
            var j;
            for (j = 1; j < list.length; j++) {
                if ((list[j].data.rows || []).length > (best.data.rows || []).length) best = list[j];
            }
            return best;
        }
        function isSkipHeaderKey(key) {
            if (!key || key.charAt(0) === "_") return true;
            var skip = {
                k: 1, c: 1, a: 1, p: 1, u: 1, l: 1, vi: 1, data: 1, dataindex: 1,
                rows: 1, cols: 1, columns: 1, pageId: 1, appId: 1, params: 1
            };
            if (skip[key]) return true;
            var low = String(key).toLowerCase();
            if (low.indexOf("entry") >= 0) return true;
            if (low === "billlistap" || (low.length >= 2 && low.slice(low.length - 2) === "ap")) return true;
            return false;
        }
        function headerFromListBill(bill) {
            var header = {};
            if (!bill) return header;
            var keys = Object.keys(bill);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (keys[i].charAt(0) === "_") continue;
                header[keys[i]] = bill[keys[i]];
            }
            return header;
        }
        function setHeaderVal(header, key, raw) {
            if (isSkipHeaderKey(key)) return;
            if (raw && typeof raw === "object" && !Array.isArray(raw) && (raw.rows || raw.dataindex)) return;
            var val = formatDeductionValue(key, raw);
            if (val == null || val === "") return;
            if (typeof val === "object") return;
            if (header[key] == null || header[key] === "") header[key] = val;
        }
        function extractBillHeader(payload, listBill) {
            var header = {};
            var root = parseMaybeJson(payload);
            walkCq(root, function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var k = obj.k || obj.c;
                if (typeof k === "string" && k && obj.v !== undefined && !isSkipHeaderKey(k)) {
                    setHeaderVal(header, k, obj.v);
                }
            }, 0, []);
            var listHeader = headerFromListBill(listBill);
            var lk = Object.keys(listHeader);
            var j;
            for (j = 0; j < lk.length; j++) {
                if (header[lk[j]] == null || header[lk[j]] === "") header[lk[j]] = listHeader[lk[j]];
            }
            return header;
        }
        function flattenPartyBill(header, entry, meta) {
            var out = {};
            var hk = Object.keys(header || {});
            var i;
            for (i = 0; i < hk.length; i++) {
                if (hk[i].charAt(0) === "_") continue;
                out[hk[i]] = header[hk[i]];
            }
            if (entry) {
                var ek = Object.keys(entry);
                var j;
                for (j = 0; j < ek.length; j++) {
                    var k = ek[j];
                    if (k.charAt(0) === "_") continue;
                    out[Object.prototype.hasOwnProperty.call(out, k) ? "entry_" + k : k] = entry[k];
                }
            }
            out._billPkId = (meta && meta.pk) || "";
            out._entrySeq = meta && meta.seq != null ? meta.seq : "";
            return out;
        }
        function combinePartyColumns(headerCols, entryCols, header) {
            var cols = (headerCols || []).slice();
            var seen = {};
            var i;
            for (i = 0; i < cols.length; i++) seen[cols[i].dataindex] = true;
            var j;
            for (j = 0; j < (entryCols || []).length; j++) {
                var c = entryCols[j];
                var key = header && Object.prototype.hasOwnProperty.call(header, c.dataindex) ? "entry_" + c.dataindex : c.dataindex;
                if (seen[key]) continue;
                seen[key] = true;
                cols.push({ dataindex: key, caption: c.caption || partyFieldLabel(c.dataindex), part: "entry" });
            }
            return cols;
        }
        function extractPartyBillData(payload, listBill) {
            var parsedPayload = parseMaybeJson(payload);
            var header = extractBillHeader(parsedPayload, listBill);
            var pack = pickBestEntryPack(findEntryPacks(parsedPayload));
            var mapped = pack ? mapPartyPack(pack.data, parsedPayload, { keepSeq: true }) : { columns: [], rows: [] };
            var entries = mapped.rows || [];
            var headerCols = [];
            var hk = Object.keys(header);
            var hi;
            var captions = collectDeductionCaptions(parsedPayload, pack && pack.data);
            for (hi = 0; hi < hk.length; hi++) {
                if (hk[hi].charAt(0) === "_") continue;
                headerCols.push({
                    dataindex: hk[hi],
                    caption: captions[hk[hi]] || partyFieldLabel(hk[hi]),
                    part: "header"
                });
            }
            var pk = (listBill && listBill._pkId) || header[CQ_PARTY.pkField] || "";
            var flat = [];
            if (!entries.length) {
                flat.push(flattenPartyBill(header, null, { pk: pk, seq: -1 }));
            } else {
                var ei;
                for (ei = 0; ei < entries.length; ei++) {
                    flat.push(flattenPartyBill(header, entries[ei], { pk: pk, seq: ei }));
                }
            }
            return {
                header: header,
                headerColumns: headerCols,
                entries: entries,
                entryColumns: mapped.columns || [],
                columns: combinePartyColumns(headerCols, mapped.columns || [], header),
                rows: flat
            };
        }
        function partyColsToTable(columns, rows) {
            var defs = [];
            var used = {};
            var numericKeys = {};
            var i;
            for (i = 0; i < (columns || []).length; i++) {
                var di = columns[i].dataindex;
                var key = deductionRowKey(di);
                if (used[key]) continue;
                used[key] = true;
                var label = columns[i].caption || partyFieldLabel(di);
                if (!label || label === di) label = partyFieldLabel(di);
                var numeric = key.indexOf("decimal") >= 0 || label.indexOf("分数") >= 0 || label.indexOf("得分") >= 0;
                var badge = key.indexOf("billstatus") >= 0 || label.indexOf("状态") >= 0;
                var compact = numeric || badge
                    || key === "billno"
                    || key.indexOf("datetimefield") >= 0
                    || key.indexOf("combofield") >= 0
                    || label === "统计年"
                    || label === "季度"
                    || label === "编号";
                var wrap = !compact && (key.indexOf("largetext") >= 0 || key.indexOf("textfield") >= 0 || label.indexOf("说明") >= 0 || label.indexOf("备注") >= 0);
                if (numeric) numericKeys[key] = true;
                defs.push({ key: key, label: label, sortable: true, numeric: numeric, badge: badge, compact: compact, wrap: wrap });
            }
            var outRows = (rows || []).map(function (row, ridx) {
                var o = { _rowId: "p" + ridx };
                var j;
                for (j = 0; j < (columns || []).length; j++) {
                    var k = deductionRowKey(columns[j].dataindex);
                    var val = row[columns[j].dataindex];
                    if (numericKeys[k] && val !== "" && typeof val !== "number") {
                        var num = Number(val);
                        o[k] = num !== num ? val : num;
                    } else {
                        o[k] = val == null ? "" : val;
                    }
                }
                return o;
            });
            return { columns: defs, rows: outRows };
        }
        function remountPartyTable() {
            var def = TABLE_DEFS.partyQuarterly;
            if (!window.__cqDataTable || !def) return;
            window.__cqDataTable.mount("partyQuarterly", "dt-partyQuarterly", def.columns, def.rows, {
                pageSize: 20,
                filterPlaceholder: "搜索" + def.label + "…",
                filterHostId: "dt-filter-partyQuarterly"
            });
        }
        function applyPartyTable(parsed) {
            if (parsed.columns && parsed.columns.length) TABLE_DEFS.partyQuarterly.columns = parsed.columns;
            TABLE_DEFS.partyQuarterly.rows = parsed.rows || [];
            remountPartyTable();
        }
        function findPartyMenu(sess) {
            var texts = CQ_PARTY.menuTexts;
            var i;
            for (i = 0; i < texts.length; i++) {
                var hit = findClickInSession(sess, texts[i]);
                if (hit) return { hit: hit, text: texts[i] };
            }
            return null;
        }
        function findBillLinkInSession(sess, bill) {
            var no = bill && (bill._billno || bill.billno);
            if (!no || !sess.win) return null;
            var doc = sess.win.document;
            var el = findParentClickTarget(doc, String(no), "span.link-cell-content, span.link-color, a, span")
                || findParentClickTarget(doc, String(no));
            if (!el) return null;
            return { el: el, win: sess.win };
        }
        function closeBillInSession(sess, bill) {
            var no = bill && (bill._billno || bill.billno);
            var doc = sess.win && sess.win.document;
            if (!doc) return waitMs(200);
            if (no) {
                var tabs = [];
                try { tabs = doc.querySelectorAll(".kd-cq-tab-item, .kd-cq-homepage-tab-item, [role='tab']"); } catch (e0) { }
                var i;
                for (i = 0; i < tabs.length; i++) {
                    var title = collapseWs(tabs[i].innerText || tabs[i].textContent || "");
                    if (title.indexOf(String(no)) < 0) continue;
                    var closeBtn = tabs[i].querySelector(".close, .kd-cq-tab-close, [class*='close']");
                    if (closeBtn) {
                        fireParentClick(closeBtn, sess.win);
                        return waitMs(400);
                    }
                }
            }
            var btn = findClickInSession(sess, "关闭") || findClickInSession(sess, "取消");
            if (btn) {
                fireParentClick(btn.el, btn.win);
                return waitMs(400);
            }
            return waitMs(200);
        }
        function partyListSelData(sess, bill) {
            var postcols = sess.postcols;
            if (!Array.isArray(postcols) || !postcols.length) {
                postcols = [sess.pkField || CQ_PARTY.pkField, "billstatus", "billno"];
            }
            return postcols.map(function (col) {
                if (col === "billno") return bill._billno || bill.billno || "";
                if (col === "billstatus") return bill._billstatus || "";
                if (col === (sess.pkField || CQ_PARTY.pkField) || String(col).slice(-3) === "_id") return bill._pkId || "";
                if (bill[col] != null && bill[col] !== "") return String(bill[col]);
                return "";
            });
        }
        function invokePartyBillOpen(sess, rowIndex, bill) {
            var appId = sess.dataAppId || CQ_PARTY.dataAppId;
            var formId = sess.dataFormId || CQ_PARTY.dataFormId;
            var pageId = sess.listPageId;
            var field = "billno";
            var ctrl = CQ_PARTY.listControl;
            var sel = partyListSelData(sess, bill);
            return cqInvoke(sess.win, appId, formId, "entryRowClick", pageId, [
                {
                    key: ctrl,
                    methodName: "entryRowClick",
                    args: [rowIndex, field],
                    postData: [{
                        billlistap: {
                            fieldKey: field,
                            row: rowIndex,
                            selRows: [rowIndex],
                            selDatas: [sel],
                            isClientNewRow: false,
                            clientNewRows: ""
                        }
                    }, []]
                },
                {
                    key: ctrl,
                    methodName: "hyperLinkClick",
                    args: [field, rowIndex],
                    postData: [{}, []]
                }
            ]);
        }
        function openOnePartyBill(sess, bill, rowIndex) {
            var started = Date.now();
            function waitBill(ms) {
                return waitForSessReq(sess, function (r) {
                    return isPartyBillLoad(r, sess, started);
                }, ms || 20000, "等待单据 loadData");
            }
            return waitFor(function () {
                return findBillLinkInSession(sess, bill);
            }, 8000, 200, "等待单据编号链接").then(function (link) {
                clog("点击编号打开单据", bill._billno || bill.billno || "");
                fireParentClick(link.el, link.win);
                return waitBill(12000);
            }).catch(function () {
                clog("改用 entryRowClick 打开单据", bill._billno || "");
                return invokePartyBillOpen(sess, rowIndex, bill).then(function () {
                    return waitBill(20000);
                });
            }).then(function (billReq) {
                if (!billReq) throw new Error("未等到单据 loadData");
                sess.dataFormId = (billReq.query && billReq.query.f) || sess.dataFormId || CQ_PARTY.dataFormId;
                sess.dataAppId = billReq.appId || sess.dataAppId || CQ_PARTY.dataAppId;
                var parsed = extractPartyBillData(billReq.response, bill);
                if (!parsed.entries.length && String(billReq.response || "").indexOf("entryentity") < 0) {
                    throw new Error("单据已开但未解析到分录 entryentity");
                }
                return closeBillInSession(sess, bill).then(function () { return parsed; });
            });
        }
        function collectPartyEntries(sess, bills) {
            var allRows = [];
            var headerCols = [];
            var entryCols = [];
            var allHeader = {};
            var opened = 0;
            var failed = 0;
            var entryCount = 0;
            var n = Math.min(bills.length, CQ_PARTY.maxBills || 40);
            function mergeCols(into, add) {
                var seen = {};
                var i;
                for (i = 0; i < into.length; i++) seen[into[i].dataindex] = true;
                for (i = 0; i < (add || []).length; i++) {
                    if (!add[i] || seen[add[i].dataindex]) continue;
                    seen[add[i].dataindex] = true;
                    into.push(add[i]);
                }
            }
            function pushParsed(bill, parsed) {
                var header = (parsed && parsed.header) || headerFromListBill(bill);
                var rows = (parsed && parsed.rows) || [];
                if (!rows.length) rows = [flattenPartyBill(header, null, { pk: bill._pkId || "", seq: -1 })];
                entryCount += (parsed && parsed.entries ? parsed.entries.length : 0);
                mergeCols(headerCols, parsed && parsed.headerColumns);
                mergeCols(entryCols, parsed && parsed.entryColumns);
                var hk = Object.keys(header);
                var hi;
                for (hi = 0; hi < hk.length; hi++) allHeader[hk[hi]] = header[hk[hi]];
                var r;
                for (r = 0; r < rows.length; r++) allRows.push(rows[r]);
            }
            function step(i) {
                if (cqDisposed) return Promise.resolve({ rows: allRows, headerCols: headerCols, entryCols: entryCols, allHeader: allHeader, opened: opened, failed: failed, entryCount: entryCount });
                if (i >= n) {
                    return Promise.resolve({
                        rows: allRows,
                        headerCols: headerCols,
                        entryCols: entryCols,
                        allHeader: allHeader,
                        opened: opened,
                        failed: failed,
                        entryCount: entryCount
                    });
                }
                var bill = bills[i];
                var idx = bill._rowIndex != null ? bill._rowIndex : i;
                clog("打开单据", (i + 1) + "/" + n, bill._billno || bill.billno || "");
                hookSessionTree(sess);
                return openOnePartyBill(sess, bill, idx).then(function (parsed) {
                    opened += 1;
                    pushParsed(bill, parsed);
                    return waitMs(350).then(function () { return step(i + 1); });
                }, function (err) {
                    failed += 1;
                    clog("打开单据失败，保留列表头", bill._billno || bill._pkId, err && err.message);
                    pushParsed(bill, {
                        header: headerFromListBill(bill),
                        headerColumns: [],
                        entries: [],
                        entryColumns: [],
                        rows: [flattenPartyBill(headerFromListBill(bill), null, { pk: bill._pkId || "", seq: -1 })]
                    });
                    return waitMs(250).then(function () { return step(i + 1); });
                });
            }
            return step(0);
        }
        function loadPartyQuarterlyFromCq() {
            if (cqDisposed) return Promise.resolve([]);
            if (partyLoading) return partyLoading;
            var sess = getFetchSession("cq-fetch-frame-party");
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("pq-step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureFetchSession(sess);
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookSessionTree(sess);
                var consolePageId = findConsolePageIdFrom(sess.win);
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    frameId: sess.frameId,
                    sessionHref: safeHref(sess.win)
                });
                clog("季度党群绩效 consolePageId", consolePageId, "suffix", suffix);
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_PARTY.menuAppId + suffix;
                var listPageId = CQ_PARTY.menuItemId + suffix;
                sess.listPageId = listPageId;
                sess.dataFormId = CQ_PARTY.dataFormId;
                sess.dataAppId = CQ_PARTY.dataAppId;
                sess.lastList = "";
                sess.lastBill = "";
                sess.lastAppHome = "";
                sess.requests = [];
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
                        sess.win,
                        CQ_PARTY.menuAppId,
                        CQ_PARTY.menuFormId,
                        "treeMenuClick",
                        menuPageId,
                        [{
                            key: CQ_PARTY.menuControl,
                            methodName: "treeMenuClick",
                            args: [CQ_PARTY.menuRoot, CQ_PARTY.menuItemId],
                            postData: [{}, []]
                        }]
                    ).then(function () {
                        return cqInvoke(
                            sess.win,
                            CQ_PARTY.dataAppId,
                            CQ_PARTY.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                function waitListLoad() {
                    return waitForSessReq(sess, function (r) {
                        return isPartyListLoad(r, sess);
                    }, 15000, "等待季度党群绩效列表 loadData");
                }
                return clickAppThenParty(sess, step).then(function () {
                    var hit = findPartyMenu(sess);
                    step("find-menu", { hasMenu: !!(hit && hit.hit), text: hit ? hit.text : "" });
                    if (hit && hit.hit) {
                        clog("点击", hit.text);
                        fireParentClick(hit.hit.el, hit.hit.win);
                        return waitListLoad().catch(function () {
                            clog("点击后未捕获列表 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return [];
                    var payload = sess.lastList;
                    if (!payload && res && res.query) payload = res.response;
                    if (!payload) payload = res;
                    var list = extractPartyListBills(payload, sess);
                    if (!list.rows.length) {
                        var ri;
                        for (ri = sess.requests.length - 1; ri >= 0; ri--) {
                            if (!isPartyListLoad(sess.requests[ri], sess)) continue;
                            list = extractPartyListBills(sess.requests[ri].response, sess);
                            payload = sess.requests[ri].response;
                            if (list.rows.length) break;
                        }
                    }
                    clog("季度党群绩效列表单据", list.rows.length);
                    if (!list.rows.length) {
                        partyReady = true;
                        applyPartyTable({ columns: [], rows: [] });
                        showAlert("default", "季度党群绩效加载成功", "列表为空，无单据可打开分录");
                        return [];
                    }
                    sess.dataFormId = CQ_PARTY.dataFormId;
                    applyPartyTable(partyColsToTable(list.columns, list.rows));
                    return waitFor(function () {
                        return findBillLinkInSession(sess, list.rows[0]);
                    }, 8000, 200, "等待列表编号").catch(function () {
                        return null;
                    }).then(function () {
                        return collectPartyEntries(sess, list.rows);
                    }).then(function (got) {
                        var cols = combinePartyColumns(got.headerCols, got.entryCols, got.allHeader);
                        var table = partyColsToTable(cols, got.rows);
                        partyReady = table.rows.length > 0 || !!(table.columns && table.columns.length);
                        applyPartyTable(table);
                        try { window.__cqLastPartyParse = { table: table, opened: got.opened, failed: got.failed, entryCount: got.entryCount }; } catch (e3) { }
                        clog("季度党群绩效摊平", "单据", got.opened, "失败", got.failed, "分录", got.entryCount, "行", table.rows.length);
                        if (partyReady) {
                            showAlert(
                                "default",
                                "季度党群绩效加载成功",
                                "单据 " + got.opened + " 张，分录 " + got.entryCount + " 行，列表 " + table.rows.length + " 条"
                            );
                        } else {
                            showAlert("destructive", "季度党群绩效加载失败", "已返回数据但未能识别行");
                        }
                        return table.rows;
                    });
                });
            }).then(function (rows) {
                partyLoading = false;
                return rows;
            }, function (err) {
                partyLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return [];
                clog("季度党群绩效加载失败", err && err.message);
                reportError("party-load", err, { trail: trail });
                showAlert("destructive", "季度党群绩效加载失败", err && err.message ? String(err.message) : String(err));
            });
            partyLoading = task;
            return task;
        }
        try { parentWin().__cqFetchPartyQuarterly = loadPartyQuarterlyFromCq; } catch (ePq) { }
        try { window.__cqFetchPartyQuarterly = loadPartyQuarterlyFromCq; } catch (ePq2) { }

        function formatOrgValue(key, raw) {
            if (raw == null || raw === "") return "";
            var v = cqCell(raw);
            if (key === "status" || key === "billstatus") {
                var st = String(v);
                return STATUS_TEXT[st] || st;
            }
            if (key === "crrc_combofield") {
                var t = String(v);
                return ORG_TYPE_TEXT[t] || t;
            }
            if (key === "enable") {
                var en = String(v);
                return ORG_ENABLE_TEXT[en] || en;
            }
            if (v && typeof v === "object") return "";
            return v == null ? "" : v;
        }
        function looksLikeOrgTreeNode(obj) {
            if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
            var id = obj.id != null ? String(obj.id) : "";
            var name = obj.text || obj.name;
            return !!(id && name);
        }
        function orgTreeArgsOf(obj) {
            var args = obj.args;
            if (!Array.isArray(args) || !args.length) return null;
            var first = args[0];
            if (Array.isArray(first) && first.length && looksLikeOrgTreeNode(first[0])) return first;
            if (looksLikeOrgTreeNode(first)) return [first];
            return null;
        }
        function countOrgTree(nodes) {
            if (!nodes) return 0;
            var arr = Array.isArray(nodes) ? nodes : [nodes];
            var n = 0;
            var i;
            for (i = 0; i < arr.length; i++) {
                n += 1;
                n += countOrgTree(arr[i] && arr[i].children);
            }
            return n;
        }
        function findOrgAddNodes(payload) {
            var best = null;
            var bestCount = -1;
            var bestMethod = "";
            function walk(obj, depth, seen) {
                if (!obj || typeof obj !== "object" || depth > 16) return;
                if (seen.indexOf(obj) >= 0) return;
                seen.push(obj);
                if (!Array.isArray(obj)) {
                    var mn = String(obj.methodname || obj.methodName || "");
                    if (mn === "addNodes" || mn === "updateNodes") {
                        var arr = orgTreeArgsOf(obj);
                        if (arr && arr.length) {
                            var c = countOrgTree(arr);
                            if (c > bestCount || (c === bestCount && mn === "addNodes" && bestMethod !== "addNodes")) {
                                best = arr;
                                bestCount = c;
                                bestMethod = mn;
                            }
                        }
                        return;
                    }
                }
                if (Array.isArray(obj)) {
                    var n = Math.min(obj.length, 80);
                    var i;
                    for (i = 0; i < n; i++) walk(obj[i], depth + 1, seen);
                    return;
                }
                var keys = Object.keys(obj);
                var k;
                for (k = 0; k < keys.length && k < 80; k++) {
                    if (keys[k] === "args") continue;
                    walk(obj[keys[k]], depth + 1, seen);
                }
            }
            walk(parseMaybeJson(payload), 0, []);
            return best;
        }
        function findOrgBillListPack(payload) {
            var pack = null;
            function walk(obj, depth, seen) {
                if (!obj || typeof obj !== "object" || depth > 16) return;
                if (seen.indexOf(obj) >= 0) return;
                seen.push(obj);
                if (!Array.isArray(obj)) {
                    var mn = String(obj.methodname || obj.methodName || "");
                    if (mn === "addNodes" || mn === "updateNodes") return;
                    if (obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
                    else if (!pack && obj.c === "billlistap" && obj.p && Array.isArray(obj.p.rows)) pack = obj.p;
                    else if (!pack && Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) pack = obj;
                }
                if (Array.isArray(obj)) {
                    var n = Math.min(obj.length, 80);
                    var i;
                    for (i = 0; i < n; i++) walk(obj[i], depth + 1, seen);
                    return;
                }
                var keys = Object.keys(obj);
                var k;
                for (k = 0; k < keys.length && k < 80; k++) {
                    if (keys[k] === "args") continue;
                    walk(obj[keys[k]], depth + 1, seen);
                }
            }
            walk(parseMaybeJson(payload), 0, []);
            return pack;
        }
        function mapOrgListRows(pack) {
            var map = {};
            if (!pack || !Array.isArray(pack.rows)) return map;
            var idx = pack.dataindex || {};
            var i;
            for (i = 0; i < pack.rows.length; i++) {
                var row = pack.rows[i];
                function cell(key) {
                    if (idx[key] == null) return "";
                    return formatOrgValue(key, row[idx[key]]);
                }
                var id = String(cell("crrc_dj_org_tree_ext_id") || "");
                if (!id) continue;
                map[id] = {
                    name: cell("name"),
                    status: cell("status"),
                    parent_name: cell("parent_name"),
                    orgType: cell("crrc_combofield"),
                    foundedAt: cell("crrc_datefield"),
                    number: cell("number"),
                    level: cell("level"),
                    longnumber: cell("longnumber"),
                    enable: cell("enable")
                };
            }
            return map;
        }
        function mapCqOrgNode(n, parentName, listMap) {
            var rawId = n && n.id != null ? String(n.id) : "";
            var name = n && (n.text || n.name) ? String(n.text || n.name) : "";
            var parentid = n && n.parentid != null ? String(n.parentid) : "";
            var id = rawId;
            if (name === "全部" && !parentid) id = "all";
            var extra = listMap[rawId] || {};
            var node = {
                id: id,
                name: name,
                parentid: parentid,
                parentName: extra.parent_name || parentName || "",
                status: extra.status || "",
                orgType: extra.orgType || "",
                foundedAt: extra.foundedAt || "",
                number: extra.number || "",
                level: extra.level == null || extra.level === "" ? "" : extra.level,
                longnumber: extra.longnumber || n.longNumber || n.longnumber || "",
                enable: extra.enable || "",
                children: []
            };
            var kids = (n && n.children) || [];
            var ki;
            for (ki = 0; ki < kids.length; ki++) {
                node.children.push(mapCqOrgNode(kids[ki], name, listMap));
            }
            return node;
        }
        function buildOrgRoot(nodes, listMap) {
            if (!nodes || !nodes.length) return null;
            if (nodes.length === 1) return mapCqOrgNode(nodes[0], "", listMap);
            var wrap = { id: "all", name: "全部", status: "", children: [] };
            var wi;
            for (wi = 0; wi < nodes.length; wi++) wrap.children.push(mapCqOrgNode(nodes[wi], "", listMap));
            return wrap;
        }
        function buildOrgRootFromList(listMap) {
            var ids = Object.keys(listMap);
            var children = [];
            var li;
            for (li = 0; li < ids.length; li++) {
                var extra = listMap[ids[li]];
                children.push({
                    id: ids[li],
                    name: extra.name,
                    status: extra.status,
                    parentName: extra.parent_name,
                    orgType: extra.orgType,
                    foundedAt: extra.foundedAt,
                    number: extra.number,
                    level: extra.level,
                    longnumber: extra.longnumber,
                    enable: extra.enable,
                    children: []
                });
            }
            var companyName = children.length && children[0].parentName ? children[0].parentName : "中车株洲电力机车有限公司党委";
            return {
                id: "all",
                name: "全部",
                status: "",
                children: [{
                    id: "crrc-dw",
                    name: companyName,
                    status: "",
                    children: children
                }]
            };
        }
        function rebuildOrgNames() {
            ORGS = [];
            function walk(node) {
                if (!node) return;
                if (node.id !== "all") ORGS.push(node.name);
                var ch = node.children || [];
                var wi;
                for (wi = 0; wi < ch.length; wi++) walk(ch[wi]);
            }
            walk(ORG_TREE);
        }
        function defaultOrgCompanyId() {
            var ch = ORG_TREE && ORG_TREE.children;
            if (ch && ch.length) return ch[0].id;
            return "crrc-dw";
        }
        function defaultOrgExpanded() {
            var exp = { all: true };
            var cid = defaultOrgCompanyId();
            if (cid) exp[cid] = true;
            return exp;
        }
        function orgRowFromNode(node, parentName) {
            return {
                id: node.id,
                name: node.name,
                status: node.status || "",
                parentName: parentName || node.parentName || "",
                orgType: node.orgType || "",
                foundedAt: node.foundedAt || "",
                number: node.number || "",
                level: node.level == null || node.level === "" ? "" : node.level
            };
        }
        function applyOrgTree(root) {
            if (!root) return;
            ORG_TREE = root;
            rebuildOrgNames();
            var companyId = defaultOrgCompanyId();
            orgViewState.activeId = companyId;
            orgViewState.expanded = defaultOrgExpanded();
            orgState.activeId = companyId;
            orgState.expanded = defaultOrgExpanded();
            orgState.selected = {};
            orgState.page = 1;
            renderOrgView();
            renderOrgTree();
            refreshOrgDialogTable();
        }
        function isOrgListLoad(r, sess) {
            if (!r || !r.query || r.query.ac !== "loadData") return false;
            if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false;
            var f = r.query.f;
            if (!f || isReservedForm(f)) return false;
            if (sess && sess.listPageId && r.pageId === sess.listPageId) return true;
            if (f === CQ_ORG.dataFormId) return true;
            var s = String(r.response);
            return s.indexOf("addNodes") >= 0 && s.indexOf("crrc_dj_org_tree_ext") >= 0;
        }
        function findOrgMenu(sess) {
            var texts = CQ_ORG.menuTexts;
            var i;
            for (i = 0; i < texts.length; i++) {
                var hit = findClickInSession(sess, texts[i]);
                if (hit) return { hit: hit, text: texts[i] };
            }
            return null;
        }
        function pickOrgPayload(sess, res) {
            if (res && typeof res === "object" && !res.query) return res;
            var last = sess && sess.lastList;
            if (last && String(last).indexOf("addNodes") >= 0) return last;
            if (res && res.response && String(res.response).indexOf("addNodes") >= 0) return res.response;
            if (last) return last;
            if (res && res.response) return res.response;
            return res;
        }
        function loadOrgFromCq() {
            if (cqDisposed) return Promise.resolve(null);
            if (orgLoading) return orgLoading;
            var sess = getFetchSession("cq-fetch-frame-org");
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("org-step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureFetchSession(sess);
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookSessionTree(sess);
                var consolePageId = findConsolePageIdFrom(sess.win);
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    frameId: sess.frameId,
                    sessionHref: safeHref(sess.win)
                });
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_ORG.menuAppId + suffix;
                var listPageId = CQ_ORG.menuItemId + suffix;
                sess.listPageId = listPageId;
                sess.dataFormId = CQ_ORG.dataFormId;
                sess.dataAppId = CQ_ORG.dataAppId;
                sess.lastList = "";
                sess.lastBill = "";
                sess.lastAppHome = "";
                sess.requests = [];
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
                        sess.win,
                        CQ_ORG.menuAppId,
                        CQ_ORG.menuFormId,
                        "treeMenuClick",
                        menuPageId,
                        [{
                            key: CQ_ORG.menuControl,
                            methodName: "treeMenuClick",
                            args: [CQ_ORG.menuRoot, CQ_ORG.menuItemId],
                            postData: [{}, []]
                        }]
                    ).then(function () {
                        return cqInvoke(
                            sess.win,
                            CQ_ORG.dataAppId,
                            CQ_ORG.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                function waitListLoad() {
                    return waitForSessReq(sess, function (r) {
                        return isOrgListLoad(r, sess);
                    }, 25000, "等待党组织查询 loadData");
                }
                return clickAppThenParty(sess, step).then(function () {
                    var hit = findOrgMenu(sess);
                    step("find-menu", { hasMenu: !!(hit && hit.hit), text: hit ? hit.text : "" });
                    if (hit && hit.hit) {
                        clog("点击", hit.text);
                        fireParentClick(hit.hit.el, hit.hit.win);
                        return waitListLoad().catch(function () {
                            clog("点击后未捕获党组织 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return null;
                    var payload = pickOrgPayload(sess, res);
                    var nodes = findOrgAddNodes(payload);
                    var pack = findOrgBillListPack(payload);
                    if (!nodes) {
                        var ri;
                        for (ri = sess.requests.length - 1; ri >= 0; ri--) {
                            if (!isOrgListLoad(sess.requests[ri], sess)) continue;
                            var cand = sess.requests[ri].response;
                            nodes = findOrgAddNodes(cand);
                            if (!pack) pack = findOrgBillListPack(cand);
                            if (nodes) {
                                payload = cand;
                                break;
                            }
                        }
                    }
                    var listMap = mapOrgListRows(pack);
                    var listCount = 0;
                    try { listCount = Object.keys(listMap).length; } catch (eLc) { listCount = 0; }
                    var root = nodes && nodes.length ? buildOrgRoot(nodes, listMap) : null;
                    var usedFallback = false;
                    if (!root && listCount) {
                        root = buildOrgRootFromList(listMap);
                        usedFallback = true;
                    }
                    clog("党组织树", nodes ? countOrgTree(nodes) : 0, "列表", listCount, usedFallback ? "fallback" : "");
                    if (!root) {
                        orgReady = true;
                        showAlert("default", "党组织加载成功", "列表为空");
                        return null;
                    }
                    applyOrgTree(root);
                    orgReady = true;
                    var treeCount = countOrgTree(root);
                    try { window.__cqLastOrgParse = { treeCount: treeCount, listCount: listCount, usedFallback: usedFallback }; } catch (e3) { }
                    if (usedFallback) {
                        showAlert("default", "党组织加载成功", "列表 " + listCount + " 行（树未解析，仅一级）");
                    } else {
                        showAlert("default", "党组织加载成功", "树节点 " + treeCount + "，列表 " + listCount + " 行");
                    }
                    return root;
                });
            }).then(function (root) {
                orgLoading = false;
                return root;
            }, function (err) {
                orgLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return null;
                clog("党组织加载失败", err && err.message);
                reportError("org-load", err, { trail: trail });
                showAlert("destructive", "党组织加载失败", err && err.message ? String(err.message) : String(err));
            });
            orgLoading = task;
            return task;
        }
        try { parentWin().__cqFetchOrg = loadOrgFromCq; } catch (eOrg) { }
        try { window.__cqFetchOrg = loadOrgFromCq; } catch (eOrg2) { }

        // ---------- 党组织：树 + 表（布局对齐官方选择器，样式走当前 shadcn 主题） ----------
        var orgState = {
            activeId: defaultOrgCompanyId(),
            expanded: defaultOrgExpanded(),
            includeSelf: false,
            selected: {},
            page: 1,
            pageSize: 100
        };
        var orgViewState = {
            activeId: defaultOrgCompanyId(),
            expanded: defaultOrgExpanded()
        };
        function findOrgMeta(id, node, parent) {
            node = node || ORG_TREE;
            parent = parent || null;
            if (node.id === id) return { node: node, parent: parent };
            var ch = node.children || [];
            for (var i = 0; i < ch.length; i++) {
                var hit = findOrgMeta(id, ch[i], node);
                if (hit) return hit;
            }
            return null;
        }
        function selectedOrgNames() {
            return Object.keys(orgState.selected).filter(function (id) {
                return orgState.selected[id];
            }).map(function (id) {
                var m = findOrgMeta(id);
                return m ? m.node.name : id;
            });
        }
        function orgTableSource() {
            var meta = findOrgMeta(orgState.activeId);
            var node = meta ? meta.node : ORG_TREE;
            var rows = [];
            if (orgState.includeSelf && node.id !== "all") {
                var p = meta && meta.parent ? meta.parent : null;
                rows.push(orgRowFromNode(node, p && p.id !== "all" ? p.name : ""));
            }
            (node.children || []).forEach(function (c) {
                rows.push(orgRowFromNode(c, node.id === "all" ? "" : node.name));
            });
            return rows;
        }
        function orgViewTableSource() {
            var meta = findOrgMeta(orgViewState.activeId);
            var node = meta ? meta.node : ORG_TREE;
            var rows = [];
            (node.children || []).forEach(function (c) {
                rows.push(orgRowFromNode(c, node.id === "all" ? "" : node.name));
            });
            return { node: node, rows: rows };
        }
        function paintOrgTreeNode(node, wrap, state, treeRootId, onSelect) {
            var hasKids = !!(node.children && node.children.length);
            var row = document.createElement("button");
            row.type = "button";
            row.className = "org-tree-row" + (node.id === state.activeId ? " is-active" : "");
            var tog = document.createElement("span");
            tog.className = "org-tree-toggle" + (hasKids ? (state.expanded[node.id] ? " is-open" : "") : " is-empty");
            tog.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
            if (hasKids) {
                tog.onclick = function (e) {
                    e.stopPropagation();
                    state.expanded[node.id] = !state.expanded[node.id];
                    if (treeRootId === "org-view-tree") renderOrgViewTree();
                    else renderOrgTree();
                };
            }
            var label = document.createElement("span");
            label.textContent = node.name;
            row.appendChild(tog);
            row.appendChild(label);
            row.onclick = function () {
                state.activeId = node.id;
                if (state.page != null) state.page = 1;
                if (onSelect) onSelect();
                else if (treeRootId === "org-view-tree") renderOrgView();
                else {
                    renderOrgTree();
                    renderOrgTable();
                }
            };
            wrap.appendChild(row);
            if (hasKids && state.expanded[node.id]) {
                var kids = document.createElement("div");
                kids.className = "org-tree-children";
                node.children.forEach(function (c) {
                    paintOrgTreeNode(c, kids, state, treeRootId, onSelect);
                });
                wrap.appendChild(kids);
            }
        }
        function renderOrgViewTree() {
            var root = uiEl("org-view-tree");
            if (!root) return;
            root.innerHTML = "";
            paintOrgTreeNode(ORG_TREE, root, orgViewState, "org-view-tree");
        }
        function renderOrgViewTable() {
            var metaEl = uiEl("org-view-meta");
            var src = orgViewTableSource();
            if (metaEl) {
                metaEl.textContent = src.node.name + " · 下级 " + src.rows.length + " 个组织";
            }
            if (window.__cqDataTable) {
                window.__cqDataTable.setData("orgView", mapOrgRows(src.rows));
            }
        }
        function renderOrgView() {
            renderOrgViewTree();
            renderOrgViewTable();
        }
        function renderOrgTree() {
            var root = uiEl("org-tree");
            if (!root) return;
            root.innerHTML = "";
            paintOrgTreeNode(ORG_TREE, root, orgState, "org-tree");
        }
        function renderOrgTable() {
            refreshOrgDialogTable();
        }
        function resetOrgPicker() {
            orgState.activeId = defaultOrgCompanyId();
            orgState.expanded = defaultOrgExpanded();
            orgState.includeSelf = false;
            orgState.selected = {};
            orgState.page = 1;
            var inc = uiEl("org-include-self");
            if (inc) inc.checked = false;
            renderOrgTree();
            refreshOrgDialogTable();
        }
        (function initOrgPicker() {
            var inc = uiEl("org-include-self");
            if (inc) inc.onchange = function () {
                orgState.includeSelf = !!inc.checked;
                orgState.page = 1;
                refreshOrgDialogTable();
            };
            bind("org-clear", function () {
                orgState.selected = {};
                refreshOrgDialogTable();
            });
            var handle = uiEl("org-resizer");
            var pane = uiEl("org-tree-pane");
            if (handle && pane) {
                handle.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    handle.classList.add("is-dragging");
                    var startX = e.clientX;
                    var startW = pane.getBoundingClientRect().width;
                    function move(ev) {
                        var w = Math.min(560, Math.max(260, startW + ev.clientX - startX));
                        pane.style.width = w + "px";
                    }
                    function up() {
                        handle.classList.remove("is-dragging");
                        document.body.style.userSelect = "";
                        document.removeEventListener("mousemove", move);
                        document.removeEventListener("mouseup", up);
                    }
                    document.body.style.userSelect = "none";
                    document.addEventListener("mousemove", move);
                    document.addEventListener("mouseup", up);
                });
            }
        })();

        // ---------- 配置类型与动态配置面板 ----------
        var CONFIG_TYPES = {
            quarterly_party_perf: "季度党群绩效评价规则",
            quarterly_excellence: "季度创先争优评价规则",
            quarterly_grassroots: "季度基层党组织创先争优评价项点",
            annual_party_perf: "年度党群绩效评价规则",
            annual_excellence: "年度创先争优评价规则",
            annual_grassroots: "年度基层党组织创先争优评价项点"
        };
        var DEFAULT_PARTY_PERF = [
            { label: "A", percent: 40 },
            { label: "B", percent: 40 },
            { label: "C", percent: 20 }
        ];
        var DEFAULT_GRASSROOTS = [
            { name: "项点一", score: 10 },
            { name: "项点二", score: 10 }
        ];
        var dlg = uiEl("dlg-overlay");
        var dlgType = uiEl("dlg-type");
        var dlgConfigPanel = uiEl("dlg-config-panel");
        var configDraft = null;

        function isPartyPerfType(type) {
            return type === "quarterly_party_perf" || type === "annual_party_perf";
        }
        function isExcellenceType(type) {
            return type === "quarterly_excellence" || type === "annual_excellence";
        }
        function isGrassrootsType(type) {
            return type === "quarterly_grassroots" || type === "annual_grassroots";
        }
        function defaultConfigForType(type) {
            if (isPartyPerfType(type)) {
                return { items: DEFAULT_PARTY_PERF.map(function (x) { return { label: x.label, percent: x.percent }; }) };
            }
            if (isExcellenceType(type)) {
                var period = type.indexOf("quarterly") === 0 ? "季度" : "年度";
                return {
                    partyPerfLabel: "在" + period + "党群绩效评价为",
                    adminPerfLabel: "行政绩效为",
                    excellenceLabel: "创先争优评价为"
                };
            }
            if (isGrassrootsType(type)) {
                return { items: DEFAULT_GRASSROOTS.map(function (x) { return { name: x.name, score: x.score }; }) };
            }
            return {};
        }
        function sumPercents(items) {
            return items.reduce(function (sum, item) {
                return sum + (Number(item.percent) || 0);
            }, 0);
        }
        function renderPartyPerfPanel(data) {
            dlgConfigPanel.innerHTML = "";
            var head = document.createElement("div");
            head.className = "cfg-panel-head";
            var title = document.createElement("span");
            title.className = "cfg-panel-title";
            title.textContent = "项点与占比";
            var addBtn = document.createElement("button");
            addBtn.type = "button";
            addBtn.className = "btn btn-outline";
            addBtn.style.height = "28px";
            addBtn.style.padding = "0 10px";
            addBtn.style.fontSize = "12px";
            addBtn.textContent = "添加项点";
            head.appendChild(title);
            head.appendChild(addBtn);
            dlgConfigPanel.appendChild(head);
            var hint = document.createElement("div");
            hint.className = "cfg-panel-hint";
            hint.id = "cfg-sum-hint";
            hint.textContent = "各项占比之和须为 100%";
            dlgConfigPanel.appendChild(hint);
            var list = document.createElement("div");
            list.className = "cfg-list";
            list.id = "cfg-perf-list";
            dlgConfigPanel.appendChild(list);

            function updateHint() {
                var total = sumPercents(data.items);
                hint.textContent = "当前占比合计：" + total + "%（须为 100%）";
                hint.className = "cfg-panel-hint" + (total === 100 ? " is-ok" : total > 100 ? " is-error" : "");
            }
            function paint() {
                list.innerHTML = "";
                data.items.forEach(function (item, idx) {
                    var row = document.createElement("div");
                    row.className = "cfg-row";
                    var no = document.createElement("span");
                    no.className = "cfg-row-label";
                    no.textContent = String(idx + 1);
                    var labelInput = document.createElement("input");
                    labelInput.type = "text";
                    labelInput.placeholder = "项点文本";
                    labelInput.value = item.label || "";
                    labelInput.oninput = function () {
                        item.label = labelInput.value.trim();
                    };
                    var percentInput = document.createElement("input");
                    percentInput.type = "number";
                    percentInput.min = "0";
                    percentInput.max = "100";
                    percentInput.step = "1";
                    percentInput.value = item.percent != null ? item.percent : "";
                    percentInput.oninput = function () {
                        item.percent = Number(percentInput.value);
                        updateHint();
                    };
                    var suffix = document.createElement("span");
                    suffix.className = "cfg-row-suffix";
                    suffix.textContent = "%";
                    var delBtn = document.createElement("button");
                    delBtn.type = "button";
                    delBtn.className = "btn-icon danger";
                    delBtn.title = "删除";
                    delBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
                    delBtn.onclick = function () {
                        if (data.items.length <= 1) return;
                        data.items.splice(idx, 1);
                        paint();
                        updateHint();
                    };
                    row.appendChild(no);
                    row.appendChild(labelInput);
                    row.appendChild(percentInput);
                    row.appendChild(suffix);
                    row.appendChild(delBtn);
                    list.appendChild(row);
                });
                updateHint();
            }
            addBtn.onclick = function () {
                data.items.push({ label: "", percent: 0 });
                paint();
            };
            paint();
        }
        function renderExcellencePanel(data, type) {
            dlgConfigPanel.innerHTML = "";
            var period = type.indexOf("quarterly") === 0 ? "季度" : "年度";
            var fields = [
                { key: "partyPerfLabel", label: "在" + period + "党群绩效评价为（文本）" },
                { key: "adminPerfLabel", label: "行政绩效为（文本）" },
                { key: "excellenceLabel", label: "创先争优评价为（文本）" }
            ];
            var hint = document.createElement("div");
            hint.className = "cfg-panel-hint";
            hint.textContent = "配置填报时各评价维度对应的提示文本";
            dlgConfigPanel.appendChild(hint);
            fields.forEach(function (f) {
                var wrap = document.createElement("div");
                wrap.className = "cfg-text-field";
                var label = document.createElement("label");
                label.textContent = f.label;
                var input = document.createElement("input");
                input.type = "text";
                input.value = data[f.key] || "";
                input.placeholder = "请输入提示文本";
                input.oninput = function () {
                    data[f.key] = input.value.trim();
                };
                wrap.appendChild(label);
                wrap.appendChild(input);
                dlgConfigPanel.appendChild(wrap);
            });
        }
        function renderGrassrootsPanel(data) {
            dlgConfigPanel.innerHTML = "";
            var head = document.createElement("div");
            head.className = "cfg-panel-head";
            var title = document.createElement("span");
            title.className = "cfg-panel-title";
            title.textContent = "项点名称与分数";
            var addBtn = document.createElement("button");
            addBtn.type = "button";
            addBtn.className = "btn btn-outline";
            addBtn.style.height = "28px";
            addBtn.style.padding = "0 10px";
            addBtn.style.fontSize = "12px";
            addBtn.textContent = "添加项点";
            head.appendChild(title);
            head.appendChild(addBtn);
            dlgConfigPanel.appendChild(head);
            var hint = document.createElement("div");
            hint.className = "cfg-panel-hint";
            hint.textContent = "可添加任意数量项点，每项包含名称与分数";
            dlgConfigPanel.appendChild(hint);
            var list = document.createElement("div");
            list.className = "cfg-list";
            dlgConfigPanel.appendChild(list);

            function paint() {
                list.innerHTML = "";
                data.items.forEach(function (item, idx) {
                    var row = document.createElement("div");
                    row.className = "cfg-row";
                    var no = document.createElement("span");
                    no.className = "cfg-row-label";
                    no.textContent = String(idx + 1);
                    var nameInput = document.createElement("input");
                    nameInput.type = "text";
                    nameInput.placeholder = "项点名称";
                    nameInput.value = item.name || "";
                    nameInput.oninput = function () {
                        item.name = nameInput.value.trim();
                    };
                    var scoreInput = document.createElement("input");
                    scoreInput.type = "number";
                    scoreInput.min = "0";
                    scoreInput.step = "0.5";
                    scoreInput.placeholder = "分数";
                    scoreInput.value = item.score != null ? item.score : "";
                    scoreInput.oninput = function () {
                        item.score = Number(scoreInput.value);
                    };
                    var delBtn = document.createElement("button");
                    delBtn.type = "button";
                    delBtn.className = "btn-icon danger";
                    delBtn.title = "删除";
                    delBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
                    delBtn.onclick = function () {
                        if (data.items.length <= 1) return;
                        data.items.splice(idx, 1);
                        paint();
                    };
                    row.appendChild(no);
                    row.appendChild(nameInput);
                    row.appendChild(scoreInput);
                    row.appendChild(delBtn);
                    list.appendChild(row);
                });
            }
            addBtn.onclick = function () {
                data.items.push({ name: "", score: 0 });
                paint();
            };
            paint();
        }
        function renderConfigPanel() {
            if (!dlgConfigPanel || !dlgType) return;
            var type = dlgType.value;
            configDraft = defaultConfigForType(type);
            if (isPartyPerfType(type)) renderPartyPerfPanel(configDraft);
            else if (isExcellenceType(type)) renderExcellencePanel(configDraft, type);
            else if (isGrassrootsType(type)) renderGrassrootsPanel(configDraft);
            else dlgConfigPanel.innerHTML = "";
        }
        function validateConfig(type, data) {
            if (isPartyPerfType(type)) {
                if (!data.items || !data.items.length) return "请至少配置一个项点";
                for (var i = 0; i < data.items.length; i++) {
                    if (!data.items[i].label) return "第 " + (i + 1) + " 项点文本不能为空";
                    if (data.items[i].percent == null || isNaN(data.items[i].percent) || data.items[i].percent < 0) {
                        return "第 " + (i + 1) + " 项占比无效";
                    }
                }
                if (sumPercents(data.items) !== 100) return "项点占比之和须为 100%，当前为 " + sumPercents(data.items) + "%";
                return "";
            }
            if (isExcellenceType(type)) {
                if (!data.partyPerfLabel) return "请填写党群绩效评价提示文本";
                if (!data.adminPerfLabel) return "请填写行政绩效提示文本";
                if (!data.excellenceLabel) return "请填写创先争优评价提示文本";
                return "";
            }
            if (isGrassrootsType(type)) {
                if (!data.items || !data.items.length) return "请至少配置一个项点";
                for (var j = 0; j < data.items.length; j++) {
                    if (!data.items[j].name) return "第 " + (j + 1) + " 项点名称不能为空";
                    if (data.items[j].score == null || isNaN(data.items[j].score) || data.items[j].score < 0) {
                        return "第 " + (j + 1) + " 项分数无效";
                    }
                }
                return "";
            }
            return "未知配置类型";
        }
        function buildConfigJson(type, data) {
            return JSON.stringify({ type: type, typeName: CONFIG_TYPES[type] || type, config: data });
        }

        function openDialog() {
            if (!dlg) { clog("弹窗元素不存在 #dlg-overlay"); return; }
            if (dlgType) dlgType.selectedIndex = 0;
            renderConfigPanel();
            resetOrgPicker();
            dlg.hidden = false;
            if (dlgType) dlgType.focus();
        }
        function closeDialog() {
            if (dlg) dlg.hidden = true;
        }
        if (dlgType) dlgType.onchange = renderConfigPanel;
        bind("tblnew", async () => {
            var selfBtn = uiEl("tblnew");
            var got = await waitEl("tblnew");
            var addBtn = got.getElement();
            if (!addBtn) {
                setStatus("未找到父页面 #tblnew，父页面新增逻辑未执行");
                clog("wait('tblnew') 在父页面未找到元素");
                return;
            }
            // 本地单独打开 index.html 时 parent === 当前页，#tblnew 就是自己，不能再 click 以免递归
            if (addBtn !== selfBtn) {
                addBtn.click();
                clog("已 click 父页面 #tblnew", addBtn.tagName);
            } else {
                clog("父页面 #tblnew 与当前按钮为同一元素（本地预览），跳过 click");
            }
            openDialog();
            setStatus("已触发父页面新增，请填写配置项");
        });
        bind("dlg-close", closeDialog);
        bind("dlg-cancel", closeDialog);
        // 点遮罩关闭（与 shadcn Dialog 行为一致）
        if (dlg) {
            dlg.addEventListener("click", function (e) {
                if (e.target === dlg) closeDialog();
            });
        }
        bind("dlg-ok", () => {
            var names = selectedOrgNames();
            if (!names.length) {
                setStatus("请选择党组织");
                return;
            }
            var type = dlgType ? dlgType.value : "";
            var typeName = CONFIG_TYPES[type] || type;
            var err = validateConfig(type, configDraft || {});
            if (err) {
                setStatus(err);
                return;
            }
            var cfg = buildConfigJson(type, configDraft);
            var org = names.join("、");
            var no = randNo("CQ");
            TABLE_DEFS.config.rows.unshift({
                no: no,
                statusText: "暂存",
                statusCode: "A",
                org: org,
                typeName: typeName,
                config: cfg
            });
            refreshDataTable("config");
            switchTab("config");
            closeDialog();
            setStatus("已新增「" + org + " / " + typeName + "」 " + no);
        });

        onCqKeydown = function (e) {
            if (e.key === "Escape") {
                if (dlg && !dlg.hidden) { closeDialog(); return; }
                unmount();
            }
        };
        document.addEventListener("keydown", onCqKeydown);
        try {
            syncThemeButton();
            initTableData();
            initTabs();
        } catch (err) {
            clog("初始化失败: " + (err && err.message));
            reportError("init", err, {});
        }
    
        var se = document.createElement("script");
        se.setAttribute("data-cq-dt-bundle", "1");
        se.textContent = bundle;
        (document.body || document.documentElement).appendChild(se);
    }
    function inject() {
        var root = document.documentElement || document.body;
        if (!root) {
            setTimeout(inject, 50);
            return;
        }
        try {
            inflateGzip(b64ToU8(PACK), function (raw) {
                try {
                    var pack = unpack(raw);
                    mountOverlay(pack.css, pack.html, pack.bundle);
                } catch (err2) {
                    try { console.error("[cq-demo] unpack failed", err2); } catch (e2) { }
                }
            });
        } catch (err) {
            try { console.error("[cq-demo] inject failed", err); } catch (e3) { }
        }
    }
    inject();
})();
