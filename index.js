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
    PACK += "H4sIAAAAAAACCuy9aZfkRnIgqPf2m97T5/2KhMh4QKdHFCIiT0SiUlVZ";
    PACK += "lWSRdbEuspidW0IGPCLARDiCDkcelRn9ZjVqNVtXa3WPViOpNZJaM7vT";
    PACK += "Lc3oTV9s7X/ZxyqSn/ov7DN3B+BAAHFUZZFs7RS7MwCHH+bu5uZm5mbm";
    PACK += "v/RLf/j3v/LLmvxnD8KIaWfpO/zz/GgUuKe2dhCE3cNO7tux77GBrTUt";
    PACK += "6/X8hwH2+wMmv/xK7lO9fuB2D/s0jIlna+Fh0B0YTc3SLHMiYy+kOJ/R";
    PACK += "ajRXVsszd106qz7Islilo3AUHmE6o16Za8GqqT906WmWc9Va1axGq9nW";
    PACK += "WuuN1eZGZZHSdjbXm5rVsJptrbneaJcUjnA3JF6uxc21dShjNbXWxlqj";
    PACK += "vb46pVRpoy3eprWmtTZWGxsbJeWHMcM5KMsHg2crbWJ1da28iNvtYsJm";
    PACK += "Vy3ylYNvVcyNhyNG4y7zj7ACyTqMVmtlFean3Srp7EFIvQxZrMZmq1Ve";
    PACK += "v09GMZsjH/VJP8u2bm1U4PXApazezHJuQM5Gs7miNTcbq+vNqiKtrMha";
    PACK += "m/euva61VhvtdmWR9iIDIoqsLILjoshqVmRlZQX6sr6utdYaG5ubJaPk";
    PACK += "en4c2ZrVWGutUjycRGLfwweuOjEbFRMvcy62kpNCkyt65gAVir7gypaV";
    PACK += "zLsi8vkXWxlJ2blRPSkwJyr3QsLqkUsiW4t9/lCPMPV7SItOI4aH9dhH";
    PACK += "Wt0djQJcFylI0+/jfoi1hzd0pN0LD0IWIu1NHBxh5nddpF2hvhsgTb/r";
    PACK += "k/6uS/ra/R0dafotv0vDKOwx7bH7JvZ1pGWtlYM1DEnIwYKHaOR2MdLu";
    PACK += "794KSVi/h/tx4FKk7YQkCgM3Qpp+0z/A1GV+SDTIoyPtFiZBiLS0eEXv";
    PACK += "/afY1poro5OJ7wyfsPpJZGtdN+gaRy41lDKm9jXNapQRcV4sGk4rtlFZ";
    PACK += "7sCNsK0VC5XnDfrVbTQbzVZVGyfBtHKVxVrTy5UU81i9Gwb1oU9sba1R";
    PACK += "SiySLO6JrbVakzl4Iz136Aen+WFxSWSW5RXzOWMAA5/geso1NVaLYB3j";
    PACK += "g0OfyfLDMGQDvp5cwnw38N0Ie0qJ8a/8coGnMxqeSw9N7WwaL/arlgv/";
    PACK += "zcWGVVJQlQ2bQkcqWbHKigus2JS6p7Fj1dUXiffsfeei2bHW+krKTq01";
    PACK += "rHZ7UXassnMFLqy1trkoG1ZJsIubTmXdU3abSrhL+bB1i0/MZlNrtRqt";
    PACK += "5tosPowz7dolrWm9PoMTS3Ouvj6LF6tkS/9/zotNsFozOYmFEKKS1Zo9";
    PACK += "ZK+U1arE+jl4rZmdXQCdy7mtEmTNbRFfQ8qzbR9gADOf5vYYpsXt4yA8";
    PACK += "gc2MtyWArB+ERa5l6NI+bLdWIX3keh4vaVWBNWDDQIHiIPROixBM0TN8";
    PACK += "Kfu0up2KmrKUYlXdMAhp1mCCGObFbf2NkdvHxSEbhZEPTKmtURy4QFo7";
    PACK += "c49pqgvqBbg4z5BU93yKu6L2bhjEQ1LI5AZ+n9R9hoeRrUWMYtYdzIMX";
    PACK += "Lz2hkgVecDrnnCJl1vMf4B9Ip25Q78MvJsxotixrdKKt8b8u01at17V6";
    PACK += "03odidbqQ//E8IlYu0g2LWmWqTVbryONUZdEI5diwkzNyidoa9brJpqE";
    PACK += "YhoyluDMZe1rC+PN07pPPHxia83Kut3RqB4NcBAUKwfkyRfkpMMn6eRY";
    PACK += "C6DiDCzLwyRJZhEiqdpstaxRKaZHA+qTw8XgmmuJSEJKJU6OTrQoDHxP";
    PACK += "zmB+T5iCiFOwSdZhaptFbCqpzqPhqN7zAwY70EEQU6O5NjoxtchlMXUZ";
    PACK += "NpqNZhXJepHypZNTP6Au8SYwMqEUMEcaVFsmNacbE2PhcJEBLYeE+SyY";
    PACK += "oKkFHfk8tAjE6lKqdSwRfs0qolaAGcO0DqoD3u16w2pNiKc5kjXJY80g";
    PACK += "gO2Z/Y/ig4V6L7b/OgtHttaaXEqlY3MSTd0ri1LK7Ekj7tGrpThzrey+";
    PACK += "O7K1SQRN0bjZAgyepDcgzPaC8NjW3JiFlZ0l7hGneQsT7rlJKbCwmHZ+";
    PACK += "pfIMqHow2xvV/bZEz63q1WtrJCS4glBK7a+iBxJJplaH0Z5GIxXa93LL";
    PACK += "CPDY1nwywNRnL8iL5Fb/6sTq56X4dNhagHsTAMc0AohHoV8ySbyjEguy";
    PACK += "AdAazdVI8h38eSZuJcJBEce6IWFcINL1ThX2uQdRGMQMT1C1Xsli4/Ri";
    PACK += "dQKlJLK1J/CkatEWkMQCGsT/b83k3AsCo1k2pL2QDiUaBS7Dj4366qRY";
    PACK += "pg6+gHPOwR7Ayp8QuioBFTKmOQ8mT4ij5kxoGn5Ud7kqZhpEM7mOAi9b";
    PACK += "2oNX34UqPE53wjy5mqwOmhzVA/cAB5VsSdOSHEkJ0Z9341uQJWhYa9M5";
    PACK += "gml7J/yLI6gOB7jLJohufhQodr2QBKf1gU9Y2e5aySLPSxAXAnyGJJdO";
    PACK += "ygbMSatynymyhxV89stvPdULhffU1FasauY8PxMh7dePfHxcj0aBz16O";
    PACK += "0ZlaM39nFOM6DY8ntgC5AXm458YBm10ncw8CXD+m7mg+kOdnBSo2Ab6n";
    PACK += "zJ7gchayF4askvF9IcaJs4Mbs9jBSoGmtDfzSjND1yfzI4rcdV8NQ1zC";
    PACK += "8GZDAKu1VTIOk72pD7DrTe6WLzdFH8QR83un9ZS94ce29QPMjjEu701r";
    PACK += "fnVBSSdKpcuKvSK4APFxdWK3KNDRVhW8l76mXcN4dB/jQ+1NlxIcRdrz";
    PACK += "v/izz779337+8V/Ik0RtWfv8D//2sz/6j5/87I8+/d4Pnn3z29qy9vyv";
    PACK += "/vfnP/zupz/7P57/zcc///ijz/71x59+/OfPf/jdZ9/6yc8//rb2tUsV";
    PACK += "R5elysyMotblblF+iKnk84duH5dSkUzOGviel5vf8TSgSjTmZZlKVegv";
    PACK += "wTj7JMIlHK8UAOr4CBMWlXY01dRZi3ZxCus3W/OJg8AfRVjbtF7X1q3X";
    PACK += "ufJz43WtDXwg7R+4RrO5gbTmSgtpzY01BOc5rUkF5+pGqYKzqrHV1de1";
    PACK += "lVXeWHPjdW19I2ls3ULapoW0ZtuCppplTa0u1pT1utYWTW20Xtc20qZ4";
    PACK += "M034s8rbsjZK2srLDeMXwKUJJJ8EHVa3SzPQWahxRWMyATDsLWsFaa12";
    PACK += "CmlzdJIHtTk6KRuWkrqF0m3hyqsXr6CCm8BYb5YoSoC0sVOwBGu3KnSS";
    PACK += "Qzc6TGhA1URuKAgKcwoT+auWZU2o37X11oS090obmFTVL7JltL7kPaPB";
    PACK += "3IP6yCU4iL5kdVwFWBcIVQnZfWGeqALaaom8amzyFXkucwUX/tKs4LQh";
    PACK += "qVYQXgwDuVEuXCcnhTOVcuUZcjhdnkVyHJMfq4a5Pgxjwn5RB/srNqqs";
    PACK += "zsIwKDm5u2CWn48NJt6cssuc3L7H5KGYsEBa4PRx6J7Uq2dZIBNYiBTO";
    PACK += "ClTtVrs1VRlvza0d4bC/AuXIBZlOvKxWfuqU2b2wG0/sY2HMAMcrtBSA";
    PACK += "Ga4HEobF/wPJdqKvSH4ExWG1lggsfEytPbeSyGP1IWbufIzCS+rijgc+";
    PACK += "w5xp4AMBKp6p63hBRdALkMaJNkdu3yfCOPvL1hgsaGAgV2rZiWpZL3Hd";
    PACK += "J73wlU97edPQQpWKvbXxb4nMzDOYCo1dmz5veDhiE7Zu6gFgKe4ttEYz";
    PACK += "44kVqRHXlvzhKKTMJdOVtyDShP26x75qPHyANTZosEE9CimrUk+Xn4/O";
    PACK += "f+xRbGf2IV01DZfHXdra6rxUXDZa9wmZouv0CeezXlwrPal0XoSkp0B2";
    PACK += "p1DXahgXEJOqNQCN9uo01tOaBTyXraJuvjOoPJ+HixknuIIErOa0JVty";
    PACK += "0DwdNt6eFx5PB4znikcleWwSMkPWZqYvUMp8uWIAU+UYTNMPlHUwHs01";
    PACK += "nJU1KaMwFa4plc0QNPrUnxAPqO/VGR6OwCygLlA4soEYDt0TA1SBPWqW";
    PACK += "8eizV6iorF513EDD43qVXDyfbCK7y3ULIYkulkHiMAD5sLUCEZki0Fdw";
    PACK += "fOVgc4XmlygUTjMdAOJQP2CkQt4rEcymyGzzcECtEg5osaPui+eXpm/F";
    PACK += "F7KLTUxYaa45raJQMtJzGEolEzyv7c4cNjsLGLqk6CWeorh6/53G5ORP";
    PACK += "HBaotGgAOn+twzB8MVgvfU0b+tTVrrpeH2v/77/748QAIXeS2Djgn18F";
    PACK += "w1RYhZubm5tzCDbVlocZYw6HHK/McKhg97tarkfs+SxZQzPpQoWdXBmL";
    PACK += "Mw8ypxMbMxaSwmwy8krmcj6yUbFJTWeRX4JgX5AB6Zzav5WXwt4LMUMt";
    PACK += "Ibgo4dOmk1+gvFwvVz/yI7/kZOMrq58DyD0/Auly0tFh9pF+xl2vTmui";
    PACK += "nhDHsy94NauNv4zInFqPbiwysnU57dParMZpFRntqczSHAzQlC1xTkCr";
    PACK += "B0foyRZDuqTFl5kU2e7qvO1e+poG66xLtAeA7z//+KNPf/pHz//qN5/9";
    PACK += "4Mef/+wPROIl/vdNbtQlnu+Fx1mieLoaeqfiaQcHwc8//t0c9M//5ofP";
    PACK += "Pv7Op3/8j5/+/j89/8tvazv372vPvvPnn3/rO5/86Kef/+2f//zj3/3k";
    PACK += "J98XRkuffeu/PPvtf/zsh3/9+V98p2iG1PgCFNRfmA1qpTPJ/NOt0EJt";
    PACK += "5YVcyOBYK+8CtrqYD9mMCspUduUSF5ymlTM4yiSWnLMJlAjc0xDCB5QM";
    PACK += "5bybdkZcAncEkVaSpyJpcUewb3ILT1sa1izs2VKuysQu7OiTzt1T/eZm";
    PACK += "S4uLgFDtsxQxv3t4WuYdYs3jf1pcc61GWYio5GvJPKasUWOF4qFWHmJq";
    PACK += "hm/OEaYQiihIsgx9zwvwYtzb4q7I867gja/iCi6sQAF2Fr3HrD4UL2GO";
    PACK += "ZnPmCVWUmikS0qEbFGsJqVc/oNg9rMhQkKlWZmE9D2jwhS28Gfz3nMDa";
    PACK += "gRuxenfgB94MuK15a3wJxkNZB9ra3Gcoovlqd2KIhFi91udazL/oqLta";
    PACK += "RpyOXOq7hNVJPMTU79qwCULUM0iILmgjAMV9NxyO3C5DJXPWYF7yeWJD";
    PACK += "nzlSyqSslMX+mj4TM+e9ukMAS1VvyrjKQldK5ktlTlpTe5JHP7eSH5To";
    PACK += "w5GkDvgyBYUqMxXHiIWjmcuw0e315/R4KFdylYQEgQh75vzU+cUtHTJJ";
    PACK += "5kqAKfv5xx89+85//+RHv/3Z9/7w2cc/5i4Nv7uqffq9P3z2B7///H98";
    PACK += "9Ozv/nlCuHChYF0E3q1ignr+CfbKeKDmpBpKBo5oTWp5UgZpvcJqcOgT";
    PACK += "o73ZApNsLk40LevoGMQI2KvNL8h4c4ayY1wculnKkjKebm6P+PlP9kT4";
    PACK += "id6LHtZNfioEMXEpm9vUsyAa5qTCCz4Mgjh+U7UghUB/5nRvt7U59d1l";
    PACK += "clSqvJt0TRAKu+ZUhd00XgKVVckhBmWqcG8Alwb+v0ZzpQicS/yhK515";
    PACK += "+HL3idZoRRp2IwwKmKn4fVmLjvoV4mvJgKUkbm10slAsDjlt3ZhCn3fg";
    PACK += "bRpc5Y4HfHUIpLe11mIizpRYJBW+CM3czjcJIhz9U39UZuY3FdCL8jwu";
    PACK += "hSiJaDjpCqY0quQzp6ojqxFarUJrbaTO9nJpm3PDOXswF4NlPYNlYmyn";
    PACK += "QgXWHAF2j3wysR4mVlgYM63RWpVrzCdaL6THLvWi8gZ+7RCf9qg7xFG2";
    PACK += "QotMCQ2H2pniZNQpjQFhbMD+Wd8A1Zvagtiz1QqauQr4PqcWmAZdOGky";
    PACK += "XgSvOaP16eCvFcGvYHuucWPAogZXpF66c4Rp4J5e2hEKtkuJNhcIx6Vr";
    PACK += "GTpd2g1DhumlnSCM8OJa3AJDJe0TQ9H4YkxVhU9lyjmtWp1XaldSfsKs";
    PACK += "7Lr5rcZqrFYtmPwo7AmP1v0FjtiLNUkYqzaikvA/mRACjGWzvWbNx1km";
    PACK += "tBRKrW3kCw1eGTu6CNN04WzQhXIvTWse9oUHTYOhnMCpyeix83lGJ5jy";
    PACK += "kp74wkqthOFd3LZ+WnQF4NdF4LjFXPaLvV3A/zLov7z7ZXOW92V7xjIG";
    PACK += "GlvlbrRSyU22FgvNtXiMrVlc1lfGaOwFjDiqpuELNBIrtl8WTPfV2u/T";
    PACK += "8HjxYLBCbl6bZrBStoZLOtzz8aTK+lWE9KtsmweLUtWAXtDnWrnSKFKv";
    PACK += "wkOnHC7h9oCqPkO7LsVuubr/F85ZR8GcjRdWNsxwhZ0x1FUeUe05kbhq";
    PACK += "RtQYV4tFx6JYdlrqb2dAwbn1RdbSS9hPTyqJ0mivi3jNLRwCKu10d3BY";
    PACK += "xfNWb5clnySFnuXxMX2vGxfIB/hjdcPgKxLKaa0afwNAGzqsBhZY3PbG";
    PACK += "pC9kYhlf8umC4k+1St0NKjyF8j2C5QihAI+/fFe4DF97/QsPZnHBKv4v";
    PACK += "PNjerL0jF7Jxgei7k4POhZ8v26V448UEmqwTC8g0C5shz2cjWTayZXEm";
    PACK += "Lzp+9Gw7jgrIQDeJKQ3pi6h1p1cbHi6sb03NZNet10tUBNPaDvyIvRo+";
    PACK += "uXp7gHZLqOgFxFec3SbnV/fY6Qg7OmCPvo9m5CLx8ABTfb+Sj/s3E0Dj";
    PACK += "i2aWq+fkpTic8QtOqKxqvSJu/bz2MCXNV8h80zjYREez8eqD6BdNGrlJ";
    PACK += "wYwORXGv559cQBzglwv+n4OL1/elCP6F1heQ8C9272qvzgdgaRCi/0nP";
    PACK += "XpaegX9FWTyA6rU8JTrKHPLtV4il/sVU7r7QPQkT0/1l6HWTthueS/q4";
    PACK += "wqp2UV4U1AsXEFR8FsX9gh1fJs6wFsHt4vDwcOjAr1eucWtaOIPW2tQI";
    PACK += "b6trr0DtMZcwmPTt5Wd+qsdRSpGr99JpQecvQEJoVamcXtQ16GLPxV7t";
    PACK += "nTMzHFdecKmlk7oKF91NGppNpfYzrMBmBiIqxRtBDlHF1/muNrl4mj0f";
    PACK += "DFP0KZXL5DIoicgUZ43posbiY8zCfr/SyW4xK8X5rtd79bzAC4kdhQHh";
    PACK += "WqGyYG7cPd0PuCXWVJuK4giX2IKqTEtq0jWNTykBMhxhUlm3MBGjIQP7";
    PACK += "sE3Lw/2Z3edIRzGpOKOqi1ufphzbpjWVXbzxwjcwvpDWSJu4P8Za6FKO";
    PACK += "cjbmhQ54X5SFnhHfLjfq4jCQVhp6LbZgE7jgoFvU/CVY0C0kjCwi5chp";
    PACK += "l9i8EPtafr/n9LNIZXrKdzT5kYc9o26/X2Ip+wVsadw3uown/mLPJcvh";
    PACK += "+rcSzC2lSGDI9oInPly+41QBe6XhgS8upOSLe3a80D4M4nDgk8Mqq5WL";
    PACK += "Yc4rzu8vgjOfTs+rLk+f6H+5HoC36eFuSKXNfEw8TGGGpyAKRPSlXxSC";
    PACK += "lDc+3X7mf0YUnkH6vpJ3rZW7AA8OK91/K+1xSgJbTY2ZXBwk4g5xWXDG";
    PACK += "L51mvAAtmCHcV3X9gshFEtyvEQ1fWvUt6/2lX1ofbnn+kdYN3ChydCAI";
    PACK += "+uUsm/otvWZezcAzuRA+JckmL8srZirWlruDvCwzLwDydrEEN6PQLz/7";
    PACK += "5l98+q9/9+lP//PzP/nokx/9/rOP/s9n3/zok598+5OP//yzH/zmJz/9";
    PACK += "4dYlKL1IzVF8wOt99r0//vSnv/npT7/1+b//R9HAZ//6R8++9ZNPv//d";
    PACK += "T//gtyrr3brk+Udl6XBRdqEp4h7pGg0DOIp1D8A6QNfg4FMcYTr6Jz/6";
    PACK += "6bMffPzZR/+lcmgORAQ/WW96TXWq8NA13+OV1z+MXcowDU51TZzMiqJK";
    PACK += "+3p5G3yfAaASbsbRGY2xhBSEAxoGHGvAsEJpJrmcxdGzxMvP/ut/evaT";
    PACK += "fxBzw/2a/nLrkoBksS5mHXMJid3gAnrVc4OoqltJI1mfZMrlZz/+lwvu";
    PACK += "UDckPb//ijuUNJJ1SKZc/vybv/fpz77/+Xd/nCD69N6oS6hwe69+WXv+";
    PACK += "H//++U/+4Pmf/NPz3/u+Nn0tzhoWD3sxF0de8cgo7WSDkyVefv7t//Ts";
    PACK += "o9/6/Ls/fvadf/rsX/7hZWd75FJ2eqGrc1rneGvvlK3Rwhe5UFX6+rI9";
    PACK += "DemrRmreQtYleOU7BCfjz//67z/7wd9O6cTWJeIezblhgeZsTqKcbNhy";
    PACK += "IAZYsAPFoVDp/rOPvvX89/5WRM97/o/fffbxd3SNb3ilny5Xj90WqB1V";
    PACK += "OKKY6IJPcPTmqi4ZA/EMNwdfDU8cnYfnXNFaK7rW84PA0YE708GNJDzE";
    PACK += "jq56sU+ZN/gnitRlg62kDhCfcNcdOTrn73LJH4Q+SdP5oAgdrtx1Lk9v";
    PACK += "cKvr026Ate6JozdbutY9Fb/U0Vd07dKs0iOXDTTP0W81W1rrqLVoCWuh";
    PACK += "IsOVxmZb43+ajZUm/7NI8eZ6Y21Nk39foIJbLa3ZGizUyZa1aJHhWqO9";
    PACK += "IoCsv1gvNxvWOh+lectvXYqO+ossCgiQ/W97VahY2nbXtDXp+Lop/7O0";
    PACK += "ptasb9Y333/xoV1se8hTRe6yN5MqfvO/f/5n/zWjhPxVM65HXXMmDbzI";
    PACK += "yZ2Yv7lm+4uY3A0Npra5sdD6hBJACV7JzJdJQ1uXuKh4WY16UNxn4cbu";
    PACK += "UuFROkAr2aRPdOVuPGjmcgvBkWOd8l4qlwyapT0S7U2AX+xCdiHrhKgc";
    PACK += "Cb36RM6i3DYhUqX8Ev+iLo8AewenRUlvBjMj1fWVIzeZNbm3ZOp6yy90";
    PACK += "UPooAaolF3SgdKtO8HFh3V9+/qf/9Oxv/2oGSZnSmoy8XNYa9nxWbO6T";
    PACK += "/+f7z//4x6+kOQ8XZdPLzz76m8//w9+9ktZAsVqPuiHFxUY/+/53P/3+";
    PACK += "nwlO/tm//tmzj37r1QGAjyYE8lz7C0jLLwPFSRfWBelWjIWqLHqFsOAT";
    PACK += "uPltAgd+8PGzb/1k1p5ZoUuqWp384FPAkN2oqZCDSt1UVbrSRvGq3bSZ";
    PACK += "GfVvXZLUbpLeV5FBlfglipe5KF+SWWyfX2nqJ0D9QkifbOoLoXuyrS+C";
    PACK += "6MmmviSKp7b+JZG7HAhfJq1LEOxLJnSJRvaVULlplb8kiUtUsXORuCTz";
    PACK += "V5/EfRGkTYzGF0PaZFtfBGlLuvUlL6jkROCVLKhplb/kglI0+HOtKSX/";
    PACK += "V29ZTSBHCu2Xjh/KocgrQZEZ9b8klhSPQuZClYnTml8AhMl39EvHmuJB";
    PACK += "0ytBnXkaeUn84YdNcyENzzkXomROYfAE2knxKtotpM0xETkvqkIlWfo0";
    PACK += "HCuprKSe6llcBG3yBq4LgaWan85UmL7Yclt02YW0/wjG5yXWW+VB+4Rx";
    PACK += "aWFOeNLlZz/7o2ff/r3Pfvs3Pv2NH3/yo9/59CffEyehU8/h55m0hde8";
    PACK += "HIvpaDJPq9MWP18zMo6Wl4EwV9uLECGVbsyXP5+mvifP8k01tErvLpBH";
    PACK += "JB/W1SRBaPwj7OijMPCZsgQn68oHrJUjEygJE8SppLR0A0honkiVgAxD";
    PACK += "zw1ydkEqDYSmpJq9WuOfC3BarvpvFfIqqnylCSFkpFYsW5cGrbLa8qtY";
    PACK += "DR2Z1ShfFzySqrZj+/IOol7lIdTCB1ALHT5VHTxVkM7SBTiJZhCjc9bx";
    PACK += "iBIEbi7TxFzMScXwZLrZU9nun1HzqTv9nLv9XBv97M1+9j6f1iNichSh";
    PACK += "4jYzECtepPmkG8Qehn2sN9e+KwJpyFq7g8MMtFxVcrl2B7h7eBCezD4L";
    PACK += "hX/Pfvebz/7g/3r+l//3pz/53qx9kffugvYwxbEo606aIMnK89/5U7hA";
    PACK += "85/+/fM/+Zdn3//Zs5/8w8yZVEmNpZCalQKpacKtxAmpyROXhQ+ii/Y3";
    PACK += "bWF+0+bWN8355kEtv/6S5WX76y/Z/vpLtt9sviQA81cw0/JlQcycjxl/";
    PACK += "aYb8ApjyBRlzcYnCRbHmc7Dnc9bCSdEP/9vn/+7bssJ0H0hq63Ix97I1";
    PACK += "Fw8/fXS4E1NGdboBdumExvZH3/z0Py88FvPCNs9msqicIaZ2zo1qQRln";
    PACK += "foljXiguSiYp412SoLDzKArUIMhT2Q2xtfNNnPPcpyOcmIx/+s8/ffZX";
    PACK += "vzPH/ihdzVK+ndcxYxZCcTnOkRvEWHEoeMIVPU9GmPbKTJbFydtn3/vN";
    PACK += "Zx/9h61Loo4XbUk5YktamvA2uZiW+tSNIhqGLEpb+uufPPvn30g5ysmG";
    PACK += "wVz/N378Yg2Lo638SHKnhosdSdlMbhhFMxc6jLKZ3BiKZi5sDEEBABj8";
    PACK += "kuquXODxfMzj2Uvw8rNv/vCTn/2RWHlzrDml3TQKqiLoigMnkXqBipK5";
    PACK += "ZDER81yfLaSX7ugcfJd0S47lvvOnz//HNK+FeQ4yuRB4WKz60+9+/9n3";
    PACK += "/2JOEXRS3/NL/8v/+i+GYTqXz45cqt3uOXcOPsBd1uhS7DLcgcSncZLo";
    PACK += "4Z5P8F0ajjBlp/zjzbREH7M7xyT5mNz7FFKe7VFFtttw2xXPcU3NcZeG";
    PACK += "LIR+3umh19IPoyS1MXAjpRJe/gZzDIyY6VyG3hjs/BwbBnPOBGMV2Wfj";
    PACK += "sdmQL4iZiCUvJi/+oMeLI4IoDIbfM1itBm2FPY05jh5yEPTzcyWtFxNx";
    PACK += "JmT2QmoEmGmBFva0Rz2DmebSa71G1w0CA6PArNWCJcchtdrTGN7RWR8z";
    PACK += "G+Bke8E+wjy0KOzl9pJBnZs9g6HANM/PaSP7NDY7FLOYEg2POcSnVEIM";
    PACK += "3SUOXnJIHATbt3vGtZ6BTdM+G6MHPRiIJQz/bzx5gqNboRcHePtpbBCk";
    PACK += "J9iFzjjBsnEOEmts2gRhU4zPw9i5wYynzuUzPY4waGv8LtP5p3vEuX86";
    PACK += "PAiDBgyDTrHbZQ0c4CGo6Ex0p1fyGUbeDXQTvVn2tUfdvix9pey7aP3J";
    PACK += "MPSwbqIPShugYc8PMNVNdLXi+5Hv8e8Py75zFeMJQPBGKYTimrknFPd0";
    PACK += "E71bCmQcjTCJAMJ3yr4P8TDUTfR22bfAfXqqm+h2nHzzGaYuLKYE57T3";
    PACK += "YJLPEpRwHD77KXripRRlt+GDbWDndlyr4b3b8f75Od7Tf+3Xkjr1fZSU";
    PACK += "UpF6G9tQ0hzz1Rk7Z350CzhN7NlJHiMBYKk5Rph8GOMY74a0ix+OPJdh";
    PACK += "NV/6/R4eBW4X32dVGe5jNvlxjF5LqZAbRX6foAexczbOxuMdJlfDGRv4";
    PACK += "EczvKHIw4i9yMh0mXinuRc6DWLzEHFTqkPPza/H4HZXK+NE9mI2dcDgK";
    PACK += "CSYM2stliCSoTgoqUCBOPCamIaUmkJYOcq0m163JBhDR6zrEFjf0pGKj";
    PACK += "0WiYEHH4EO4EJJqoC4hMBJ81Hpv4IMAR3PoneqKFVHO1dFiOB353oIlZ";
    PACK += "ml5FQzc76og0CvNhwEcEY5yCp5uFAellk6+MiZySQr0KoiRV60p5qDvt";
    PACK += "xZ0YkOBOnDXlqO0qqyK4CCwAjP8wcN4LlPYIPtbuxJ0PA6hHhNQMqfNe";
    PACK += "0HktNj4MkAqOCbn86G5McQGBliyxacbOFUrd04Yf8V/0Zjxrj0OPA+dM";
    PACK += "asX4uhyjK7FzdohP7SULUdyDnydPQO0on8KYdjkZz0bngzgZHYCCosA5";
    PACK += "G6OQ4x/y+U8HcFdiJNAjqvlEYzBWS45zFPqeZtVqhu/wJNhED/Gp+iV0";
    PACK += "dH2Zp5qImW/GYgtkiJq12tKVuNApA5KNYI/uO2yP7oudJnZc2o+B/EeN";
    PACK += "AJM+G9RbAFbsOE7TDBpJzDGHdHAQYc3vGc2t2DwDcKF8JMbWiE3kOlbH";
    PACK += "3Yo77vKyGe25+1nNe+5ya7+jVBaN/Z6BazXckLsiwBhlYxA7+S8oNjnc";
    PACK += "St/5e8z7Idbb2WuviTVv3yOcxNoYwYSFfL58xLHTDtCT8Jhgaj8OGnKC";
    PACK += "x+N0yj7sCZpSWWMDfni1jFeLYWZk1VgsgKQB3BAPSvXvB8ououwCKdHC";
    PACK += "S2JngZFJGncc5x7J6njMdyIYeuac6Y5u646lI92Gh5Y+loOhv6YvA2yc";
    PACK += "+huX9hx7/1IfpUSCZFDskf2x2HUexc6lr19avtTPUPjtQB2PmSBz9OR8";
    PACK += "0eOeoQMEgJo2a7DwPqM+6RvtNTPryjFNmEAUiC6FTtJExwgdx9EhKAZw";
    PACK += "wZ5+fs4TDsIwwC7RAZWxWDkcj31nqQl4m+zNpg/Ln6NsdOyz7sAIzbOu";
    PACK += "G2E94pDoNn+RUeptnvuAYveww9Nl92xZNpsNUYl2j/Dy2p0eLzoGfPZN";
    PACK += "OUy+g1HgBIZvIuxQgFrf1hv68tuB4SPLtCm6GRuBuW0QR9eR3JJqNWAr";
    PACK += "0yl7FCP9tdol3VzWL+kmOqZGwIdK17NZdNOJccemaQdpRe8HRsDXuvNh";
    PACK += "zwgQWTaWApiK83O/VvPhyXEcnrKt6zbMFH8xK1pfxiYQn1EcDYzANBEf";
    PACK += "aN+xEFV6Z9Nl3dahZ9g0E+oQO1Yn3sKSsnTi5WXzLHTwXrzfEcSDwqCE";
    PACK += "KDY7/rJzTI2QdzJCgTlOyE3kcOYr4ZqiCVEAO5Hk/U0EDS4ZoYMbBJ8w";
    PACK += "wzQbHgSYMUMnbHC2G2VtLi+bqNhqSuQ4skkskNwCcyQSYxNJzkFsI5Hm";
    PACK += "UqyRkIEqwvc0N9Jcje9FmogTavRENBt92WBQ755kC0TxfX1btqQd+2yg";
    PACK += "HeLTSDvTl+UeBa8GNhtwTmvoSINJGes2M5d1s6Hd6GmnYawNsUsYsCUU";
    PACK += "QxgZzYX4OIE0Zgp7WkJ5EUQtBMbEBaoNV/My7HrAjCS4my3P+zTZv8S6";
    PACK += "4ssqYYH5/FFnbx8FjpUU5guaAo6qaBpm9EPME0EhCpaXzbGJqEIcOWGD";
    PACK += "phpPgFmKI8dx6s2E1uHGE4qjOGAd5jAD8JENMDFUkpYraZ2fFyoCipGm";
    PACK += "NFFaoUPMMXrRelr5ekyUz5zLayl5mTkudLWZjm2SKdkCOwL/0nROrWNc";
    PACK += "5FB2qHOmhC0ViW/1nDPBFom81/xo5LLuAFM7xkj9chWSd7g+yN6huU93";
    PACK += "5I6pMDdXgUfMcdFul3EGWvMjvhaieARyJ4aLELQRDaVJp3YQ+4EXAVLy";
    PACK += "Jhq6OX7a2Ek4g7OhO7LvU9QL6XW3O7BVXh9QkSOlIquwhjsaBaeCp00Z";
    PACK += "DnOMYFL5mYmtssYCl1KEnahteXlsIjZGLORsTa5saRllcxyb5+d7+2MU";
    PACK += "kiBf0O8ZS3zrz4sdovtJzxtQTMMnI37cI5ZyF0PoYleLfAJhagVJkbK+";
    PACK += "WNLKysXjcedpI+N+32Gdp41dKds7b/Y6Txt3pZjufMDfYoqz7O8FnaeN";
    PACK += "+1zUvxV62LkCWe5Lqdp5F96ePLl/fefe9QdPbtx+cP3e7Ss37z+5dufJ";
    PACK += "7TsPnjy8f/3JnXtPHt95+OTdGzdvPrl6/cnujXvXrzlvQTm3y5yrcedp";
    PACK += "oxuEBF8X8DvFmVWITMkwqUWlnPZggLVkxrVhHDHtAKeEV44S0g5ixink";
    PACK += "yI0i7Gn6Ml7WYdQE/XotNkAWFpybiQKHsywodARj5zsJF6ey6lzkLHLp";
    PACK += "oeDSke9knGUJyx4oLLvgJoFx4iJIjhUWu2fJlw5seREXFBSOPyrn+CHZ";
    PACK += "oHsRcPyRyj7HKUzb8V60b8NnwQVGFQKBJFHlAkFknkkhy4jMTrL7C4Eg";
    PACK += "4gJBXCIQKJXF4zlY7oCz3KFkt2nCaPsc8YUKdUdKnSXrFjtZ5Q976Imc";
    PACK += "o0dSGZd7b0ECG1DsejuchljorlRhcbqKdkISgfJOvD2REyTqEkn9IDxw";
    PACK += "A9C4SkqMG0kVCiBXARABs40hT1Kxg7NOJSvmgzhN2nVBID51JmnbB3Hj";
    PACK += "wCeewaHAKXVgfBhBOM/qvYd7zoRyKb+pQGapfcvlxpMy0hs9JJgPW1Ai";
    PACK += "P3oE3FAC/PtAX0DTNrWSt3voycg9DULXs8/k3mjXm0jufDBGT3ziM/v9";
    PACK += "Hm8E1HoFfVCxynd6iTTYDYcQStBm6UIQ2jrGq+K3oz9I98+Sod2hjWx/";
    PACK += "7eTeQFnF6OkZNsxxzyduEJye5TOIRmIS8WPkJylNjCO84wYBBD0s7YgW";
    PACK += "44ScqHl5lrEsX430hcIio4GTktfwQdznWKsiQvqxhynFXuF7VeW57FkT";
    PACK += "13s93GXzdE3kVDt2w5vEz0KhG56R5h6OQMXqH+E3XeIFeGKHKa+gUEpm";
    PACK += "TuokEVzfG5L5u1Eoovbnpnsaxmz+qtT8aj23qrC+UB7yqeXugV8NpvMN";
    PACK += "jMycH49yIjBRspfNf1FlW1FGKD2zUqeke/2EYUrc4D4L6ZyTOVEsD33Z";
    PACK += "6q6oKcsq8OsI0wjK6c2NRrvR1MeCg3hC4aDGeH+E3ojN4nHNG3Fy6uU8";
    PACK += "jA1TFsERFLlWzJxy1kxMGac5oBGQsjMW8jczO9iGDbZjbZGOVC06pN68";
    PACK += "fPlyE/iXPboP27W1dY+rDEwTc4Ufwntk3wkQcajYt7myA5jGtOGbWN0t";
    PACK += "ZbsgAQkqifes/SzzdZpKa1nGRILhuk0ptu1Z+wi6MQpHhgmQkSXHYeYZ";
    PACK += "fAAewk64BepYnP8S1aHQCaBLHboVym76TutrBl1umvUmih285++jyPGX";
    PACK += "m8h18F4ken35HjViREwz2gpqNf7qotjcNvgouAgyOgRRJzJtkRYjqImn";
    PACK += "+Zn4rxYncgzV0oUxTEWAdHzu0fwsRiFlN4iHT+ose042ZxgSa5vYuAEx";
    PACK += "0Ru+N5bKDjDKCOkQTrmdybMN5WuDhMe54yTj3dhRvqNr2dYDWSfR/90Y";
    PACK += "6gAstY23AueayzB6J3beCkTy7AqSnPV3Yonp78borQC9E6OrGBQFMYO/";
    PACK += "Bz2niU6E6g4x7LTRCXWWmugpg7/XCfz9ME70gBFmD/whDuPcCfB2liy4";
    PACK += "rcdpAW7MVlZE/SAKva22cmM4xJ7vMjgvypSO2+oXXqojixD3yO/DeV4u";
    PACK += "f62Wpjei7gB7ceCTvsL/l31u+NENsHC+i4m3cG7J7JVkNDOSQkJYrMlC";
    PACK += "Y85NbECkbiZVtx0p0XQTPkSKYdcpz5asCSZZJH+ItxwsvyIFnR1+yu+L";
    PACK += "gMaQDbHQuArLQFkunaR5hfLQUBITMf0cXLT0lJl+z7iJjavYlJCagCUW";
    PACK += "CkMjCEWlZ6U9qtX80KAhUkCuY7XFQBLZBOtqNdn249g4ISY6IaDp4agp";
    PACK += "DpGIwzDn8GAUSWgwE5BYANc5yZTgxpJxggvDcJmZ5+e4Vls6iA3TTIn2";
    PACK += "CU5HvJMdYtKcfvNMyZQumROQV/2Q+uz0Jj7CgtQGDp1secuBQXHya9dI";
    PACK += "dalBboWoTQX2CWjSRf9qtesUfhHvt1DMipROOgagzUqHwRS6fKmAl8Rb";
    PACK += "TpFfmCJfmSJmotBZaibkNExZaYVeEEEvxlxYvctJxyEVX/mkofdjZxW9";
    PACK += "FTv1ZrYAYOCTw3OjOBr1t+Kt92PlXOIgMDg2HtKkP7wLeGIcO2/FDpYb";
    PACK += "3ZLF0YM5h9RYshDO5AC2fUgM0zZywJpjMY48kfflkCS05e04Ny+HOW7l";
    PACK += "7dg4CMyxLfPewlHk9vHOwCUEB3niZeCQH6Tm86D3YgeH3CakheRDsxGS";
    PACK += "ocjlHAQo3+J7cWMURkzWYgjoTTuf6UMAC1mmsJbBIXovzoY/5Ov7kDoY";
    PACK += "3aXn53wkLASjooy6L5fkCXE+jA2lajwxY+YYeFol9YYX4LtySTirHfVL";
    PACK += "Qr3Tz031883wOP2won64DRtnkH5rq9+EGs0nfUE9lS8PI0yvBmH30Cf9";
    PACK += "tGxLzSEs1kokPvOssNLHuWIhYT6J8fUT3I2LDOxTdn5+AuOqUkczV54f";
    PACK += "9e9Sd4jvFdlx6zI+P2+2VrfwNpy1hwFuYKF5yxdK7CK0UQiM8RHW4O74";
    PACK += "A8yOMSaapbnE05qtVQQ2wl24I6cHJTXqMhxpA78/wFRjA5dAJq03iib0";
    PACK += "xLppvx871hbevuWyQaMXhCE1mrh9CZv2aq43fZxopu+qdLCEKWG4WHDX";
    PACK += "pxFLxv82aDonS0mSppYkRQFbngwyLE8Em+JAsCV+2ragCm15qCgVRDZz";
    PACK += "GB5n+wl2GKcaCdOtaA+A1I1zIIxcEJLLECCXjeIPYxyxu66vKlmLmWLy";
    PACK += "rs8GKY7mhcnk1LOia/xnRfys2vkOYqed6x9W+8em9k+yLuXqkNSMYpII";
    PACK += "JzMhGTOVUSaSgMNRK2l4OHBPEXGUnPL8t1aztsg2XSY2NW3iUJR1Xeyt";
    PACK += "9aZyOqy17MBpraoHxtqqHThNa729vtLcaLXVLyvwBa8UECFwVnE72egC";
    PACK += "hywHCDtnvmcf9JaXUUIIbIZyO72NUbpbgrlgbrO3A5SyYna9OUbkMt02";
    PACK += "FNHDIcCQxQxhEwkUd9Kze7HZx8zknNC2keODbOCNLCQ2bFKnpgnSk1Jx";
    PACK += "IDk9bKJyYmSi/EKMBmEceI/B7tk5iNUvcJ9KKXkUC4rhRGhSULt6QVWc";
    PACK += "DuWRcCzlFcIlc+NghFg0IcyzKBXmcZQK83EPitzDZZaa2HOeUMNEO9gh";
    PACK += "kaGw48d5blwfMDaK7EuXuDXiBxFcHnLJC7vRJU6H+SUhHqaNARsG2z7h";
    PACK += "JmSEOfoyRsRpdshWUWHfIcvLJlt29JpL+9HePmQlUMfDezfSAx8jU8aT";
    PACK += "1IZGv+UTv+djLzlFAQC0X+WHJh1+vyLT9GW2zL05NTbAWi8OAk2yDmAM";
    PACK += "B4MA6QTCKyeVefhIw+TIp8BlEMYL84K8/ohvHXDhCoyOG2gDHIx6caAd";
    PACK += "u5T4pB81dE5SXJdzM/cxQ++RnDXiG0I7djYS9AvB77K+445YTLEOvEKa";
    PACK += "VWbhw/8e2cNcNeJYHbzFUk3L8rLpug3X8wy2h+WxyAF2lhISc+wTj4vb";
    PACK += "qnVK7lvDC7t8cOfKVFDzq0VMdCOcaazGPOfS/7ZnX6m//8StP/16bFk7";
    PACK += "Vh1+rq3xvxv8ZZe/7PKX1u7u12Orvc6ztdev8b+79a/HzV340rKsnTr/";
    PACK += "uQZ/ebZWcwO+7Fj8Zff67tfjtmU161+Pr61Dmd1N/mX32g68XNvlL7u7";
    PACK += "1/a/qoB9vd6w6pvQ9NV1aMYSba7xZtq7vJkVa/9rr11CNALTvSDKIR3x";
    PACK += "FHXZjVCcxAURwub2kmUnCVQkNG24aAlHoHvfDiLAuyXLNqh8QktNBUep";
    PACK += "lxrHn0mFmaDSRBziZJq2pWZh92PSyCmVHoSZU8TtmnVblrKEkVNiSyWT";
    PACK += "NQpwplvmEmnADYUjFl0V+SIwa8YNFt4MjzHdcSNsmI0o8LvYsNCqCYZM";
    PACK += "0lNOmoXp3JNYN9NNLzVfVgTxfF9Z0bS6uIKUsTHT3vg9g2YjogyZKUdH";
    PACK += "DJzc09sJHCzZoBP2xHHAikzu54lBTHTbvQ1qV568Vkw+P29eZuO0Y2m/";
    PACK += "ujizbUMh8qWJbGFEHWiydX4OP23xsyJMZF3GqH8QMwwniA4tSeRXCcPO";
    PACK += "C1/g+PthlDqLwE6fWOQmjh+JYS5HIWmVG7nEZ/5T/PDeTSdMDHWH4RG+";
    PACK += "DvfrCnMnx+cEEGPAfj29g9ZzSR/TMI6C0/uY3SAE0zcf3LqpqUehycsO";
    PACK += "uORzQ5AkFzD9FEfRjogtct3z+e7/rqD46ec3Tz3B36Qf2GmA9QaPjmDo";
    PACK += "mm42pKGIkZOkMCwr2Cz4NMDyQhhxHcFSk681s7O3p4vJ2Bm4NMJMR/K9";
    PACK += "3pUJ+2hP5x5CMHo6Es88FXbi3ZDq3IRaprDR9Q9j/0hH/LmO+cv+fil8";
    PACK += "mWq8g/EeS0FlqMlB3WvuF6HVu/mR0pHOLyOVz9EIBwEfZh3p3NBN359n";
    PACK += "aFq8vfyanmgaLuG8h+EEBJrC8nzlHhZGz9E96CvFHh+ObhxJkGACMT3C";
    PACK += "V4LRwF0EmkL7uhsE4fFuHAT3uxRETTc6JV1+M+guNMef7gbuqZbcCpOg";
    PACK += "HfxiCtcpAkhe8nDX7wJfcIPIhyT9Hh6GDENNwHsCkzK8HfIzbJB+RUAE";
    PACK += "LQjDkUZC4dmjkew7v+wZrm2MbvBbGzUwHrgDNj1Ujo9GxRh6WtQNR/CD";
    PACK += "3WGAo0iD63LuQ9qimN2eZ/q6YvXpSB/GAfNHfHb4nZ+AONK/fL4JaiNQ";
    PACK += "bU22kHBauhceEzi8n6+6ldKFqXfDINKRTsNj+IGQGBzDXTJfrWvltdLw";
    PACK += "+D7UgXQuQs1X1+rsAebHgL5zae/rdXvf2HPrT/dN1Yb6nq8eq+019xss";
    PACK += "fDgaJbWNdXkPsAjVIW72BD6wfuBGmGOSS90Dv8vdurUksR4N/B7Tuu4o";
    PACK += "KdgN/FGdB9jhTxTwk1+SWOcXHI7CwBU702Sa9KKP5DfpzSXfhFEHEF8v";
    PACK += "HPrEVSHDhPvEZzc28oAi9XDkdn12Kl44IKDMgRgGAXD+/DnNA9dy9tyh";
    PACK += "H5xmV3RmT3XXg+uoZQKjmHUHyctpIDNKkUi8HIvh6AenowG/g1E+htTH";
    PACK += "hIn+DkLqPw0Jc4OSj0dwfN8FOQRy1V3vqH4in0Pq931SP9H8odvHytAE";
    PACK += "mEEYAtiT+SuAAFeyix4PXXqIaR0TL3kc+ukjx0aNR+SCeRXaNVCaJils";
    PACK += "4HcPCdCJEeh06vzmTG3kErg6pZlcYFnHRyDMaSlMfIoJ06KBO1JBjVg4";
    PACK += "knDxx2QiQHQ9xGB6F/cHGRj55AwWGUHKc6OBsCVWEsJeL8KsEHuqGHMq";
    PACK += "eR+CZ1zgD/20gAJRGuVKXrxJugMQPPN3Z4r3rIfpTZpZL7KkrAcx8UEo";
    PACK += "rh/4np++UGBr4I1F9RGM6lA7qruwhR1g5ne1o/rAJfwK8KO67+GwT93R";
    PACK += "gKcPXbjiyxWoc4TBPquOuemGBhjF8ehUPKZopL6dasch9VIUOqY+xyBw";
    PACK += "u9ROhgGJ7BN++fKJXPAz94rEbjox6n/io3twxF3GcRT3XN6U7XZZDHub";
    PACK += "fKNdiAAn35THaBAey0ceuCh5Pp1jQ1sISM5a2ZcuHR8fN47bXE/S3Nzc";
    PACK += "vMTb01VifzIMbKBSOuKPgUv68pGzzfr+KwHmvVs3AaCNSyThz3NAMfeA";
    PACK += "q8uAl6RhFN3hEz/fRtScvRFh3OAD8SbFvaSgnqboogo5swOeMms8uVza";
    PACK += "2dMj2oXMoowIziN43+EV8fKyXbDQkgVdSDfNQz8TC4UGFhfVHgYzt/nM";
    PACK += "iHN5I0gE14CLOGBSYdPz8yWjlap2zPNztmftg2gaghmFfL4Dmpm9Jn8m";
    PACK += "PF083+ZeRoFnACAB96oDPTLIlYienwdSVt0mnsHEN5mApRR1JZHXDGba";
    PACK += "3IFVSUG6vkzAbacovG3jvSAnue07ac1BogFog6yu6zaxDeYEeckQ0WIK";
    PACK += "x0U0HT4jcETtiDiBkEfhZ6VWg3JLFrgKAciIbue7cvu+QbmCfrKLxDRN";
    PACK += "oT+jzMHeC1iQo1061d/9QzbN3/0xm+7vft2f6e/+NJzu7951p/u799yp";
    PACK += "/u4n/kx/99vhdH/3m9O+P+GXC5vorl/tFO+ySqf4TknNXFAp++KBNekT";
    PACK += "Rt0ulqPHmWOvbASAReDiXGlNAe673dMnQuYqzdF1u4NyKKB9n/SfCPZK";
    PACK += "whBG1b79d8mivv1hBL79YfQivv1vFBzr4zCD5FriLhKHqYmyya0KFIcI";
    PACK += "c9x1uU4r2a8IWFB0DxuM+kPDbAz510tfJ4b2NcNlmrltXjI7cegwQdnO";
    PACK += "z3VdKqx+/Zd/fTkOl8WJZASmFxksbpi610NEiyiUCjZd70RhZhXDYWqM";
    PACK += "KAbL6vsAxwOY/05FuuwUP6MBdZ/JdX6qB06up6g0FIqh6MJBzxCOIh2d";
    PACK += "RZjZlRWNU5uXe7gHEq96SiiTMldz8wzgm0g2GNrbT4bfTc4j3fFkRoz2";
    PACK += "9pE0leF1Sc83pTAUxNJ9Q3FmV4qUzHlSDnqUpvg9w63VaGoW6Ap8cJzE";
    PACK += "1TU7bAoc+VGyZb/+y78OJjd0MtF3gsT9A6wtw/Sl09xyfDgvdeJaLdjz";
    PACK += "YacMwaHTjOt17vqh5Oj49TqK63WYZiUvhxkMgZrn5+CJ0jS9ECzMZG5k";
    PACK += "XY7Pz3P5hWcK4CskpwyarrlMAwZDR/xR8YZqeH4E6hjY/mq1qCFDhUaG";
    PACK += "vuWSkJwOwzi6zDf4yImyCtWPKFeJaaJofDzwA2xkHTTFse54nB4p8mWE";
    PACK += "qtCfyJUHmvTtXPXgZghso63r5jYnBLauZ/rk0FOMDnCDuX2pzU4V1VBG";
    PACK += "qLmFqrq5pnzRbwpyLr601S/3051Eft0s+3qTbyMih5WzB2imEGAHiIbg";
    PACK += "IZaaJsKywmZJhoYQ13L5Suux4Hv+AEHXlQOER4ntYMFDNY2vUEKQzTIk";
    PACK += "SSbg/LykaLKSUvfXgonE4xS2xONOF536MP1wVzAlIvlpmCYnrIT4cN1P";
    PACK += "PmS+ePLT7bRMOmXiw82JD3y2xvkuJM7MVS7tPddOcDM/LPpOwq0s66l/";
    PACK += "kmy6qxRKHJmmlE48oGTpE9/ORC5Ah3T1OjkYED4/N7BTqJnJ6QIfeoef";
    PACK += "N+nb+m7qrGTwU2tTt5U0PUW2u3526lPor7A0TKQJZj9KkNE8P9fBpUJC";
    PACK += "74I5D24k/koARIM7J6kWCFAYAlRlm3ZqLc6NvDLzN0+VQHmclZLV3koO";
    PACK += "q/QdzgAJSJIVa7D5Z65pZYUWn7nmRgLHNTzghzTYK2C+uuxZstyxU7Hm";
    PACK += "dB0VmjfmnVLR3HrFAkypU+G0L78eE4qo34NY1fmzPv0BDEKRqD4K00PB";
    PACK += "DfUA8bq/rS5dW1dWcKuVVHknZX9lva0KetBqpmub890FCl4kBSnxzpMC";
    PACK += "Wddq2iPBI98SLHJHtfKSxL25nifyKymxz6gKK6OpFYu0QFPZJE1l5evi";
    PACK += "HlOt7SQ5k6fc6QF2LpbHZJSP7AA5Rcl8mI80dcpG03cnFmi2lzdI6HFJ";
    PACK += "2+TuvKqKAwI+8Ajmeq0mwj+kEcrFia9OXc8PdcUAIFZoAW92Oz3EseXp";
    PACK += "HiKzIgEaWI2dpHDMzEQUvJBBd9Lh7P2kZiVlJknBvyFJhmadXGit9EuU";
    PACK += "/5IocHgRiH8EGRJCX87fg+rnTISmjJP4eKif5+8T0znJQg98cPrPyQA+";
    PACK += "MMu6vuyjMMuEfC4MTGlXicpHchEBeRxB4eI7CQfljRe+phCMEajaYdWB";
    PACK += "ZbBaHDee8Anl37A0ZPdwgBnWYILAOi3Fi1tU2AnnigClLFTC8Uc1enKT";
    PACK += "MAQ4M5NIw2qoRTk+sMyyQlrWNZKeGwJ30n0a3MsliuKGxNFtETTe1ntu";
    PACK += "EGHdxiLyCg+Gw41EyDb4kiQ1gquHZdqq8QQNUp4ONgKJWYm5VN7IPUm1";
    PACK += "pbisSuCKHZXKFeYNBPm129L2CvYjuCFC7tZMcYfjyRmI13JeeizpezIw";
    PACK += "b0BYAYbO8gYQEkaUcxeXaUfqi6wNjHGEhhGiSYFl5AhT7inZAD7DdwNZ";
    PACK += "8Vi1o4/ykKmNSZ5G1+18OqJZF2ST6XuWVTbWIc49ZjAxq2luAT/hAVBU";
    PACK += "SJ2zPKg2RTJBessjeWwf8KakejNHI9NEQSi3C6DaOVCUORq6YiRY1jnE";
    PACK += "kiBJXMOcnY2zvAnWa3J6ZRVyHWTdNvmI8U1AmBsJ0cPJTIq3uTrYgu1A";
    PACK += "BCgGZgbwK4FVxJGRwYtBFWyn3/h78XPqh8VbieKDoQ8RUvkbmFowHUhD";
    PACK += "UbErt4tELh6zIq1PMmw/4F2WGmAI2lXMqCIMCM5qAT4yagYeMUqObmK+";
    PACK += "VkSkNF4VLnxwlpaKedXdMVJChlT2B/Bmeg8SBU42j0sGePwkY1ur8Tcx";
    PACK += "tlBdMjuJe16Wwmdf0pgO45tr+XoVq42IjV9OLyfgYqIZLJ/cgmVj8B4F";
    PACK += "HgoRjhh8uODd0XUldzZy0ynFRC1EGVkxozCyEOskReXzcyDIDR5t45ok";
    PACK += "t+CRh+WhhzxTyME9YwjsfHYV5YvVEHmC8BrJh3HMVJURydkQAjsmQnlH";
    PACK += "YvWD1WaqALM6wRZJTH0hChXbg2B5ZC/YB0tMnpM4VodkYcvAnDpwJtEJ";
    PACK += "Yuztkf10e4PnxJ5myXE4ZqtpTmCigGvqRLrs6f3kM5yBcfWfgEHXl+8x";
    PACK += "g5iICa5AwI5V2Hl394L9lMQQcKwOlCYhXCVvLyhtLyULS4naW+SUJlOw";
    PACK += "+TqQYo4z10q+eSsgZ/hzJ9MZs0aFgWBJANZjY7NpmsWtM7chlu2YiSmi";
    PACK += "PQPX1M0xKmyOvBFOwp0sto/Yz2XANFbYQhFRowCV96Zlck/31yCaGM/X";
    PACK += "TFGumLVtmh3iEPCtZw4Zs2yQ+fqGuCFVG6oYDI4iyhwMXLWH+R1rkkp3";
    PACK += "iBJ9kJ/uAX2Q5EjZgQALSzgJJYJnso5LFjExTUQniX26wqkyQW6Uk7Lw";
    PACK += "CZMmoh1BMaunuVZjkrQpqJoR1qyJI1dVpSZRIY/6iRhYciresiwLrtgR";
    PACK += "orIOph5TcnMTAPBh439u3dSLYmXVsTvYlaoi55thLrgHTtco7PlTK9k+";
    PACK += "cvmZc3nGtDu1GhdAeyHFfp/ckcdc06u2xXHRDYpO3bK4Holj6v0ro1FB";
    PACK += "eORpDXyCuw9J5PbwzbDrBruyiu0sploSEnRqfmNSCMNp0bE5tvHYmIgU";
    PACK += "LTY9fhz+8N6Npemjc36upxbLuk80bALGyQSHdVJafYM6N+j5ebk/h6F7";
    PACK += "/hE4clClsA4XdV2GSGAcP+/0DDMLkmou6+JCJx0x5wZt9LjLIhCkDlZf";
    PACK += "zITd46+G+k0E4eqwQnZYOsQT2dVvIBNn++mHSmTtLIKFUhPQSGEWgBuB";
    PACK += "K1PBPQG0IA+kgYJ5Jt4lH5PsNOPcqnZEMMM3iXPmEn/Izblu8NNUPyQi";
    PACK += "9NaShdwIouLdg0R4PeAWcDfABO9OzEDmzyfeB5+EQtq7YEQm0k52A3yi";
    PACK += "PL5Bw3gk3+9QD85x0qRuGMTDDBDxGsFjT1bSEzUcJ893pXds8n5/QMHg";
    PACK += "Rr7dxn1X/XoHAOTaDep7Vyh2k+d7okb5eJ14yhuYsaqvYECYvO9wCPNv";
    PACK += "SmmRoFYgU5I6wITyXW5fBm9gMbcTuMNR8vJm+kka6fHHpBMhHQ1cMTzM";
    PACK += "PbjvP+X9PPa98JgnPhW+ifAUhkPenB8Ed7KauGmo8g5ak9wrGAReS0wO";
    PACK += "80nC6DBLu5XaFWZpE3UlaDFGkefs6e/ig0MfXAGGYHl8K3yqI/2Ovt9R";
    PACK += "Q7G+Scot2SJvMlkIn8ugGnHpFWZYZt74dxk3ovhA6CqNponeJGBp9ib4";
    PACK += "pY1z9lD33ULcI1biJ5OoQ6VaUQc5n2Q5lhSGnonIpm+SIlMLPD1vfxvC";
    PACK += "AjNTWhXYbFkfnSjnkceSzQBmm1vipiw2EbEJy2QzkspcpOEDKtzpGXq9";
    PACK += "roOOFIL/3HcNgiAiNaLAFcHOFIQuV5wSR+9G0S5/NRMTpKxiFJi2iHAk";
    PACK += "AkO4nvOGcTbEJAbbej7BZ65cXmAXyH+pXNLwg4cHmK+SAU/1h33+A3pb";
    PACK += "eDjEp31M5Crgqxlud4PfkUtdjsppCHgEFig8zzFvQp3HK6FKWuHk3tvD";
    PACK += "+5ynTjjOpWRiZ3DQBU6y2V7n14fMwXvLaC+59gq1rVmyKok71TVmd7Us";
    PACK += "GfqTJ5xF4FHsK0oU4V5rmjx4CBNolLCJacMytRCLOS3dMlXm94NQ2ekz";
    PACK += "DOMIVk8D7KZ1+1F2DFE40YXrpEJpEH4CXA9PzNnHyzRpwN6deK+D2WQx";
    PACK += "Lab+RBoP0sQmkoFTkYlDP4IYsHVurJ668TWLjnWWQP6r4pKBDOt2cy4I";
    PACK += "wFe7tI+5tjOi3VT3KdxSEZwbUIqjUcgjDD2MEk6Gh1yv/ArKCHX/38YN";
    PACK += "MH4gDIIsSKbxobz+wBVmlKhLCpB2o1Tz2wdlt3q9x8NQvcujgAitDUve";
    PACK += "ncM4RXIZhnY7jItSTwMI2PMQDnLTTzL8KoRIUzBohwsHLtnuwv9EzDVs";
    PACK += "2l3i7OF92yUOzvI+cUWcGJckAWJckBe7BFZOlzhpLyMev1wGK5/wNe5G";
    PACK += "0s9YOfRy84y/ocovh9AsH85u3mTruqsoxrqhqXLFZqcbJjFqZPq9JHtq";
    PACK += "u8LrQ4ZLUm1AN/WkrNUMaBhBp1VQH5NCoLN06IVUPWmUIXaAp4FBOImh";
    PACK += "ZXmIQ+F0CicB+BO/1pDsBH73UC4L+ZY4eieJ18L4IMD5jEpaMfutEKJX";
    PACK += "hsdkMqU0663wqCSlNOvDUfG9NNt1cODQbYM6SzTVvZjc5kEiKXWW+NUG";
    PACK += "yUVkUgYU54ryRShlkjdgsmHH0yH2grNEOzJYnRKpY6nJY5AXLWZI7vCv";
    PACK += "csG1m4glhy0kU98QYeUYyvsYDjA3YHwbtHAVp25vM6RDdGb/COviri5F";
    PACK += "soOKLDixkz7zruddB0cXONbGBFNDB69qHb3N0NsszSWdWKszygMeLBoQ";
    PACK += "AZjeZgod8vLuuyhGkcBxV2ohlXuJQNwQJ4xpTAXUNkU4KBmAgiA3aXMk";
    PACK += "XYFDIoZyZAqqfYXHHwsCQTPCAN7elfSy5zlnMn8usvgVHpcjCBwIuZsC";
    PACK += "75UCn6+/60nIel4uMEZ62l1ah98zPK88pga6IujOFZKMUxB0cm2KgFcF";
    PACK += "rmVzwzQ7YXB+bkCPLeixq5KXd5miD4JAkvySj4YbcCdUhk0p50rdu8mc";
    PACK += "9JmL5yB5eiEvDBJv4Paj2oq1uQH6a4vzlUl+WCZpWWHnh81xFj7Z7fNd";
    PACK += "TQbWTwE8cdNAmCJLs53pr8DA2n+KPa6t6ij+7XIrTbuBlAhyEwXhLGUp";
    PACK += "TyRhESV2N+V2E71kJ+UjyLX1haHf2MidEefsj1LA5IGw8M3nVaGkD2X1";
    PACK += "peGmoUEZN3ScSgYOP2jsdDKTADncYB6a1Cri5IgIckEekNBRtLTg5CCK";
    PACK += "oyxOG4Q3TWJljYVpJtQtmF3HcULxJCxioX7+2glFCERefzLEvcgIwFxM";
    PACK += "ptN8OuvAlSKRfwBxwMZlIwuUVAK45Dg0wTLiBIg6YaY8Sm6vQXEKTizA";
    PACK += "iYVCHy6YQUmxtE8xh0l8pDywa/IxduIUMJg9X/Q2TjpfXn0ItVRVH0L7";
    PACK += "ldUXe78JDALvfjp7MALFfJtWMkrMhaiX7WkIRTLGIgnTC+BvY1sJunrX";
    PACK += "zfG5HKXTlbW9C18Lq3e3uHpXgSkWj2uZtafg3LAcP5zFzRTrhdcibwjI";
    PACK += "L9MOl4/laKnrFArecp0dXB3/CnlR7ns+dBwaevnSWUQlNMh/UiOCoXdy";
    PACK += "n0h4jI7yuSuCq6Fbfi7bRGA9dCPfnbJYeMgPcnnyUfbQaR4SJTgfepqv";
    PACK += "XA34h+7KPe0dXJAm7ntydt/BKU/zDm6AZnE49Nmuf4ApGPzlzJVg2y7L";
    PACK += "ZNwNEEby7MnIgkWLPaXZ2gAhE34y4xGxsd/BDg9o1w2etlvb2aP9xEPH";
    PACK += "nvgWhH20I59v3m5lXXiiRpnBly9fhltkeFDmdstuN+vGMWS4tOOdW+a5";
    PACK += "xdt7Sp21FXSbOivNzZW2tZJV9kCNXIdr9SzKmWygmcQ3k++tQoSUlYLB";
    PACK += "40bRKrK5Ju0p0yraso61xIKwtSEtC1fXZAi5ZmJkaLVkppa1InOtWJsy";
    PACK += "20ZzM8m31t6QGdut9TWZc211tS2zNttNa11mbq21mitJsLrWSmtjI2ls";
    PACK += "ZWN1fS1pb3O9uZrCjGswdK0VS3ZfjKMEo72xsWYllaytr6+3mrKWdnt1";
    PACK += "dWWlLRteW29aGxtrK1mlzbZltdorrZXEiHOl1Vxfb6WjmSbIWVjbWGmv";
    PACK += "rqymg5smSMvW9trGurWZmo5mCYmFrwxHl4KQpRQ0B7k44HGQl+hGItLw";
    PACK += "TZfgKBHq0lDfVkeN3S28zjzs8cz8GpWRT/rJu++QWtKJ1Y70AbFES7Hj";
    PACK += "174RdGIeCps6D4gRm7YR1hwfhZJX46kQTE7eDeaQ2jcC5GclfNMu5k0k";
    PACK += "TAVgSactcVAIp+OsFpjCWMcIHFqrUwTeUnWGgstOKNwgm2twx0uCF5x7";
    PACK += "NDMq7/cMg9ZWEqaSnjuk1lwDVgk3IK4AXN8jx4A3bSYbSvJRCA2s5tCO";
    PACK += "tcU6JnHazfodkPtR4DS3tgii5w4oOCHPN4JOanWYqQy8OWI3ZqGOliF+";
    PACK += "oVzMyRpOVu4v3Hply6u4fYFrtd4srtDCgiysv/LlVi/q5+pq4KtDLwtE";
    PACK += "l+pO8suHFpYPrLB8yEe5xNQFainx8gUOhXAtXnNry0eRA95THXE12bZh";
    PACK += "xDViioMAI65RgdT8ak1/37nnGTHoxuxoy+GaP9G0hOXciU0U1pxvxEqX";
    PACK += "3gkLakYVsFo9HaBVzpNZ29jGtWzUtpUBtLJKb7tGol17mvqHPKVbW04T";
    PACK += "GU9puiLl+uWbH0SbzAShQvDzPbiPwOq0m5eJCJSYKPk6k1H8e+kVePnO";
    PACK += "nEMArSXHSVGAD1B++vh1b8r0OeDJBDMIWgkxeSxb5SLEgHK/gldNhGvf";
    PACK += "YJ18CgQxnNk8yk9hjRcaxkzEPnLV1DzNgjRWJFaS7qv9SdnkApIqV1UE";
    PACK += "sscE3A6bW1tBB+5kh6sk4acOsa/EL6k53wgV3Lrh58cjD+G5wzqlJLWT";
    PACK += "3ZGRNswJKu0ENXYO9zrUOHbv0f1zML+DduUZ0iPHylinmznRoubUMWpu";
    PACK += "4e2VLbxt4GxT42tou7lmZ8RhxRbqpUcueuqjay56zUUPXPQ217Xe5Fco";
    PACK += "DqWF10D+Hsnf94mI3+2O0FvZY4/j8Inn6OCmiCHkksaf4pHGwrg7EIKC";
    PACK += "eIaYM/xBhJlx45Mu6EA17yAQDzJ8jCwj33id8jkeaRBpDCqCX1GPR8OR";
    PACK += "BvcpyQAr8FV5FZkO8Smv6BCf8mhu8BCPNK605DFb+EUGWjccnWrdmMEV";
    PACK += "bQxrAqzugAdikY5JcJCncUNMTRpnKnFFsknqR2V7oIhK5pP0gKUbR2HM";
    PACK += "dFsOu3rvq+gpS91I4D3ALih8B5O5+ahDnJ7kmIa/Q9VHk5nlcCrZkxQo";
    PACK += "8D4PT4whakJDpt/wTLV8P2TpXKk65CCMJj68VVqbspx2iareK/F+B0MZ";
    PACK += "bhh/xC3unXDbwM7ZAchz2LtDbIa8cMg/iivOECcD908jhoe7IBHZFCk1";
    PACK += "2CESZ05g9+H6BNPI3gv2x0g1K4QjH2YqSU99cJ1DmEcbLjZwDlER07Os";
    PACK += "rF4ULGUGx8kZYGDK6zjTa2x5hP5UceCpNxEXzhxS9JGDNGTOLjGGDGVF";
    PACK += "UBJSU8EfmXvAcw9Kcyv4I3Mf8dxHpblzCJTox9LZTXav97l/jRGiXWK8";
    PACK += "z31ujNCUTo1ZpVmtJWiVXL+gVo/eUup9a2q9JdEw7yi+U4+YkUxaXmci";
    PACK += "afu7zGBmLoinUD5yNRFXPoKGlSeduNw8Ns2HGymCOgw9cI3sogz1ls9r";
    PACK += "UGxsZhZJyQUnoOAFM6YJVVNeH9vwo8zrMd8qyfTEai0Jct4gvVCEq0na";
    PACK += "HudK53RTb2dXLKVZ8volOPxL+ZrJlQCiRHLQmIzue3AGqi5dNLmyEATG";
    PACK += "QTkKYOZO886ETXr6VfICsEER1elMxl2F08eroUMRkSByF0FQkvDSBjWR";
    PACK += "PLIWU5GauPSpOr+SHqDciKGlZoc1eDA8I9HWLyns4yh1FuDDCbObUEZl";
    PACK += "/e96cLMG35GHWXNvU2PIA/vIjcJEg9zHAf84SD4e5T4e8Y9Hycf3SWod";
    PACK += "BBeNvpV7VTy85Gmq2kdH8t95PEFvh+fnBsBsoWlaRGOKvm3XM9UjgAOu";
    PACK += "HsouIjOCdGO4RQy4TXLMbxa7SRNj5rNbxLhJObZk136KoORpJs5kSx7s";
    PACK += "Jt0jcO+n2jnuQ1boHGxVIYx+OqK3BMXNTcEtQVdzI39LUM/cgLPceAOT";
    PACK += "x+37e0yFkDo9YXk0G7iOvH8trYCfI/X4qiG54iK7eYfTqclPtVovw10Y";
    PACK += "oR5xKGtU3MqMooA7KKS44hVjZD1CodMj6iWVuTcn9X575DTR7SzEVmoA";
    PACK += "8MgJUL5Ijgd/mQZXXqBBpQTQwShI2n0vTD/kzo7ui3SK3AARE3F+kGae";
    PACK += "U3c9I92sTBOinoQjOIZ2+67YGtKcsiRitZVard7cOvFSVgKMUjgCBPlj";
    PACK += "gBDIVcDhCVN0fOSC+B2qAKMwnf0CuPAhOf8KnHCcMTIloApSmdbASQKR";
    PACK += "R8luUFCEK81zgxWpMMfOrg/UF/NNOTsqMctO+6RyPRkhODiFDZlkGzKG";
    PACK += "DZkp1aTnJ1ih7nIjkXv4YnvtxGksm77Lqu3yI0l+7ipWpazLDRwR/VAx";
    PACK += "uy9zEBACUmIHptiWdIMwwql9WCqupCmj0+QxTmy8EiksETKkLKbIHJh4";
    PACK += "ypsIWJu8hyNVkimRa/irMA1Jno8gTLF8k2JZ9saFs+w1HqnijJJVCpmJ";
    PACK += "9ALSWvocp2MAvv95ASc3dIqEmU9JK4apFuJfksA98NJniAcsnfwx5j7x";
    PACK += "4kUIhuJFkYPVlGxYM5lYJhyBHXS+3dyLsK7xQ5JLTaXYdLrzMvBkcgaC";
    PACK += "khiPIIa0TD/A4I9xEMSJnOj2GKbKu8igTrDyEe7VEKElcoBy7JDPAzca";
    PACK += "5D6OwhFfRrmu5l5kZ3LHRBw1czibl5vxic8mxej0vSg3DzOzqkyOLhWz";
    PACK += "JcIoBVRJukLYjiB4aYYM/X5qwMlRQanseIBTrOFNqx3jCWpXZEtqHpkk";
    PACK += "c+WOznR5VYqeGLYdeYYpVfW3/MIx3A23cO7mB0LVfOoVz9ueupOHQIUj";
    PACK += "nubaeDKFbxd9qW666Yvf92hh+7giDR3fS40g3qPiihvEnJs+eKkl17ZS";
    PACK += "FDjSBdcnWp9t9xPX8D5THT/gfteE/crsIsH0DGKGOk6wh/e5dWRHqLJJ";
    PACK += "XZzCUweuhIXwW2yP1KnIGtbpfodC5hQ8J5BXU4Cejm436zQJEJDR+Q+p";
    PACK += "avJyiE93wGxR+miBxT68c8efbXn6L5LEAazwnWq2+ZbSbJvgbcX4p6aV";
    PACK += "pKF2awtCGPDU9jZWFduPaHYnoZI8jLJkRYJ+ggu8efFmiSc8+iG/6EFe";
    PACK += "/vBECFs3SMSSayK4I728TEKR35K7H0QBxxdvcj9+IBIFRkgWP9akO1TB";
    PACK += "wD8WHsF4L97ndezF+w7ZhoM4m8dxS1XsUD/s7Bwf71IugWLPMcLEOTBN";
    PACK += "kwEGJj/YoTSpkf6IzlLT3H5E7WGEZPUKv3SfhaMR9hz5cZz6mqqhBM9G";
    PACK += "om4JVj6aoB9NQKDcDVoY0A54QZJGvr7tYgK4VSRBU5SucKe5QwIbJK9F";
    PACK += "7SWES6savEfUFHFGlH7bk7dklYNaKLdNJjnODFixsV6NDw6CCWjVb+Ae";
    PACK += "PGUyOMAjuFg7yg32GPnRXZEMqsNHFKI3ckq1Q5wz3t27A3DisNABbyey";
    PACK += "LSTa5WFbLMT8IUTdG47sEgdF3Eg/n5/DPcfy4mM0gWEW8qMHNI748xg9";
    PACK += "8p0n2NghJvKow92Udwg6O/LxsQ0eysz1A9sam+ipB/k8aqJ+iEYhukHQ";
    PACK += "biAKeBSdid35PdtC4ukxQB9A/Pn30idIG7l9/J785XkYDd7Gp1AOREbx";
    PACK += "6AbyAfxRxFMfQ+gpuHlLeMna13wkzIb5gMEDDBjFAfDUYnmXj1MuSxqR";
    PACK += "dBs3ejQcptdVOaoXwTZEP5LPdi6jXahvjGDPHfJuT7aupx8FAcaNLDeP";
    PACK += "DHYD8Bb+4DQ8SMZGbBt9OBiVI12/QZJHNMrSH2fpj017FDr90LHQDeJg";
    PACK += "mDgzg+/xNPgeF+F7bI9CMFgeRIAFu4GJbnti8ncDdAb3I/G75XuYcmS5";
    PACK += "yZHltmeiR16GI/nJgXzDEPI98kx0zcuQL3Wa5Fp4C+HAHUXY49cBWmgU";
    PACK += "4dhLZwNqeY23ds0z0QOlFrgw4iB0qXfNZW5ZZ3MZkg7nS0nL61wij7TE";
    PACK += "W3zgmehNpUUYBg7QER+lNz0TXfGcs+tR19avR113hHV0H7x0D1xq65qO";
    PACK += "buIes/UrlIbH8KijhyP5+nCko3vcK1G882cdgfm+TOG2/egaDmz9Gtf9";
    PACK += "6ehdn9j6nfs6uoVJbCeR7uBFR1dGo6iQdJ8zj7Yufm+GcM3OrfDpXeoT";
    PACK += "rliDhac/JL6HCeNX3ulj9IHnnG3Y+lW3eyhDwW/a+gP3QEfNlq3vwHXk";
    PACK += "Omq2bV1Y/6Pmmq3fh4Wto+a6aJ+GgY6aG7Z+JYDUTVu/ywUt1LJsuN4u";
    PACK += "EpC01rNBa7f4cLXbkLcPDgiovSKexTC0V6FFT0ftNVt/M4SbjdrruZFt";
    PACK += "bygj297MD+uKlRvUlVVbv0EiTOHTWja+TejjbhMe2ra+24KHFVvfbcPD";
    PACK += "qq3vrsDDmq3vrsLDuq3vrsHDhq3vrsPDpq3vbsBQWba+uwkPTajQgide";
    PACK += "NdTdgrqbUPnKiq3fjodiPJoAlTpVrdaKrd/CzNXH6KrnnF0JmK0Lyqkj";
    PACK += "OdC2Lukr4ARzbV0SVB3xSbH1hOjqiqX9Q8VoemJjTZUVRYK8PZlk8DMu";
    PACK += "5yp4A5rbS0vABedCYl3zMzf3h57wsVDoxSE+za1bfmpwiE8T4K54e/wd";
    PACK += "IlbDb3LwkkfaiVB8GW1N1QTACnPGGUmmVuKvLZzXOcXfkYwy6MrsXB1c";
    PACK += "7OcmtllaPNK3P5DwQSmIUJ0DCwLhIridw7ZQEHYFYzP/fkjxCLtMluXs";
    PACK += "QdkOmTD3FRzDxDDwMQCuQEI9s1xV19N+Q2XHA787WAyEhRsZm+hdTpTf";
    PACK += "8Ez0jrI3pYd9NnfaZgPbQuKuEdhLoM2Ycu4KVAcEAm/cVRL9gPMv8Avc";
    PACK += "CjsGrs5CslLwCuT81F3qD116yon/KSf+73gmelvBZaGpiXhDsP09SN+F";
    PACK += "0sLLEkpmuxQrSiZ8bKL3+Ci87ZnoQ2VrUm9emGNHfcwr+dAz0fvqNo8D";
    PACK += "5pbyNeJLsofKfELncE35VMcNJQ1Qg2d9XFnl41yVj9UqH5dUmctQ8j1t";
    PACK += "8X3O2wbMvSWwx0Rv8R6/75nowHP2NlGzjVrrqN3aR6/5zgGu1fSdTLPF";
    PACK += "SSHUL51LP5CHAjxfEjDjlpSzk/dazfiAOGk4DTWb0AfgvmgIIrMWWqjV";
    PACK += "lj4g6AOXZzCWXvPPzz8gtdrGFvxtNi87HxAT3Y8c2CWPo5z/5FW31HxE";
    PACK += "qkTlQjzITgJYsqjA6kfaDGba1ZT8y0xLjtNqbXbKlK5FRWumyk0DMU65";
    PACK += "QvOhWzC7E6IImoz9DEOuMHCcCUu9Ed5nucFg/dLBKGoyky3JTaLhKn1L";
    PACK += "R4BTNfDwaMkrFGDgLXQ/kkUULaoSMhjA45vM/ahWO46kN1FRrVWI+Uf6";
    PACK += "qQf4+8xUzFqKkJ+fL73m12pyzmFXAy0X6L5u+k6iEeNjgqTXSNFDXCrA";
    PACK += "Ve/JwgDwkHKsIUkSuPQLggVPkmLxOHUyA1iniAypi75La7XmlnhKDl3T";
    PACK += "YYVE4e/PBzj5ULYRJ1nGE9BWTOgHLkAjdkzgEw5Def2FmJfyWeCHvH3n";
    PACK += "jLvJQwAE0GonvyB0w7OevNR57bqIvgCyM0RVCIkI0yIiVYgAC1EEN2PB";
    PACK += "M7+diwdbwC7t8owMB+LnhAdqSFqJKU8+xhgiMSgs244aYAqkxyRyr/qc";
    PACK += "j+DbUcI7y3OV7aUl2t8T2+y+zXIOtxkyvuFmx247Lpy0MacbwNU/IdkR";
    PACK += "CngTZUYa4nohfKw98o0sB0rOIeQZHxwhYmHFJHQhNkGBdHKNbDaW4fKu";
    PACK += "SjMBXFTmBn0YANaFi1FVy4NAGRci/ZlGsKzTVaTcRpCtMhmtU3Qm5R+h";
    PACK += "nnddICicDB/gbeM16ughEcOn0Hr0GkSwHYTO9OhJgzB/t1BaFdKlD6Fu";
    PACK += "oteoI4neIGzIDDnfHnSNOq9R075GuXet61wD8/+l0p3m/Hxzq3wLEnvQ";
    PACK += "NYpeo2igXN/yBFS3V0EvcZVwIpwYuOghSbiKZC7fcU2YmquJvUNmRJ15";
    PACK += "pOVu73UStXqtBlNFzWSy9vY7b7gGQxBdHfFIDya67hpBHy4gUcLC9lNT";
    PACK += "ZhHyS5wdbhsANboKBlOAKugqgaujZoAuI4ul+1StBrUoLiT97FIGZ+Lo";
    PACK += "THqoi301e+EbYIJCoo9K4L4ixvEDUyW3as7jFjLn3OQLuFoo2u0XQ64J";
    PACK += "65slbibfvMSFnktw7zMW58kgRQl8v4L/P+7evLltXOkX/v/5FLEqV0Ve";
    PACK += "Ix7JWxIqGFXiOMlkj53dj8tHkSCZMUUqIGXHY+l89lvd2Bog5XjmzHPv";
    PACK += "W29VKqZIEMTa6PXXZvXpOHeEF3FZgOzdZEjSg1bStvUh5oz281rXsxCp";
    PACK += "bvjgP/RpxUMfMaX4pRhGiAZIb2gHL02IMF7VO220p5nknZ508JnSePZk";
    PACK += "PD+SCkzcJD6vWBYvFmvQp6PsmIGbt+1Zt8FR66A0bvo9JMUecJkPP1an";
    PACK += "R2cerCNW1QOLkrFXSPQDxx76EGUYHSTWc2qaMqYsgYEP8ndu+IgreDfJ";
    PACK += "mUaaqu6IZU9wuRSJarf7hvhZHaqgT/CV824YHIYl3HcAKctca1eX2H4P";
    PACK += "0vFFgAbSbld9XJiQaN6eW+9JYjhI9eTfVHWQD8ZJSztMlFahp3+rbHXA";
    PACK += "GAykMICvbzWT0F9bi1Y+BOT47i6AeXvKi89gPzRzIbgWBSousyjuVbdS";
    PACK += "sJXnQ1znG4AR9McTOZiaE6CnsjFp64WB7tHpsD8praPRCmxAjkKH6aMj";
    PACK += "MSVMggK7yGPgLL2XlUeL8rrBJglL7V34P8HITf8+/2ASANh0AE5Ox0Qb";
    PACK += "VHBXHI53qxKZ93su/d+GU0LwY48lgVJBAnF8DjjthPiNJ65vMGcMcf+A";
    PACK += "yIsRzAZGJFlqfgB01HrwttvwzwcJbrdfDKLgnh1cPb1MQ6RK6+z0PjWw";
    PACK += "qZXKTCXBrCo3RD5CccDAL0eIl+xOF8Swg7Wcx/mGf5dXjNzaz3Wk7TQF";
    PACK += "d8tcGagNwbMeToKj17HXegfyGBM864+puCDwSROhMXbTIlcIafROpNgH";
    PACK += "QD9oIDqFa5npO/gqqe47E0yRkGIwMOAnDoE3lchH7Xbxu1SxjBi7XyDw";
    PACK += "MD8ro5wVxqCOv2Tcy9rtFFci8taIdKgSc4kNlW33tZJdM1zc7vYbJIL4";
    PACK += "QNFDeIRrRb+Q2hfwri2f6vIx7gbD7uFiigBlthQVzlmkvshM/cD1anTz";
    PACK += "LMPiwLgUv8s+4IGMRqoGLKaGIVItYPaDcaLyDuw3PGNeHbF2QMVIG8Fz";
    PACK += "DON3tBOgNAl1dWEFV8LYulgGBgs0NYEaWowrVhUze+N9MVsqP1JrVMVR";
    PACK += "8lNq6JuR8Vj1HFYFR39VYZJhkk8BLCd8MXz2vpiBm3gxU6LaSGtRVqth";
    PACK += "QF/SyAOz51pC/qERaj5oceNLAEll3a8N7p/aJYjdkNsqE+9cvg8gK/6+";
    PACK += "630pFovnFvTwOUbuZpEEkCTJn1dNZEAiKZFxX/Ir3EmJDMgCE/mI3tzP";
    PACK += "R0tAYYpkSMdkSMTqGz8OdjmTgGlqdlAiyXZidAvZJ+ons3sokW4/MbKH";
    PACK += "zH31axmzD+A2I6MPsJ8Xi+hDjvt+mEU/CpA0VZtQ0pRO0qyIpKlLmEHU";
    PACK += "kiZMWyBpVkTSRKu8cRl5Xnme5O8l5ceulhbF4yg4Go/Bi9RPCGxRONfF";
    PACK += "MW9d6OsKHgAgJ96dwkXFFNbUt4qAx8KMvpdR66G50WLuGuxeMbNlUwM0";
    PACK += "u/oNi0VL31OLaeU7agHGzDk1m0a9t3dajPzAZi3ZeQEYWT8GMF4oNf8Y";
    PACK += "XC8UK2xE2j9fFbpYRDqTzLdqg46Q+8EaCthhub4YjoL7GXs9Chvi3vdG";
    PACK += "hfwiYXx/mPQv5wWYw0xoFPxAEeNbRW4LDfqHN1mu8PuvgyBtt/Hxj4FX";
    PACK += "MRJTJ1lAnV8G/I8satGBa8Xsa3A3JSvkefCs1Cvhm7rvdR2SNwxtTOfP";
    PACK += "krcG3woVobmnIiBVROZwkL/NBpfm7/tTWcwnpyZKEnyPTZAkmKpdMCW4";
    PACK += "WOJ/+zpwE8106upnqp6/BA9FvHpzrp8duvDO0VzDMKtQTDGdVakY3RL5";
    PACK += "UF7OKrwawf8A13NrUlRvlaVHI9zpME/tegyhn491LOhbEwv6YXYLEufh";
    PACK += "fwIdBvQlGGBH5qdqEUQ5Bh+YGpQ+dQUgfOrqzbzSF9CrqQLe09Gl6Kl8";
    PACK += "C3yU8b80n5g41z0vAvYxiYDFmvU11G0uoXZ9DfXLYoI9A/9lPWYqZFX5";
    PACK += "LN9S3sr4Bz5bVgPIeaMDWm/p6O1boMD8gO7AKm53jwTz7ptgXjUmymVZ";
    PACK += "f0qd8LeUZ6sqhe2+GKQVfE55tTaGze5XOuhoiCF+mCHsKWa7BVRK2FBv";
    PACK += "QPB/Ix/8LA0H8gZk/2eS/yyP3shj9rbkz2RAyZ/AvaPOcQB5/Exqz8xu";
    PACK += "zPar6G0JZ1Rr/UmpONNnkr0t2ZOSvZG9/Sr6MoDHPgWH+1/9+4ROw9Pn";
    PACK += "/lNNkeGJc7ZnAVKkemz0YvD0CfpMk/sF6huL/BG4W+P9b/ihgJT3Znnk";
    PACK += "QzuyI+fTzIg/87FXFrfjr8vqbWBrJs7PzHN8Dt+w9V/3xtOqQfesyY0e";
    PACK += "nFtmMPQeJ3He89mtUNtHlpyp3fIbtiIa522izc3X/OrrMe83+OAj9JhX";
    PACK += "JiZ2FNo8mDPZMGKLYtrC4waFmDXxtSAA3vZmReC7M/M1NJFUrpYrqwUT";
    PACK += "/GMfUPTF/4IKQfi7n0Ccq9ycYcNBPtNnFvyt9JllDpThTQ4UdRKM3KEw";
    PACK += "pYeCGo8mYk6p8NBS4WvpryO8ehBoLIghoLS/bDLBk/tQVFHLnNN4FJvj";
    PACK += "Ds81jyTT90EXMxxU0RvATXUWmEBWUoqdxcL4195BHrzVE6FnNpuMIskq";
    PACK += "g00GrjkNztuOO0fbD0LTR5UGLSLBm7XUR6Y5IG1moIhQ3k2gIjbCQE8k";
    PACK += "OgZO53dHfHOHbihd+vDOA55CWnCD+iSP0mNW8vmG0QKyAZ/7ze8hHuHc";
    PACK += "fo6VAEjQbmeNbsVRHBuo21dllLE5G0BoXamiwKBNKe/0UisL9VKdSOlG";
    PACK += "bWH/QEMQHLEw+JmCfyoCuFei2X7j5Ss6qtJjBMa3OjB90yzH2MCyrLdO";
    PACK += "TpRzdKuHIP9KVs6HYClim5h3OweVRySp4HZZ+GuwgwDacsG3Y5YPo5wJ";
    PACK += "JsGuhPYOyVsq6kBh7MImWUe1lBzko2JKU5ps7cb61N8kKz6XNi/l0UN5";
    PACK += "DLmrHkrIwsUGg3oyhTy+wuRlIb1vt6PJBLuYx4vFZRFBUDjsAnUJGwKi";
    PACK += "/U2ch6dogERkvqKhcsYVaAxkwDKNuiyi2sfhUz6CeD50Rl/tMfAMzagG";
    PACK += "kEtp/16NCLjHre0k43+YO8a2nvHX6TLn2ca3NB9FRiaHnmV6AbC1p8Vi";
    PACK += "gY58JKBNZ0JycU36hmIBF4soQ8d82c/WiE93DVkZvnWlQSGMIR5Sl2RL";
    PACK += "MA80FodEnjeo9CY10WyMhwWF51CEBj0foqrdNchPVXtTX1o4WJGgXaan";
    PACK += "7TyeXaxnKFM1mCAUHZhJFgv4s21p06ro0p5GSM0WizldUPfa7TnRE5J4";
    PACK += "Xv2F7VgRIGmRb/0g4pKnpkFRqVpU4mvtdgTPVrSHlaoxZdCYMmyM6XzK";
    PACK += "U90C5O8Rdk83A1v6sYrmMUuDIYMYbNVA/OCOatwuZLkteGqBd28JBIkl";
    PACK += "xq2ltD1e7g+iIChlwAs2g1DkPGanYM/Wp8mIiyECjShnhJFdWOq1If+Y";
    PACK += "snMuenV/Led/8wMgJBD/z9Di5hhYjD7ln+imdPG159rU3WJDPi1qRRTi";
    PACK += "D1dRmLUi14ZzBmV1GDAaEVWkBud802/69cHDjTG7YWilH+G7OtDSD2fm";
    PACK += "p2UIlbQyYvnvx4KuiHfmL72puVl8L+m3F+/LP3vE98tAhVV+1X+fD5Ih";
    PACK += "v+0V+Qa3vnhNsAGl/E/vvgkf5c+9242B4CaGmr8Z/V2op78eaP3X4mZp";
    PACK += "dDa/LPHkv3SMIzvja5fttjJZqhFhE37ZHxnU5dF6y+Y8QAeyUe8S9rhh";
    PACK += "Dsd8wKa9saM/Uz5G2nzIp34yiamBaG63Dx1q1JQfson7eci/5NGYTWJ2";
    PACK += "aFLJXCoVtpTRmB2yaRzHMTvTZHnMx4YudR5cOu34CBmqYTRi58btahaz";
    PACK += "U08ZPiLK8MulxryOqvZdRW+uRIJ4+dzFJuGwajcUOtJsSAs5VxUqp0N+";
    PACK += "tTXOHxWAKoPI6SRCaLHIaagVnBYfq+g8XizOj0R17BhRaOFwsRjF2MeZ";
    PACK += "s8bM+rME7/hZXvsj39Qx0lRdmc510A8b9pubZCPB2JAP2Dk/72OrEgVy";
    PACK += "5ybtDLAmzmO8dbZYnGtA8J1221zuxqrbmPgoiYYaJ48PYjaEY0HZiy/5";
    PACK += "ackOeaBPmfBAGTPWI91iUTjMDZMDX77kl7piX5Uy4TV9zNi+3YrZGR+a";
    PACK += "bZCIPBrGbMrP6Z3zmKmldhkdsvF6SxFGNlTrbWTMK2dsFATjTdmhGoOP";
    PACK += "VTSDBTfAZqqqJlCVIsGwfqGqS1PVlF0GVZ2xQ34JbT1kw3b7PK6UO8sl";
    PACK += "H7IJP2dj3mFTftmb9qb8cxVN43i8vo7bd8o77JBPeoe9Q3hyGMdT/QTA";
    PACK += "ce5Me/El3L+M2fjOHXN/emfciydwfxKzqbkPBfQUcj5ZLNyOxhsk34Na";
    PACK += "yVXPVK2rWl4SqA913RvaSv4oo1M2YkN2iYKPW3pnfpEzdg5FIKmt2b2D";
    PACK += "vsijQWyXOh8Rj4/RCo8PNvQSsgyp08fI+mtgEqkY41p5MbF+B3tlNIrB";
    PACK += "ePFpEO/xgXpwtcfnE6SL+zydYDcj2pa43R76bfAcTUZNidVHQWJ1WOl7";
    PACK += "vJwgt7WHP/YiwQZxHF89HUSnbA/XkvVg2m+39yPBRiDXhv6A0T4f+cla";
    PACK += "43Z7f8PleqcDodPSYUrxETM/2Uhnrl1qBm8/nIwawCOM3X68WOyv9nZp";
    PACK += "t6PnFd8Hw/XAWK3jZpbuQ85/FPz5CtxHdbB+waxK3jkfQsD4LJflldBS";
    PACK += "zvZh2blR7TVjjcBKnMSkRCP/auvCQ/oEUxCnsUiu8eHXHBGU/8mbtJA9";
    PACK += "j/cMncXDd0AtuvINA3ISvqS1kXZZ/TSecLghvlZ99NEHw13U9D3ti2pG";
    PACK += "BLwmdMQFx4iLhteMPeAnBJoM4A3P0b3djr5Wi8VP+NnwXv8n5w3taLe/";
    PACK += "gq7kBOMI4iSaVHwGkBo3QsOAQIMOOO6C2X7AfoKxft+xIz+RsJ+X0U8m";
    PACK += "VvIjPwk/sr+M2Un/J/rq85MkOuEfEIPsxB265iHyQ9EJF5M+xnzkcZKr";
    PACK += "vzDiA9WgQIcOzRu45s1M80JVuwdVs7LhM9LwwTJmM9uyZTWMTkHfRJQB";
    PACK += "UvqpMK+Msg6cbnQ9ScU8rV2SEwXNMAuRtyvHozKJAqgvlQNEFOCVOHY0";
    PACK += "c7yoA/uKMnS2woxoAOe1ZtG75rlCecO2F4iTqctVXjnDqOpCCjBa86d1";
    PACK += "yPfPFfGyrqVQGxW33NsmoRGGyyvmyrolCoXiSXDeSqpuMcNU8IqAjLAU";
    PACK += "xim3fcccNz2jOMlRi+qyG4Ea1ePlS/tiiYlmFGmbu1EduFGd8wHL+lEJ";
    PACK += "AwYObKB1VY9SOrA5K9k8juMEkkk1Fjaja0qCW5WB11imzve5A6O0yu0l";
    PACK += "XSryOpvw3/5b/nfe/23CpnA973Q6ncV/z588efL4N+Lg/WfpwrMiEpOl";
    PACK += "fVT7AvPXxxtSzLLBUESzCfvXf/3L/Z5OWIs6aX6XJMtfxf8Ed12GH1lD";
    PACK += "X/U8SKOzvblDNbzjzGQP/Kq1zc/DdJHfamnHfVdSPLKLcijTGTqcW59c";
    PACK += "nVHUda75octC+4vsojRy7ZoUpBbtd0WJDZWWVC0E7LpIjSdxKRC7vPAD";
    PACK += "RfrutoYNYqcT88oQQvebXqIPzGuvS/PaW1lM01J4b+h7pvC5/caPuZiL";
    PACK += "V+lQFtWgPPPe8R8ZUJbXpZdrvd8QQvy63JCiLLJzgbrkeKM6xUCfDeUl";
    PACK += "fTmBnOmpWwaX6A3sRiLy8HDQdEHp8kXhmSoYGA9Ghc30RV3gMbqFpi4H";
    PACK += "VHYwo1DtZYxAgZkKA8RkwL/dbllNLsjXXhVZzL6B/7lB1pV37igGAm0G";
    PACK += "t1uKRLVu9+3VWmuxkOvrvZxnS0Ue87iHdRB7SOWiEtY0ACLYEKiDf2hY";
    PACK += "MHneusoLe8tpgCvsl9q3KvwS4RVbt03KZmyTuuq3/Pew9160XT0M4iWS";
    PACK += "GvRVleI8LealGXEHE9zpiZ6OL/JG2yLrY3ifBmnEluW2Zblp2ZVuVMd5";
    PACK += "YVV2vHVj2+1qfX3Z0JhaHqyTnN/AbMQ+Cd46UScQJmW63Vo/yVkm7V0w";
    PACK += "wZXqrqjsXYuHrJ5UqX2CVgf9wuHE3jZ2CP3kwj15NshHmVD33T75SFMU";
    PACK += "Hn1STmqVSw5DM3wQH2IdLVLxHFQ0i0UOr6oAEl6Rs1OTTpuSlZy53hOd";
    PACK += "U+alCn7x9Pm5apddPj1dzIU3AGiY377mrIKYlJfEGkO1i4WAHrA1oXOn";
    PACK += "KdWNudx1lwCWZq63bHZAU7fIb5KLjeb29c65rS16zP2Z0YYeZWDJswsu";
    PACK += "B+aFVTkEbbtEjpV740pzjwnNi/QMnnd+r3JIzGqT0OXpUZUfM/VHHahV";
    PACK += "fucOacptbW3P19dNMfu6s9TrILIzTJRaCP6zis6qmE3wCpQWzyp+RjKU";
    PACK += "ToO8u5iKVAufsKkxVdOazWZ4VtmEHR4jJoHt1Mv7jxzXXPZKA7B+yKeD";
    PACK += "8kyMkMBqPBwIOzJ1rnzxVe01HfIAXcP9UNzCOI3sqADPy8J6XkqdGJNm";
    PACK += "af4rratWl683CsMiCFS4COLoh6QsDinTZ4B7ZwTc1LNoImL2LCpoSoGP";
    PACK += "JWHTCjvNoOGswkSHu5Do8HZUoDhwO5oITMpsBZ5h6BfizSDGUNRaqtkC";
    PACK += "CfYz2mcvo6+lB2CeCwpGDtA7g8mSMUazZ8q1NuxB5x5LAQsHoVsUGhwI";
    PACK += "MD2Ls3e11MDPlpJ4G5T7sx4DnVg1j0JO/HlcLM4q2B5ulBkOptCDObH3";
    PACK += "MT2Bw9Qprx3YtVrGyt37cdzLAStAz8mzKmby5g3lgpG1YhoZJ+qmmXho";
    PACK += "zA+FUsxeo1/Inh9UkQ1h6H4Yqa//Q2By8h/CZDIi6cyRh3uNqXXxNZLz";
    PACK += "olKgnmt7Rbv9w2I2X+0VBtdQ8A6r+MeeC7/7oUA4P/IugHXSJOYmvgN8";
    PACK += "tEfFLclltNaJtdhpDfJLr186PC8z7OQPkgT3h+A/hIHwXO/GMXs1iF6l";
    PACK += "7G2Fe9bCh1dqcJY1piLPgcbLnHfYTMNdTzPeYW8F3H8CfXuoY1i+CN5l";
    PACK += "XwVvtdwYv9Y+sXl+JPP19WM+zZi9nmVQp4AKSWRgYffpW3H0REDBL4LZ";
    PACK += "66/k+mEFHxeaJH8BgOyvQtPIrU3IUyTjO92ebPN/R5AlKWb5Ou/qpLiq";
    PACK += "QBWvY7burc6DwuT7yu5k/2unV/BItuG1NL7TpczUZszk77/zlGV3eIq9";
    PACK += "fvDAVbbIHzzIFhIGolgXipdTZQryiLomYSSkcDlu9dTh0HVjhuPRZR16";
    PACK += "LD9LHT8NVqesF8Ps5Ed37kg4RWGEj+1sNd3v2ZcfVr34YcXfiqM7d56I";
    PACK += "YzW6+uWvovn+l+b7uGIu9No81H+/w9Z7H+YUTYf03H0loh2t14L/OnEv";
    PACK += "NzFXyFm3Hu+/3H+//7jFSD4QjEZUo8YF5rDB8AhQx1q4dQhqs3e5CvQa";
    PACK += "q7Q3EGCr483oMXE7SH4EnJP2OdpJKJfg4CxcjLAK+ct9CwLoE1YYODQW";
    PACK += "iM3NAc2l/bsQXMBAXlaQdduGbsfoIbSm8Y1tYsvKJThDHh4kCBCEaPO2";
    PACK += "bvpJnAj6me5W0tzje/Uqc/7Q/rhKR8kXwcAIOM6Ki+SrWCrLZZCem1+5";
    PACK += "XNxQmRRC0/skZ1JU8hJylCUuvd2S4cLp3vNWzuoVojkRnjf28RpkIJkS";
    PACK += "1RMgVI5Eu2uSVAo/cy05F7NUM+LfjVhzqDgNK9zj8agXnBLJEXciUDx1";
    PACK += "ga2pYA34IfGa7F0IcC7UtfTTYSRB92zaxU377mx37t9dbKrtCAMQq4w9";
    PACK += "13/2l7UsyTi9t9gDRGPqDqMGoWaLCjUKoMAoWj0a+cjm8Fnj/EI4NAUY";
    PACK += "wO+GAcPvQ9M6TMM1qJSiKqmPyo3dbq+R3zuxThSPwMUVR/++UzEYGV+/";
    PACK += "b8XostVur4EuTxVyqxb3GCSVxzoORX0K58MoZv6AItmterGmf6xSe5vO";
    PACK += "K/g/qK4Ysc0mhgi2DOi1zTYTJJW92l9rYar6re5dmNLEThH5KvurKg2j";
    PACK += "RVL6iytFpHyVjjVFVSuUSGtEnbRYGD0HqWKpN6lOLnUo+IXo43ecBx/9";
    PACK += "Ik0KRVlUmAiCnHAooKsNLXZvnIJ6Dr/nTjH39CFu7feWdXyvWMf3jnVE";
    PACK += "hczkmjQ0RLOdExFHoCp9zNy2IdAlJKa5DmiiQTNO0PNE6yvMT125SRHf";
    PACK += "DRdG535syAkhn8tG7n37LjPYPRAZX3DQu9vDkKiRpRiHncCbfnA23to4";
    PACK += "UZruA3jKiz7eTKKKW11pamwiGTwqe8ansq9DIudHxXEC//F0ySpaXwGG";
    PACK += "Lx8CRqvVg55t3ttWiY7X7CgGBe4rJ+i6xvCDDtQ1rugaE8ZiolvuUYO6";
    PACK += "OKqw1VU2/yM1ixrz5rjV19N66yKtTiFopLx11Vr3sWY2vhdpHrXYrVa8";
    PACK += "3lq2EkFZxDcUoGvjJM1TB6UaiY2T2eASoisoNtAwwMafsLFak6qeKZ84";
    PACK += "Xqo3tRzWhHJY42M2oRzWVO2IsefabWteE56tTfmwWJ2bagED57JSK2Ab";
    PACK += "tWlS1QdvT0woKKlmDONlyOQEY/PwFhvHifmJWIQrPjYhR7r6knnAT3QT";
    PACK += "J6oC3mET87YiG+TdAoqyqXtbvzNloh9NqXMOm1pGasqnum3TB2MYaj20";
    PACK += "m9D4KZjH6R36Wyd6ZmMyw2k0ofA35JM2lxKpMKatn6vWs0Nbwdh6+I+N";
    PACK += "irIfjfmTIpqyCTJJ7DBmxi+Qwzgl0ZhnEQyCf5+sQfcZ5dAz9XjtPc75";
    PACK += "l6o/U6UQ2au0JjHwSkSw3sTRnWjsyRGc71lz2R41i+3ZN/Y2bt9WJcAb";
    PACK += "rGq335TRHnB2Y2xJ3I8OVR/U12N2iDTtz1xPL/7WPTuMk+iQ51mkeqGa";
    PACK += "Z95UDKsbqWvrIaBcN5iIbbhc4eO+xvnUv+MXTqczNWAYg4Ol/Vswya9u";
    PACK += "Msl2YhaLo+OVMz4z/WF71/ToLnz1TUW+yvb+8uI6NTvQnQYE5ajdhmXT";
    PACK += "cvbUsbOxxrZhT4qo1Vofm2YEH+v5NdvlNbZqIS1Wju0q07LlE2nzosKC";
    PACK += "UYuNaTrVsGCmMZu6BYNPxuqWbstUSW0/LLYkztrKhmPhQZUol+Gxf2DA";
    PACK += "wB1GY3dosCkeqbfzaBwvFm/hjxuiNxX5DFN5G71vfVAEu9k0MgopgBm7";
    PACK += "Pg6G4vDcME/pBE79CZzWJ9DscyWyKqLWaq3D54JK7dxNw7mbXjN30ESg";
    PACK += "Mn1HyBILEkomwxUcNBUc2IJAAXEumBqYvWhKpuHQTMNUTcM0bu6o22TK";
    PACK += "Tw9nYLpiBoZ0R7pBOaQjfeiP9GF9pCd8gkEnU5Pddg6rAgYb6u359drB";
    PACK += "PgwH+3D1YJsvHOqxxO5OE/xpPlriR/GLwQzc5O1B8LbeH/v80N8fZsT2";
    PACK += "o0MyOXtmcg7V5BzGK8dmZj7k5mcMk9s4P+duhxiRZk9xG/vqzwkfs58c";
    PACK += "HI4fKhbIuav9fDA16uafoG4+UdzF7z/70UN+wk7U4CcP+YnlgqD+1xxW";
    PACK += "3wmbHv081lvltc1ie+KYhxP+UEt9S9Fun7TbrxtYDOCZToDTKqLXbAxO";
    PACK += "evtm/Pf462TfclCv2T5/zU74QxhH8BacBti9uarpe7v9Gir9GbM9aNqJ";
    PACK += "bRoylEGfTziQM90T6skHDTqpNeiENOiE7fMTa42hn8XwrxMusUHhFx/y";
    PACK += "YXTCJuyn/epD91XRbj90g2Tvn5j8ug/p+vyZ4E81eA9rbX1I2vqQ7cNk";
    PACK += "OG7vpB4K+sqeuNCPV/HSH0vivxESZaQ1ZBPveQaxQGLc6Si5asr3lPwD";
    PACK += "h5eeorBoN3YGs32+17yg2Ws+Rbk9isnaXnu9MSpyAUNOCtx4jb/Sa/y1";
    PACK += "ci3Vy/zVjZb5q+uX+avaTL0iM/WK7fNXZpmrPvy1Bb6i469xobvusNf+";
    PACK += "Wr/B5rvBWl/5cbPmmxsgPNpQX/av/WX/2i37v9Ls5mX/3lv271cv+zO3";
    PACK += "7H/BHLTbU+OG/6WCH671GFwVyiox+9ushtbfGfEIGMR9Pu7te64q+4a/";
    PACK += "wF9GjGJKftIllG7xbnwFq8yOIAxyFu2zeosJDzfhY6vcs+lo9/8xUWtf";
    PACK += "iVrXNky1R/O/+wE/S9uHz+12xRS26s4+t3UvyewZSSOULq3gMdVr0fvc";
    PACK += "PyTpTbg79UFat1yLnvV9NeM00C8dK3UGjFuMP9TEbrfbK4VAXhMC/cK+";
    PACK += "xMfrQqCam7E/N9fKfHRK0O6gtEDhvIzjHlHBLK8TNSd8XB8qxznvW85Z";
    PACK += "beP9VZyzBTCzux1orMdNu/MvZJ3/mhgCCh0UN5yGwkzXbj9qHtKGlZYb";
    PACK += "xdiT6wYnZjAscZJ70tYZqqbPc14OwbWADYZ41Y3ZaQY+UkpeO9e2/kzj";
    PACK += "UX5PA/vtI0ik9D3lWc51WaINJdi+p5lxGuk9i04zsGmc6BsqFSO1/KdG";
    PACK += "EW48RWn0ADiW2AMD7TraoAdmwbJdoZ21791cgP+sO3Ok/yiOkxUPdWUN";
    PACK += "r6CyNtcupSSqgMivxqEMPBvUAOkk4WChAfOsyIepcoKyhjFl2jWuRaZJ";
    PACK += "kdjIXHPA2DhSuSD9F0Lo+z+Fp/mlow3D9h2wEkSMtoYr7emWCGYMS1gu";
    PACK += "qViOhleYV1gE5lwCNEGbJj40IoB9KwNL63nmdZVfYTeSDqPNTszRkeU8";
    PACK += "U5ZN7uwIuEofV8Gqe4or67G17j+u0O7yuKq77AwJfoiyVVQbLp+wRT/P";
    PACK += "rBpbNyFnT9MIQW71jQz/sEw/BrROUg9kia0wyT0BBjJAcGr6FrzqGROa";
    PACK += "W8AIsOjmOrdlES6aNVhQAS7XX9tejcyrLVi2QZWGvbQJ4InVx6WyGfqp";
    PACK += "bD5pRxUVgPYO/Of51bdBKVQuqNA2iXP9aFBqGD5lk8wG9Xvl6UCKUXKl";
    PACK += "XRfUTTLE5k1cQksmxmPIpJ0EGWvG2qEEeklayCqvvSp3fbW6D/a61n69";
    PACK += "6dydsDMw3d5z3TGxoS5sy8WGvqJ+/88FjRZRETOYLUtg18EjYjDBNKZ4";
    PACK += "gqlBAWnq22B4pn65LUswX6rQOY90vVfHc7ll9Gvgy6jbHb1sbyIFMjtJ";
    PACK += "GjeT2i5SlmxeJdqmHewe9PPT7/JK7ZzcHk1QMZl35vamqRb2plQA1Ktq";
    PACK += "p3vTfcGOxxc/7Kfy14rbQfDIdD9vb3fvb29ud9QgmKGs1JYF9zLrd4M7";
    PACK += "juULyA6tHvOc/ZGqRhD/rdL3OqaNqJ1z9JDi0iubY9SXTR4Bi0BHIWnz";
    PACK += "b7hkcyth6JiSlJOllm/Ya7XoFFXClYe0wq2+DX1FluCGuSQLsVeYOcwA";
    PACK += "2yYpeKHmKmUmoYMJGjEt81+p3CuVPi7gbi+n21Zes21rNKcw+1KG+1La";
    PACK += "fcl8KmcIJvj3h5vc+gDUBpsDcLlet+FrlO25zMKTyt+kigwrp8WsNqMp";
    PACK += "JID3mwRGctU1u08BaMlOffhUrRiFmzRnA15iq3ulPvGQHJteFnyQpOrB";
    PACK += "gKW8xNdm3pKdufU64zNvvc75rNZYwLLH8ET9hVltHAfJ3HwxfJ2XMTLy";
    PACK += "he0ctOcUwL7Miuil4LvKB7xUXZnzwgRUjQCEDhb4kM/d0kfeUrZHIImO";
    PACK += "4qugO9gQsmeGaqd0cJPMvU0yr2+SedMmiQ1S0zkX7JLPDRITELAhzxF0";
    PACK += "YmJxz4AF45e2ai1knHsJmq5O+blStQ3ZKRs5T5xTfu4Flt/aSs61i9e5";
    PACK += "cfHa3dnZurvobt5TJTrhF0e86Zt974PJORvpGTGfO1VpHWlz1Ac2E1jh";
    PACK += "neXSDY4dcjU/vqvdgu9usxHPzG6FL2mCYW7xo/lxMlJM4TyOFeEYNkzb";
    PACK += "6D+YNjaz59OAz/iQlfw0TuwaGbJ0wUcGdBHPqTnlo+u71D3XAHZ8zuYA";
    PACK += "TgHvjshuDHc8H7HGPb3UtBVcyCENmdNIQVMZ2SS8ZFl939U/NGOVazY9";
    PACK += "qytHXXgFruvpAglTLlimj2ntxQ7AdpWeksK1yNaqTs1O3HtULXjKNBON";
    PACK += "V76/6Ck5UB+Wng9VZdeGvdJSGI3yApe3yoF0VhSks1IgnWbaYfiyNTJ7";
    PACK += "7pGqGHJ+6W2RXacLv9/FgI5MbRYZL1UOiZmEoJ4XGKU0kzErpLlKzZVj";
    PACK += "xG/TgPVZzUHr7raLGCE+Su9Sz7H5dpRKFSdTSBXi8UIw+KAg3r0GGuTW";
    PACK += "fQXp1e0mgHbKa+lnYuD8BlOBKbo/HPyRPCsU0mKrFQdwjAJBmu71aRYl";
    PACK += "4G7B84/UoC1jQvlqYqx8xZ8VgLsZL59FL0yTvTDTHMOIXqjQEAn/p1Qw";
    PACK += "G6GH0+0qSqUNZdGAlrer6AWJb8n1p5QisqdT80TeYOXU3eoFCkeFrVdL";
    PACK += "GqQxOp8gzGaHTOZhZpxmtcTeqzzdXkV8QLXbsL8PkNUjoh/PiScoy60r";
    PACK += "Ra7gIIy3Jfm51opdykGjzbXfvQ8+ep7P64YU52KQvZEjIQmYILraEm/o";
    PACK += "NRLYSuv1oi2v9G+juYKFoG9ZIMSldjMVBm0MfWityt8fLV2PRR91N3xf";
    PACK += "M/iM5upsVbYR+gLbUq4Kty0Qf82iSKSei2mnJx6cFDS05wTyI2ycXBTy";
    PACK += "7A9IpID4yh+FLNMi19mctbXWvMY7CmBAhm6kj9NyBp6kQrKD4hofU/a9";
    PACK += "4h32QVGozzp0Q/25wIiop5DQi80l77CDCcAXWxc9YaPTrX5ns0sX/I/U";
    PACK += "Jtyrp8rzYZBdYs4AEhk8ADGzXQ6Z7XKS2a7Bh/dL6uA0WKEc6ytesA+w";
    PACK += "ZoKjQcWP+jy8uqVPF/bV7VSXBzA8YfTx/naSPJlA/qIIkDzY0zy+KlRU";
    PACK += "fjqOyBBu7jzgRU0rBhbNYp132Rf+eWXDSHNeuU/p4/tpjjwuKbOXsYp/";
    PACK += "tpv+M56v+qeadPjYBzrVVa1hncZj4muq4UQFn0vEtNZlsIuk4FNhC155";
    PACK += "w6aUEU46sz+xv+rnD3dJhEX9pS9m4D8E8/GFi+QL/6J1heyLa8xroaLw";
    PACK += "PnMqBwj+gcglnrN8vcWKQgmuBlMfC6uakqhG2LRt8MkvvGKfueiZqAqx";
    PACK += "Qk/ahYH/jAq5YOA+Byo0N4afiYTrhlLdVaLVD33nh1IMOC71hqNp6BsZ";
    PACK += "1FJ6ACbGh9vj+oEVSYgwe1Y45fNrTETEK9UmEznQOCSwSZSMfABqYylG";
    PACK += "B2I0Hwppo/s+Iz/m+ltA3kcn3RaUOcs8aTA1/KdWEyl1AjOKiCWplQP0";
    PACK += "UO7z0F59hVE5SU6UDj3lmq5sJEyzmgMnZ874AAkPSpbfqzYiDc5ih94T";
    PACK += "lVroVqrypMMGOJzJYENdsNNBuT+YaAy4ZLDh/WaCPnI/qIzJJA/e6tOi";
    PACK += "iYgkM19Tyfu0KK1aNPvHW9Qrrfg05yU/ZSmXcWIH4pR9MCrxGQNRYLYc";
    PACK += "8AHVGDlsI7gqYldhymWiq5mzh9Cz4ICIMacT2lLCowPKOrEo1b/U6iiZ";
    PACK += "v0b1G0sdt0HlIUHkIQHyUGHEIdutArtVNMlHIja6rtBAAIKR2o9HQctZ";
    PACK += "vjHSfMGx24/7/1P70X2NZW4rsqKJPXX7J6/rnFJuBwCHSUQFS81CZICw";
    PACK += "TQYHbFdZ3HsIhW4+p4U3i07HSya6iBvnttBk8ahgkozqBOKJiA+zF8z6";
    PACK += "gUk11BmvILUiBx5HBpOVoUReoInRb2zGdC+AxChq/jyNzocEvh54IBFj";
    PACK += "XiGGiAOH+WBWnhaYRHmxKBaLL3ZvfPGrB66+3dXRQMbTv7N9jw1kdJ+d";
    PACK += "hl/JQETUsErKMvx1xZLZhhAiIG5bSk2+WEwh0QHk3bT6fTdiUxvkTeJx";
    PACK += "t+5tw5lI+pNUTOH85UtW8Q++st5ZB4BGldU+CvraplQVUmgbEfPeQ25R";
    PACK += "PQbbIdj5uLlhpaU+LQLKbmVdpL7kxLyowQhBA0Ang0t2OYRUvu1DHzLg";
    PACK += "fOhD793KKSaU9w4VbofUrEu+g3ZobAGBGKhsvlzksMH8YLP4Wt6amIlI";
    PACK += "5ZUKPO85a8gzgekuuuwOTSfwnUQYPaX5eR04G4nzgoDDKK7vTboJkSW6";
    PACK += "kRmQGeLjzIoBoUpKyWr7OREQHIabShtETT3854Qs/Q+4vUICKwgFGEg3";
    PACK += "/xZ94wqUiYKpJINJxUairGRxmUDiv1mZSMqW/ZPL2RXX4ZNc6HXtntC1";
    PACK += "3VAe8nUqewwztnimn8ngC4CnSPDKgBQaaDQRxf6YEfumDK0cuGY+mO0P";
    PACK += "GWr9lTGQUXcBb2j6I13eXnRqp5qdlzUbymtckbz2Ui9MsPM5YBY/18+v";
    PACK += "gqcbei6JP8mPNJIMHkAU8FVD66E9BSQHNk4iN+ls4bkSPCo9Fvy5jO5t";
    PACK += "3e/s7uyye8zXfT1PvZIvswjJelhsbxgW22abQZmThjLbQZmDoRP/G+SC";
    PACK += "2OH/QDZiCGamsHfKy2ipxSdqftYvOOHce8/BRflW7rMaReX5mjHL6SxR";
    PACK += "SOxxN+kOHQy9jDAi9gzF31LviN/3jnhcXBWvgsVVWd7IX0IGlcmFw9JF";
    PACK += "VDF51D2O+5DkD7xO/IVxJFh1zOjx8fP/VlPUXPy6QW+D0QcuYFMllAF/";
    PACK += "LEvf0YTjqP1al1l/pkB9EyfRQwHcAyZb4q8hibrlm3Pkm3Pm1QVcH2nS";
    PACK += "2YSO0cfeR1gPYETa/j3v58k2U0YRNUYHBUmg2vN+QRJZOFQFeshVUUww";
    PACK += "c3LmF5VkQT65IVXcn/juGXsmS0uu5S5p5K5Q4ILcTO5XoElhr+A8j/+A";
    PACK += "NFW5S8Wec+IVRXwBFMUcwEp6JnR2qixmfyoGTlLPhZ9NDWbZf9Ra9LN3";
    PACK += "Dc6I+FmEzhDGHKQsgoVV3RXufowPqibphVk1QWxYpTQoqY76OS+iFIYO";
    PACK += "pBdftEUMKCLSKhFzztLY5B7yHc2cmKv1D5n1MNM3lKjKtMSahR5mmT0/";
    PACK += "FAc3ALqkV+HSTmlGpxRBlGE+WeN80gl95bGVbqwJau0HlRtL0wu4QUCO";
    PACK += "NTF6mnPQM3asp5vRzeQrXYN8dgNzx1vXIOLNOCSWvdAV52974qD3fMav";
    PACK += "pBgYVLHkT8Hmpdiz/izqp4GgwV+GJ8Mff0xnmC31XChAS3M7L4VENHNa";
    PACK += "+OXgsphX3i0AONOXhmc1v8b6Sm8XvH4svs0nyjvT3BgLKY3HprrnUqia";
    PACK += "j8wRuP+wmMuhKXR4mQ/3fyqUtUPgLE3LR3gBOODfMnGSlq/FxYGA4zPN";
    PACK += "hEzWukv2dnLtmDm4XMI/PK3RPzxDwgPrmIklHfE/6Yg/KhtHnH7vpqf/";
    PACK += "cxnBGtrq3FvFA9Tmq7FbXj3IHDXN/spXDddlV4JfUm0jT6yqn/Hs2hN6";
    PACK += "SVdWOFJq4/j15y7lHMD3JhULdRNE5wkYkf+csCYaZLVqyWSzrLZfl9Vk";
    PACK += "XVYzW4liONelVXCCtiilNelUDaJqz/cy2Ibf0vo2bACMblj/qlqyWYNU";
    PACK += "boJ/LxXHwcVRxyVU52e05wJ4NdZUPTuqzAj4BIB8Z9lMCpoXygem5TUF";
    PACK += "Z6VVh9ryGwBHdQBlKOd5FFuAKdRH/DXVkcTPL0M5Kdfy25XWCzFPW2RN";
    PACK += "SJleOAV7VPq6M8kKoju7XgMGZfOaBixfamJZm7SnKLvwrxvpSORVOk6F";
    PACK += "fCvFOP3ZcyhgOSAYIlhhDgCDCEzosApjH2hwHUzQraS1Xq23DlrrAC48";
    PACK += "l+vrrPMAvBGqdd561lrPvVdiBreTlkGRPpisr7tKZFh8vZW07PIKVTPL";
    PACK += "6w+DJ9cfBvvDleT8edpIzs+GTSR0b1gjyCdDSzZ/DimZOyvMrr8Yup1L";
    PACK += "JspEwRRRKRXx/Qsb2qnRzZC9BYY1NNuJ+JfbW33/qHPMVH2NUhrS8YZN";
    PACK += "PBk2b93ZUC/MJ8PrJ+7V//cmbv+GE7f/D03cZ8eWBrQz+btzuv//ck6d";
    PACK += "68ZjYTUzmKdE+10ptLqrSnlhVrEOSHLPnNMGYBOLGBwyaIpk/A2uGo5j";
    PACK += "cMDnDmIoJXrxGl5djo4N6F+Vm/FPVIMg1UtND8B8cc/ziyasiEb7/Zjx";
    PACK += "q7R8VcxzwMCrn8SIeeeDDJdx/xNIsOAehFtD5HhwHIoqWIHGXFGvQmsR";
    PACK += "BsrkowTigj8X6MLRK4w3KXiBmyQqUUHcB+HIwDANSFZDYxC02h0luy9S";
    PACK += "XcexbeOBymzyj7UT/L267H+uvU8KOTRO+D6zu6qxuWqs0zI8B2lWxjpv";
    PACK += "0Car1pz7qG1gZRuILak3EODwTANRGHab50NJnYxY6gGZOzR1Y+LYKE+L";
    PACK += "OeBST2eQyqvSXrLUQWJFmUhi9QkBiQM/O4cYl5Zv51Ioxy7zan+tkjgA";
    PACK += "iwVcgRtUQl2kXgcQ52tdlvGzCo2yBNM+MNQUNDrbKEj6Bf9TRAUoKfgM";
    PACK += "kI37z6qEIINLv8qSAVwyl1qZ20dY/SxOznAyAJOtUnmEajyGGlUCG2h+";
    PACK += "a0lE30g8zynJPwJ+LAV6rcIVxAX7T2Hws78Eg1/EjBDCp6UjhLabzOXx";
    PACK += "MXP6Kc2yAzEU6bnQoL0+OuLKgrgQXIUfXh8+fLJ/cuN6f1VeV2+nQ7Tb";
    PACK += "H7ONBtITVaYUCwJR52k9sIXm/sLgeJ4znRGsdlooqEdwjMbQw55Jn0WX";
    PACK += "8rVrODNFzVouGteyK4bLtojjlU2Cz09E9VjI9FzfeyKLKY4YI22hhk99";
    PACK += "JBZAdVbUS+ZxVe20UhtanlE7sEoZVydBpHTTpON52Qgumm1cX3CxiCqT";
    PACK += "zo1d844/Hk0lopj9uo1hNSsLRoro65atXLeZmQ0t12EcVq4OjV/NE+nE";
    PACK += "43TU0DwXrKKVRGRfHOpjz1nrW5AwD/1f8nVejCKpvD+8pHPSYK7mWg9c";
    PACK += "gG/Rv/4LxehbE0i1M6jSfHKrrICJv/Wv9WJjKspyMBHr//ov+IUPNM+m";
    PACK += "5WfBSsV/Vky9lrFROhFlLY70ZxGkCwze12ZqVJwa3Zu6qevTR3W/VnOZ";
    PACK += "utEYFnlZZGJDoGqgMolLVX/z67No5Uut1/3Dpv/6JAZnrwYz7zzW9xLE";
    PACK += "CLXmY3tw5sBj3OnCXlXR0VvMxjryKw1wos0WRvmsfC9sTLVlREgTDyCb";
    PACK += "3gHmj7gEPzeme71kOcl1ck0rbNoZZA4aiAQuA4LIJP2AMBMCr9rqulSX";
    PACK += "sGSUQbMau2FavTS2GUfO9dtFCPlbeDtlD/V3/k659lM2A4tPoaIL6y9x";
    PACK += "ofiLQ1FFR9VpWh7HyUW1MRiNIvilkYpTdQIPz3pws94ks9bYlX10iIs5";
    PACK += "NWdJmrRaS4AKIhP2qZb5ZJbmk73B8NQPrb7yHmFz/5iY3aza3pOIRIvu";
    PACK += "Utr1Dz27ACs4o2KYfYO5N4AhPh2UUQ7m0gz7DtIUf+ppC5WMVel8dcxz";
    PACK += "Z3qHvjzaXdVDTVehJxom3T8MFV66lqJdzIm+lyibrM1sRtAydBZNG/Hb";
    PACK += "CHP3wkufGaLva+My5FHqu7jAnZ2t3cSR3u7mPWa93Lpb3c7dTfO7ze/s";
    PACK += "bN7r7DCDgdDFlRjCePXV4+5dAKNWe7KLY4jix2GFBrUu5sA05uluzERM";
    PACK += "GoGNsoJsxjQ4+J81cPA3iNQNJnECulAK6memEhjYxg3Qvqt99eLkPMeQ";
    PACK += "JSwUpAn67A2mytcJunbLU0kxNtMwynFRgZLShVygrJdziA4gyCVrI9EP";
    PACK += "0BRC9AUz2pudnS0zCm3+74zlCpkAE9F/b7fzdvsNmEXNKwveZbrzaLzU";
    PACK += "nacRKF6fqMO9Nh3nfp6ORu5sbT6PirjdLjxdCNlwORKLgXR+o3lz0b4O";
    PACK += "meruwPoANKmCPR5q1k+qfgqAiFLNYlrDjMErIJogNg4AQ1UKAJ5ERJl5";
    PACK += "V6HOJqUWs/gwWcytNTTlhR+tZaAAdDcYGsfMCV1Jlkcpk5gpCrHZ1edt";
    PACK += "qJSZJKvqcbMjAP4a3JV+2W6SK2oYztmaP2ei3vhK4lfCFkIyb3Qiqfyk";
    PACK += "J5IXdGTQTuyydCAR8OF0lHuE7Z/ap7oCVhuAAQlDomljAtHbb5SKJTVI";
    PACK += "YsX1gSh4dOCagOi803Q0EnkrVtF1hPrFoeYSARFeapPbEE6at0WRacHZ";
    PACK += "6i2NF+HtaJ6zSxGzS7HguQ1aifK2y7ASe7kpudMNbNhPLcDXwwxaRWBn";
    PACK += "uKuGXdNS8euWNoRLeY1XW6n3nw2HbOxdkvufkjps2eKzS+6NRWMgWpxA";
    PACK += "cLBfjyFKmsJl6mTG0SP5VDxHL0WjI0KHbC5LCiWlsy7giW326k5305HV";
    PACK += "zc79u92dTQopTpe03oczSOPqy8mWxQMxuQJljjkp8tpJIf8HTwq5+qTI";
    PACK += "m0+KL+FJgb0zXV3r9CaQk8GEpKu0MqZvFdEy2eh8xZq+xuMXCOA8jUz1";
    PACK += "TEKFxuPKP5JSTmpjc16FxE6rROYajCM1igk2QAJeU3sMqNrDxMP0B6Du";
    PACK += "GMQJwBLUp5EN1PwNNGs84/lqlcapEaVmjRqF9Cb6h94pKf8rtVOjIiLd";
    PACK += "uFH5xQJBTuRiAZFVg7jdflpGFUuZZIOYORiVUT1GRYv7I1ACAMORwkyW";
    PACK += "YTmmqwcWt1wsXELExWJY9aOmoVL6H1gcM1gotSpjFs35sFosPpRYas4k";
    PACK += "G7ESZqcf/WrgVqtu0huoblaX9DuQXquwSW+qsEmvU9iQ6n6lWKlCxQrA";
    PACK += "Qf3tl1mwB3ktVoyXMTMbE/y9S42XYTcnHzDJ5/9ZK0BXb9wlPCKhYc3q";
    PACK += "xIINeGVASyuKvNqfJ49FpJ6xuWv7ADazz5WMCIUpfQpj5qOkFMYELPZL";
    PACK += "oDBlnERlI4UpFYUxwvfwGgrTi2Y2IfzfJzHx/10Kc6pJAKUwpaYwrEZd";
    PACK += "WCN16SnAn5ASkerPV1KYYTOFGQKFOW+gMANKYQZIYc5ZCVakbtyPZr8Y";
    PACK += "PDXcNxm2esmVdKY+hzVCYw1l0FZ2gybehN54la6gOk21kT1L3rrB0qSv";
    PACK += "djub2yvJVdPgASBQIBG12yPvJs4xDPNfaN9//hHsyQ1o53kT7TwntLOE";
    PACK += "uOT/Hw2JIuQmL4TPFRNw0gDLQnP6WlVZQ1FRaZTb7bXUCGNZu/1YbWfw";
    PACK += "EtQMcgEBT/Tw+HPi0qKbGHW7d/OVWmQ6FjpqSquLiLco0QNYJj/tG3gX";
    PACK += "7uuiEJjQcubqoQJjA2tborn3uSoTupwqGw3pcadBVnrjubGT5PbmxNNW";
    PACK += "2r5KKB7crd3AnK16jYKRXl+22/p1c2rC6CtgJR9Om8z11wY9JqYXZA/T";
    PACK += "KCNSzObOLiPqPttH6NQ49dKjaiGWZEhFZZJNktohLg0jkr30LwneBK7y";
    PACK += "V8qNR/boB/GJNSxhNkel8pynoKOecyqyNoKurHWTKDO4o2zej0BQI1Ji";
    PACK += "d/M+KtRWYLcYtRJozFEnezt6xLJ2N7aAjXYroSwpaqc2yaKtXKUsppKt";
    PACK += "vB+oZPpGEdJNBIVXsvfvJbaE044oHUGUUhURrPuxgZwrQM+gtYSFUbKw";
    PACK += "lF/BncRoiJh5OUmXLJK6ScQaDk48Tj3TAU8fqjdL46Tg7zPQBjLj6ioA";
    PACK += "CR8dZvSNwmn3iKKvsFhMwu7xwlwF0ztKo7y+y8cpKM3FHJgplSwkq7sD";
    PACK += "uAkB7DwyIRba0szpaxWlBF2Zo3IFozgBvoMMa2rGNLMaVcTkIzlBypVj";
    PACK += "7ObK+BxHqR1yh3GVqalTtUt//KU//oBV5xIp6kUhQceaAf8jN8r5N9jy";
    PACK += "TxCtMfN+trvbu/c6nd3t2I5Fv4BXgaSC28Mb0NSmZBpdkj8ypZJemim1";
    PACK += "E8klaMm8FSiaphgwG2x2TpjthJCd1FOXXUOCUhJaVy5ZESyYlHmr2YOC";
    PACK += "/3fetL7k0uqvzHQLblcuk0qbref7PIX7onnCY+ZvewRx0CFGcfMgeuCD";
    PACK += "iNJGJtuFZkd0CRyJY6Li2o0JDgGZkkboK+lot5j7ID6wxVd2sgLkW9wT";
    PACK += "hgJU9fzZ1MmpHgXvIksfAlYzqzMCaJrEre6fIyTViHBZLRv7RywKeqsT";
    PACK += "jz2wd8Q+m9Le3NntR0TFuHOXSf6ziGzQwuYmGPF0f8AgAqd+04niWBzT";
    PACK += "qcozN6p96xGazBAaee3gkxXGMjsBeu9msHuDvUuXWvGrreuWrDJ+1Ocl";
    PACK += "jVeT7LSRZBdxr26WMFEvZiiViRfjKCniIIJoauAXnX4ZnHrITyxegqE7";
    PACK += "Vryr3BhNSquGlnzOCu6ya9+PYzWnYG3TkSl0QpeIuRqlbUorFG8yEovF";
    PACK += "XLfoq43wt1CZaftOqnEwt5OMb2pAS4WIuZtk/B69s7utsTI376mLzZ1d";
    PACK += "dbHT3dSPOpu6EASeqKvtzn1d7F73vikHkCjqcmvz7q4uqazcqgCas3RV";
    PACK += "u5vdbV16Z3N789498zFMBGu+h8p//UnUPulX7m3du7fbMe/s3r17d7Or";
    PACK += "X9ra2tnZ3t7Sb+3e7Xbu3duFkdjyhmJna/fe3c797iaM0e697a2d7Z3d";
    PACK += "APwz451lxqMMKGY5LzFHhE5TkMY4Gf0OQHarNQp/cGErthb9kO0vnil0";
    PACK += "9wyDXCU6HkMAjc0JM4/icJN3g01ukWkoNmY/8nZ0bbvzT55bBTiLKR/R";
    PACK += "A2garwwNgNOF8OhMpUj3lnjMLsB3FVPWvxe1U+KtOHoi1teP+RfB7PVX";
    PACK += "cv2wYl+AOU1H7Cv8Lc6FHGfFBXtYKTdoJLOSpp2yMnHn/q4PIFE6SB4v";
    PACK += "b4UPSO+lTHE5KyB3i0XN9IAU3hZ161LA2jnI91AYuErLR4Ph2cVAjkqI";
    PACK += "R0Qp1AYc2p+H1UAqXOcOBhImklWDNAPT5CDNXgHBzZZJVGyQ6jTR1DVo";
    PACK += "8PyNepXIKUOlkOx8A+rjub6AijmV6x/+2gpMsFMZnBJQD1BH4+vgZADg";
    PACK += "JYhkFUkjDUku293FpnfwONRBIraEYKwigRgPYQFWhYc0S9x9moWpdhvX";
    PACK += "CETEOQOXhYmNmx76WK/Cx3pVUZ11rFdUaVvccJULqBHtVYRor+SGq4A4";
    PACK += "HokQ6dWuWXQTN0ivbd7F7FDRI5DDf2F2x+Zgj/VxkamzojUuJC60Fo56";
    PACK += "btlmlaihl7u0Lpw4HpH9j9DABCEbuEvw5DASSs4zwjpm9gOGYmk6lLlX";
    PACK += "WO5xpDF7CyjHECYAyDMxoeatb2afmOar2N3Gj/QyfyHx7Jf9cd5MmUkB";
    PACK += "5mQvlrlmMuhlxsVSNbWjZZigtVUxEdWpkK3E9EixmvCf5gWCk6hpGp2T";
    PACK += "S6Bd0hbfq5Dv9zab8x3TsQq1G1bocjXnFQUuJ/lH/AxKfu6oGBFQtCoB";
    PACK += "8pNQxwuPCzP+JDTAwuxJvfVqKTi3lAAeAjV7pIPlIC4JB9mgwsvcqmC5";
    PACK += "ZUjd5iUrXrgl6ZZnc52kJn/5rpyulxakRG/JimRQ2EreAMIaAxWcx74k";
    PACK += "I7jvMXfJzFjS4nYbnQTo4+3kXeqiH+pZ9vy6Ook5E9CF98SoELPQsqd9";
    PACK += "dG9HpxmTfv6uOLxhdo/+xlaCPGyoyrIcrWGd696afaR29rRpd+NGucYu";
    PACK += "tZCH7lsdYVKvSXC7zBlxfdJzmSgJIXzL69h91bFwqSP3Xj/nkJM3nbVn";
    PACK += "co92CGFdawNFVExZyBtk+ux3CRg0IJqipF7zYyY1Vjndh4oDN+z6VhK4";
    PACK += "nHWYdSJb+u53Or7x+5BNUvZoyD4Me9+H3I+hc5Db5nTPPaJs/Fx3APpd";
    PACK += "pxyMxcZgBpsN45gikgSMYAZB4TVMJ5kHFCH3j/Mct3L9OCensTrM88bD";
    PACK += "PA8P85we5joUQnmu4lmeh2e5eUIpynLZm6TUrXzZe+SPnB+eVHM+hBVB";
    PACK += "I7jQruInC9A+tNgTTW9yzQKk+WxetZKMPy6UpCLVFWR4APR4coKVIgMj";
    PACK += "e5KpAN2M6QgLdXohfi8+kLUHYU1AVQZSDKCuN/a7b+rftUehiWkp8r0s";
    PACK += "hewrDaZeaZ7W4lyKfIj3x1m8fFioAE00ZPVynb6vkNEAgoozRHyX4Kv+";
    PACK += "5gIw8GdCVpcReOpkjTePBsc6ojAdRyifldVlJnQ8w5xDAaw+hern8Tys";
    PACK += "JQUDQI4gYlfgu3+UHvNWS7t6gcNUazTIJ0IW8zK7PBTVH3ku5LP3r15q";
    PACK += "f6qW4cbN73I+mwFwPwp1ebU/SjEk+9NA5ir5p1fqGRLZtMiD54N5VTwp";
    PACK += "hvMSRvBzXu97v1gsIpgq1CUVmE1Vaf8GihTHblSlwZ2SMBoqs4wOtoHx";
    PACK += "SQx8YtMIg0fHHPCn1/Smm+vxDgccqlVERg/1WsNYLxZlu1023W+YAzdv";
    PACK += "ZVw2zdv8KD0GL4uj9Lg+iXBXTyM8scMFVg09TOCUz0tFyLArq6a6D/Db";
    PACK += "/XLj5OS0mmZmvOZ83p8H90oTbwxa9hJxxvy5KeM4wW/ZddM3jjRrJEMs";
    PACK += "uaczw2L7/bparfUyTv6ZVde8yCLbH2xzkR8OZZFlrXb7TdQq1TUoOApl";
    PACK += "ES/NIDcsSsjDldcGRK8eOHxhiQIkeuAEOoh934rlsvehiUDDYSaDos7G";
    PACK += "+Tq3mAdr32NNhIWV0TU11kacREW2pBlJU6E8iO2BWTWkJgcJLqYZQRy0";
    PACK += "mXCsQeKzqJQuD4ssG8xKMWoledgCGcqEeVMLZCgBSotiAbIvNqKhSera";
    PACK += "a1fimyaIrVeKRjw4Yq619zSvbyUJloNVS7krVLHpmrWuESkxN8mhykVG";
    PACK += "+DkmF6sMW+rR2L+XOU1CRix3uOPh8//Rp8kXV33I4ubQ9wBxjqqYARaa";
    PACK += "xPhNrtMQGf7hmfZvdlKL1QjrvzuJTs5m8jLh37tal2s00ImXvGnbcJwS";
    PACK += "gqCZ40m75gEVd0YZ6E+DkpZp9R1NIPESexZNVK4jETPIhuMMnHvGewLS";
    PACK += "ZmnHn/BhrbTmqz0Tv1lwxrT/SEaYesrQhGSlP8BGWj62Mo+jI2AYQoE5";
    PACK += "9ORh78m+20uj9yI2GlrQIU90dGI4PjvJC5g6HdsXZJpSQFjKMbOGeADj";
    PACK += "qM/eRzRIhhmXfvT//6VXv9UDrkmdEKnmvh7I+7u7Lg+M647SwwVZsXC4";
    PACK += "IZqRzr3pkg0l83lovaLl0SdxDMapo0we84IJ7hukmGGZR+kgKyat5E3U";
    PACK += "Gg7yochawLXCr6woBfygNDUdy8FUtHCBGz9V9UNMvwGlfRO1IM41fO88";
    PACK += "HYlClxzMR2mhtFwZ7/SyB29yk6QoW1+P30Rv8qPsOKhAhT1j/RisXGvY";
    PACK += "dKKrT6eDiWlhluZn/jtsRQNHAmh2iYWrYjLJ6l1XskVaApQI1pPm54Ms";
    PACK += "rVVlJAu5cXIhQd7TuKVXF4Py1Tyr0lkmkrW1YmOqfyyvqcwJF2Xjh5UE";
    PACK += "UMRGy2lOAWT0CmAjizqvZ9j54ig97qWN7NOcW/apLzegFZoX0gxssbGK";
    PACK += "+1njfK3Tbn+Xkfcem6Pphh+5b7H5cZyQ72nWrN0OP9hqrf9j34S6juOk";
    PACK += "zp8hC2z4s3Q1fybjZbPU+UqC/X2O0wROc83TqEoNyqh50aiNNUNpL2kU";
    PACK += "G4sVgqH0BEPJw7xXkkCpe2yd9oLPbBZCzvn9fpZkGwVEyD7WmQeZCo+r";
    PACK += "qlny228XFxcbF1sbhZz81r1///5vP4FrV1kHzgcQ63OD0v0c5Z2hTGdV";
    PACK += "C2KL0w2F5K9zHEatUXreAoKcGtGBtx6o8r8/+O/f9FVLJ1qfFudC6VV0";
    PACK += "5nD8EdsVJjfSkizq+udydpVCUuK0XKI1sfY8ZqrFaqrADxwwb+w27qf2";
    PACK += "kq91kOP7E2yoKV5w9TuO46RW9etDhMllQhNtgURbsu/qYFrrot8jPVoE";
    PACK += "pLA15nL+XWkBrqPpgtJ03BTy79H1+rt/g7aLuBdUUqfvDY28EY0XhMbX";
    PACK += "62ii8w1fsrQedTiZ1SJR4iu8DWz2bNgvva/F9YeBJIdBtkrxtPrj3imh";
    PACK += "m/zmuiY7/wCpTpAMQl7U8VEohQNoIEIaWVjM7flRcYxmZC1y9i8GkWAl";
    PACK += "+DT+ZcnfSsWXqg5dSV2kJ9sXU3C6fqsQtFYrbrd/5Koh5CV7sOAzJecX";
    PACK += "N5Lzi1/I+cUNtEtF3Lc9LK6T+xNb7CxFuLcSnDNXnzYCTxtwF13rrj5t";
    PACK += "BJ42zYtVKtvHmpU1S1E9rCqZfptXImrhQzwyD6pIl43j5uXtSB9ZzGhx";
    PACK += "V0AfhVaRlTAFfhlofiJNlP9H2qJ6ab8cOWdXaVev1Z8GY/ttXlUwLnSg";
    PACK += "68ezG16JvbXz7+XZVuQKo1PNbdNECFpYLkP1SmViiYMjujmaeIVouZso";
    PACK += "HMq6lPNBHSaBzh3YTSPCEOgXpzm7mTyDopYvfrFmYUYbzHx5JmiSPgbR";
    PACK += "qw+YEr0kVJS14BdOnIup8slZHJERtG+ynDkgEzRY+XbIYEhuxGVeU/my";
    PACK += "aGCwboExzeew8iT3OaxYcwXvxU/M0oywVHos6DzIVZOv7JHPokcxqxsl";
    PACK += "f+W6X4sMqBstVRLYdvvQM5x7bo5eIAJaxufDSBl/3SK+f29nt4OhC9bs";
    PACK += "VXBcH4RHlSu+L2hS97Va/tfuPbUca4nxWEEhB8LgjoaKAFa7UMOvphA7";
    PACK += "UeugGoM6CgFx/eqpiYIOq5quUXYwDJBXXQucatER0QB6aSf4MO4DnOlM";
    PACK += "9oUKHdrNiOLQRitn2wVwKLqkTI26B+AiWfNoJZqiiBqSsRk/9ND84Ftx";
    PACK += "Aq6B6ERN5JFGWYTod2Jj89eDgCovowYioAwyWu0PUFMXdTumug9pFDgG";
    PACK += "NJS+e2M9nTKY485rWniBO4B7WVnZa8E7KSeeccx498doZn+dR3hiWrL9";
    PACK += "Q2G4X+eIdp0bWsrRT4ilnueJ54xgPskkTz0QCU+i9IVNLxjQj6UApXXO";
    PACK += "mgznBcdQHONz3eZa9byLI+J8nGy8Qz3GRsPJmHAF42cYNCDA7DGlGlzf";
    PACK += "izoaSuH7CpkvWPpsfNJp01Kq+zatTLVHkWmrLtTUXD9Spdb+NDhCa+Eb";
    PACK += "4ZL0euVPaqHC3FOtOMVcbK67Ye8dcheYOa5UCgqD5qPkcB0zZ8Ry9XMZ";
    PACK += "WFbU1gicUhabLiyPegwqd1C7+N5F8e8XuRf5u3kPgUHc0jVkUTthu1wJ";
    PACK += "azLGU+UwA697QY+aenV5gKKSr9oAubcBVCs6sXFoNS8Rt1YHPQRxp26t";
    PACK += "t9tr3+uEQx0jm//7XRTfaXKixeGAxrm4t782PD3Pd7ePSgxlvwodElNM";
    PACK += "fahcdpmDurLl08SWNI69qWVfvYmEVIzqhucpXJlRs5bAZr/hd8hieBFA";
    PACK += "OfHnRe/Sfg6LKsnR3wqOx/C8qbsLFcqvvTk6hf3qPA3NqHCSxkyGjFM/";
    PACK += "uhQUCEqfsKp5Pvls79bqi5PwPNq05ya5t0PvLUM3xF1t/yLOko91VreV";
    PACK += "VrLVhiw4bZQtT2i+xbSZi/YduHN3gd7+KktQYO1qtm+5OiNdqeVELDd2";
    PACK += "k8/YcUDbUTP/fF186irOuKrBGdYyr0AqemAjlxbk628MU/e+6QA21T3w";
    PACK += "maWbsj3X+crh4l+5rKw8S5YVes59UljoCBd324OHPRRVDR72UFQJAGwe";
    PACK += "aBOGWX5+bia0y6GguebYIRNb74GTALJtrlNe2iS8n5S7v/Fh8TNbuszS";
    PACK += "qTEXq0qaKsAefis92Mj3E+sQ8bXgZcYE/wxJFN9DMDje1iqEtMiRYrUw";
    PACK += "54Pq2VUJdxLQvtAiTOQjenM/Hy2VvCSSq5xHMCS+/EiwEj+m4mKxuEjz";
    PACK += "UXFhU1MCFoOpDcrS3yrXkAS5S4L2bk9BGIF3Z87lxiAfnhYSQ/yVrdXc";
    PACK += "ejMeQ8wYBuCBDkSB05pf6immdHTSLyvspR7eQ8TItP4bt8RSITOAV9Cd";
    PACK += "LivhvwHvsBnvsFMumHaDr1DR3Os5b8xh7xRWx2KhI5pO7ZfWON/CSPh0";
    PACK += "PYsZlCoWC7miVMnTdRmzUyqwb4Eqf52fOtFfa7ZjFg35KbU5WH52xE/Z";
    PACK += "KR/2TDPTcXQK/hs6VgKBX9G+3m6vr4NPkAq2TmMGdwu4O+PqBIGAcfUh";
    PACK += "Gs+0ZiHSQJ9xykdsxE83AHcyRxXC8pQPlzkHb6I73cWixL+aVVOrbo7L";
    PACK += "rFya/EW4H3IYQl2ggwU6XgHs0POCX+EkixHYMQCb2iymA1hBkES8zIAE";
    PACK += "HPCqd2AHBbYtP2DOtz0KDrhuR8stzuE/JtHvB2D9MC4npN6rih/YjNwA";
    PACK += "y+MlsnRCVkefr3GDs3rg39HdSTz39HQcnXsAmpf8POC8z8gddXBMfIAp";
    PACK += "PlmFiRJ5uFKIMwX0rX9JAKYuY3YW9yZhmoRGVJzxkjR+C93hp3yltNyb";
    PACK += "0tXe7U+pJZW3Won3/H67Pd0YacKjzVhwi9rhagUCvZtWWOqjy4jcgTY3";
    PACK += "UDZuQf4QSzQ+YTiAdkM+jJUThWMTBYmEMsvHlIZVpAJhDuxNcyqf828l";
    PACK += "QwrPzgn6dB66EhGGX0nyRh7uy40wpbgMsr8CiYSd3BsViAOKKVbaKjOO";
    PACK += "CdvLTBbsnr3S4LeYWNVA5s4UHFURLzMd4KsRn5UzNXE2e5y5LNJ++31w";
    PACK += "6bDxldf4nMPLtPF5rfFw3ChtZi+3bZdRDKSFNhEO84o2cZpSfzh95Iff";
    PACK += "p4gzDQrgnQQS1/kLSfB82ZQ5uw+pbhKSAJu05emKXK3VNWFITyGoJbbB";
    PACK += "+0pICMV3EQAVmFgBDftNEt+4L2EV4lYFGklmf2SS/KhS8uNwQn5cTI6x";
    PACK += "Ub6SwmGK2GaGeg3RpCgRjRgBPryG6Wf4wVCbQvbXkCRxFC58wlxuuctt";
    PACK += "grcwgLeExwncNHwRvqjvxV4EFwlhRNXZTcIYe0JHbuyAhKAud91l955p";
    PACK += "hHaEC/3rSO9iE84B0ZQrYziB2q25+mwPyKCTtXyahtj51WBiUPN3Fgup";
    PACK += "AlT81df3TBb3+jlhLTZSTD+nThwkK0necC8KqoggEbGrBXMve+/kiNiG";
    PACK += "ChQaLCNipTDSod9FgUcTnl4mb9ZiURnjnoXqjSpq73NhNlKF2ETCgZNY";
    PACK += "kxJMuR0uf4ots9H43I32+d8c7aYx9Ufhxj04/0UPGp8j3/1cgz4HyPg2";
    PACK += "clLHp9a0t+9MOJUXEeRyHtDM0u+E9cp/BybZvWI6Tasn6TchP+TTEMMT";
    PACK += "RboV5aK3AHGieYJ5fGVtut6BkInFosgxxb0xlKqZec4yflv0dJ9tJ9lz";
    PACK += "LmEEMvbckeDbAtyUnqvukRxX3gIXdI9QdiiPk/BGnDz375CIMD8g717y";
    PACK += "V9txUUS0KQw/Tzm8dhuKQF+/QdK+OLkooudsZRO2EzNY7Dn9rs9F4qrp";
    PACK += "NIwjrSrksrcttw0kLRPK9X6VpQE4J8egOMYqhvw8lK3STBTaDgwjVaCG";
    PACK += "cYLWDpvjIyp0qD8EXLS1dIB8FYArpDFr5qtsJ3uhkKD6oNcbWDvquexk";
    PACK += "AL7ZsOhx1UuTtis0kmtwxzyMPW2sNyIb5BP2ar6i/ZvdpPn+ZpJrjWU/";
    PACK += "ygRkn8tEDFGDjXpRtwAywWVcq9OwZfY+OaqqAWW7Aia7Ijx9yEv06txh";
    PACK += "zkk8iceOiItbtydopS3k/mB46jIc2fjEd34+Fxn30LknkhhhhXlfwESv";
    PACK += "MrxkmHyR9uOj8PHkLRPoabFcSEqnJx9Ydzm5vm6akR/JYyvYFhzMXxWb";
    PACK += "87SnuZ65E4E17Zt7tO85n9NgSiTr1FPl1pZfpGlH+y9s3/yF5ZzPDS+V";
    PACK += "jqPnq7xIQDP6boioaRlQDXIEKY8zgnHQKx01KCkLG7vIEeQt1ZofwJqH";
    PACK += "dPODeLlUPvqeumHz3s42TkNlTZIuNOkFgM4LLxCJ5MwZ+hpKZ6GEIx8Z";
    PACK += "syb55Fr691GoD36AwCAm29tKF/kpj7aYsBx7zB5ncMPs60uloLSM6WW8";
    PACK += "1G/t0LdWl156NCxsxE530yVAaLeRspn430Cqb+jCtW8b8LH21mZT2kLo";
    PACK += "xQ/YXRBGurr1qLvcRtQOylNlJryyOd0JS0lyFv9RUrC5Tv/FyjoZqhMf";
    PACK += "ZhYlkm3QuGkPMjTzqTO3JQfgHwt38sHUerlNB5hblH0vojlLTewe/ip0";
    PACK += "3CZEeT0oDXFI17kerBlGZrJT+LPePe7NfJfMjJ3Gyexal8xLWsr5XOKY";
    PACK += "n8bJWRplbMZOYfMY6uJ7It4uoho8iPWQOx3UHhpfOpUaIPMdYzeIX2zv";
    PACK += "mmecBlBo1PNCIzkMnathxmg5NkRXQzDa0NsYWlD3Pmx4v6g5HyZNhaxH";
    PACK += "+NFx0mrBN+NlpgJxbrYBd1cQAlx4v3TI24QEZd42qOf5gTWaOVX2TRu2";
    PACK += "1dgwurnza+LAcGd8A6elALx35bc9/tP7boDD4bfJIYyaGEawk2K4bNbM";
    PACK += "r2TkNEvLZ2iJ5wVbKxaLrCEqk9xrrG+xiOQcLNKxHiDkaQJ+ChKj8JUj";
    PACK += "Zy3MHtc1UFzXjJkOZxDTW6PXaBa+wpjy5gYyupBcjyE8eG2Gei3q0ggk";
    PACK += "6IALNrMBnjPHc6C4zA/4jOriNakY8QM25Bq9hI1udAZ+yqNtBoUbjpdu";
    PACK += "UuQRfaZ0/SNyYDir4PmvWewrySGM1tSH2wKAx8411x26pp5rrjs0Dp9f";
    PACK += "z3XjygZU32A77YTdqS2QUbOX3pUcRKexg/1YDq0PxdBwQCN2wIdxgiWX";
    PACK += "Mz6z7ItiG2dqHZxyYSxTRuWmUvZYN8sZP1Xkgp8SkjLo42bCo8Zm4gX/";
    PACK += "ceP37ilZvScQ2FPOssFli7XyIgcP83Q6K2Q1yKtWnBQb+jFXT+Mkmnuf";
    PACK += "Lvlp6LGLrUi5daCvARzYT8b90tSvdNtz9bb96OGAtA/871cTxqXRxZxa";
    PACK += "hBdv6GDUSMMJuR30W60k6MU1HzLfUR9a43xzE6yW+nprsThtBPVeLJS1";
    PACK += "Ecr6UDKnvlYRrJSnDVAy1FipkeFOG1Wrp6FqldxwFcDAnLbbeunF+FEt";
    PACK += "GtQehSpXUxJfsmgzPmZRw8FUp7vdwMLkvUSktw9eYL7i5YG2tDcVQy4S";
    PACK += "ggFkZisAAfo0tHmvpLFI3BJLgqrTIAYZNkt6QpyxupMMsJZvBj9bzSIz";
    PACK += "aUF3t7YMVA7qyHvnKqgk84Zjy5jflMFdrhTq5roWVHwil3q9oa7rDHVl";
    PACK += "sKLLeClcK5dVG7Axidsqv7PduX+X+CG9sUH8cAh9tqhNLt3mkOom1XD7";
    PACK += "Rxg9m9RQHjCgX2rNI1qu2sKws6RJH5atONw/YebftdTi4hDJr+Rze6TP";
    PACK += "V7yfid6cf5Ka0c/w0PokecrgjIc0N2sDfeZm1HDOD5j1JGUpaXDaDJ2c";
    PACK += "DaIMo4r00WBl5ZQd8DJO8Lna1oX9ygEvYIgLpb0pHGR374Bn7BPAAAPP";
    PACK += "scwHZhqAOkUBjsS9uzbtIwXE19/P2AEv4sRVQQD6UPkTmvbVNjzwDPn2";
    PACK += "E07DQkx08vKqufCNrP6gLn6cRTssBKgzpl+f39Af2W631zIRawwu5fJd";
    PACK += "T04VaddtkyK60eYfSqPOAyB4EvdkQw6XKGN1xeANfAbipUEVoPKuSzL9";
    PACK += "EFKCFH6MunYtSOsG8ZR6x+UGldE7iexsqPOIUjzrIE4G25uLhgLLhyo/";
    PACK += "VB77bJbapsG0Od2gnUDwQzLZAFcgK2g/x78XMFa6YDFg+NF9JqoDGZQb";
    PACK += "pRxiguRSDjn+CgVETzKiw7KZ1BAKq0buQG2bQegoM/Bs7TM+CHP3jaOZ";
    PACK += "V+SUz4hDpHLAwlH9lgPnGR7Sxs/DnMah56HxVf21HwhsUjNzqGKagj+n";
    PACK += "PnRGgXfISOv+lIvCAfE2W2qcEAuQSQD36l4jed1rhID5/Ip4NX3eEC9D";
    PACK += "Zqly+K83Ibu2CUAWb0QAXQ5UKxc9zqJtZse3VOOLp/kNKGTN6NGUqi+2";
    PACK += "NJF8tpGC+o2AhB3LpUutbd+lC0KXLYIG71jidf17KX7Dv1cRjuaayZ37";
    PACK += "k2uzp1zNGyZ33jC5UMmzCX81qE43hiLN2EkWJjN/nJYzaJqQrJo3Zzr/";
    PACK += "Q4T3H8Ebe0U+TifsJe+wr4pEv1B/vvEOuwQ47nnOf1ZRJ2Y/eIcNFXQW";
    PACK += "e1QBgGYGSDJz3mHvNHkfm4wYcPMi593fOuyzvneAzoCXqfp1oXxv2Tv0";
    PACK += "FZ7pX2dQ4wsAtjrU5UQG3p8VwAm4DLoisinqX7aVG3j/XRQnAkxzd7p9";
    PACK += "kSUiA/2L2xh7lXMvCfLad5PoZduwK9+wsm/tO9+SkwlJiuKCFDIT9pfx";
    PACK += "1wPMpang5z+iBR6MiIIrz9sNca6QM4RLW97dTZ4NIqVZBp8c0sRnJPl8";
    PACK += "Oo52Og9e5Fq75w2JJYP3dgCYUCIOOCBnYze4DQf7Gusova9g5DTPwICc";
    PACK += "LQDaDIL0ttvtEdjgvsUxmwoFGZAr8/BLF97oJV+5yGFk13c6HfY6a7ff";
    PACK += "Qj5R0oup8I0iQ52XA2nB2chlXpN8Dv5o2MD+t6QTGweJTuy0YqMyQhsB";
    PACK += "rcUoxsy9tzItZFpdcpcIuOKyfUc2lEF/sytFY+kXYPN2Y+OC0+nvTaJi";
    PACK += "4OUdiJNsWLvHzicRgTvF1aiGCYZFBTkZwHJDeV8OIhnbCIqcv0p9O3vO";
    PACK += "/xgEOS9ynmbNuR9y/ucgEMWgMMiY4yhnP4Z+e5cNo1bVhpecJz+G1mXQ";
    PACK += "7URmd10Y4bB5Vychrc18Oo4meYRp5el9DOumvle/WBkB0HYk21sdY7uX";
    PACK += "bbEhfs5SKQhe8WJRxRXfz3Bpq3mouNRe7C97Lxd8U4vJX4dR3Iu+AlT3";
    PACK += "YvENFwoAOujlRlb9ezRax3FvVNyC4+LRxPBwzsr+BcZtHmuPAYApeAQx";
    PACK += "LCeZ9TQs2EuesRfW65J3kuirI70V/6FOFQuxDEt0E01c7wrUcpsoIcD6";
    PACK += "4RcpQs/GZimricn5UKr2dmKGG13qfQ7KaZYbpmQ31g9tWCnq0FVTiXSr";
    PACK += "xlut8LWHkwhh4ezwMtPEQjexsE0sTBML18SbttGaUMdpnpanYvSpkGcc";
    PACK += "KIC5oYIsJSxUj6FJwgAcIJga4O8lfGks2GcRSDOgdtWtgLxuW53O5tb2";
    PACK += "5nasPfErLuewDO5AwFm380CjGuCKVUtRu+PrQfTzrrAoa8tYoRzDMQZ+";
    PACK += "k2k+MVlZauXbFq9/o0qnophXzwb5KBNcpNHLyvNPUH2xIutyRQe3gw5C";
    PACK += "yN/mNk6qJLDRoPXC4wuC6yCXxp1ur/NA9oxuZKt75w1AFPQK3n3wIAWn";
    PACK += "BLBEpr+r3AkpKOD4v4ulyjvEJOyeO5DSLOpudn6X/e5mJ9m+B1fb9zpJ";
    PACK += "t4OX8Cfp3lcF7m92ki2x9bvsb4mtZHsL78KfpHt/t/O/n00i+RtcxVBv";
    PACK += "t/MAcKNvOkjyF4O007A8mmWRrc37oOoyvuNu3QZElfO8H1DjxHeAvUjp";
    PACK += "wfkud3iXZh9eC7GoqRJJbwmuffuZDplfUzuz4mOBXBrxLd5Llc8yYZbQ";
    PACK += "C3tsg3vHgotkLBBlFhwSs8toLDze5eHEyB1aZaqtCjbsAnIrOU1NoCnI";
    PACK += "KewreEsVUpROEruhkwxq9EhwRQ/8tpRNWOuD1h6KqIhiZlMXrnU1yU4N";
    PACK += "bwjQLEYkNJGuvr8I9MSZPGMnorGK5w5Nxam+lYqtatScV6HmvKKac92k";
    PACK += "Tq9y4kAVqsat9EB9VJbmVTdFo8pB11dt/u98zuDPbfTT9pNDIU9A6FKb";
    PACK += "/xvZWHW8IigKkoVe50HVM7OqKAI6vHUfPMh74ig/Ro6hzf8tCUtRoIgK";
    PACK += "h/e1XARwCz21mDRtVeq/IPEZOSicC5he9T2TMUcdQzCmm0YdjwdUTxrY";
    PACK += "Ei5Zrg4oGccGRn/1KVrVTtEcT9Gm88ZuY+/4ajpdwwOtYoQKMb+nROSf";
    PACK += "U7qBLE1Xic76wyDMjtN8kGWXVy95zl5ew8hTCwhKTDNHJ2aVYY/bbcLp";
    PACK += "konSH1ct+UMQ8YlJ/tHsQu+B4ng+QmJj68EeufZ+5CC5euXZSwAHCjht";
    PACK += "srzmUXx1KfjcBnmyZ9Gcmgs0pbwKZkRLFf4UdCw3650shmjd6aLhwj91";
    PACK += "7nTZ6QRREF9QL7+cv2gwExnjkAuyVj6FNMga8lZB0C7SIw2gAPriErxf";
    PACK += "tRSTRQEb0xhE7Z9xL1IfhvLWNr4V+FZAlHGQHaR2q5N8SCMZhBYH5myj";
    PACK += "4YMJojYwCJrlgr3gAhPS2FlTlsBv/BJytlHdQz7ntzOOGoix4Eb18Ljy";
    PACK += "EUx4p1c9eFyZs6JaX1ea+cfVUXWMTrkpaMIzMTgXIxKf5d13fqWZ9ixm";
    PACK += "BQQwqFAXBBrylKHga4z+x+oPMD7qIl3at7hcPq68jDrk5P2i5S3tv5zz";
    PACK += "F2bXoPzw1QJs8b2MXWTU4vUh0NTK0OQlN37ggeulXTGNUqNt/KeXF6Cs";
    PACK += "gan5DsP8hX/mH3SAUw76mrkEEWXuhVGzxlwiamx+8C5MX6WVS4anTYhP";
    PACK += "q80nMuc5K3mlRJNvbG44GszJyJzvJ0H405CV7h765NZ1iwNeshmfM9BZ";
    PACK += "64iMaBaoN06VAgX+dLv674624o74jGjLR/1o5vkBjjyf9VmY1zOwyMw0";
    PACK += "5sZI/Y2ToDYc01kTttRSOby9K6MUz7ihXYNDL+fqizIashQSvcOBNdQd";
    PACK += "bbc/lVHBBgzx9Yes5IOeiZkN+LJz7ke7gtf0oah6l+j8XAaYTvxSeSqc";
    PACK += "66fW4G14Ind4X7kmADqULVm6DKObuzFxffiO1lQ1UdiYM9f9M9v96Ixi";
    PACK += "ZZkZPfN44hdldOYG5WEaHeZRyeaxa8Sy4CXXd9kPHWfzA5I3v7M5CN7l";
    PACK += "/Kg4Tt7pJMEFmEpTiDrQdLzwAOlsEllsF3BEdyoDA2TyPk74SzC7lsC3";
    PACK += "PIPRmcS+13U3mfMSi465cillU174ivaoaIAnU3tiDKzxYyHTc72Wnshi";
    PACK += "iqNN98liMQ032NTTwO8BuxyAKl5UduevXVToIz+NISDjJv0+5B+h33Pb";
    PACK += "70NvJozRWGtSLLldfgPnCs2970H09x57oWLpiTTxgruDhvhLKfJjdTOO";
    PACK += "/IIOCJeX4E5VYzg4orzZyywIWX8vSwgBh+V8Ff1QROSHilv8gYwnLqLt";
    PACK += "mH0luGlV26Ru3XHK2eDeYjGqoq/sG2mm5m8py7epNWfXa7FC1dX3UHWV";
    PACK += "adVVRlVX5vQB5pEMgnT8jc/3boL7hxk1otP64XoAH1Zmqhf2mHo+jF6Q";
    PACK += "Tj6qFWm316ajKK6VfE4CdasxDcplgl1C0FwQxuoHqzKzfPvfoKLkBYhy";
    PACK += "8xUQId9oUHDPHtOBFVU4qcyKwHh+afKHnMjHCYbiXIqYGB1fcCP4Ly3d";
    PACK += "zPnjiYolopZBTemh2ruMvEbyD8bCPzxFiCwWhiYr8fUH3zUHtWmKDhk3";
    PACK += "RtKKtNfsj+ULDvHTatnYAj0HBbhDpuxl5UdIfmSZLzAg27NCUvhgk5A7";
    PACK += "QcEvCuUsTqY/geTlq1FxC6UX1eaZa/QvpVOQCKj00DOhC5740PN8QYIc";
    PACK += "kTeRPpCnciiqgRn8LrTkxrYRnTdNU9+cINJBc/ZHqJxlxl70gruNGzNw";
    PACK += "RaBKkM3O7rYhWGYl2nuLxTu5WETvFGTaOEozRmwkehgmBqNoGcPZaWvp";
    PACK += "7ty/39GZBoOPukeLRRFfFYGEWV8sKi8a/9j7qIXSuaKV2zXWFQF88pi9";
    PACK += "GEY5eAOOJ9HzIkb8krWvBXte8K+FHVrzInsDuxITvp2OkDzO2UeeBg0p";
    PACK += "FA9D3oPhfgeqZGv7FGD4RPBPS5k0VKAR1U1+lkMvStTXlFdU2oQIpCI/";
    PACK += "EENIUg2o1rhqIGdQL39gpaJ8fT3OeHWUHzMZaWUZu7Ln/WE1GJ4l6Bw/";
    PACK += "PGOjdCLKKsk21MUSt8mBIf7KvCv4ZWptvEJThugss7ChRB+DS6DW5agw";
    PACK += "oGiwFA/T/ot8fT2JjAUU6DNcgtQfKEKgPnTA9fEiBH85iM4AkTVYMPmv";
    PACK += "VBK7vwuw1wqYIl2jolYauVbh0c4q33y9knBsdePYGp5gjnApHrj9Hbps";
    PACK += "FPwAo1etl2J0YNWpxPVtzgs/uHDuScLKnanTKx/MzbSXRnE64POjUuX0";
    PACK += "O+CD8PszfmD0ErNr3UU+5dE9NgMIEuMRZJts/IFi6xI8Ywf8tBnCBz5o";
    PACK += "5Cxz1Az5zKhN0nH0dBjNYgbuwoO6G49zcLauzUN2wEfWp2K4VN4U5xRO";
    PACK += "tNcI62M7cOke0RzM+uQ/45fWuePSh/W45IbFtFUslwe8wMM0KhoIqtoW";
    PACK += "1m0uNZ0o2AGEeyrsr3DMEOz4gFnOf7Ozfc9zdSx+NXX3WcEKGyKoZJGC";
    PACK += "uqxM7BBYpXPhXFYmll0/cNz6UskpbmmrJTb2Wq5ne2qcWnGJpysHxkgm";
    PACK += "8ZQ6sk7pwKTBFyA74wGL5rWxIZ5Q82vH53EW3QdDrpM0PkVzZlx32B4q";
    PACK += "iyHcL/XXowYxO4RAWTeSh3YkD00f5m4kD8lI2qhZqB8sxUjwQtyEtwUg";
    PACK += "qlpMBMDFaAZOaCgIyAmCSFBLOK8ttjjRwIZHa2WtC10i9wwsdB7IzrnS";
    PACK += "LrxUntmYlPiwMtcVV6ZPJ6ehE0vXqtUr6lDyiabsNmAwMX4PzmxCSao1";
    PACK += "37Riyl6lA3Dyt+HnVqtginQdqFOT35rGTLyZ/Nzo63ZDqVmC0CzU+AkY";
    PACK += "s48YfqzG7LAy10KN3/9p7l2b2zaSRuHv51eILK8OsBoxpO04DpgRy5bl";
    PACK += "xLuW7bWc7O7DsBSYHJJYgQCCC22Gwn9/q3vuA4CSk+zznq2tmBrMfXp6";
    PACK += "+t6ltX8lARE67B/4M8iV1mWbleD3Kzc+CSh7zsP5WosNeQh2CCCEYT/p";
    PACK += "vbTVCXK34FL58TjxOTuOzPBjwQzjF0un/vH4+Ovh8AzVw9VEaFmCpEIT";
    PACK += "JQENRryfJed8S0EYOaZcJR1B9Jg3OXmTf/cdHRHvjaPCh0ZvchXoVpmr";
    PACK += "wPLGjJal1peasInW8BsRoMaAzZXpJWLL94DUKq18lnAQ+Q52yie4EFMr";
    PACK += "8Y+VydMP2xzHR48CeV6Gj7M7sCnfTWhsDOpI8a1+Diu5R499v26HDLkQ";
    PACK += "3ITluFw66UT5vTWCdjrMOObaM9nx29uV5ngWGExACRBFZGkOW635BgT+";
    PACK += "WmDwUZWZfrxgVMdFfzQaCncAjgl45f+Y3Q0fP/36GxlgNoVbuIkxWNGC";
    PACK += "ffa1LbhMJW7njjQzz48/5jJovZN8klOCmwSsUo301gsogMAZ9N8RtxQo";
    PACK += "SQ5chkzrmtL/AU2OnR3glo6kG15sCsRjV5onE63byCgePHjAK2hLRYEd";
    PACK += "R6Qtv4Ej+eWyarAHAb/A3pCsYrApCCDnQaO9cLY1vGnl32JkUcAd9P6J";
    PACK += "UXpjMVxOf4qtbBjgu2s7NoDetIKYeDmifJBxGxvZG5JUBJnC5Q3h3NPj";
    PACK += "47c4TMFkzZg3FUYAPimVMV5uO20Yqbi6jhrySw2uoyQqSU5jLx9cZ+EO";
    PACK += "UlRhOGVw/MgJmD3DfP61AgUgoy+Yl6ODr6JMShpaAJE05MMl/XdxsAZU";
    PACK += "+dfhKo+Dkv5qVIF5iFDwvlHb8Vx7NHxCcnBAU6GNSxnrx8hgit3Ezc1x";
    PACK += "nWDySRzg+mOfhDxOVc7h3w47/Xv7/HfR6PNRwALAMG/nnpFgwuXgnoLA";
    PACK += "xc0i25LyIaapHJ4suUaP7GIESa4pEynb3YbczjFSbVPbfx5J/b34GOTE";
    PACK += "/Bj0RmQOD3gQDfBfIuZ4hS90wZ6nVbII84gVQTTo/EY0nQf1jL9q+8oP";
    PACK += "PoYF4/c5bdzwlJgJX/cxUDRasfMIZBVwuf5HnkOi3BKFtkhGOIsbjR/f";
    PACK += "ozEQg1eM7sru5CBmvF7yCTTM/wG0JdKwkISGgPO5LTtiAsn7jRPIFs1j";
    PACK += "dEuZ1emjW/BhtDIayCcLs8aA7WoMREtix0ECjReTy/BrhW6cS6Qili8s";
    PACK += "6Dw+jiNub9N1DVKqnAGdV5fj1ki6QOYsIR9TvB0TLrwJtNcXfkitzOGP";
    PACK += "HvrkgwBssYLI2CbppaTCnNsTtkKuy1jm0ofTiWX+j8iz0h81cry4a1Z6";
    PACK += "GXlk28Q8ycDYcHu6oz+MV/7VxCsqh4wY1unPncPTg9X1WTXm/vD3NhwK";
    PACK += "xCfXrMw32qCpbMTPkTLDB94abB2uBRmDbu6+WwApIAxCEIzxRPOIG9Gm";
    PACK += "aqJwYdQfx8c9gyRsvUb64qfKcE9DsHY9LX3D19WQnunAp7YATYvftCit";
    PACK += "sjKZqGhUnOssVMpttPHFRSkms6B/Y97piCTHp4lPCvzwULgBp67yXXvi";
    PACK += "hTQcFOswZ4uxdMqTFigy2MCk4HYmReCJXxk3V8lEuU9UI1rUtVLCgq2F";
    PACK += "mVvHiq0l6/gkjdQeEuTtK/VRcJoF5QNrnb1a+NCPqAqCJD1cEcfIlERu";
    PACK += "i6ciN5EaM+pKqQAy1UgvpqJG8hSiXbG9yl5MxFcRaUGXmLYpbm2RxGlp";
    PACK += "Q0TTceSkUuLOJY5UMqWRzlyizlRBZKSXmMpGqrBOaSSfiNi+xR1vhUoO";
    PACK += "EUsk5mJI3Y1mNX5jHrf+8czMZSPSjSwftyBLxIP2YL4oFlV88msTR47U";
    PACK += "+/ZiLpAX1m7gSjcv1+/F05JOlwyOYFyYwbggRyj3580cSTdIksr5CmQO";
    PACK += "HK6C6QmqM3hmP2oPFZZ+oIIYdOdh0f5uiRB6iMaXoSMU+buh0izXEccr";
    PACK += "jODPG7YDY2/4qVL4wB/8bcSfEjViHcVY8Y5g8/CXuZt82VCK/DDwv7yf";
    PACK += "pfHJCgdd8jIrwDSW2HQjFpl8pVXHiCzNyzEbolibqdfGkqVQcYuBrQDc";
    PACK += "egeEoS38rXh5+MMO6623+tLw0ZMKXfbJPAFdt6rMiNYgZMvTMkWA7Xk9";
    PACK += "dnvbAyN+7pEpZYVmVIuVsJMWnDuzJLuiWxxjMgowZ6DM9cn1Ukzx9EgT";
    PACK += "fY5km9FoLBIpvtNljyUeeahncF12xDeUwgdlDuUlFHYGY6uC7fgN24nI";
    PACK += "VT5JLNhh5l8k4RDGZGwDI8W1mSPUOA6wkjYOByNMO6DmdiohIXGtHxIH";
    PACK += "LnxVWYmKeAK6x8RUl8soWFxfmciccyLpmaipQpAlDdsTm4ZyAjU0xYjW";
    PACK += "hWBO1H47aDuuyLxibdnZyrbsbKWdnY3oBF5Me8aL6874vxjDccmj9JPE";
    PACK += "COERy7tAIPafsIt9yHlbFSzKhmYEY0ypPtIhro2aIiGtH9GvpbpHykeF";
    PACK += "fOTfKg/R29JL9BsXo50fx78XURDRpyS+pU9NUehvqWZULpk3egi0AYkh";
    PACK += "+5wFrfS3lIhTpikRApM3TuNHvLHb9E1L09dO02/bm75uaboIZdMPsacW";
    PACK += "KYW39t4pWSBzom5oBCH2cB4GER05wV6XUPitXfYZNnLkhJF9h4WP7cKw";
    PACK += "hMInJLdVY86r92gIKIrzqTKDM7PFSbBDkdwg+3FnWopWqo0qjfhBZQNn";
    PACK += "44Z/A0F9UV6ncqYahnwf4vZWDx/qZuYsFqHZj4HJ9jK8XtAb1eYIL1Mp";
    PACK += "ITf7fwKUBD5SHRO7dJvh3jyWOSdylmieX5YE05nAyqVO9pdYgtS9xVgH";
    PACK += "bgAogWPPZYdcfrDJ+A6gS1DABnZBbZ7CryuNFgwyRVAG1mCSdrEMpDhR";
    PACK += "IdVUgogRJjUmwSFnaLz0DfcM3tg0m7J6EAycmhj8YdANDdMqXq69Jeky";
    PACK += "hXgJvNT2mIJPpyP5LSnDZBUzkwpxPICQzqkwLf17Fpqlpqez3hyrwFbO";
    PACK += "WWt8bRI7ch5wcNbkowVLymgZsfxdzpbRZ0ltNQ2LqKTJ+Fyv0iqfs4tw";
    PACK += "xXKVRvtFWIYONVVU5lOBVtmFcRuAslJgA5+44zAkkRihaVQPVUC39Knv";
    PACK += "B+CnkMJNeCRkrOoOaY9rM00ra2RJ7ZKsJkKwyns05KNC69ElZsW1gv4i";
    PACK += "tZwr/+0oXx99F+YrzJMkA/weH6uS6aOZ1ouYpYFhnrmXeDz4tSQ3bBfk";
    PACK += "5rPf75/kRCECRux7XrqX2AposxQkaE85Z92UmB7FUbmMuRDpn+Ayxk2P";
    PACK += "VeKThtHi0JfuYswwmC8tg/mykagKJC2OugNMvVTiSRALmW2caFeX4qQv";
    PACK += "Wb5iPJvGud2rpSp3jVjdNYy4kyCz7QcSQXOO+cx0Vpl8jjE6Sv2cGe57";
    PACK += "y4N3oKi8RDKY+jtRm0LzpSdoV21tQ3Kuro/peelhGLe/CdY3VegLEj5x";
    PACK += "OSmH46vSSzA+oL4x4p2ICarAY2VtmFvw/NZ4KGUAHzmPlM8jgnnEvmYb";
    PACK += "YNIoUVCyMimyleg2KF10DA6uf2MQIh5aCg2avrSsBvmFVl8i7Od2jmq1";
    PACK += "9lwYpMQ8wYOh7ccgLDGJwBb233zZke+TSK/3cywuBTM2vCfeWsvKV9FZ";
    PACK += "zehm2rfbCXHmJNVsVDBuZxXq2BwNtuGOfKVG3EpuHDA2fmNUYnCY/a6c";
    PACK += "JEFpDBkKX1MxNMGBFTvmHx9Xrmzif1ba5hcRIqqwlzIpaM4g8mvDjGZi";
    PACK += "lAfansAHIqVIYzZgeBWZKSWZI7uNr9B1JK49GkSx+odY895S/z2vmmXm";
    PACK += "SMKdoNGdDJnRIo18PPzW98fyPshHyK/H1viVCERsTUAWGobS3Ha1fQI6";
    PACK += "EnDLepXpM7CHdpK/H0szXM3bWIZFMCbrk3LKyhl/qY3t/SG+3/ZWSYEk";
    PACK += "wHUxX7NFFTNFAFjbGy31Jj8I0fZm/zFO5zds8VZQl2WYr1gJ5reC0grK";
    PACK += "eqyDroIh87JUT2bJYbb8bgnmzAPZBk2cx8tyUGRxNGdeQoaoyeb2I29D";
    PACK += "jPqqV7k0ZDZcSMPM7KAjuE7G3986f49GZkyE+A/2hb7FRslT2YMIU0/7";
    PACK += "R/jInSLsnGZplJSncv+P+qahUhF6/t7wmLGIcYhUYkqa8qbnZErzce5C";
    PACK += "Z0g/Q9b0MX9UvFBEYYtovBTmF0MOWb0R/L/fJ0Vo+MO35PKiEWEIfZF2";
    PACK += "A869AymWAgjdC5aREaZqw8D3kB0IX/ixb2dc4o4d3YusOhdZ+OPKXmRB";
    PACK += "kXgdwsI0vXn/hRZiocWXLdS+vSUpuMzRJ4XhWxWbhyvdPlomgf7LynHZ";
    PACK += "2Ju4bW/icezuTSEAQOwNhMjDWUXoFSE1Kn/jfk6cgpC7gg3rn0ILKbTY";
    PACK += "vHGTNystIo+5endQFPnKfYCUAybf44/FA+e9wtyZtyNhN4luFEZoATNE";
    PACK += "gohzZvvG2yci7L5A3DDiMaucrJ9oZPgDWvaQEexQ7RN8UkeAhH6LGhhS";
    PACK += "0peP1HuEnT96/HD0zTcPn/pt2THlIGgsKmuCqoGPpNrW9fhFePeIGDiP";
    PACK += "JNIy0o5PyVcsRwRnGMyRLciEuh4/CGnT9+enevwhtMwE5dx/MgNX/ARy";
    PACK += "ACsWRFLX4x/ThoGhZCHsxCTR0nsgMpxB0kHIuCJFw0YqlrJnuEokFPKV";
    PACK += "6ks39hMrXeFY5r77tWL5jifPTvNncezxQacwCO2f/O3q7ZsBl1lGy53X";
    PACK += "75+U/sn/nU1xcDH07P/CvCBIQWLGKJABIablTEIQA4PLZZpv0BcMfkh4";
    PACK += "+i2GAA6YccwhRb4FLiuDSHPkAbfrsCKx2ilamJ3sS0WvhW3j+vlSRdaH";
    PACK += "Te/1Ep3vpIQEJ3U9fh/SuBrfhPRH7tf7cUX3VQH0exxBDuCkzHfv4IUC";
    PACK += "S6ULkJUUwXSVE5aQ32JyHpLrkMTVrCavE7pfRskCDdWf735Ii/IVvGnJ";
    PACK += "nAU/leRjBVIcwJHBkGxZXgDT2h89HTwajPqEE3IsfxfOb8IVexNuWNDn";
    PACK += "j+Qi3fRrwjK6N7p4nQz0X6q718lA/Gzt8HUyaClWVXlITbOWCLIJEpM8";
    PACK += "WrAf0vTmSls4NopfoHHtu7Bcd1R4zwDQmhUM0x6rqKtD/Oh2VjBOd3Nx";
    PACK += "Wa4KpYTDLhdEHo8fzcvmbkzS92wZdAcshbM2D/n5Dk/eIvsVO/wOCDZt";
    PACK += "44NMnpnxlHRBzutk0PHp9vZ/Vo1JFC9TmHbOirW90PbCNC3VPoka1jat";
    PACK += "mFw4Xxs3R2LzNJlHMct/ssH4FOwoTpejR4+eLp8Onw5PHw4fPh4+fvik";
    PACK += "XxuP9PX1+4tn5x+uX1z89OHt29dX19+/fvv82evrH96+/fv1dY/2q2TB";
    PACK += "llHCFuBt8FNCDzcgvZ8SeD6jAqjHxfHxT6Avy4ANK3DSPCHhu5hCvQR0";
    PACK += "Ch7LwCWF/pQILxLm75E4+ikZvwcRzNXF+fuLD9ev3ny4eP/m2eur6xdv";
    PACK += "r9+8/XD949XF9dv31/9+++P1P1+9fn39/OL65av3Fy/oxxU05Jmj30FK";
    PACK += "kLj1mXh4UGT2sFVk9lCIzABbLitQ8jtO68OhdlqXMjpurFnrSSHHY09J";
    PACK += "dMgaHX77rfIu6I1ITvt9MAxdKsvtnhZMaKapzKN5eckjxqF4M6E9EMc2";
    PACK += "ZLFmBkswhHC/Q5umnNZsBYKaZg0Mz4i07cimbRP4E4VInHItv4ByBUnu";
    PACK += "HDYdtxIu24u3lyiGdemPLmdpM3WpChSluFxXHCl4dL5UcS5Sr9RiAD/R";
    PACK += "IXVBlOwx+haVZqAxKTzmD/6TRonXJ32f6BgHT8HNRlP5gJrQOLMTORHG";
    PACK += "Vx9Xxfpql8xpC4bDoFtYTVCxbd4UvWfxHfD7H8XZlyA6TKwuGzAsu22D";
    PACK += "4sfDr30Zr1fFzE1kVwsu6C9ub3kaLQD0FAA9AkA3w+x6ySEgjxHIk4NA";
    PACK += "DkxME8iTO4AcAgt1ADlyqWKbRjKL9EQIH5CXQ1ljG7RDBElMDQ4xh7/L";
    PACK += "JQHHTk78hOZTNiMxsFwrVgrUDjlkvWRwXeB+wd28S1MiJaJ31ZsmJJ4F";
    PACK += "d9bjcWrQVtqwW/khlneyIQH7vdA2ktAmRFrKtOVZ2XbheyglaQCdf5h9";
    PACK += "nng25yVnIKbRG5kRB9oZcF5Vi7qAiYaMfr2RmL0A1o9IpojEGgXQuOZX";
    PACK += "vm1X3K7kVVKmegB7K0VQb1hu0r6ZGvuBmMf1aXGQmXZJsI6BDwV4mp+B";
    PACK += "oGLp3YQFv+OLir4qPa/ckHDp07N9vyrYEb+ufSMX+JI72vfuR4pQkxRR";
    PACK += "DpKH2wzmaza/eXF+0WukRL5nQ69Y+posaciNa1gECZegRwUSh1ZLCNjN";
    PACK += "4ystYRdWlbsBGHZrSRcQsWpVmRTBfGn8RVaVhWrnS/NPThFsxFAXjO5y";
    PACK += "7zoHwcPlEn4vl/D7Ff6GkUSSu1zWA9GCNiEoLcvANtuaCXjpmRGKbpjV";
    PACK += "JqFn+xLysyFn4eX0zNsPBoOcTNkseAlKIcBnfm3FhvxnbFLlR5GgmtPl";
    PACK += "0UtRxcjnnBl1n+V5uBtEBf6LNj8YZjjfeSU9k+62lPaTavOR5X1Dgplk";
    PACK += "fNoxK48SOoUQfjE928cqgXNKz/YqHNcYqkW0hJ+RfIMiRSzmIHzya3lz";
    PACK += "EKMbU34n0R/0ksNgUtV6BKNg3+MEqAN4CxfsY7XCp+YFiKCS9BOcGlSq";
    PACK += "KMMJwFWRwRcg9rP4eXtbDYp0wzwvI2ufnuXTNZCuma8Uh/E4pxV2FeJr";
    PACK += "6g4ZmkOC1as3GAwqFG/LSHxpcr6G5K/NEg8N3uwejSceSzyfb0LG00/k";
    PACK += "oN32PD3oaeT/dTQc+l+NhkOy7qoUGpUWdP3V6AmZU29LdoBjUKJPr1Ba";
    PACK += "4m398Vbszne7sb+l/aP+yVZu/rYey4scJcvU++Uv85+rh49ejo4e7Ofe";
    PACK += "mnzt10dfwc8Mf26KX8gv/+fI+N8yTcrTIvqNBUeDJznbjJtfP7FotS6D";
    PACK += "o49pvLA/z9M4zYOjdRF7D/a40k342RsS/jNKILL16ejh8K8LMnoImdwW";
    PACK += "bHU0Gg7/cvRo9Bd//Is8lQnH5AHuvVIJx8b1eumaHu3xMAIP9gtFPzKy";
    PACK += "SkyZ3Snj5/Ysjn1B0MQBm5azGg0DgKYRpx+YMXnzTI8Ixx1TNVQkhwLT";
    PACK += "eCBoQCDk+bL3KGCDNEN7CEFDvBRKVqxYk5Tuo0Xwy4M9sCj19QMIsLmo";
    PACK += "fyF5+ikoyTyNq00SJET2jGss9UAQDRW75V85Ky2MFt95UHmKqnWSzoiH";
    PACK += "ynES+oDD8H0OIjlChQMWZM7iOAj1cKEayhonHBh/1T556allkj7u8DmL";
    PACK += "46JP+tDhQE8KtC4G6bJkYVnlrFBYKqJn+0g8FtCFvJZmmZfiiphfk33t";
    PACK += "k9QwFsgcXTtJBaIBnM2Q4nzBNcjnuO4XDJ65wWBQ1pCabhDO56wo0vzv";
    PACK += "bEdC6sXUS2k1iBbyONOgmAg0zG+kpSTN4nDOnsWWemBSGB+8/qBP+td9";
    PACK += "P1Cl3lc/D75a8UJBwijAFCNVgzULOUsmDD0nskg0IRm65ajpv0wmGTX/";
    PACK += "DAp0WImSeVwtWAHz8CcZXQhsPafcgQd+744wQijoA0usx7dyOwaUROe+";
    PACK += "fZ+2091MXtF5HWCXi6m1kTOf9EIZKpoJ2gyPZS1hX2C30K9/IcakM8LZ";
    PACK += "5CAnC5aBAE6A6wu2DCrxuwDjvRUrX8ahONRCQn5vOCPqoi4E2E3XcN7e";
    PACK += "AlJ68urOkhZg3Fxehpk3p2fzgd215/uzug3c+WcAePzlNOv7PszxNQuX";
    PACK += "zhw5UL7NFyAGxS8vE8+fkYWY9hyjvsyN2conaC4eAo6StrqGmv+Onu0G";
    PACK += "9rCepocX3lZi1+n63osy+sK7LMFmcYTCA3Wj/YW8sVhZ3mO71FsTpuaz";
    PACK += "5tpRRvngPyCAFwZdvVhalmEIQhx9ehivWN3SPABkKlFbSdAeOxD22SQq";
    PACK += "3sHFW6cxXCAQ1lslJNO/Xy2CZGD9LQFxgP+Sovoo5glQOE/jqyxMgiEg";
    PACK += "U/GL39Pv87TKlKwT9lA2Q/jk1Nh0Ripa0LM9+muICpCtV/+lKDSrcBNm";
    PACK += "XuWTiFN3hcawFdjWRbX5KHgG9mdidkGq9qq+P3r+QSAlG0HzUi8F9Ay4";
    PACK += "GfWrGd3zrx/4uPRsj/FiftCbU1B1IVasfBbHCmAJlvwUgZ09s0CZf+GE";
    PACK += "uS+g/12UJICXY7YsD33PgYyZEU8qgsV1S0kkXgwvpbmNGHLc6DU947Jy";
    PACK += "D1DdIFpAbl7fHywjsPPxnqdpzMLE1y/GdEYK6kU0tnuLf09vEfQWgmc1";
    PACK += "/76mZz1PRTnPNYJfw3WAVKle3FNxJJyv6uY9B6X0FEhjQI0h/KeY4ftq";
    PACK += "4oSIkb5zZn1fnME5A078/6njREWk2Ka0a5vSg9vEv/oE9we0t/05rhOW";
    PACK += "3bIzzU1Q+/OaLf/bwC4Xr2lgjh+9uB2OIwV5FT2rOORF3ZAXB9OZBS8p";
    PACK += "7AcM3G+HE3fJai/ew1H9FzfDAoX/1d3AkTu2o7FqtR8v07Rs3QqzNpAE";
    PACK += "JT2DS1rOBjnIBAowHW0ZyezPAsDOgdyj+oLB3H4djNA5ZPOufMGgzb5t";
    PACK += "4OoctXEIXzBoo2d9gHEoOr3z/EoEtgSAjT+9BWYkKjtOUndsH2THgB3n";
    PACK += "+GWDOgO4B9oxdOd5ftngjUGcg+0Yvetcv2xwdwhn6QbV1rJ0o50aXCCP";
    PACK += "ROCgfCyNHZFe1QScr18mQdLXB3bHmIcFFV3zcw70vzY7Zw72yXVNzt3z";
    PACK += "/9rs3FkYW9e9bTZIkU5IJ91Q6DxD0kWBhJIdBWYU5QzldDhzWNFUga3x";
    PACK += "7iD7GlGvokmzReW2iGSLgnohzZstQrcFsDIzvDgZPcucLfJ8eYM6Hn1z";
    PACK += "g03L4edxu2gmghS6Whm0IHN/P6eGhnJOR+AhoQSKEZn7ZCHhY0vPtjDF";
    PACK += "V4UgE3CCglvZil3fjT2MWesw0DvFTVWe+krmJyO/JkO/HoO6F+dYUKS6";
    PACK += "cXKCW9vSPecE5yRaBNOc/PJgP69/mbkEg1CNX/d9wWvB7tZkR6ez8UJN";
    PACK += "9Eb0uqIADjvjJZoOZ2RJb8TsONcJuyP4zw25gmjL0dJbHh+rWlxqMtlQ";
    PACK += "pyTwdBE0HPoEpOQrGyBWogYYeW78lcloIn95I7JgwoTP6QLyqG7Inu/C";
    PACK += "nGyA876xe7wZRItDO2Nz5FcOB341+eXBfiebX9CzCzFBnJ84w/oXKQpT";
    PACK += "x4JMvzzj2h+ft6yE7Pivc7/eynugvt0MDOadbsGKmH/b+mR+Njw+Dr0d";
    PACK += "mZ8CuGSUPzUCRHBTFkSASCTmMq99fxx6GYnAxbHQhyyEYcgBmnCtpS4W";
    PACK += "eMNAWwEx4F55Q4dkRafD2XhrCQ62TcHBxFsBLK8985u+MBve614KMq6U";
    PACK += "IOO8ppvx7oRekZXaMd8PdnSEk19SJeUfDAYrxVne0JuTJcGVQDd0R7YD";
    PACK += "0SW9IWqcnRrnpq61QMjjiLG4J2IEK2+47p8ravuMyUtbobBIyoNykubR";
    PACK += "Coxng0RATSwEjq8WQUSu0bazQH/aYF+T6yqJfq24c4EuVZJyENygENZs";
    PACK += "B2Fr335KwJCQ5eXOK5Tqyq4HUcZRjUX5G8OlY4UvAh1xfBUaAt3ObqhZ";
    PACK += "y6sGco3gldaojNP/0ViWsYrGag+upVH7d68oHCgZ78CZ3cTrGIkeaNTc";
    PACK += "g7Ye/KCz72ml1S2FP+vsobY0JIV4e+Q774XU6kcCbniXgqioPr5PPxUQ";
    PACK += "cE4LlMRTix+AZEkyrxqImqSgZ4X8A8XO7xCo36efsG41kEA+4WRL+snT";
    PACK += "ZWjkIVCp2dSQVIrnsOKJO8dSA4qqIlXf43rdTOT4FJgz80lIM6kwMFAg";
    PACK += "QiLw/qA2ChyBgMX6z/j6AAmG9Aw1cxUJSYiymhYhNsy9j8SJ7B5Iv2vj";
    PACK += "7+c73vmrhRy4Ghif1ZA5W1Rz5nkhyUC+FE4ziaGjxYxmJPRRH3WfKegh";
    PACK += "LSE6z0NgCl7NjATyOqmvcMdCKYANlYnFp5YirwJ5nryvNYmUSJZPJEDr";
    PACK += "AZTLwta8DOesZIv36ScwQ0NLSAGjzY/Hx4e+gp8FHI1glZ1+YbdbR5y0";
    PACK += "lnp+gLrPdzl7ie+k+YlYTUwU0Dp9s0L7Eiws0rYMa4zGUizM1fnF8wNQ";
    PACK += "il2GmT3/yyi5DD8fmL9ZoX3+Zo3W+Vtj4PVGW9KOWfhaL9AxBjhRkGwp";
    PACK += "Xl/J8+RECt+UFgh5uDIVaj/fdyVyZfo6/cTy8xCpI8H59byehynDFRYt";
    PACK += "ZcvbWw+SGTd6VOVGd+KTb0t64RZmy0FYlel7dImjjJ79hwEHgDkYGouy";
    PACK += "ZpV3zQpzk7qz8i0RNARMH2+6h153Df2lw3ZsL5D5XsP0wq5Sj9fdE9x2";
    PACK += "TrB9fnoexh7U423rCLe3PRm3C2yhBIuP4+6McXsJtxTKHQOQFohpkfND";
    PACK += "TmN/vPvSCVwZE+gYvwNetQ7ImEPtj6++dAqfjClYA4GR9fhT96GddzdM";
    PACK += "xufd7d5VxmHHrJzmJJ7RBPMUGb0oc7Azmh8fp9/RuB6/g5wdRRpvBe7m";
    PACK += "MU+Z6KckyYxiNEZh5dZTVm6TLMwL9jJOwxJs9TD0Kq+UtFdK/ABmpBNI";
    PACK += "vME6g6h4E76BWIano6+GEMaEJu1VYn8CNdC2Pj2LfME9pOOURiSilVSb";
    PACK += "pySa4cJaTw3+Adbl+Bh/jWYivVFJ9/LY+RUNsiWxS64YRlHZsmCzJOzX";
    PACK += "Koxl1fWShHn+StQOttafz+I42FklV+mGBVeyj+DTknxi4c0F/+schuUL";
    PACK += "f482T+8qQ2KDq9CuRdL0FrwD+8hnVRndtxjUCBUzZ2RfJkEfNqdfIyX6";
    PACK += "KonKKIy5dxeDapyC4hBRCFkV45VFx2/5w8arp8m52UDYat0wr2911Mcs";
    PACK += "ZXwGebpRtHJvRDbhZ/Enr/sCOb/RcFj7pIMiAsKtKtOXYkVUUcKQtAKZ";
    PACK += "m5xpOgTlYzAayG5y2kCt6prggzy2bVNNI5+4HDhwYlSSYI+VzDM06nzk";
    PACK += "opb+7W3u5jnIdeQz6EKAh21+mvvwyYS2uBxo8KkFLWHtClrvEvkCoCGs";
    PACK += "wZpJmPAnbaVBWyGAGwLQpHEOHkQ3pOjdI4kf2cq16cmnbX3PfOXUEJft";
    PACK += "NcQiz0MBWdYqldmr52F0GdWcJWDnYEKqHqk3hEh+1qyb1QttyiLqx436";
    PACK += "Ts2Y1+z1mMFUi+m/KiS5LMhUdW6vQBTi+WenI/M0OWrWS5XLFPBu613l";
    PACK += "PBT1wRXvyQJew5yrUhHUffcmbDmH606nDZLkQd8xuqYtYAJ8cTE9i81Z";
    PACK += "qJM4hXhzYNptLlrZe1vHgQ87t/y0gB4z9OVtY3PhuR6WRBStxdOJCOot";
    PACK += "rf0wg9jSg5g6TNjaVXLRVVvfKB8UvfecRVUgXeacJIi64Bvho0W1Ec7A";
    PACK += "EEq0asPtuU+KIDPkFVNl8Je7upfJFE3ji1kAwiW/roliQA10ah0c3dfE";
    PACK += "KbpkZUj3qrFpM+SeCy0VJm4VFggreLTskWtO4SAgTmJDpij2NlLiQgHH";
    PACK += "yP1zkwBE2SAg84UopLLBQZxmQSLhGl5JKVlvJNOCDcHISkt9Wp807ely";
    PACK += "sBqQjQRMT1s3Rl6h5r555WQ6E9gTjMX1q9y4SPM2tAQRE31xc1uYcY1l";
    PACK += "7KfRvOpOba8n+ErnI1C8Jmvb+Oy1t6MHm4FPFdE1NmFShTGvFCUrDD3c";
    PACK += "1umEdUofgvYWnq0FWy3t4JQeg/Vp6nFi/oHRtYPeyFdOQWW7r1CpiYbj";
    PACK += "417JA7BkJnMiRVfC0o2z47FBiig6JD+RXkupQWWkwRCVYiTMbPpfMXtH";
    PACK += "idIixB0jpMrZMT9Lb29zQ8uXnlHMoJHTFPS3eU3mf85A39050LIxkPZm";
    PACK += "SSzvGa6uTK2hIj2Ujq0WndEIS2Ia+YGXn/G/Ip/E30XozhlBrBSfIPdU";
    PACK += "kwWfgqYqhySnQx7H5f5rTelJ6p/R9PjYOzlJSH7Cl6gE6/lXSU1WeigQ";
    PACK += "z8r4UKLOWBK18Aik9MxaKxfolpkO3Md9bngPpuMx6KXH3DcI1ULLOIXA";
    PACK += "IKLmVw99dP8s0rz0PK6eSU8j7Xgp6v3lIaa5jaf5LPDiaX46mp3AH/5X";
    PACK += "D2uSqXVwmnWZpxsPBGlXDNLaKLMPc/4+R8mgwyYb1f7ORuAPQ9aqvtwy";
    PACK += "klV0X1SboMjIJkqCMAPWIphnhH0uQdm6zMiGhUmwgH8XUZgEq4xwzUGQ";
    PACK += "yV/n4AMabDIyxx/rrCbbg2xVuFrlbAW+xSBIxmcRvbyJItJK6iUmN67l";
    PACK += "Qlrm1hT3KGGRFfawJnK8KE3u5OVWoCgFPuUebNz3oq7BwcnmyLzhH2zB";
    PACK += "lw+oFOKUpGAm3+9m1Mp0tYqZ7JrTkUjMySI8X+3DpaQvSERNlL0oEK6S";
    PACK += "tAqApkmMdw8Fqer1Ow/5UlqJ1la2QM7lHiyBW1VyAzaRf3sLf1sKMNmQ";
    PACK += "J5pRXMD3fFPvpuzlUTRIdnvHRMeiW5d4//K+F+zz26XV9QfrREXQEJMB";
    PACK += "tw5BCYuxQoLptK0OQERNFCP5zITtP5ertwOpSXdNgeEy0NVtoI6Io6Cd";
    PACK += "iORF5BHDcpDj9aecUT8Cj8GZ2QlHNHJBzcVIaOQRal0PnHYW3brvNp9u";
    PACK += "o4LOLy0cuzW3Frbdan+Yd7eqGgx8Vh2o1sVLKExRArmqKW0bObkehF31";
    PACK += "ML4Fp8XNjm0yXEHi/SnwVQNhWMS3uH1N2rtVRaavayv57XxzqO/GV6+1";
    PACK += "FT3UqJX0lruiKG+n0aRjsYrubpT77bxnAw0C6pQbLHWyxjZJHIpyAaEd";
    PACK += "M8vbTSN0aOP2+tNE0kelYRyRaCJcM9bdaH3idXZOD7UD9bQwiOA609Yu";
    PACK += "YGMVTksQ3NpqGnw60iPKyK99t0uryPNBcYmMddJxCK9M0zB+YKylD7tE";
    PACK += "Nn2maCXacA1u6abXHBGLUYmUKIsKrUCSBqcmh7fLzNggnopipCjt29te";
    PACK += "oiP0cChgpqNK6TqgmOlk+jxgZ3+SI12iKHUeNQhEFxHf0LTpvAA0WT7j";
    PACK += "edc5jdkljkd3xPsL47n3oiuKx9I+9wPrFqxzouEdEGbTdY4s74wk0huD";
    PACK += "S/AcOSJ56ZWdnoqyS2XfC7JPTN2CJoNJixJVDNu0MoNBfTGqoqFehy2d";
    PACK += "cdGg6MjoOp5KKDkdHez9oLALd9J9oxpb3/1MNaoaL5UzgqDc3MHVa2U/";
    PACK += "VQPjpBuvU9Ov1bKvtsW4WNH26pEIwXgsGkyBYV+tGeTpbNxx9/yUxtp4";
    PACK += "NaLc74NU+COecYOmSpkFy4AYYynsiwbFOlqC+0CIaQ4lgGp5aeGPw7PT";
    PACK += "0fFxyg2eKhlYOSQjhLA6xcFSuFqVkqTuMnRqz/02N1yECfAbb2wo2liT";
    PACK += "TcWf8D14Y8GtRT8kkNP65NPhiy58poJNxd3g73HZRZPGdRflhy98FvFb";
    PACK += "I9Ge65yM6EwI7Bv4a2zI5cVoXmz4bYI0AlEkd8PionRSyCwQuDueVzUd";
    PACK += "MeGLKUH373avBLdAsc1gXO8VzV7xs2lUf89uOZau5Wq4ix0X25PMWgwf";
    PACK += "Ojy8oPALRxbL8rzsjiVl9+64ru0jSA/POP3SI/DavGutuUZfMFeDs38X";
    PACK += "JZqctgHVNvcAK2OF9mOL/OKcvIBXR1kHW+FFHZpAp0kUuNWcCin0WatX";
    PACK += "D75KwsdglZvXTTg8+oQfTy42Na7b1G1iTJJSYfFS0bO8066ngtQQRs24";
    PACK += "0/yl0mROOuEwH0QTcZV5ZijkAHBRLVpCQzcnl66EAUeYgK9dfSj30DSd";
    PACK += "msYtT7UpmzBViMGw7uQ0uKuQsNxHu09qRX14FsfmRw/i3h32gC7vdntV";
    PACK += "7uziMYRLrcRHnKSLDaP5mSHrVuqvXqpPJtJGrj4+T2WndWtzvZaD2p+4";
    PACK += "EXyd8OiZa/MlNZwY1LCafTtRLJtgVK+UZCnPXhRwGKx9/+CK3WXZTm9/";
    PACK += "0oKNk/2vrphftruW3FhZX/PardSrWEY7/WpRE3dRsFblBg1rjOOaoTRn";
    PACK += "45UToHm+RAXqoNsEiSYtWwVLK4FYBerV5LRB7rQeMdesaMc4ZVuKb4nx";
    PACK += "Nmqu8/YWAlRYrxwQnZIl1T1AwM1y5muht6xie46KqdNDpvf3C0GAsRdM";
    PACK += "ZgABLudOncnCsMfIW3jUQ1FomtNtOpn+0XUY0QP+qwtxJ9zibPxnHMkX";
    PACK += "BUrgj2hD3+G8IOrFKE2pRSNsRn3XDjQWyrmZH2O6xxB0o6+HoFi7gt8P";
    PACK += "h6Bcw5/CUPPy2b+ur569vMDo2d9fvK/JWrJBRRnm5dvlsmAy6jgUYGP8";
    PACK += "c8HiMjS/Y8E7lkN0j3AlakHq4SL6TUmkwHaQ798Vll5Bp5zJOj+gsfsx";
    PACK += "PmT3yLsCPzLzb8w8t76bJeNtcJqMq8jS5CJZ9In54UWUs7l40sq8TyQy";
    PACK += "5UM12DhejCo4uyZMqqM2fLpT0AP771rPcRKl5enj/U5R0zZWeb2Fh6Fy";
    PACK += "BXbUawJYNIL+MZZlBBT+ik42GxVGixxaYAFBw22jaw58mnyHrkVZre5Y";
    PACK += "XgpBVkKEKIh0rk295/mgQAHBkGh5GAiQlc0GZAmmZ/FJKnfR88ES4w4h";
    PACK += "GE5HIZVnS7Bd/P2Ts6Z2Mvqjk8Pp8MnhA65hw2Dx+VQ8IS7Yc2AIciRg";
    PACK += "a5oo4t5k2DjI318XK6/4vc0z3QaokVU0gPyqZd1tuwvXZeCiFyVmNMNo";
    PACK += "dd0gbSUSc7VE3HT19a0yaUaSC+dtbhGXnIB/bWw4GvMj1CzlsHajwJrQ";
    PACK += "rn2GkD86G/qK1TRcp6Wv7lRUOx0ZTIfsy/NPjAlIudhQDMfPVap/tQTJ";
    PACK += "VJ8wg1EhLWF+TAjRvGEqLGHy29se8H/pIIOg0EUpOUJV4PlkCwHVgMwq";
    PACK += "02q+Br8r9VPs+tnIN21pIsqMi1FRNmGNgApIVazo2XSlF0BWjTOZ+cF0";
    PACK += "CjJjkhuF4JqIs5oYsWXVpKbD2WCO+WX+5Qep/EnAupJk1FsRjGItFNVL";
    PACK += "rajGpAvORQSoRQdx1B+Qc1zfhXFNWh8dlMeVcX9yOgpG5Jp6y1PPu6Ib";
    PACK += "+3A2A+PNlsB3FQx9/68X5LOO/XD9leeddzQ28fN5MPTJ6eBb/J866s2g";
    PACK += "8X6re/FMuKG8IZcz+mwcTt/MzGi9agaXJ5d//UyGOmBv7RPgozYWVXHd";
    PACK += "ICk+Qy4rr32zRKT/vgw927+9hRxTfZYs+qjdclHiRjBvGwzXVoPUiqzp";
    PACK += "ip5lXh+1Q2TlkwUU7DMPu4GC9hNdir6WrQTPn0NKtZNNwDXSRBkxLtI5";
    PACK += "piKxMrNMZCnvaEv3sD6ZO2ZFz9beSkE4qTLjC0QR4Td4LrLcYVal11FR";
    PACK += "soTlsFNVwZVpZDswuvXJvVpWGbRTQ/pkYUylhhAf7lzhO4QBj+E5gbgb";
    PACK += "gyzHrNiCtvN8shoUZZqBHjnkxgtgqwZrbLnQkFjKWTJGZx/fNX3siy98";
    PACK += "92UL57MAeNqZK/+d61p43pKaS3MY76W5nTf0OvP8yT4LiwL8onqjOuiN";
    PACK += "xhz3ecbEw8XinuslN9aKOxq6yyU3kALlYLsuyLpzwDbAgvE67u5K3N2V";
    PACK += "dU8L45JG1g0dNq7nsOVuVk1MAM8ORrg/KOjhnbTLeUxu4y4xj1mXS3la";
    PACK += "Fn9oGM2q3G8oXb8hVNJrampGBTYuJ/u6UzV65ZCX+1ob7HMKAM5JLqhr";
    PACK += "DDztcrIWEqsDI0FNPdrakFB9SMswtpmwVqNRO4BV81aqUGqOUXl+Els8";
    PACK += "gDYkHRqipvvOohl968+cCRc93HcubRG//szZoCjovpNpCTL258ylrsn3";
    PACK += "MU+OrIxZAOUaiW+/jw2nQmnD8j1n4xnEoYL8I/BHifKQI4GrPcOLtAcZ";
    PACK += "YeuaCAvFevwpShbppzbky4qyj1nhiajT/iTxajKXSenvYSa1mhxl5PtY";
    PACK += "R4jfVqZTq0p3iZge0SZ3bX1/WG2O4u8ohpzL+/qeenPdpiFF0Z8OS1G4";
    PACK += "LauujYyQZH1/iBbMs8lFXdPKW4J8tJbwSbMnFWGqNqTaorBd2SZCpmk7";
    PACK += "XymcnsRc5SddCMzwVUG7Ik7PtcX8E+ytDQ5d8/uw6Ptz+z9Ei/vx+nZF";
    PACK += "k8f/4ByBaZGctB+S8uRyv3jJgOfw5kl52KLLYa5FY9SImdutRtIDKsMq";
    PACK += "ZeTeEWKsWwHUMhUlZOqcn6sls0Mptn1pKJkwlKJUbaKEGsXSKAyaHdRX";
    PACK += "3amq4ghLCLzEtCGRUO4poT5K+tvCsClTFRXMDlKbncWGZNy+AK7LYXPj";
    PACK += "O2Xmie+PzX020gvQ0uu3fugTZb7wLI7tPAZd0ZXtzkz5vNWZnVSgoeVt";
    PACK += "dtj+0ejU0e14bbrUZrcdX41+XVWL57fBX7Pnrs9G1w0dBu+7BQMDrm7S";
    PACK += "n+6jcBe96tb3EodedR4Hbp3YOiEvQbo1b6cmDXSssKCgXTka03G6JWTr";
    PACK += "8VCnmhjoU9rjum28js3yWoHMETrjexaTacrfM4iSkhrPgtaJmu8jvK57";
    PACK += "84FrrkMbGTcmgI9aAuZDNsrUylXnPvst2mFznMPDJAdQRxNnG++Ts6jW";
    PACK += "l0qCRsdx8ji7/H1qKsTVe2VYPq9zO9naBOKvyIj5k4MXDuJ6KVu3yQFU";
    PACK += "4gmz9I5LLz+3fUG67qY1EwU6EMTpxzB245Oxg3HPDn31GOlfX6+w12sI";
    PACK += "csp9ClpH4ZBwlzNya9u7PZJbm6loadZXK54ZuzNm2l017rEFHRHUOutM";
    PACK += "7vjeiKZm1bTinbE7Y6rdVeMe6zsQYa2znh1nrbMaj7Z20cWo8GlxqJDx";
    PACK += "HO/0yTTamH6ZRjH3zTQKlFMoUZoY8MYzR3ftYBRf3elgZ8cSaY/V6PnT";
    PACK += "EhmDTk+8A7F1lNTZ8M6rD6qvnUU5mmxls9Ph8mm0vI/bZ0v1Lw4EA7al";
    PACK += "VlTA1sOxN+/u+uC9ZdqbNgLOtEkIFRg3oig1QhxZd6gRWQgkIqALdgAw";
    PACK += "r/VtNtwac3+SB7njjticCMjUhHzlrjBCCbifK5lJXE7zmQghY+1pias2";
    PACK += "3AQb96otvEezFiQfVh6FzQGcUq/UdKNF0Zm7hUjjcxfSYJ+zMFmwxX2k";
    PACK += "GheiroEoZHNEElkILmYlk/V4/C0dZctlwCAzMsiQ2OCah8AoWCnbaggA";
    PACK += "qxFhLMcG179WrGIeNxyg0Lc4fTCe93LqmQ+46tTO/dj8Lge16Ff7ceZV";
    PACK += "QEQA+Fy6c40hFz2xpyVOT/bp+bjImrshmyvMbfbA3t1utsCuB+kgDYoO";
    PACK += "ttwcYG/Yjho0uVnN88Hn15wxxAO2S0wZttW9NF+0q+fIZ2Ak74N2lumA";
    PACK += "OTsfS5aD41+gofVcNf38LmfvOLBFadLyoChbfWkDwDto0szmRpjkMqwt";
    PACK += "d+0CcsMuoGPPPds61DoOZcfh2IXKPVBWF5gD/vZWeIqLCBa5YBKktaHJ";
    PACK += "zvyuYVqixk340EHP64nBb9gOh5YWqDJ8dPuGx2gViLMyoEtOVRZh+D1z";
    PACK += "mkP5krbOF6c0MefjTiJPPxXPd68WftCo5XZmpIow47vo1JfjXNse5CQy";
    PACK += "Mozk2v/aQHCOA/ZVmpdN9+vW+tL/2v3oUKHNz157O3qwWasPtkJqiuNw";
    PACK += "m026lqyYjeaHDj9sfl8UmKqoaxprOIm7ODBOAB5N5x0hHCYR3WOAs7wJ";
    PACK += "IGUXgKjDh0zm0bSa4RMSRDQH9USsJRhx0EtJLz0+lpgeJA+RlKT3hjy0";
    PACK += "2vFxj6fElqZqmE2vqKn0DDoqVOC0Wt/Y5huXmL7hHReWW3Zb9Nqr4n36";
    PACK += "SfXWTddZ9Qx6Lgkkrmlsr8bBBu5tRkF0JvQ+/aRbdM/HrGZNp4001i+v";
    PACK += "TRf3RKTfbidtA0PyIPUtSBIf8Jwy7giagHOYjIs/9sWBQDD13AqXTxKa";
    PACK += "u3hOGbhZeoO2x8WJYyLfpo5AJsbTApTceUWH5LqioyHZSfPnLFwxNNUM";
    PACK += "ziugwhhaAlxXtU/edRF+QOxJig1MhaFgJw2QXepD16sPEYj6TTZIRN3W";
    PACK += "UnXdhxh8J9f1v0oNqlEPkIN6pfelB1WvDYJQ90V1zMmUnr0svZykvvZo";
    PACK += "0TSgu9Hd1KJb04s1JecMzHGvMyUvn+zQBiF2pcb6XPVu7qT1gXV4ueRd";
    PACK += "jG617zYuMx4oGAbMLmgTvRD4ioGznHB4rTXo6WjS4TMQtDQ4HWnL0LYk";
    PACK += "9hCvjJv8xUTftLSurZ001moRxfrc88l5dYgqRv+e1NxXl1rOXMiMg/PK";
    PACK += "ngXaE7ROAk0A8sn1nzAH2zD+ujKPXE2g+8TVJo+IcfjYKRy+/vOvBliQ";
    PACK += "yowsF32lLoZ7MAYGlGckpsbBA9mu5tS4eTQnCHFWuEUNYNGikNORK22K";
    PACK += "LHNaI4HZ6cgBIR4DLqql7y7MTuBSS42qZg3KUI0cdCbS/Pg4h7xUnnDi";
    PACK += "YZ+OZCRnTL8Ve5h+gGeq4oH3YCbxoaAD9ny0l1KYvMvZNkqrAj4bNK+g";
    PACK += "VzTQ6FM7G6rGb9jnUjVEokmfGYpzWrsiwsXX2AnlBsBvem8YwK/hpDcK";
    PACK += "8u9iHuI3a87Uvov0LIeUXGyQmNNqqXWCtZYQUKSr2hBqxGF3BXcFfOQu";
    PACK += "PlbvbJO2VuDS1kZyFM3PDk/RVsHrakvvaNrKWehqirVotpwc4uWDrlaK";
    PACK += "iddX2mvNQ9F5d/MAb+acRbHiJcXJfHUIok3fH9nkjrFzUU0PfVB+AYyK";
    PACK += "TF9X1+RKEnhlCqEXyMe0LNMN90B72UXY5eknGePj6j4xPt6r+gbRpjux";
    PACK += "iDabo4PQHq7zea7dHYAqF74Ohbjx0SIIa6oktmHtw7IiKkFBpZ66V7uK";
    PACK += "ykieU+TOMPY1eDjPROAQvTRPJecimYoawrdTRNpYE8lo4W573poW9ttX";
    PACK += "DMo0kwe5NsNL7EA/XEkGpILYYN4OVMHywDBqx6LZIf8u+1zcq8/BYGAE";
    PACK += "QK18I3BImWZiNXOyNVfDJzA/uKL57xtdrtHztnetb3ufEVTkEH4K4cE5";
    PACK += "h19yChDf5I4ZZvebYUu8EM3G74Wfmb6GObGid/A4G47ywpDGSfV6fwK6";
    PACK += "F7D+1TLcuMUori3wB+fiCW5iLjfAje+hL/l/ObgHwCXE9hAX7ncH9wDG";
    PACK += "Lxas1ulI5ndPIBIMB/5JyTnvjOMQnjrsOY7KSxqqQ5EJXmKZypDdVIqd";
    PACK += "BFdSlw5uDQ+SQ4aBDot5DRCuIbuLgbu5ObemYbxud98aDsFAh+Xk6t6x";
    PACK += "EDSYaOC7agRCgP29TxQE3dvhEAj6ljciIFh39stDIFwrwIM5UyddsxHT";
    PACK += "R+/8DWOZbqJ4JYgy04gWoHMJqFyLEciMFFh1CaU8f1LxEMxwMG39iigE";
    PACK += "InwPJCfwO4J9RELEE+lgH3ltOAbgBbHTcttUCOk4NDgXFSvB3UvcSv4K";
    PACK += "HcyJKMZXrIW+ob9rShwe7piVfOwPTkxPxAnO8Ee2617zNsMxmFTNwbAM";
    PACK += "fkdcBnipukMyuNF7xHLrmlweoCmvWCyCCtxDU/zeqG9TlaoYNcbqqdS9";
    PACK += "g/wMSy+ruIzaP12hyNf80CJWlChPVWtBu84kDyJep66Neq1BrFjYR415";
    PACK += "dLkPmbvTcB+ytI28msC0zf5RtWJmVTO8K0tXDSz7EjmpcwpoI6kV390S";
    PACK += "gFdp/RT4TWJLrSYNMHnfHmZf4EabFAOWBXb1BYtZyY5EFVS12WsGTs9d";
    PACK += "d/uyhRrl7qW7XXrgQM6Xrg+uec+teb+vwC4V/bMJwCbwSXGtWXvZ9/1y";
    PACK += "pDRqt4XONGGEtHSlkKClDpP628mnymOQYQQuNKZekyeJMSSFliyAAL8H";
    PACK += "xUPuVBWylCaJv3MtTYvG/531dE1brUtcgd+5LFcp/L+zqI45G1FyXWyi";
    PACK += "+IeSdhyHuvnEfhISW35HctrreaWKqmquM/FVOkstwyyV/UDcQB29ZBqj";
    PACK += "ShIzqoAHdG5r9hzc4K7isKGI4+5hjOzfY41yia1LOTRxSTHbs0aDN5GR";
    PACK += "xdwzr6SdIKaN0/a170wnAdFw8t1dhyklTubk/ti2Wii0A9+CvFbRLdL0";
    PACK += "3dx/1yheN4W8Jmqmutj22HKg21TAloZBgvsMlg0PLadTdyUHOm4suryn";
    PACK += "+xfvQe+9RR4ydzuUsEu/hamAJhEi10ieajyISdCLtamVunDATat45Vwl";
    PACK += "UuHTmKqn8X0F2cXh5UuIFzUDrxTY2fk6ihc5S3Q8094QnDsrwxaiAV+N";
    PACK += "S2eKLOT4LzmKtCD29/V0w3sCAQKAW99ELZzMLP5wx2Ec92tno5tJU6QI";
    PACK += "yLV/sKhLUzp0qKIQHB2q0u5eyT+Lld9/kg5FfnCeTt2OqTq12meLPMKX";
    PACK += "bmiDsTg420btjvk26rXM+IN1rQ+YhMjLqE0CpXTCMAxRCIDLS9r8dmLT";
    PACK += "b6cm72UqZymzN5WesZRWlCitSCZe1NxlwL2WkZ1lUiUIeTatwD6ryQSw";
    PACK += "aYkcgB+omuWM5JjJLGoY8qRGVPYW4IQeVSNzFu/h5lUcOcE6fcNjCWmr";
    PACK += "0je3u5Vuy+kU3Dr3NUmpbOxFpFK+TpHST/DsmtBhRl9WXgHpAKKll8Gr";
    PACK += "zyPCFz6JpwWyP4VPQKTdWGuo1uoViGsLIqoEqaer1z7JfGVa1hD9SPzM";
    PACK += "KcfUK5Fn8TUBmWv6Ma61i/xLsStuDqeGH/ZIt0H8hlkvuPIL4++jMNFd";
    PACK += "W65i8cu0mEK82xuSFEx+NKPsHGYkInWhpV0MENQCVC8rLyKlP0kpaoKB";
    PACK += "zlJgYUKInIQQzt3wZuNKYmjegVeppwDBEoy9sFPQ1ccTrBmkE14DNgRW";
    PACK += "f1HRr7zp8PTb2Yn/1WpDXhkJBq+X3mXpWZlV/EGZvk4/sfw8LICSvCy5";
    PACK += "xWLHd5/8dkd/zR588sZoc1n98Tm8vqO/tjn81Ei0SK1GkNbd/Fuhu7N4";
    PACK += "gsr8CUbbJi/sse0+7EH1Vb+sLOdECPpQToYBOysnIxDT64qlESBCWh4Z";
    PACK += "mTB5gnhI7w59jL4a8h+QUX7S7wcijR7zA6OtTOjNgn5fj3S9tLEPNzu+";
    PACK += "qJqhZMHysPOrsFVUKCO3k1Zg5hqRtALE5fJ3RLMwL9irpPRiMhpCcDpV";
    PACK += "kGJBQacRqWY8TyNiMb52dNBCQ7f4LJX4Z4QmsGeGPmaeJmWUVKw2Go5m";
    PACK += "KjESL4p8DAyHnZ9VVmfVWaQ6q53UkKdykXjhNjndh3G2DpNqw/JoHrzK";
    PACK += "iPk3AO0VS0DyvWXBbxkp2ecyeMP/tT++zsgiLFkZbVjwU0Y+hkU0D15k";
    PACK += "NXnQJQyF3elKeejmbhR1tcscFPwoSfBgdEiIesXbGvJT0RuKTqOCP8tp";
    PACK += "XmJ8FPC5K/lZ/53t7sxsfyUn1kiCd4hR5KFBAVSAoUU4RIg7AubCl9lK";
    PACK += "XRqkmSjvjiR46YEkeJt8IM/LSLmXmvlwgdsektS4QG6kRujFhBdlpT3Z";
    PACK += "5AOElU0+QFAwcgfClr2I8i/ZMMiKaiEW744sgr6BO/phMe8H/QUr5pJ9";
    PACK += "cE7t92T7UxBpZ/rTgNpa2pLhT82lJbufanc4s5+qZtAYm64qWiIsRm5j";
    PACK += "i8HITHzmWYwABbZyv8fHSY/PjbPPopWhvovsqUdc+TanZ3MzM1XRXo8b";
    PACK += "frmVQyArM7Km6SRBqzV+uogMJbkUKbxuczmIk4+P80k1yUDbDTvRDzLa";
    PACK += "DxeLftDSvOhB9nKZiwoa5SyDRGf9wO1CfiAZ16TjB6B/bm/BJDRTSch8";
    PACK += "n1eBMTnltxiHlJvfqPTzsKZgXc9IKFMhDYkkcE/BDqY0rMU+q9Wdp7Fl";
    PACK += "K7XoCvzt+zVEtD0yJzsJKSfJ7S2fAC09lzMK5n6QmSnVoJF4XEU7lQM2";
    PACK += "pNPGggz7o1pKrPOitBBDMyoREsU2RL9gxRybasMB+/I0KiSBi4c8X8GP";
    PACK += "P+H/BogyxNTcq6Cjdagw3I0lIJWgZCp5afo1RJOoRzHXdIuThhgIs5iH";
    PACK += "sVKQ55i61kvQQLWdY8aTEKv0b29jlAtGamkWFgxS0zUwL+8fB0rM7x6e";
    PACK += "2E7NvNXlmTSuZutUGmdvLBwatZ1+R5UkaJ2CPKamK5Gbg1cg0oYBjJPX";
    PACK += "gD/R6jnMB7DxFnhp6x0YusV2x1z8PaaQG/jSmYeZdQfGnMcszBX2V8HD";
    PACK += "Jeq2Mz0LbYod/Mq44Dqj6gfzVTkkleFksSGTSTiTf7ebqJy0ExlMzlxE";
    PACK += "a2hB+IY8yqX4uhys3Hpe7ge90YFYnnJyjn7coj+7VeNWNUMrbvRq58OV";
    PACK += "i75/OtzCvb1WNlxbvaaVrA29dZs2zjKctj85RtPuR6+tDT3QpNVQWmyG";
    PACK += "spK2m0za16iso91i0Cd8yOg0zcj7jFxl5FNGooxUGbnJyEVGHmRkm5HP";
    PACK += "GXmXkZcZuczIeTbTLPP7JXDCRtiFoxzf9g8ZcDqohbpesrCsclZovdN0";
    PACK += "hqIy9SXIQWoW66oqitOCzLXWEyJFrhIoGzRYIBsAWip4sY9RnUhEF4Az";
    PACK += "1KayXHkuTNqLvZQs/GAvMzIuasIlbtyspWGWYVpi1GNzVVJKtRAAPh8X";
    PACK += "1JvTxcDhGu3FND57ha9NcIuam2FwQhGc4tbWzhKxIj1/VhNzukFBuPNZ";
    PACK += "ANMKuQBy4ZMMybjekLzL001U4B1NY4jUOSjXLOGuaihXCJU0IZSiA88f";
    PACK += "Z+iyNuAhN+f0rGDlh2jD0qoU7nfIfMx5ZHK8/wHHoHjjcZ2xva81KZhi";
    PACK += "eRcC2c7B92ZB1Mn5Y/WTRt7cr4l8T7B7fcIFlBE5Fu/PRFJQagfi6Pjs";
    PACK += "gcbvmovCXy0CgE+ylc/bTj5uOxo7Dq2vFi7b634XXcnD3gW/PNhvJ9Mt";
    PACK += "UJjzmYgnOOj7wbz+pSaOaQeXJ8R4683y29uWQntyloUI3JtmAxDwGcYu";
    PACK += "Ym87tLyiZiCuM57blnrzSXzInSO2rWm0U/Z0wZO3bo+PvS3XQjhhgoya";
    PACK += "pLf1uxjdLT+3hiRGGGnoPVmYNWZE31/R0QKvsb6U+5rseXTdYCvWu6Nb";
    PACK += "EXBXxtNURJ7sZaeotb+z3cT6K9gZlNxkN4gW3O6TzCGh9lYCG7nR4Obd";
    PACK += "0O0gZ8mC5SLUkSKyb5T0xIZAXe4ZQMcHAk+0FgS9JbsGgt6S3aBlW+2x";
    PACK += "Wqt4AkcjlkVrlUZmmLYDAybzWkUjesGWhXPXRRBaIoJE8b/0MdttwdxG";
    PACK += "Yxely9mSHblRUt8bSilfyfGxd0OHPkRx5zk6sOGSxpkXkxW5ITufbOhK";
    PACK += "HvJSTobKVBPFZO6p32RJbk5G6KyyrJV65miOSKZtP6wl9fmttMN46nVa";
    PACK += "dcUyFyh6upR8MLB3dgTQ7kHNGKLiBOxSVBs5o1u9ixlIYOJ405sjhpvR";
    PACK += "LZlzcLjXFGAwvX4jrF/n+gVas9Mlo7GVhaf0Du3o2a6RH9XXZ7Q9eEZO";
    PACK += "IjcFcwHSI+275/nTxawe2/crJmtfSVIXdDhefGdeTfEYL05OfAHDxlfA";
    PACK += "nUZ6AYO6by0E52+VQ0lr8pZmuO4zZdOm0GVYhjNSKnbobru0XN8zzJPr";
    PACK += "71PzgqV06AuzkulMLT2kw3H4nTT1H4dywRn9DJocTvDyhzSehjMSkgj0";
    PACK += "qvgrJYKDasjihMA50TJspIgynyT6XckQQDNSqY82GS8UmoiVi3E2SPMI";
    PACK += "XjhpIELbaotJ+sQraKOF0o0WWu+bSU0lzb1GA5KejEimvaOOqlonVMp5";
    PACK += "oxJzNR20CVRGgCKebUuoBQzYo2DjbQYcATf7mkIwaW2JUPLNyjFzWt4Z";
    PACK += "hgPUU06kDChyVb1aeX3EbEvbhBviFUGpAY5pQ0QFeEydp6HZ/iGTWmq1";
    PACK += "W07EtzzdSGfFyTNZO/iP/KW7Uh+Fwlu6YpMUzAQiDIBryjVFr1w7gDGP";
    PACK += "tLhnNBySSl+SgoT+PjSvSCivSGZeEY4dbJyAvotjjhkAH5At3JeEzJGs";
    PACK += "VHAEf6Mb/XywgLnICzNXcU3wnmzFyyUCDNK5/Tfx1nTeOOq1OurwuwjV";
    PACK += "hFsFy5Wn6pMQfKnndEtKbw4yta2rm99nHKbmPkmnc7yUc4gOwMss/SJ0";
    PACK += "cXv7u3vgAmQ9F+9gO4U1M9vCAjILaKCMNSymBgj+5/9NuNEQMxbbKWEJ";
    PACK += "Yqfc45g5Gfx7YW13CEJ2tT6OuHkw9R85jouO164rpm5bOlV5G6xPZsxF";
    PACK += "06cHvdxMz24IW92QU8J9yP29fWKla6KLR6dLp4uZc1/3NTnw+ZKVkAhO";
    PACK += "qSRrAxans7HjdNaUb3AKihkZ+Bbyge1tzSR4wB4pzShQYeMdvAh4kqBV";
    PACK += "gWZEhtwMdkQIIxbI2kCqpZ2UT/AusNzlOJo1vAWPlmcIVERJ7QvBSkRb";
    PACK += "XOuQbAX9nPDZs4OReqDkaw/bLUTL2L4ZMRapyePjynrmI74LdhjhNmFS";
    PACK += "2rVdVXO7qju3q62GlxsbBT43vhA+kWx8H0AUOMQCOICFeRMoVVAu2e+W";
    PACK += "DsdbTe1tobuQxtPtTABQOIgWY6en6W5GQxWq1ZuTHQkH1maQG0gD14R6";
    PACK += "aHlT+/ByKHfRvT2X1JpLRlM9F6AP0abPHjv7orF999tAgwDtDccfcxbe";
    PACK += "1HV3pR6Eajs+9g51A3ZqMOc1iEXVAud0OJ5/J3XB4/nJiR8tvYWzudF0";
    PACK += "PptBPLiRNtQTP4YKZ/yQCatCsgaHp/v51Xwx2fl5aZpkKSxddsSIKQ8I";
    PACK += "nkhpBgJpxKfV6pOWyHsqKS7PF2oicWlIgu/5XkUcsiNE0USQrpF+lir9";
    PACK += "LBU1zUlI47+mJKPhSTyOwAoWFeYhyfhdXI/vmP+aHh4iWNO3mXe4jk/W";
    PACK += "6g7DQ8Av/pye7dcO3zT3ydyhuY6P5w1qfqGp+bVNzS98sq5bsrfYwYec";
    PACK += "U+ybsPGu+wF3FI2kS3uiHLDwXBP3cS7l41w6lqvtHu1yNPGQ5vJV0MbB";
    PACK += "QooXWk9nIex9TCwdWprGWgS5TNXuiXgoRy09jUN4XISZ8d42Mwsd8wP1";
    PACK += "hUTJluVSI2fVs74QbR4UWnZIMMlaMvN6dgU+q5lwQs9qLVYJuXGhl5G1";
    PACK += "38BQqcZQdCTNSziGTqfzGdnRiAuTyA3dOStZUW9Bt/Z2blF7re1JeiOy";
    PACK += "pEPA5Df88drQTBtgbZEEuKJrtwjzzwoam1zQK/UH9HR+e3uBPA/IEPsY";
    PACK += "J0rZqp0rU0f8CCGijG9ghTpe0vPj44vJMDif3ASnNxjLZQnhrI6PvaVY";
    PACK += "JN/pjKwJzscnyx6lQ9nRCmr+lUJMqZ19avrDUlHMIh/zmv9b+yRUwJUJ";
    PACK += "eF2PYyUH8dY0O8AIGEKLSv/GlCuhS5snrjG6QaAnBu9+h+updZXv/aD8";
    PACK += "I7aNgSfPQbAx2eZCPHYRM8g5i5UCnsNWN8a6sumPGZoCG7a+ynfk9vZ7";
    PACK += "+Kgb/pi1WxarFmCCov3qhFwQcZYwjIQAI4aXvzKYBNykrSche2c4L8/T";
    PACK += "TZYmLClr3zNm8X3HLLh5Zf/4WEVbfPCA/wQjxN3mYxr3j4+n/Rz6HmzY";
    PACK += "Ju0T8ccyzT+F+eI6Z8v+TEd90T3gxcsjPEVjKi+XWpy0R5UdKFcs/RtX";
    PACK += "G4IOEXQdL8M4/hjObzilixmBuc5zmszoNh9UBeNomJvbzqscGMzg/RIC";
    PACK += "6fs+meYkblZMBqKirZHUEjX5WWsowaPO00pXIiYvM5IxroB014LGhF6E";
    PACK += "8sQ2HaRT7EXgZgCiSTEBNHZ+RS+Y1FnZ4Ko19//M9KP4yusXWZj0yX4e";
    PACK += "h0XxJtywoF+uTwGVnEZzCL3QD/MoPF1HiwVL+kG/zCvwfIOG25XdDhtB";
    PACK += "ftpP0aJcB0/JmkEinuBrso3Yp+fp56A/PBoePT36ug8cShz0xdTP0zjN";
    PACK += "eadZWK77ZL8I+pePed0fhr/1YaGdIy7ST8mfN+bXR8Oj4fopjmkihcw0";
    PACK += "x9dBFUtgyxXz1efOjH0iVIBK+pKbOx4lWVX2CWZWD/rodfUx/dwnxsLm";
    PACK += "65s+Ef5YAThsfYwPxiPI2VIPFvt7sDmJEW+XLN8gJUitbtr8dtGD+u7B";
    PACK += "fIBcAbRG7bucXj1fgFIcfmRxP+j/XH09evL05+rb4fDbn6uvX3796Ofq";
    PACK += "64ePX/xcffv0m6/7YDeJOs4/axPz9JPrDWsuRHxu9btrmTuf9ZOHF9/+";
    PACK += "XD19+vgc52uZBQIJ0czYAiZxPvHY7a0pNzHXKOHJVALn4EInoSof4DSc";
    PACK += "0bjpU4j5xsAYZMPKMNh/DBe4OvyXbNIkDfIB/EOkO0Q+EL/IjRponm6y";
    PACK += "cF5CLi/+i3zKwyzIB/CPeywxp75Saljv89isrrp7AHO6veWx2CM+J/8Q";
    PACK += "JsIa/ZqkgiwTKurUD/p97nMiJ398nCpfwB6l/T7SWRGsBsipT4gVFEGl";
    PACK += "+hnDzCvKjYc9HUC56lFaGcNhEMjwY+FVfxn5343Y6bfyI37J0wpiLfl+";
    PACK += "0FL619Fw6H8F/6m1Q2CapJO2VcHhRsnN5JXX/1iVJSBgAeLyT2N70nx1";
    PACK += "moQbdvqxTPoAy3E0vwnyQZq8jpIb/GuijsnfWx+8GCFeymH9WqSB6tjs";
    PACK += "oK0UotuBIklhyd+A34I0v9HSE2l5r6/nv74o36dpqYiHxheMX8qfKaDr";
    PACK += "TKpHnlijjcjoy/y93NVFOq+gCz2dv2fKRs00rS0IGG6BqhIuIUR0VyE7";
    PACK += "b29HQwxnw/myd2Dpvk7jBctvb/s/V08ej85/rr558fChRl4XTwFtjb75";
    PACK += "uXo4fPikD26KPSa82uE2opV0IfDJq0UB8E8q6g3JBVOkhu9NZyA6rKbD";
    PACK += "GQlpNR2BSVdbnTXNoM6CZlBn3qjT7/tkS+dQZ0fnUOemUQc06yt6A3WW";
    PACK += "9AbqbJp1tHBiqKMk5zVwPRtoeU4309FsrNpdLJdsXvqeAXAgQeP7fwm8";
    PACK += "qekMHLXgvg/+Ppp+mB0fe5fTDyL8D1l6l2CpOI0IhOpED0o910u2Sa0R";
    PACK += "BSj8I/NKkvo1mZbQjFzTl0tvDyceJCKnfRFcSMJMOmkVxBJyBWtip0kj";
    PACK += "li//yoyIf1W3xadKibINU3O8JB/UNC8H1zl8ta+WLPWDS7RBtr9FWJ6k";
    PACK += "bnkCWGowT2VqS/0FyuDbdbT43BgpWnxWSOsDvuy2K1lIZHJRsSuifEFa";
    PACK += "E8LtSGtAL716f7+0DhyZSCbdbi4t9/pL74MfXBox7ROnX7S6dQu9NfPJ";
    PACK += "GqT4pCXLwHnDWA5MGkiDWwzeiWJXLhlciA9N0VPwGT856e/sDGb92ief";
    PACK += "6SvPINNf5uEK8BZBlsUgbQxMvyhPOUY6FR/5m1CwMJ+v+yTTeCqICWox";
    PACK += "gq2KpNrvk9aT2HmXMsYIV4WA33LrO7woT+Hp7tcEqbZvRkf9E6mNOukf";
    PACK += "/Vw9+ebJ6Ojnz8+/Ofq5+ub5188VVfd4eHHUP7nu8H0zhGmqG7CQeSac";
    PACK += "rfLdXqLiH9KifLU4PvaeUXhlnCfDs6v5MuH7pb9HvugNfTbxhuTVUjBF";
    PACK += "74BUin3vM3nmB6+8/iLaNlZcpmn8MQQe4bOiC1qrhmV4iqi+X5M3pK0K";
    PACK += "fj0F4ukIOlZ/cf6Dt202EF+B6utz4MB9/AGpQLRYl7GPzVPVMy3zPtkD";
    PACK += "UQdYoyaXwgqxsJvoS/ihm2AjW+OzKXckryrrg/YFIlFJvS2bSHayD2TE";
    PACK += "ifeqmvSPouK0f/KqQipOzPcD9+WQHNQkKim0BBo+WDMkPKHMi8pJVJ70";
    PACK += "j3h3UAU3MvDWTBKrt7drJulC/M0JTZB5tnYgmvV9vt1i0z6golodSVQq";
    PACK += "AmvLJuaS21xCPF+RU1s2OcxlJwmklyT/iL2WA+BHRj5wEW4C/qYeMsP/";
    PACK += "zBAkfD/4koYg6BDMdPkxXexMuGq/l5PWb18AdE6SdRdi7w1+/b4GFVHR";
    PACK += "hhioUy4UxACJDWbCjPbny1Uf3gQORVtGt2yyZSf9o3IhoKevft0Ljuwu";
    PACK += "JPxgLzYwLdqBacu6zhtYq/ZDC8TmylcC+56n8VUWJsGFOC1iozC2ycod";
    PACK += "x9pPnjx9+HP15OuLIfz3G/jvoycXfR/+RzowoJGOp+58GIA2PI2SZcrH";
    PACK += "+eb5w/Oj/ol3fVe6h5ORf9I/+uqof2Lk+Lh2sh/4+CygPKDjaQIeCPoU";
    PACK += "shzFNBlVQI4FLNJRsZEPp6y2iArAtIugd92St4ILCPDOGzTmtZUxArL4";
    PACK += "ubKBxxfDZ/jfoZRlaOkVl1ONHktB1eixLal6+Pjo4WMpq0rShPVJUebp";
    PACK += "DXMkV6L0n9jdQ0eOtRl9fTR6evrk9MnRk9MnKMrCGQjpVNsJFtFvrC9I";
    PACK += "B0EPXt+V36CdrLi2ssgI1tqhNFo27cnz85d8uzgdwMG0X5PpaEgeDsnX";
    PACK += "QzIaDmcHUA9XBEj0Y6/l0q/J5Umfd/2VBCmBCv8w0Mh8JV0Ak6jvrcDy";
    PACK += "/P9fYPn2aPQU4ORUwgqgHBTplMC2KXb6X5kREUrIfNposZJb+cjoHxj7";
    PACK += "o5yyGRcN4M9BDmx/lWz4NRfUWubvaxHtCWshAQjh0xOW//Dh8jXt942a";
    PACK += "OMWI5sjEVzTGh6IA5vBSknkgKPBBrKPWEKI2cZ9h0p3MJ6CYqqhtZQ38";
    PACK += "OVn7YGrDNQveK+/vGSJb6WSQEGQmI80ZV+pakIbsIKia8gSiJQRBZYoL";
    PACK += "DFGB+oB/kQarE1RN9oeYdLAamP8J7whuLN3zhQUhgYMIipqEkFzJr005";
    PACK += "S1iG3D58j8cU/CsDpyko1tAtzBWx1+NjcbZ809AklogzfmZKDP29KQpI";
    PACK += "yxZZALsTWEoHWCBJ2tiVMJ3/4/rDs+evL66fv337wdamtdfx/DFoxMb/";
    PACK += "5/8DB7CKStLhAwA=";
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
                    { key: "typeName", label: "配置类型", sortable: true },
                    { key: "configDetail", label: "配置详情", sortable: true, wrap: true },
                    { key: "org", label: "对应党组织", sortable: true, wrap: true }
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
        var configSelected = {};
        function onConfigSelectionChange(selection) {
            configSelected = selection || {};
        }
        function refreshDataTable(tabId) {
            if (window.__cqDataTable && TABLE_DEFS[tabId] && TABLE_DEFS[tabId].columns) {
                if (tabId === "config") {
                    window.__cqDataTable.setData(tabId, TABLE_DEFS[tabId].rows, {
                        selectable: true,
                        selectedIds: configSelected,
                        onSelectionChange: onConfigSelectionChange
                    });
                } else {
                    window.__cqDataTable.setData(tabId, TABLE_DEFS[tabId].rows);
                }
            }
        }
        window.__CQ_TABLE_BOOT = function () {
            try {
            if (!window.__cqDataTable) return;
            var dt = window.__cqDataTable;
            ["quarterly", "annual", "deduction", "partyQuarterly"].forEach(function (id) {
                dt.mount(id, "dt-" + id, TABLE_DEFS[id].columns, TABLE_DEFS[id].rows, {
                    pageSize: 10,
                    filterPlaceholder: "搜索" + TABLE_DEFS[id].label + "…",
                    filterHostId: "dt-filter-" + id
                });
            });
            dt.mount("config", "dt-config", TABLE_DEFS.config.columns, TABLE_DEFS.config.rows, {
                pageSize: 10,
                selectable: true,
                selectedIds: configSelected,
                onSelectionChange: onConfigSelectionChange,
                filterPlaceholder: "搜索" + TABLE_DEFS.config.label + "…",
                filterHostId: "dt-filter-config"
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
            if (tabId === "config" && !configLoading && !configReady) {
                loadConfigFromCq();
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
            ["quarterly", "annual", "config"].forEach(refreshDataTable);
            loadConfigFromCq();
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
        var CQ_CONFIG = {
            dataAppId: "crrc_dj",
            dataFormId: "crrc_dj_config_new"
        };
        var deductionLoading = false;
        var deductionReady = false;
        var partyLoading = false;
        var partyReady = false;
        var orgLoading = false;
        var orgReady = false;
        var configLoading = false;
        var configReady = false;
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
            configLoading = false;
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
            try { window.__cqFetchConfig = null; } catch (e2d) { }
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
                try {
                    if (el.closest && el.closest("#shadcn-hello-inject-root")) continue;
                } catch (eSkip) { }
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

        // ---------- 苍穹配置单据：按钮绑定与字段读写 ----------
        var CQ_CONFIG_FIELDS = {
            type: "crrc_textfield",
            json: "crrc_largetextfield",
            billno: "billno",
            billstatus: "billstatus"
        };
        var CQ_TOOLBAR_SEL = ".kd-cq-toolbar-item, .kd-cq-toolbar button, .kd-cq-btn, button, [role='button']";
        var CQ_DIALOG_SEL = ".kd-modal button, .kd-cq-dialog button, .kd-message-box button, .kd-cq-btn, button, span";
        var configDlgMode = "add";
        var configEditRow = null;
        var configBusy = false;
        var configPanelLock = false;
        var configOpenedOfficial = false;

        function isOverlayFrameWin(win) {
            try {
                if (!win) return false;
                var fe = win.frameElement;
                if (fe && fe.getAttribute("data-cq-fetch") === "1") return true;
            } catch (e0) { }
            try {
                var od = win.document;
                if (od && od.getElementById("dlg-overlay") && od.getElementById("panel-config") && od.getElementById("tblnew")) return true;
            } catch (e1) { }
            return false;
        }
        function isOverlayNode(el) {
            if (!el) return false;
            try {
                if (el.closest && el.closest("#shadcn-hello-inject-root")) return true;
            } catch (e0) { }
            try {
                var view = el.ownerDocument && el.ownerDocument.defaultView;
                if (view && isOverlayFrameWin(view)) return true;
            } catch (e1) { }
            return false;
        }
        function officialSearchRoots() {
            var roots = [];
            function add(win) {
                if (!win) return;
                var i;
                for (i = 0; i < roots.length; i++) if (roots[i] === win) return;
                roots.push(win);
            }
            try { add(hostWin()); } catch (e0) { }
            try { add(parentWin()); } catch (e1) { }
            if (sessionWin) add(sessionWin);
            return roots;
        }
        function findOfficialClick(text, selector) {
            var found = null;
            function walk(win, depth, seen) {
                if (found || !win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                if (isOverlayFrameWin(win)) return;
                try {
                    var el = findParentClickTarget(win.document, text, selector);
                    if (el && !isOverlayNode(el)) found = { win: win, el: el };
                } catch (e) { }
                if (found) return;
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1, seen);
                } catch (e2) { }
            }
            var roots = officialSearchRoots();
            var r;
            for (r = 0; r < roots.length && !found; r++) walk(roots[r], 0, []);
            return found;
        }
        function clickOfficialByText(texts, selector) {
            if (typeof texts === "string") texts = [texts];
            var i;
            for (i = 0; i < texts.length; i++) {
                var hit = findOfficialClick(texts[i], selector || CQ_TOOLBAR_SEL);
                if (hit && fireParentClick(hit.el, hit.win)) {
                    clog("已点击苍穹按钮", texts[i]);
                    return true;
                }
            }
            return false;
        }
        function waitUntil(fn, timeout, label) {
            var start = Date.now();
            var limit = timeout || 8000;
            return new Promise(function (resolve, reject) {
                function tick() {
                    if (cqDisposed) return reject(new Error("aborted"));
                    var v = null;
                    try { v = fn(); } catch (e) { v = null; }
                    if (v) return resolve(v);
                    if (Date.now() - start > limit) return reject(new Error(label || "等待超时"));
                    setTimeout(tick, 200);
                }
                tick();
            });
        }
        function walkOfficialWindows(fn) {
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                if (isOverlayFrameWin(win)) return;
                try { fn(win); } catch (e0) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e1) { }
            }
            var roots = officialSearchRoots();
            var r;
            for (r = 0; r < roots.length; r++) walk(roots[r], 0);
        }
        function findOfficialField(fieldId) {
            var found = null;
            walkOfficialWindows(function (win) {
                if (found) return;
                try {
                    var doc = win.document;
                    var el = doc.getElementById(fieldId);
                    if (el && !isOverlayNode(el)) found = { win: win, el: el, doc: doc };
                } catch (e) { }
            });
            return found;
        }
        function fieldInputs(el) {
            if (!el) return [];
            var tag = (el.tagName || "").toLowerCase();
            if (tag === "input" || tag === "textarea") return [el];
            var list = [];
            try { list = el.querySelectorAll("textarea, input"); } catch (e) { }
            var out = [];
            var i;
            for (i = 0; i < list.length; i++) out.push(list[i]);
            if (!out.length && el.isContentEditable) out.push(el);
            return out;
        }
        function fillNativeValue(el, value) {
            var str = value == null ? "" : String(value);
            if (el.isContentEditable) {
                try { el.focus(); } catch (e0) { }
                el.innerText = str;
                try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e1) { }
                try { el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e2) { }
                return;
            }
            try {
                var tag = (el.tagName || "").toLowerCase();
                var proto = tag === "textarea" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
                var desc = Object.getOwnPropertyDescriptor(proto, "value");
                if (desc && desc.set) desc.set.call(el, str);
                else el.value = str;
            } catch (e3) {
                el.value = str;
            }
            try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e4) { }
            try { el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e5) { }
            try { el.blur(); } catch (e6) { }
        }
        function tryWinFieldApi(win, key, value, reading) {
            if (!win) return { ok: false };
            var dollar = win.$;
            if (typeof dollar === "function") {
                try {
                    var field = dollar.call(win, key);
                    if (reading) {
                        if (field && typeof field.getValue === "function") {
                            var gv = field.getValue();
                            if (gv != null && gv !== "") return { ok: true, value: gv };
                        }
                    } else if (field && typeof field.setValue === "function") {
                        field.setValue(value);
                        if (typeof field.updateView === "function") field.updateView();
                        return { ok: true };
                    }
                } catch (e0) { }
            }
            try {
                var model = win.formModel || (win.KDApi && win.KDApi.formModel) || null;
                if (model && typeof model.getValue === "function" && typeof model.setValue === "function") {
                    if (reading) {
                        var mv = model.getValue(key);
                        if (mv != null && mv !== "") return { ok: true, value: mv };
                    } else {
                        model.setValue(key, value);
                        return { ok: true };
                    }
                }
            } catch (e1) { }
            return { ok: false };
        }
        function setOfficialField(fieldId, value) {
            var hit = findOfficialField(fieldId);
            if (!hit) return false;
            var api = tryWinFieldApi(hit.win, fieldId, value, false);
            if (api.ok) return true;
            var inputs = fieldInputs(hit.el);
            if (!inputs.length) return false;
            var i;
            for (i = 0; i < inputs.length; i++) fillNativeValue(inputs[i], value);
            return true;
        }
        function getOfficialField(fieldId) {
            var hit = findOfficialField(fieldId);
            if (!hit) return "";
            var api = tryWinFieldApi(hit.win, fieldId, null, true);
            if (api.ok && api.value != null) return String(cqCell(api.value));
            var inputs = fieldInputs(hit.el);
            var i;
            for (i = 0; i < inputs.length; i++) {
                var v = inputs[i].isContentEditable ? (inputs[i].innerText || "") : (inputs[i].value || "");
                if (String(v).trim() !== "") return String(v);
            }
            if (fieldId === CQ_CONFIG_FIELDS.json) return "";
            return collapseWs(hit.el.innerText || hit.el.textContent || "");
        }
        function waitOfficialBillFields(timeout) {
            return waitUntil(function () {
                return findOfficialField(CQ_CONFIG_FIELDS.json) || findOfficialField(CQ_CONFIG_FIELDS.type);
            }, timeout || 12000, "等待苍穹单据字段加载");
        }
        function selectOfficialListRow(billno) {
            if (!billno) return false;
            var hit = findOfficialClick(String(billno), "span.link-cell-content, span.link-color, a, span, td")
                || findOfficialClick(String(billno));
            if (!hit) return false;
            return fireParentClick(hit.el, hit.win);
        }
        function formatBillStatus(val) {
            var s = String(val == null ? "" : cqCell(val)).trim();
            if (!s) return "暂存";
            if (STATUS_TEXT[s]) return STATUS_TEXT[s];
            return s;
        }
        function statusCodeOf(text) {
            var s = String(text || "");
            if (STATUS_TEXT[s]) return s;
            var keys = Object.keys(STATUS_TEXT);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (STATUS_TEXT[keys[i]] === s) return keys[i];
            }
            return "A";
        }
        function selectedConfigRows() {
            var ids = Object.keys(configSelected).filter(function (id) { return configSelected[id]; });
            if (!ids.length) return [];
            return TABLE_DEFS.config.rows.filter(function (row) {
                var rid = String(row._rowId || row.no || "");
                return ids.indexOf(rid) >= 0 || ids.indexOf(String(row.no || "")) >= 0;
            });
        }
        function cloneJson(v) {
            try { return JSON.parse(JSON.stringify(v)); } catch (e) { return null; }
        }

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
        function paintConfigDraft(type, data) {
            if (!dlgConfigPanel) return;
            if (isPartyPerfType(type)) renderPartyPerfPanel(data);
            else if (isExcellenceType(type)) renderExcellencePanel(data, type);
            else if (isGrassrootsType(type)) renderGrassrootsPanel(data);
            else dlgConfigPanel.innerHTML = "";
        }
        function renderConfigPanel() {
            if (!dlgConfigPanel || !dlgType) return;
            var type = dlgType.value;
            configDraft = defaultConfigForType(type);
            paintConfigDraft(type, configDraft);
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
        function formatConfigDetail(type, data) {
            data = data || {};
            if (isPartyPerfType(type) && data.items) {
                return data.items.map(function (x) {
                    return (x.label || "") + " " + (x.percent != null ? x.percent : "") + "%";
                }).join("；");
            }
            if (isExcellenceType(type)) {
                return [data.partyPerfLabel, data.adminPerfLabel, data.excellenceLabel].filter(Boolean).join(" / ");
            }
            if (isGrassrootsType(type) && data.items) {
                return data.items.map(function (x) {
                    return (x.name || "") + " " + (x.score != null ? x.score : "") + "分";
                }).join("；");
            }
            return "";
        }
        function buildConfigJson(orgs, data) {
            return JSON.stringify({ orgs: orgs || [], config: data || {} });
        }
        function parseConfigPayload(raw) {
            var empty = { orgs: [], config: null, type: "", typeName: "" };
            if (raw == null || raw === "") return empty;
            var obj = raw;
            if (typeof raw === "string") {
                try { obj = JSON.parse(raw); } catch (e) { return empty; }
            }
            if (!obj || typeof obj !== "object") return empty;
            var orgs = obj.orgs;
            if (orgs == null && obj.org != null) orgs = obj.org;
            if (typeof orgs === "string") {
                orgs = orgs.split(/[、,，]/).map(function (s) { return s.trim(); }).filter(Boolean);
            }
            if (!Array.isArray(orgs)) orgs = [];
            var data = obj.config;
            if (data == null && (obj.items || obj.partyPerfLabel)) data = obj;
            return {
                orgs: orgs,
                config: data || null,
                type: obj.type || "",
                typeName: obj.typeName || ""
            };
        }
        function typeFromField(val) {
            var s = String(val || "").trim();
            if (!s) return "";
            if (CONFIG_TYPES[s]) return s;
            var keys = Object.keys(CONFIG_TYPES);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (CONFIG_TYPES[keys[i]] === s) return keys[i];
            }
            return s;
        }
        function findOrgIdByName(name, node) {
            node = node || ORG_TREE;
            if (node.name === name) return node.id;
            var ch = node.children || [];
            var i;
            for (i = 0; i < ch.length; i++) {
                var id = findOrgIdByName(name, ch[i]);
                if (id) return id;
            }
            return "";
        }
        function selectOrgsByNames(names) {
            resetOrgPicker();
            var selected = {};
            (names || []).forEach(function (name) {
                var id = findOrgIdByName(name) || name;
                if (id) selected[id] = true;
            });
            orgState.selected = selected;
            refreshOrgDialogTable();
        }
        function makeConfigRow(opts) {
            opts = opts || {};
            var type = opts.type || "";
            var typeName = opts.typeName || CONFIG_TYPES[type] || type;
            var data = opts.config || {};
            var orgs = opts.orgs || [];
            if (!Array.isArray(orgs)) orgs = orgs ? [orgs] : [];
            var org = orgs.join("、");
            var statusText = opts.statusText || "暂存";
            return {
                _rowId: opts._rowId || opts.no || ("cfg-" + Date.now()),
                no: opts.no || "",
                statusText: statusText,
                statusCode: opts.statusCode || statusCodeOf(statusText),
                type: type,
                typeName: typeName,
                org: org,
                orgs: orgs,
                config: buildConfigJson(orgs, data),
                configDetail: formatConfigDetail(type, data)
            };
        }
        function upsertConfigRow(row, replaceNo) {
            var idx = -1;
            if (replaceNo) {
                var i;
                for (i = 0; i < TABLE_DEFS.config.rows.length; i++) {
                    if (String(TABLE_DEFS.config.rows[i].no) === String(replaceNo)
                        || String(TABLE_DEFS.config.rows[i]._rowId) === String(replaceNo)) {
                        idx = i;
                        break;
                    }
                }
            }
            if (idx >= 0) TABLE_DEFS.config.rows[idx] = row;
            else TABLE_DEFS.config.rows.unshift(row);
            refreshDataTable("config");
        }
        function isConfigFormId(f) {
            f = String(f || "");
            return f === CQ_CONFIG.dataFormId || f.indexOf("crrc_dj_config") >= 0;
        }
        function collectConfigListContexts() {
            var list = [];
            function add(win, href) {
                href = String(href || "");
                if (!href) return;
                var f = takeQueryParam(href, "formId") || takeQueryParam(href, "f") || takeQueryParam(href, "billFormId");
                var pid = takeQueryParam(href, "pageId") || takeQueryParam(href, "byPageId");
                var app = takeQueryParam(href, "appId") || CQ_CONFIG.dataAppId;
                if (!pid) return;
                if (!isConfigFormId(f) && href.indexOf("crrc_dj_config") < 0) return;
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i].pageId === pid && list[i].formId === (isConfigFormId(f) ? f : CQ_CONFIG.dataFormId)) return;
                }
                list.push({
                    win: win || parentWin(),
                    appId: app,
                    formId: isConfigFormId(f) ? f : CQ_CONFIG.dataFormId,
                    pageId: pid
                });
            }
            walkOfficialWindows(function (win) {
                try { add(win, win.location.href); } catch (e0) { }
                try {
                    var doc = win.document;
                    var nodes = doc.querySelectorAll("iframe[src]");
                    var i;
                    for (i = 0; i < nodes.length; i++) add(win, nodes[i].getAttribute("src") || "");
                } catch (e1) { }
            });
            return list;
        }
        function mapConfigPackKey(idx, names, allowContains) {
            var i;
            for (i = 0; i < names.length; i++) {
                if (idx[names[i]] != null) return names[i];
            }
            if (!allowContains) return "";
            var keys = Object.keys(idx);
            var j;
            for (i = 0; i < keys.length; i++) {
                for (j = 0; j < names.length; j++) {
                    if (keys[i].indexOf(names[j]) >= 0) return keys[i];
                }
            }
            return "";
        }
        function stringifyConfigCell(val) {
            if (val == null || val === "") return "";
            if (typeof val === "string") return val;
            if (typeof val === "object") {
                try { return JSON.stringify(val); } catch (e) { return String(cqCell(val) || ""); }
            }
            return String(val);
        }
        function mapConfigListPayload(payload) {
            var parsed = parseMaybeJson(payload);
            var pack = findBillListPack(parsed);
            if (!pack) return null;
            var idx = pack.dataindex || {};
            var billnoKey = mapConfigPackKey(idx, ["billno"]);
            var statusKey = mapConfigPackKey(idx, ["billstatus"]);
            var typeKey = mapConfigPackKey(idx, ["crrc_textfield"]);
            var jsonKey = mapConfigPackKey(idx, ["crrc_largetextfield"], true);
            if (!jsonKey) jsonKey = mapConfigPackKey(idx, ["largetext"], true);
            var pkKey = "";
            var keys = Object.keys(idx);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (keys[i].length > 3 && keys[i].slice(keys[i].length - 3) === "_id") {
                    pkKey = keys[i];
                    break;
                }
            }
            return (pack.rows || []).map(function (row, ridx) {
                var billno = String(packCellAt(pack, row, billnoKey) || "");
                var statusRaw = String(packCellAt(pack, row, statusKey) || "");
                var typeVal = String(packCellAt(pack, row, typeKey) || "");
                var jsonVal = stringifyConfigCell(packCellAt(pack, row, jsonKey));
                var parsedCfg = parseConfigPayload(jsonVal);
                var type = typeFromField(typeVal) || parsedCfg.type || typeFromField(parsedCfg.typeName);
                var typeName = CONFIG_TYPES[type] || parsedCfg.typeName || typeVal || type;
                var orgs = parsedCfg.orgs && parsedCfg.orgs.length ? parsedCfg.orgs : [];
                var mapped = makeConfigRow({
                    _rowId: billno || ("cfg-" + ridx),
                    no: billno,
                    statusText: formatBillStatus(statusRaw),
                    statusCode: STATUS_TEXT[statusRaw] ? statusRaw : statusCodeOf(formatBillStatus(statusRaw)),
                    type: type,
                    typeName: typeName,
                    orgs: orgs,
                    config: parsedCfg.config || {}
                });
                if (jsonVal) mapped.config = jsonVal;
                if (!mapped.configDetail && jsonVal && jsonVal.charAt(0) !== "{") mapped.configDetail = jsonVal;
                mapped._pkId = String(packCellAt(pack, row, pkKey) || "");
                return mapped;
            });
        }
        function headerIndex(headers, names) {
            var i, j;
            for (j = 0; j < names.length; j++) {
                for (i = 0; i < headers.length; i++) {
                    if (headers[i] === names[j]) return i;
                }
            }
            return -1;
        }
        function mapConfigDomTable(table) {
            if (!table) return null;
            var ths = table.querySelectorAll("thead th");
            if (!ths.length) ths = table.querySelectorAll("tr:first-child th");
            if (!ths.length) return null;
            var headers = [];
            var i;
            for (i = 0; i < ths.length; i++) headers.push(collapseWs(ths[i].innerText || ths[i].textContent || ""));
            var noIdx = headerIndex(headers, ["单据编号"]);
            var stIdx = headerIndex(headers, ["单据状态"]);
            if (noIdx < 0 && stIdx < 0) return null;
            var typeIdx = headerIndex(headers, ["配置类型", "数据类型"]);
            var detailIdx = headerIndex(headers, ["配置详情", "配置json", "配置"]);
            var orgIdx = headerIndex(headers, ["对应党组织", "党组织"]);
            var bodyRows = table.querySelectorAll("tbody tr");
            var out = [];
            var r;
            for (r = 0; r < bodyRows.length; r++) {
                var cells = bodyRows[r].querySelectorAll("td");
                if (!cells.length) continue;
                function cellAt(idx) {
                    if (idx < 0 || idx >= cells.length) return "";
                    return collapseWs(cells[idx].innerText || cells[idx].textContent || "");
                }
                var billno = cellAt(noIdx);
                var statusText = cellAt(stIdx);
                if (!billno && !statusText) continue;
                var typeVal = cellAt(typeIdx);
                var jsonVal = cellAt(detailIdx);
                var orgText = cellAt(orgIdx);
                var parsedCfg = parseConfigPayload(jsonVal);
                var type = typeFromField(typeVal) || parsedCfg.type;
                var orgs = parsedCfg.orgs.length ? parsedCfg.orgs : (orgText ? orgText.split("、") : []);
                var mapped = makeConfigRow({
                    _rowId: billno || ("cfg-dom-" + r),
                    no: billno,
                    statusText: formatBillStatus(statusText),
                    type: type,
                    typeName: CONFIG_TYPES[type] || typeVal || parsedCfg.typeName,
                    orgs: orgs,
                    config: parsedCfg.config || {}
                });
                if (jsonVal) mapped.config = jsonVal;
                if (!mapped.configDetail && jsonVal && jsonVal.charAt(0) !== "{") mapped.configDetail = jsonVal;
                out.push(mapped);
            }
            return out.length ? out : null;
        }
        function parseConfigListFromDom() {
            var rows = [];
            walkOfficialWindows(function (win) {
                if (rows.length) return;
                try {
                    var doc = win.document;
                    var tables = doc.querySelectorAll("table");
                    var t;
                    for (t = 0; t < tables.length; t++) {
                        var table = tables[t];
                        if (isOverlayNode(table)) continue;
                        var mapped = mapConfigDomTable(table);
                        if (mapped && mapped.length) {
                            rows = mapped;
                            return;
                        }
                    }
                } catch (e) { }
            });
            return rows;
        }
        function applyConfigRows(rows) {
            TABLE_DEFS.config.rows = rows || [];
            configSelected = {};
            refreshDataTable("config");
        }
        async function fetchConfigListRows() {
            var ctxs = collectConfigListContexts();
            var i;
            for (i = 0; i < ctxs.length; i++) {
                try {
                    clog("配置项 loadData", ctxs[i].formId, ctxs[i].pageId);
                    var res = await cqInvoke(
                        ctxs[i].win,
                        ctxs[i].appId,
                        ctxs[i].formId,
                        "loadData",
                        ctxs[i].pageId,
                        [{ key: "", methodName: "loadData", args: [], postData: [] }]
                    );
                    var mapped = mapConfigListPayload(res);
                    if (mapped) return mapped;
                } catch (e) {
                    clog("配置项 loadData 失败", ctxs[i].pageId, e && e.message);
                }
            }
            clickOfficialByText(["刷新", "查询"]);
            await waitMs(600);
            return parseConfigListFromDom();
        }
        function loadConfigFromCq() {
            if (cqDisposed) return Promise.resolve([]);
            if (configLoading) return configLoading;
            var task = fetchConfigListRows().then(function (rows) {
                if (cqDisposed) return [];
                applyConfigRows(rows || []);
                configReady = true;
                var n = (rows || []).length;
                showAlert("default", "配置项已加载", n ? ("已加载 " + n + " 条") : "当前没有配置项");
                return rows || [];
            }, function (err) {
                configLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return [];
                clog("配置项加载失败", err && err.message);
                reportError("config-load", err, {});
                applyConfigRows([]);
                showAlert("destructive", "配置项加载失败", err && err.message ? String(err.message) : String(err));
                return [];
            }).then(function (rows) {
                configLoading = false;
                return rows;
            });
            configLoading = task;
            return task;
        }
        try { parentWin().__cqFetchConfig = loadConfigFromCq; } catch (eCfg) { }
        try { window.__cqFetchConfig = loadConfigFromCq; } catch (eCfg2) { }

        function openConfigDialog(mode, preset) {
            if (!dlg) { clog("弹窗元素不存在 #dlg-overlay"); return; }
            configDlgMode = mode || "add";
            configEditRow = (preset && preset.row) || null;
            var title = uiEl("dlg-title");
            if (title) title.textContent = configDlgMode === "edit" ? "修改配置项" : "新增配置项";
            configPanelLock = true;
            try {
                if (preset && preset.type && dlgType && CONFIG_TYPES[preset.type]) dlgType.value = preset.type;
                else if (dlgType) dlgType.selectedIndex = 0;
                var type = dlgType ? dlgType.value : "";
                if (preset && preset.config) {
                    configDraft = cloneJson(preset.config) || defaultConfigForType(type);
                    paintConfigDraft(type, configDraft);
                } else {
                    renderConfigPanel();
                }
                if (preset && preset.orgs && preset.orgs.length) selectOrgsByNames(preset.orgs);
                else resetOrgPicker();
            } finally {
                configPanelLock = false;
            }
            dlg.hidden = false;
            if (dlgType) dlgType.focus();
        }
        function closeDialog() {
            if (dlg) dlg.hidden = true;
            configEditRow = null;
            configDlgMode = "add";
        }
        async function readConfigBill() {
            await waitOfficialBillFields();
            var typeVal = getOfficialField(CQ_CONFIG_FIELDS.type);
            var jsonVal = getOfficialField(CQ_CONFIG_FIELDS.json);
            return {
                typeVal: typeVal,
                jsonVal: jsonVal,
                billno: getOfficialField(CQ_CONFIG_FIELDS.billno),
                billstatus: getOfficialField(CQ_CONFIG_FIELDS.billstatus)
            };
        }
        async function writeConfigBill(typeName, json) {
            try {
                await waitOfficialBillFields(configOpenedOfficial ? 12000 : 600);
            } catch (eWait) {
                throw new Error("未找到苍穹单据字段 crrc_textfield / crrc_largetextfield");
            }
            var typeOk = setOfficialField(CQ_CONFIG_FIELDS.type, typeName);
            var jsonOk = setOfficialField(CQ_CONFIG_FIELDS.json, json);
            if (!typeOk && !jsonOk) throw new Error("未找到苍穹字段 crrc_textfield / crrc_largetextfield");
            if (!typeOk) throw new Error("写入配置类型失败（crrc_textfield）");
            if (!jsonOk) throw new Error("写入配置详情失败（crrc_largetextfield）");
            await waitMs(250);
            if (!clickOfficialByText(["保存", "暂存"])) {
                throw new Error("未找到苍穹「保存」按钮");
            }
            await waitMs(800);
            return {
                billno: getOfficialField(CQ_CONFIG_FIELDS.billno),
                billstatus: formatBillStatus(getOfficialField(CQ_CONFIG_FIELDS.billstatus))
            };
        }
        if (dlgType) dlgType.onchange = function () {
            if (configPanelLock) return;
            renderConfigPanel();
        };
        bind("tblnew", async function () {
            if (configBusy) return;
            var clicked = clickOfficialByText(["新增"]);
            configOpenedOfficial = !!clicked;
            if (!clicked) {
                clog("未找到苍穹「新增」按钮，仅打开本地面板");
                setStatus("未找到苍穹「新增」按钮，已打开本地面板");
            } else {
                setStatus("已打开苍穹新增单据，请填写配置后确定");
            }
            openConfigDialog("add");
        });
        bind("tbl-config-edit", async function () {
            if (configBusy) return;
            var rows = selectedConfigRows();
            if (rows.length !== 1) {
                setStatus("请先选择一条要修改的配置");
                return;
            }
            var row = rows[0];
            if (row.statusCode === "B" || row.statusCode === "C") {
                setStatus("已提交/已审核的单据不能修改");
                return;
            }
            configBusy = true;
            try {
                if (row.no) selectOfficialListRow(row.no);
                await waitMs(250);
                var clicked = clickOfficialByText(["修改", "编辑"]);
                configOpenedOfficial = !!clicked;
                if (!clicked) {
                    setStatus("未找到苍穹「修改」按钮，已用列表中的配置打开");
                    var parsedLocal = parseConfigPayload(row.config);
                    openConfigDialog("edit", {
                        row: row,
                        type: row.type || typeFromField(row.typeName) || parsedLocal.type,
                        config: parsedLocal.config,
                        orgs: parsedLocal.orgs.length ? parsedLocal.orgs : (row.orgs || [])
                    });
                    return;
                }
                setStatus("正在读取单据配置…");
                var bill = null;
                try {
                    bill = await readConfigBill();
                } catch (readErr) {
                    clog("读取单据配置失败，回退列表数据", readErr && readErr.message);
                }
                var parsed = parseConfigPayload(bill && bill.jsonVal ? bill.jsonVal : row.config);
                var type = typeFromField(bill && bill.typeVal) || parsed.type || row.type || typeFromField(row.typeName);
                openConfigDialog("edit", {
                    row: row,
                    type: type,
                    config: parsed.config,
                    orgs: parsed.orgs.length ? parsed.orgs : (row.orgs || [])
                });
                setStatus("已读取单据配置，修改后确定将重新保存");
            } catch (err) {
                setStatus((err && err.message) || "打开修改失败");
                reportError("config-edit", err, {});
            } finally {
                configBusy = false;
            }
        });
        bind("tbl-config-del", async function () {
            if (configBusy) return;
            var rows = selectedConfigRows();
            if (!rows.length) {
                setStatus("请先选择要删除的配置");
                return;
            }
            var row = rows[0];
            configBusy = true;
            try {
                if (row.no) selectOfficialListRow(row.no);
                await waitMs(250);
                if (!clickOfficialByText(["删除"])) {
                    setStatus("未找到苍穹「删除」按钮");
                    return;
                }
                await waitMs(300);
                clickOfficialByText(["确定", "是", "确认"], CQ_DIALOG_SEL);
                await waitMs(500);
                await loadConfigFromCq();
                setStatus("已删除「" + (row.no || row.typeName || "") + "」");
            } catch (err) {
                setStatus((err && err.message) || "删除失败");
                reportError("config-del", err, {});
            } finally {
                configBusy = false;
            }
        });
        bind("dlg-close", closeDialog);
        bind("dlg-cancel", closeDialog);
        // 点遮罩关闭（与 shadcn Dialog 行为一致）
        if (dlg) {
            dlg.addEventListener("click", function (e) {
                if (e.target === dlg) closeDialog();
            });
        }
        bind("dlg-ok", async function () {
            if (configBusy) return;
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
            var cfg = buildConfigJson(names, configDraft);
            configBusy = true;
            try {
                var wroteOfficial = false;
                try {
                    await writeConfigBill(typeName, cfg);
                    wroteOfficial = true;
                } catch (writeErr) {
                    clog("写入苍穹单据失败", writeErr && writeErr.message);
                    if (findOfficialField(CQ_CONFIG_FIELDS.json) || findOfficialField(CQ_CONFIG_FIELDS.type)) {
                        setStatus((writeErr && writeErr.message) || "写入苍穹单据失败");
                        return;
                    }
                    setStatus("未检测到苍穹单据字段，已仅更新本地面板");
                }
                var modeLabel = configDlgMode === "edit" ? "已修改「" : "已新增「";
                var summary = names.join("、") + " / " + typeName;
                if (wroteOfficial) {
                    switchTab("config");
                    closeDialog();
                    await waitMs(500);
                    await loadConfigFromCq();
                    setStatus(modeLabel + summary + "」");
                    return;
                }
                var replaceKey = configEditRow && (configEditRow._rowId || configEditRow.no);
                var row = makeConfigRow({
                    _rowId: configEditRow && configEditRow._rowId,
                    no: (configEditRow && configEditRow.no) || "",
                    statusText: (configEditRow && configEditRow.statusText) || "暂存",
                    type: type,
                    typeName: typeName,
                    orgs: names,
                    config: configDraft
                });
                upsertConfigRow(row, replaceKey);
                switchTab("config");
                closeDialog();
                setStatus(modeLabel + summary + "」");
            } catch (okErr) {
                setStatus((okErr && okErr.message) || "保存配置失败");
                reportError("config-ok", okErr, {});
            } finally {
                configBusy = false;
            }
        });

        function xmlEscape(s) {
            return String(s == null ? "" : s)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");
        }
        function excelSheetName(name) {
            var s = String(name || "Sheet1");
            var bad = String.fromCharCode(92) + "/?*[]:";
            var out = "";
            var i;
            for (i = 0; i < s.length; i++) {
                out += bad.indexOf(s.charAt(i)) >= 0 ? "_" : s.charAt(i);
            }
            if (out.length > 31) out = out.slice(0, 31);
            return out || "Sheet1";
        }
        function exportStamp() {
            var d = new Date();
            function pad(n) { return n < 10 ? "0" + n : String(n); }
            return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate())
                + "_" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
        }
        function triggerBlobDownload(blob, filename) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.rel = "noopener";
            a.style.display = "none";
            (document.body || document.documentElement).appendChild(a);
            a.click();
            setTimeout(function () {
                try { URL.revokeObjectURL(url); } catch (e0) { }
                if (a.parentNode) a.parentNode.removeChild(a);
            }, 800);
        }
        function excelCellXml(value, numeric) {
            if (numeric && value !== "" && value != null && isFinite(Number(value))) {
                return '<Cell><Data ss:Type="Number">' + Number(value) + "</Data></Cell>";
            }
            var nl = String.fromCharCode(10);
            var cr = String.fromCharCode(13);
            var text = String(value == null ? "" : value).split(cr + nl).join(nl).split(cr).join(nl);
            return '<Cell><Data ss:Type="String">' + xmlEscape(text).split(nl).join("&#10;") + "</Data></Cell>";
        }
        function buildExcelXml(sheetName, columns, rows) {
            var xml = [];
            xml.push('<?xml version="1.0" encoding="UTF-8"?>');
            xml.push('<?mso-application progid="Excel.Sheet"?>');
            xml.push('<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"');
            xml.push(' xmlns:o="urn:schemas-microsoft-com:office:office"');
            xml.push(' xmlns:x="urn:schemas-microsoft-com:office:excel"');
            xml.push(' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">');
            xml.push('<Styles><Style ss:ID="hdr"><Font ss:Bold="1"/></Style></Styles>');
            xml.push('<Worksheet ss:Name="' + xmlEscape(excelSheetName(sheetName)) + '"><Table>');
            xml.push("<Row>");
            columns.forEach(function (col) {
                xml.push('<Cell ss:StyleID="hdr"><Data ss:Type="String">' + xmlEscape(col.label || col.key) + "</Data></Cell>");
            });
            xml.push("</Row>");
            rows.forEach(function (row) {
                xml.push("<Row>");
                columns.forEach(function (col) {
                    xml.push(excelCellXml(row[col.key], !!col.numeric));
                });
                xml.push("</Row>");
            });
            xml.push("</Table></Worksheet></Workbook>");
            return xml.join("");
        }
        function getExportSource(tabId) {
            if (tabId === "orgView") {
                var view = orgViewTableSource();
                return {
                    label: "党组织",
                    columns: ORG_TABLE_COLUMNS,
                    rows: mapOrgRows((view && view.rows) || [])
                };
            }
            if (tabId === "orgDialog") {
                return {
                    label: "选择党组织",
                    columns: ORG_DIALOG_COLUMNS,
                    rows: mapOrgRows(orgTableSource())
                };
            }
            var def = TABLE_DEFS[tabId];
            if (!def || !def.columns) return null;
            return {
                label: def.label || tabId,
                columns: def.columns,
                rows: def.rows || []
            };
        }
        function exportCurrentExcel(tabId) {
            var src = getExportSource(tabId);
            if (!src) {
                setStatus("未找到可导出的表格");
                return;
            }
            if (!src.rows.length) {
                setStatus("当前没有可导出的数据");
                return;
            }
            var xml = buildExcelXml(src.label, src.columns, src.rows);
            var blob = new Blob([String.fromCharCode(0xFEFF) + xml], { type: "application/vnd.ms-excel;charset=utf-8;" });
            var filename = src.label + "_" + exportStamp() + ".xls";
            triggerBlobDownload(blob, filename);
            setStatus("已导出「" + src.label + "」" + src.rows.length + " 条");
        }
        [
            ["tbl-quarterly-export", "quarterly"],
            ["tbl-annual-export", "annual"],
            ["tbl-config-export", "config"],
            ["tbl-deduction-export", "deduction"],
            ["tbl-partyQuarterly-export", "partyQuarterly"],
            ["tbl-orgView-export", "orgView"],
            ["tbl-orgDialog-export", "orgDialog"]
        ].forEach(function (pair) {
            bind(pair[0], function () { exportCurrentExcel(pair[1]); });
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
