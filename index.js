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
    PACK += "H4sIAAAAAAACCuy9a5fjRnYg6HP2W/+B/YqESzxAZ5AFkvkEE5WuV6pK";
    PACK += "qpcqq0oqZeekkUSQhBIMUIFAPiqTfWY8brfar/a6/Rqvx3Z7PG7P7E63";
    PACK += "PeMz/VJ7/8seVUn61H9hz40IAAEQYJJVWZLsnVJ3EgjEO27cuO/4lV/5";
    PACK += "nX/3NU3+swdhxLTT9B3+eX40CtwTW9sPwu5BJ/ftyPfYwNaalvVG/sMA";
    PACK += "+/0BK/tSr++73YM+DWPi2Vp4EHQHRlOzNMss5uuFFOfzWY3m0nJp3q5L";
    PACK += "z6kNcsxV5SgchYeYTq9VZpqvYuoPXXqSZVy2ljWr0Wq2tdZqY7m5VlWi";
    PACK += "tJX11aZmNaxmW2uuNtqTZSPcDYmXa299ZRWKWE2ttbbSaK8uVxcqbbLF";
    PACK += "W7RWtNbacmNtbbL4MGY418XSeeC5ShtYXl4pLeF2u5iwcysW2cq7bpWv";
    PACK += "iYcjRuMu8w+x0o1VmKfW0jKsS7s1Oc79kHoZhFiN9VartHafjGJ2fjbq";
    PACK += "k36Wa9VaKwfkgUtZvZllXIOMjWZzSWuuN5ZXmxUlWlmJlTYfWHtVay03";
    PACK += "2u2qEu05pkKUWJoDqEWJ5azE0tISjGN1VWutNNbW1yfnx/X8OLI1q7HS";
    PACK += "WqZ4OAG1vof3XXU91spXW2aca9cmZSZ373lTUyj5crtY1jHjDshnn2sn";
    PACK += "JEVnhe0k/2zA2wsJq0cuiWwt9vlDPcLU7yEtOokYHtZjH2l1dzQKcF2k";
    PACK += "IE3fxv0Qa49v60h7GO6HLETaLRwcYuZ3XaRdpb4bIE1/4JP+lkv62vZ1";
    PACK += "HWn6Xb9LwyjsMe2pewv7OtKy1kp7NQxJyHsFD9HI7WKkbW/dDUlYf4j7";
    PACK += "ceBSpF0PSRQGboQ0/Y6/j6nL/JBokEdH2l1MghBpafHysfvPsK01l0bH";
    PACK += "xc8MH7P6cWRrXTfoGocuNZQipvZ1zWqUYGpeKhpOK7VWVWzfjbCtFcuU";
    PACK += "Zg361S00G81WRQvHwbRiVaVa04tNlvJYvRsG9aF7PKXcSqEY/9pzh35w";
    PACK += "kp8El0RlWcXKTZ+twCe4ntI+jeVCR4/w/oHPZOlhGLIB3zQuYb4b+G6E";
    PACK += "vazA+Gt5qsxoeC49MAvEWZ6a+lXLhf9mIaSqUKNKSFUjiUpiqqraAjFV";
    PACK += "XfM0gqqy8iJKPvckuWCCqrW6lFJEKw2r3Z6ToKoaWIGOaq2sz0lIVaHh";
    PACK += "4jFSVfOU86Oqz6WU1KrFF2S9qbVajdbEVixSUpzW1i5rTeuN6bRUmnH5";
    PACK += "jXOoqSqS8v+/1NQEtXQeRTAPFFRSS+dO1uuklqrAfAZy6byBzg7A5QTT";
    PACK += "JHwqB8DXUfZo2/sYOphLcnsM08LRsB8ewxHFWxG9q++HBapj6NK+T2zN";
    PACK += "yiePXM/j5azS7gzYMMia3w+9k0LT1dz/F3/oquejqCdLKVTUDYOQZq0l";
    PACK += "QGBezCneGLl9XJioURj5QELaGsWBCzhzVjFKKpXpBbiwqJBS93yKu6Lq";
    PACK += "bhjEQ5LP4wZ+n9R9hoeRrUWMYtYdnA8Dr7qCklida/1mWxRllXPp8A/Y";
    PACK += "Rjeo9+EXE2Y0W5Y1OtZW+F+XacvWG1q9ab2BRFv1oX9s+ETsTCQbltjI";
    PACK += "1JqtN5DGqEuikUsxYaZm5RO0FesNE010YgroTcDIFe3rc8LJs7pPPHxs";
    PACK += "a83yat3RqB4NcBAU6gVQyRXiSMEn6XJYM0PddIhSOyMRYKErUpTYalmj";
    PACK += "MniOBtQnB/N0aJZtIPEilbA3OtaiMPA9uVp53F4NcVPgRlZhautFuJms";
    PACK += "zaPhqN7zAwbnyH4QU6O5Mjo2tchlMXUZNpqNZgUueoniJStS36cu8Yqg";
    PACK += "l+ABWBgNqizhXtPzhbFwOMdElnWC+SzAc8igy7EM8LZl6OhIAvaKVYCk";
    PACK += "ADOGaR04dz7cesNqFUVMOVw0SRZNx2vt6cOO4v05Bi0O7joLR7bWmtgw";
    PACK += "pTNyHE077oo8xDmLRNzD14dKZtm5fXdkaxNwmAJrswVwOoFKgLXsBeGR";
    PACK += "rbkxC8uHSNxDjsbmRMGzokagMDGdUY2izl97rXK0lhivVbkzbY2EBJfj";
    PACK += "PilUVeQmIsnU6jDBU9Cegs5eZZ8AuNqaTwaY+uylKIjczl4u7mxehq+B";
    PACK += "rQW4V+xrTCPo7Cj0JxeGj1AuezZyrdFcjiS1wJ+nA1JCsRcAqhsSxrkT";
    PACK += "Xe9UQJq7H4VBzHARU/UmtxPHBMtF+JGA1S5CRcWeLICEBaiF/986j6Yu";
    PACK += "cG1myTT2QjqUMBO4DD816ssT3JE636KPs8zvALZ1kfup7KJg8swZIHaC";
    PACK += "HTSnd6ThR3WXSz6mdOZcWqFAa5Z2/vX2vgJg06Msh4iKVUFbo3rg7uOg";
    PACK += "ipJoWpKImETgMx5d8x3lDWtl6kk+5eyDf3EEleEAd1kRj6qDp9j1QhKc";
    PACK += "1Ac+YSWHYxUJOyOOm6fH0zmqdB3WYBlaVSdGkYgrp4Jf+RCp3g98kKa2";
    PACK += "ZFVSzur0h7RfP/TxUT0aBT57BeJkSqX8nVGM6zQ8KqJzeY54uOfGATun";
    PACK += "PubuB7h+RN3RLD2d+RAvx+f8bDh3OcvIvF4YVpqDvASdw4m2tXOItirm";
    PACK += "onQUM3EWQ9cnswKEPDFfA7E6SY1mA4ed2JocfXEQ9QF2vYmj7lVW5IM4";
    PACK += "Yn7vpJ4SI1xzWd/H7Ajj0lG0ZmXPJzpfxthV4PvglVm35SLGL+DEVmlH";
    PACK += "L39du4HxaBvjA+2WSwmOIu3Fn//pZ9/577/8+M+ldk1b1D7/w7/57Hv/";
    PACK += "8ZNffO/TH/zo+be+oy1qL/7y37348fc//cX/8eKvP/7lxx999s8//fTj";
    PACK += "P3vx4+8///bPfvnxd7SvXy5X5pXJBDPkWJc4v1Stp2Tzh24fl2GHjN0Z";
    PACK += "+J6nrud4Sn8mJcxlecpEzi9N0vokwpPkqCTJ6/gQExaVDTCVe1nzDa2a";
    PACK += "PjtXeoiDwB9FWFu33tBWrTe4AHHtDa0NtBrt77tGs7mGtOZSC2nNtRUE";
    PACK += "yo7WpJBwea1MSFjV1vLyG9rSMm+rufaGtrqWtLVqIW3dQlqzbUFLzbKW";
    PACK += "ludqyXpDa4uW1lpvaGtpS7yVJvxZ5k1ZayVN5ej58dzgMwHSE92GTezS";
    PACK += "rNss1LjsLpl6mPCWtYS0VjvtZXN0nO9mc3RcMiMlVQtx1tx1V+5TgefW";
    PACK += "gfpdnxRNAPZiJ2Dd1G6VS/mGbnSQbPaqBVxTwBLWEhbwVy3LmhBca6ut";
    PACK += "Ivf1OusvCrnnOA1aX9px0GDufn3kEhxEX560q7Q/F9WdSZT6kvRMaS8r";
    PACK += "GeKK6VAr8VzmCjL5KyBoXCvlUxMt2Hmiq9LvOQAszSFP/4lv5bNUH4Yx";
    PACK += "YV/uXH1lZoXVWRgGk0qmCyWV+Yxg4s1E689CJXtM6m+EkcvMCrKhe1yv";
    PACK += "FCELEABzhLzIW5XotFvTRMvWrBIC3usLFxBciNL+1WTMUxbJ7oXduHg6";
    PACK += "hDEDQC5n2AEMXA+Icov/B2zfxBiR/AhCsmoJCZiQmFp7NgGJx+pDzNyZ";
    PACK += "jtxXkj4dDXyG+fHLZwCEHNXbdC45yAwSG4/VR27fJ8Iy98tklOfSY8v9";
    PACK += "VqLQmxwcrvukF77edSxrFWqvEAm31v6V4IgZplBBjStTFgoPR6xoF6Vq";
    PACK += "osqAbJ5dlunll6QYV1vwh6OQMpdMkT4CVR/26x77yhC0AdbYoMEG9Sik";
    PACK += "rEKoWqqcm1EuX2ziXHVRNb6V2hdtZXkmjCsbrPuEVAvtfMJpnpeVplbK";
    PACK += "C9PGu9V4sLLt2ZmASja20V6eQtpZUzvN+Yaomx8EKs3m4WK+4lmcdKg5";
    PACK += "Za9Nqi2n9Yo35YVHU7vEM8WjySw2CZkh6zLTFyhkvlIp6FDV2Cv527KR";
    PACK += "xaMZprCiFmXs0/pTVdF0or1P/SKxTX2vzvBwBBrluoDSyAa8NXSPDZBW";
    PACK += "9ahZQvieu7dEVfUKkTcNj+oVfOEMZL4cJeeMQxJdIJHCWwdiytbyVFc1";
    PACK += "I1uu8yjrLhe0fUn8VKXGGTZ8fZ+Rcl5pkq+p5nhmIUJak0TIXMrSi6ZY";
    PACK += "ph6PF3DCTCxRWaYZbWRQMsPnmc0kSzqjWcf55hyzGkKksCSeorjy3Kwk";
    PACK += "NvKS7tkrLFj4zVrjMAzn7+Plr2tDn7raNdfrY+3//bd/lKisVS1VY59/";
    PACK += "vXCapbDL1tfX18/nHCrtzDIaGETqr8eWpGDEuVxqYNXzWbJJztvy5RZS";
    PACK += "ZdTIuRCbrmTMWEjyy8fIxS/eTOig/JiZKhN4efR7IfaBs0nBll4BTi/C";
    PACK += "xrAEf6KEoJqCTQGRchFV/dCP/Elp+ldSVAWd9vwIGLcJc/RzdcIZ0btc";
    PACK += "WXs9QXmnX9xuVdt9BR40tQ5cm3ku63KRp7RXCboq0NnTiJvzKZbKU222";
    PACK += "LlZPiZApzQFcSWuvsAyyzeWZ2rz8dQ02UpdojwCmf/nxR5/+/Hsv/vI3";
    PACK += "n//op5//4g9E4mX+9xY38BHPD8OjLFE8XQu9E/F0HQfBLz/+XbXnL/76";
    PACK += "x88//u6nf/T3n/7+P7z4i+9o17e3teff/bPPv/3dT37y88//5s9++fHv";
    PACK += "fvKzHwpzls++/V+f//bff/bjv/r8z79bMFBpXIhM9guyJKwy6J99IRVM";
    PACK += "pi29jJMO6GPyXjbLc3npTC8/Kck6nc11YMajMdvfgTuCcBDJU2F3uyM4";
    PACK += "obi9nS0NI+Z0DCiTyWEXTs0Jx9WpzkTnslYzt17p4RExv3twUmJgb53v";
    PACK += "dlfcE61GSaya5OMk0KYkR2OJ4qHWWGqvThaf7tFwiClERgmSHEPf8wI8";
    PACK += "D0U0t8/lrPtr7Su3vwr6U9HnLJ7IdNUWHbpBOT6SUph9it2D+lFIC0IN";
    PACK += "SKnzj9V5CpzH0lRY5k7YX8xOOodmnaWbduBGrN4d+IE3vcfWTLW9/Cmu";
    PACK += "wLa2MptMXzRd6SXZEPu1YuMWtyYLR/8SQXG5BJkcutR3CauTeIip37U1";
    PACK += "5u5D0CRIiC4AWYOUuRsOR26XocnlaDAv+Vo8IM/jPJUpn2QmzsOlZaDR";
    PACK += "6Pb6s5k5RzOGJIKQUuas2OEl1bwZjXo1wJT98uOPnn/3f3zyk9/+7Ad/";
    PACK += "+Pzjn3I75t9d1j79wR8+/4Pff/E/P3r+t/9YpBtdKFcviSCZHaw9/xh7";
    PACK += "Jedqc0JgIF2yWxM8eXrmrlqlopihT4z2egsMMzkN2bSswyOgHeEYML8A";
    PACK += "07DpHOq4MF/nsLclBMKsfqgza0uET3fv5TQgE18KcQBcymb0dS0wADna";
    PACK += "/0KF7hC8ahrzWghuZU71VlmZTepYQnenwpUJU2QhT2lOladMO7lQSY28";
    PACK += "tyDhEtbMYMHM/9doLhV65hJ/6Epjfb6jfaI1WpGG3QgD4zwFlq9o0WG/";
    PACK += "gkFZqVLFTH6Z6twul6obUxjrdXir7lGplTHfBgK8ba01D11c7dFfYXfc";
    PACK += "VAmAic6BspT6oxJLpWldvBhHwLLOJHG7Jrw6lAaVbOY0SVE15Ko1aK21";
    PACK += "1MVV7l5zxj6eO4fzdWQ168jEnE7pEui8A+we+qQI9xPbKIyZ1mgty43k";
    PACK += "E60X0iOXelFZ7b92gE961B3iKNuEBZKChkPtVHEb6JS6WRtrcBLW10By";
    PACK += "otQvTl61fDNXnh9aSv4pPQsnLFWLXWtOb3l6z1cKPS8lWW5wq6aiXE2k";
    PACK += "Xr5/iGngnly+LtQWlxMZG6CGyzcy+Lm8FYYM08vXgzDCc8vW8rSQNLMK";
    PACK += "RdPz0EPlrlAp1bNsdV6fBr5UY6ecn/mjw2osl++M/OB3hO/Z7qyKymI1";
    PACK += "snezyr0Uch5IwWZ7xZqJFkywJBRaWcuXGbwe+nEOiueCiZiLpD6a1gzk";
    PACK += "Bw8eBFM4AUMT0Q9ncVpMYOOV/GGFrc4khTq3qe8Uj2YgrUXgpDn8Zouj";
    PACK += "nN1VKui/qqdU8xxHqfbUrQqYs8JtYamK/mvNE7Nm7ugz5xBIXwkLmvl1";
    PACK += "3xVT/wWZzBTbLokA+RrNiWl4NG8sQ8HErkxR75fs0clx9nw8IbC88DBW";
    PACK += "Vc3yiCqK5MsL+lwyWBZp5cKdAcq7JGyvUcVXaNOl2C2V8P6LcgxQ4GTt";
    PACK += "Jdn96Z5x0ye4wueiPRO0VqyCGgNmntgxFMuxSrno1A5wcnr2/fLSBqGT";
    PACK += "Ypk0VuHsHjhzxkpJB9sdHFSQppUn3uQXiW/PsUmfemCN86gBfD26YfDl";
    PACK += "hz1ZqYLSACCEDit7CVRoe23Ciyox7Z38ciFBWlplBtKlXgv5kcBmg9hX";
    PACK += "R1+mX00GlL3+xfqJX6SA/AsOMHXOEZCLSjZrtMjJieasyJfpb7j2EvxF";
    PACK += "1vvZWYw5jStnMQsrm82SGGoXG9X0PBV7RadA4IcpDen8QtKpdYYH84ov";
    PACK += "U0PAVeuNEr68uuHAj9hroGKrED00OYkXXzmM2HnNcXpyh52MsKMDpOi7";
    PACK += "aHomEg/3MdV3q8itfw1u8F8kJVu9EC9PlIxfagllPavlgZJnNFyYbLqc";
    PACK += "9ZpCYiaikLXXHLC5aCLGdelTRxLFvZ5//MpBK18hxHSuS7yyL5rbLjQ8";
    PACK += "O199kUdQe3mWvpWFB/lfeOol8RTYg5f4DVdu1uqYB+ezl18VovdfnIj0";
    PACK += "JQJxTyzwFy0dTdpteC7p43IzxfnIRmDqXzW87Tlo9Au12S8qeOaA4sKs";
    PACK += "8KC8QFFX7WJriuNza2VaSKXllYuWNMzAmSVjesWFnuYekeLYqgNxSrDj";
    PACK += "V6beWxViHZj3UkdKZbmqTMcuRmH0Gq8pmG62/3KbKV3FZbjSaMJYahru";
    PACK += "nm7NdE4Up1IoESgOlX+cKTr+BaPgmdqvFmBUbYYrII0h1VbsU5mAeeeV";
    PACK += "hf1+pdvPHFZ1M12j9JqP8ZfgBwrzwOUvJaGVuHerH3CDoil2A8VZnbRX";
    PACK += "VCmN1Cypmrgo6V44wqSqYmHjREMGBk7rlof754yagxfFpFx/Uxd3gVQq";
    PACK += "LtNqSgK5v+S1Wi8hndEmLh2w5onxXkp6vIyK8+VI3KlhpnIzLZRjtMpS";
    PACK += "aZ4NmfQINLyi2i/Y7GseDmEOxkOuswTbeWjM8ivapmnmlCUpPZjkNx62";
    PACK += "iLr9/qQN5+s+mbijbQnV+sWp6Up79C8/DFOKbcD+6mU0I5zT4nsee2Vh";
    PACK += "My8qfNvLug+8xEEK7Gjgk4MKe4yLoJ3LVdavTjhPxc/ll9VODLuU/ebN";
    PACK += "ebgbUmmqHRMPU1jRSqiAUJj0i4CG0nanWoT8ryicFQjtK3bPTrlv4+Cg";
    PACK += "yq+xysJkMmDNtACjhZkh7hCXRE77UtHB3Pt8OlddMeKLwARJIK5GNHw1";
    PACK += "ubGo81d+ZeWPNjz/UOsGbhQ5Omx2/UqaSf2UXuWrfOd5XIjNkOSS9yIV";
    PACK += "8hTryt37WpKX5wdWt1iAmwvoV55/688//ee//fTn/+XFH3/0yU9+//lH";
    PACK += "/+fzb330yc++88nHf/bZj37zk5//eOMylJ6j4ije59U+/8Efffrz3/z0";
    PACK += "59/+/N//vaj/s3/+3vNv/+zTH37/0z/4rapqNy57/mFJMtxWWmiIuIe6";
    PACK += "RsMAlJLuPqjEdQ0UgUKp5+if/OTnz3/08Wcf/deqadkXQbdktemloamQ";
    PACK += "Qdd8j9dd/zB2KcM0ONE1oaYURZXm9dIm+LkBXUoIEUdnNMayn0C90zDg";
    PACK += "wAKGBEoryaUAjp4lXnn+3/7T85/9nVgW7iXzFxuXRUfmGmA2LJeQ2A1e";
    PACK += "fUw9N4iqBpW0kY1Iplx5/tN/utjhdEPS8/uvdzhJG9lwZMqVz7/1e5/+";
    PACK += "4oeff/+nCYBPHYu6cwp3LupXtBf/8T+/+NkfvPjjf3jxez/Upu7A8+bE";
    PACK += "w17MGYfXOy1KM9nMZIlXXnznPz3/6Lc+//5Pn3/3Hz77p797xYUeuZSd";
    PACK += "XOSmnDY03tg7ZVuz8EXuTxWjvuI4Q/qaoZk3kA0IXvmJwPH2i7/6z5/9";
    PACK += "6G+qh7BxmbiHs51OILuaDQsnp7KchAEWB35xGlQ8//yjb7/4vb8RQbFe";
    PACK += "/P33n3/8XV3jp1vppyuV87YBAj+1G1FMdEEMOHpzWZfHv3iGKyCvhceO";
    PACK += "zoPqLWmtJV3r+UHg6EB26eDEEB5gR1ednKuXDP6JEnXZXiupAjgf3HVH";
    PACK += "js4Jt1zyB6FP0nQ+JUJuKk+ZK1Pb2+j6tBtgrXvs6M2WrnVPxC919CVd";
    PACK += "u3xO4ZHLBprn6HebLa112JqzgDVPieFSY72t8T/NxlKT/5mjdHO1sbKi";
    PACK += "yb/zl7/b0pqtwTwDbFlzlhiuNNpLoof1lxrhesNa5RM0Y/GNy9Fhf46N";
    PACK += "AEFq/zXvBBU22+6KtiI9KNflf5bW1Jr19fr6+y87rXMdBHkcyN3CzsWB";
    PACK += "3/ofn//pf8vwHn/VjJtR1zwP413ksk4s3Szr/AUs65oGi9pcm2dPQgHY";
    PACK += "+xe/5CU8zsZlzvtd+drXqo5SuH+1jBeU/rNKLulSW3XeDpq5zIIP5JCm";
    PACK += "vJfyGoNm2VhEa4WeF3uf3cJX5HkjIdeeyFhkwyZYpJQS4l/U7RBgb/+k";
    PACK += "yLhNJ1SkvLxqziZzJqH/p+2u/K4GQY0SP1YSOPvKmOoEHxU2+ZUXf/IP";
    PACK += "z//mL6ejjymNySipZY1hz2fF1j75f3744o9++jpa83CRz7zy/KO//vw/";
    PACK += "/O3raAwEn/WoG1JcbPOzH37/0x/+qSDOn//znz7/6LdeW/v4cIK1zjU/";
    PACK += "O+P7Kp047sJ+IN2KmVDlPa+vK/gYLjWaWP8fffz82z8752QsFwdVbUqu";
    PACK += "YhQ9yC55U3BAlXSpIllpoXhLY9rI9No3Lkv8VsTsVWhPRXaJ6GQmTJdk";
    PACK += "FgfkVxfbiX5+EahOtvRF4DnZ1BeA5GRLXw6GUxv/ctBbrgdfIm5LYOtL";
    PACK += "RWyJIPU1YLUpVb8SSkvEpzOhtCTzVxylfQGoTMzEF4LKZFNfACpLBvWl";
    PACK += "7qFEev8a9tCUql9pDymy9pm2kZL/K7aTJkAi7eqXDBWK5uI1AMb02l8J";
    PACK += "NorKipkAZEKd8lUHk/wov2RYKWqBXgPAzNDEK0ENVwPNBCo85yzgkfk5";
    PACK += "wRMIE8WraLaQdv4K5ByECnVk6VMgq6SukmoqV28OYMmbhc7TJ9Vy8zzZ";
    PACK += "5kvtr3n3WUj7T2BqXn6DVeq8J6wzC6vBk648/8X3nn/n9z777d/49Dd+";
    PACK += "+slPfufTn/1AqCanqcRnWK6597iciKngMUOb0za7lrvaOe3ALC3PjnEU";
    PACK += "LDFT7lyS8iofvzZh2ZTGj5e6iw/rapJAKf4hdvRRGPgs228TNeUDkMrp";
    PACK += "CJSEIhIqKSyt4xPUJlJlL4ah5wY5axwV1UFLUhBeKZDPxa8slcy3ClkV";
    PACK += "UbvSgOAVUuuRjcuDVkll+R2rRgzMKpSvc2qJKo3GvjTd0GvUC82rE5pH";
    PACK += "H1ShCypHkGXbbRK4ICzjOZoLJVLYLOZ/uZiDirHHVCOjsnM9w9fTzvAZ";
    PACK += "z/FZjvDzj/FzT/C0GhEZotgnbqUCMb1Fmk+6QexhOKZ6sxyqIqSDrLQ7";
    PACK += "OMg6lqtJ7s/uAHcP9sPjc1WS8O/5737r+R/8Xy/+4v/+9Gc/OOfQ40O7";
    PACK += "kBNKcbDJhpImSBzy4nf+BG6h+4d//+KP/+n5D3/x/Gd/d94SqnjFUvDK";
    PACK += "UgGvNOHGzgSv5DHJvJrgorlLW1i7tLmxS3OmFVCLr75acdn66qu1vvpq";
    PACK += "rTebr9b8zOXPszWZDx5nIqxflbh+dQJ7TiJbRLm/IDJ7BlJ7tko44vnx";
    PACK += "f//8335H1pci/KSyLudSr1izkOPTp4b792RYphtgl04IVX/yrU//y7wT";
    PACK += "MWPPZjg05mUYxKLOdh7Nx6rMzjrM2IcL4S3KCJMkOugMHL4a8nYaMSGO";
    PACK += "bn5IcyL6ZIQT2+tP//Hnz//yd84/AqUHVkqH8yqmz34oric5dIMYKzb5";
    PACK += "e1wyszfCtFdm/it0YJ/94Deff/QfNi6LOl6yIUXZlTQ04apxIQ31qRtF";
    PACK += "NAxZlDb0Vz97/o+/kVKKk+2Czftv/PSl2hV6pvw0creAC51G2UpuDkUr";
    PACK += "FzmHspXcBIpWLmoCgX0H0H0l+VQutnQ+8O25++7K82/9+JNffE9st/M3";
    PACK += "mtJqGi5TYVeF/kekXpR8YxauSkS11s/lskuPbN5zl3RL9GPf/ZMX/3OK";
    PACK += "yf8s6kTOzR0Ua/70+z98/sM/n4mRnBDS/Mr/9r//G8MwnSunhy7V7vWc";
    PACK += "+/sf4C5rdCl2Ge5A4rM4SfRwzyf4AQ1HmLIT/vFOWqKP2f0jknxMbt0J";
    PACK += "Kc/2pCLbPbhmiOe4oeZ4QEMWwiDv99Cl9MMoSW0M3EiphJe/yxwDI2Y6";
    PACK += "V2A0Bjs7w4bBnFNBNUX26XhsNuQLYiZiyYvJiz/q8eKIIAqT4fcMVqtB";
    PACK += "W2FPY46jh7wL+tmZktaLidDTmL2QGgFmWqCFPe1Jz2CmuXCp1+i6QWBg";
    PACK += "FJi1WrDgOKRWexbDOzrtY2ZDP9lOsIswD0wJB7a9YFDnTs9gKDDNszPa";
    PACK += "yD6NzQ7FLKZEw2Pe4xMqewzDJQ5ecEgcBJv3esaNnoFN0z4do0c9mIgF";
    PACK += "DP9v7O3h6G7oxQHefBYbBOkJaKFTjqJsnOuJNTZtgrAp5udx7NxlxjPn";
    PACK += "yqkeRxiELX6X6fzTQ+Jsnwz3w6AB06BT7HZZAwd4CMI1E93vlXyGmXcD";
    PACK += "3US3yr72qNuXpa+WfRet7w1DD+sm+qC0ARr2/ABT3UTXKr4f+h7//rjs";
    PACK += "OxcOHkMP3iztobjZa4/inm6id0s7GUcjTCLo4Ttl34d4GOomervsW+A+";
    PACK += "O9FNdC9OvvkMUxc2UwJz2nuwyKcJSDgOX/0UPPFCCrKb8ME2sHMvrtXw";
    PACK += "zr149+wM7+i/9mtJnfouSkqpQL2JbShpjvnujJ1TP7oL5CT27CSPkXRg";
    PACK += "oTlGmHwY4xhvhbSLH488l2E1X/r9IR4Fbhdvs6oM25hNfhyjSykWcqPI";
    PACK += "7xP0KHZOx9l8vMvkbjhlAz+C9R1FDkb8RS6mw8Qrxb3IeRSLl5h3lTrk";
    PACK += "7OxGPH5XxTJ+9BBW43o4HIUEEwbt5TJEsqtO2lXAQBx5TCxDik0gLZ3k";
    PACK += "Wk3uW5MNIO7UTQg8behJxUaj0TAhXu0BXMZGNFEXIJkIPms8su1+gCO4";
    PACK += "cE2MRAup5mrptBwN/O5AE6s0vYqGbnbUGWkU1sOAjwjmOO2ebhYmpJct";
    PACK += "vjInckkK9SqAklStK+Wh7nQU92MAgvtx1pSjtqvsiuAioAAg/sPAeS9Q";
    PACK += "2iP4SLsfdz4MoB4RxTGkzntB51JsfBggtTsm5PKjBzHFBQBasMShGTtX";
    PACK += "KXVPGn7Ef9Gt+LwzDj0NnFMp5uL7coyuxs7pAT6xFyxEcQ9+9vZAhCif";
    PACK += "wph2ORrPZueDOJkd6AVFgXM6RiGHP+Tznw7AroRIwEdU84nGYK4WHOcw";
    PACK += "9D3NqtUM3+FJcIge4BP1S+jo+iJPNREzb8XiCGSImrXawtW4MCgDko1g";
    PACK += "h+46bIfuipMmdlzajwH9R40Akz4b1FvQrdhxnKYZNJJ4WQ7p4CDCmt8z";
    PACK += "mhuxeQrdhfKRmFsjNpHrWB13I+64i4tmtOPuZjXvuIut3Y5SWTT2ewau";
    PACK += "1XBDnorQxyibg9jJf0GxyfutjJ2/x3wcYr+dXrok9rz9kHAUa2MECxby";
    PACK += "9fIRh047QHvhEcHUfho05AKPx+mSfdgTOKWyxgb88GoZrxbDysiqsdgA";
    PACK += "SQO4IR6U6t8PlFNEOQVSpIUXxMkCM5M07jjOQ5LV8ZSfRDD1zDnVHd3W";
    PACK += "HUtHug0PLX0sJ0O/pC9C3zj2Ny7vOPbu5T5KkQTJerFDdsfi1HkSO5e/";
    PACK += "cXnxcj8D4bcDdT7O7TIHT04XPe0ZOvQAQNNmDRZuM+qTvtFeMbOhHNGE";
    PACK += "CESBGFLoJE10jNBxHB2iRgAV7OlnZzxhPwwD7BIdQBmLncPh2HcWmgC3";
    PACK += "ydls+rD9OchGRz7rDozQPO26EdYj3hPd5i8ywrnNc/Pr2js8XQ7PlmWz";
    PACK += "1RCVaA8JL6/d7/GiY4Bn35TT5DsYBU5g+CbCDoVe65t6Q198OzB8ZJk2";
    PACK += "RXdiIzA3DeLoOpJHUq0GZGW6ZE9ipF+qXdbNRf2ybqIjagR8qnQ9W0U3";
    PACK += "XRh3bJp2kFb0fmAEfK87H/aMAJFFYyGApTg782s1H54cx+Epm7puw0rx";
    PACK += "F7Oi9UVsAvIZxdHACEwT8Yn2HQtRZXQ2XdRtHUaGTTPBDrFjdeINLDFL";
    PACK += "J15cNE9DB+/Eux2BPChMSohis+MvOkfUCPkgIxSY4wTdRA4nvhKqKZpg";
    PACK += "BbATSdrfRNDgghE6uEHwMTNMs+FB4BUzdMIGJ7tR1ubioomKraZIjgOb";
    PACK += "hAJJLTBHAjE2kaQcxDESaS7FGgkZCB98T3MjzdX4WaSJaJZGT4R50RcN";
    PACK += "BvXuSLJAFN/VN2VL2pHPBtoBPom0U31RnlHwamCzAWpWQ0caLMpYt5m5";
    PACK += "qJsN7XZPOwljbYhdwoAsoRjirGguRI4JpLVR2NMSzIsg/B4QJi5gbbgc";
    PACK += "lWHXA2Ikgd1se27T5PwS+4pvq4QE5utHnZ1dFDhWUphvaAowqoJpmOEP";
    PACK += "sU4EhShYXDTHJqIKcuSIDZpq7AGxFEeO49SbCa7DjT2KozhgHeYwA+CR";
    PACK += "DTAxVJSWK2mdnRUqAoyRpjRRWqFDzDF62Xpa+XpMlM+cy2speZk5Lgy1";
    PACK += "mc5tkik5AjsC/tJ0jq1jXKRQrlPnVIm2KRLf6jmngiwSeW/40chl3QGm";
    PACK += "doyR+uUaJF/nYiD7Os19ui9PTIW4uQY0Yo6KdruME9CaH/G9EMUj4Dsx";
    PACK += "hNfXRjSUZpbafuwHXgRAyZto6Ob4WeN6QhmcDt2RvU1RL6Q33e7AVml9";
    PACK += "AEUOlAqvwhruaBScCJo2JTjMMYJF5SoRWyWNBSylADtR2+Li2ERsjFjI";
    PACK += "yZpc2dIyyuE4Ns/OdnbHKCRBvqDfMxb40Z9nO8Twk5E3oJiGj0dcmyO2";
    PACK += "chdDdF1Xi3wCwVUFSpG8vtjSys7F43HnWSOjft9lnWeNLcnbO7d6nWeN";
    PACK += "B5JNdz7gbzHFWfb3gs6zxjZn9e+GHnauQpZtyVU778Lb3t72zesPbz7a";
    PACK += "u33v0c2H967e2d67cX/v3v1He4+3b+7df7j39P7jvXdv37mzd+3m3tbt";
    PACK += "hzdvOG9BObfLnGtx51mjG4QE3xT9d4orqyCZkmlSi0o+7dEAa8mKa8M4";
    PACK += "Yto+ThGvnCWk7ceMY8iRG0XY0/RFvKjDrAn8dSk2gBcWlJuJAoeTLCh0";
    PACK += "BGHnOwkVp5LqnOUsUumhoNKR72SUZQnJHigku6AmgXDiLEiOFBanZ8mX";
    PACK += "Dhx5EWcUFIo/Kqf4IdmgOxFQ/JFKPsdpnzbjnWjXhs+CCowqGAKJosoZ";
    PACK += "gsg8lUyWEZmd5PQXDEHEGYK4hCFQKovHM5DcASe5Q0lu04TQ9jngCxHq";
    PACK += "dcl1luxb7GSVP+6hPblGT6QwLvfeggQ2oNj1rnMcYqEHUoTF8Sq6HpII";
    PACK += "hHfibU8ukKhLJPWDcN8NQOIqMTFuJFUoHbkGHRF9tjHkSSp2cDaoZMd8";
    PACK += "EKdJWy4wxCfOJG77IG7s+8QzeC9wih0Yn0ZgzrN6H+KeMyFcyh8qkFlK";
    PACK += "33K58SSP9GYPCeLDFpjIj54ANZR0/n3ALyBpm1rJ2z20N3JPgtD17FN5";
    PACK += "Ntr1JpInH8zRnk98Zr/f442AWK8gDypW+U4v4Qa74RBi7Nks3QhCWsd4";
    PACK += "Vfzm6kfp+VkytddpIztfO7k3EFYxenKKDXPc84kbBCen+QyikZhEXFe8";
    PACK += "l+LEOMLX3SCAaIClA9FinKATNS/PMpblq4G+UFhkNHBS8gbej/scalVA";
    PACK += "SD/2MKXYK3yvqjyXPWviZq+Hu2yWoYmc6sBue5PwWSh02zPS3MMRiFj9";
    PACK += "Q3zLJV6AJ06Y8goKpWTmpE4Swc2sIZl9GIUi6njuuCdhzGavSs2v1nO3";
    PACK += "CuoL5SGfWu4h+LpgOtvEyMz5+ShHAhMle9n6F0W2FWWE0DMrdUK6N48Z";
    PACK += "psQNtllIZ1zMiWL53pft7oqasqwCvg4xjaCc3lxrtBtNfSwoiD0Kihrj";
    PACK += "/RF6MzaL6po340Tr5TyODVMWwREUuVHMnFLWTCwZxzkgEZC8Mxb8NzM7";
    PACK += "2IYDtmNtkI4ULTqk3rxy5UoT6JcdugvHtbXxkIsMTBNzgR/CO2TXCRBx";
    PACK += "qDi3ubADiMa04XtYPS1lu8ABCSyJd6zdLPNNmnJrWcaEg+GyTcm27Vi7";
    PACK += "CIYxCkeGCT0jC47DzFP4ADSEnVAL1LE4/SWqQ6ETwJA6dCOUw/Sd1tcN";
    PACK += "utg0600UO3jH30WR4y82kevgnUiM+spDasSImGa0EdRq/NVFsblp8Flw";
    PACK += "EWR0CKJOZNoiLUZQE0/zM/ZfLU7kHKqlC3OYsgDp/Dyk+VWMQspuEw8f";
    PACK += "11n2nBzOMCXWJrFxA+J+N3xvLIUdYIQR0iFouJ1J3YbytUHCo5w6yXg3";
    PACK += "dpTv6EZ29EDWSfB/N4Y6AEpt463AueEyjN6JnbcCkXx+BUnO+juxhPR3";
    PACK += "Y/RWgN6J0TUMggKfwd/9ntNEB0J0hxh22uiYOgtNdJvB35sE/n4YJ3LA";
    PACK += "CLNH/hCHcU4DvJklC2rraVqAG6uVFVE/iEJvq63cHg6x57sM9EWZ0HFT";
    PACK += "/cJLdWQR4h76fdDn5fLXaml6I+oOsBcHPukr9H/Z54Yf3QZr5QeYeHPn";
    PACK += "lsReSUYzQykkhM2abDTm3MOGz8wOk6LbjuRougkdItmwm5RnS/YEkySS";
    PACK += "P8QbDpZfkQLODtfy+yLiL2RDLDSuwTZQtksnaV7BPDSUyEQsP+8uWrjN";
    PACK += "TL9n3MPGNWzKnpoAJRYKQyMIRaWnpSOq1fzQoCFSulzHaouBRLIJ1NVq";
    PACK += "su2nsXFMTHRMQNLDQVMokYjDMKfwYBZJaDATgFh0rnOQCcGNBeMAF6bh";
    PACK += "CjPPznCttrAfG6aZIu0DnM54J1Ni0px881TJlG6ZA+BX/ZD67OQOPsQC";
    PACK += "1QYOnWx5w4FJcfJ710hlqUFuh6hNBfYBSNLF+Gq1mxR+ER+3EMyKlE46";
    PACK += "ByDNSqfBFLJ8KYCXyFsukV9YIl9ZImai0FloJug0TElpBV8QgS/GnFl9";
    PACK += "wFHHARVf+aKh92NnGb0VO/VmtgFg4hPluVGcjfpb8cb7saKX2A8MDo0H";
    PACK += "NBkPHwKemMfOW7GD5UG3YHHwYM4BNRYshDM+gG0eEMO0jVxnzbGYR57I";
    PACK += "x3JAEtzydpxflxy18nZs7Afm2JZ57+Iocvv4+sAlBAd55GXgkCtS83nQ";
    PACK += "e7GDQ24T0kLyodkIyVDkcvYDlG/xvbgxCiMmazFE7007n+lD6BayTGEt";
    PACK += "g0P0XpxNf8j39wF1MHpAz874TFgIZkWZdV9uyWPifBgbStV4YsXMMdC0";
    PACK += "SuptL8AP5JZwljvqlwR7p5+b6uc74VH6YUn9cA8OziD91la/CTGaT/oC";
    PACK += "eypfHkeYXgvC7oFP+mnZlppDWKuVcHzmaWGnj3PFQsJ8EuObx7gbFwnY";
    PACK += "2+zs7BjmVcWOZq48V/VvUXeIHxbJcesKPjtrtpY38Cbo2sMAN7CQvOUL";
    PACK += "JXYR2igEwvgQa3CnuLxAXbM0l3has7WMwBy4C3e/9KCkRl2GI23g9weY";
    PACK += "amzgEsik9UbRhJxYN+33Y8fawJt3XTZo9IIwpEYTty9j017OjaaPE8n0";
    PACK += "AxUPlhAlDBcLbvk0Ysn83wNJ52QpidLUkqTIYEvNIMNSI9gUCsGW+Gnb";
    PACK += "Aiu0pVJRCohs5jA8zs4T7DCONRKiW5EeAKob57owcoFJLgOAXDaKP4xx";
    PACK += "xB64vipkLWaKybs+G6QwmmcmE61nxdD4z5L4WbbzA8ROOzc+rI6PTR2f";
    PACK += "JF3KxSGpGcUkEk5WQhJmKqFMJAIHVStpeDhwTxBxlJxS/1urWRtkky4S";
    PACK += "m5o2cSjKhi7O1npT0Q5rLTtwWsuqwlhbtgOnaa22V5eaa622+mUJvuCl";
    PACK += "AiAEzjJuJwdd4JDFAGHn1Pfs/d7iIkoQgc1Q7qS3MUpPSzAXzB32doBS";
    PACK += "UsyuN8eIXKGbhsJ6OAQIMp8hbCIB4k6quxeHvc9MTgltGjk6yAbayELi";
    PACK += "wCZ1aprAPSkVB5LSwyYqR0Ymym/EaBDGgfcUjJ2d/Vj9AneLlKJHsaEY";
    PACK += "TpgmBbSrN1SFdigPhGPJrxDOmRv7I8SiCWaeRSkzj6OUmY97UOQ6LrPU";
    PACK += "xJ6zRw0TbWOHRIZCjh/lqXF9wNgosi9f5taIH0RwucZlL+xGlzke5rdo";
    PACK += "eJg2BmwYbPpE3q/u6IsYEafZIRtFgX2HLC6abNHRay7tRzu7kJVAHY8f";
    PACK += "3k4VPkYmjCepDY1+1yd+z8deokWBDmi/ypUmHX4nINP0RbbIHTM1NsBa";
    PACK += "Lw4CTZIOYAwHkwDpBCIVJ5V5+FDD5NCnQGUQxgvzgrz+iB8dcBsJzI4b";
    PACK += "aAMcjHpxoB25lPikHzV0jlJcl1Mz25ih90jOGvGxkI6d9gX+QvC7qF93";
    PACK += "RyymWAdaIc0qs/Dpf4/sYC4acawO3mCppGVx0XTdhut5BtvBUi2yj52F";
    PACK += "BMUc+cTj7LZqnZL71vDCLp/cmTIVxPxqERPdDs81VmOec/nf7NhX6+/v";
    PACK += "ufVn34gt67pVh58bK/zvGn/Z4i9b/KW1tfWN2Gqv8mzt1Rv871b9G3Fz";
    PACK += "C760LOt6nf/cgL88W6u5Bl+uW/xl6+bWN+K2ZTXr34hvrEKZrXX+ZevG";
    PACK += "dXi5scVftrZu7H5VO/aNesOqr0PT11ahGUu0ucKbaW/xZpas3a9fuoxo";
    PACK += "BKZ7QZQDOuIp4rLbodDEBRHC5uaCZScJVCQ0bbh7CEcge98MIoC7Bcs2";
    PACK += "qHxCC00FRqmXGsefSoGZwNJEKHEySdtCs3D6MWnklHIPwswp4nbNui1L";
    PACK += "WcLIKbGlkskahX6mR+YCacDdeyMWXRP5IjBrxg0W3gmPML3uRtgwG1Hg";
    PACK += "d7FhoWUTDJmkO5w0C9O5a7Bupodear6sMOL5sbKiaXVxBylzY6aj8XsG";
    PACK += "zWZEmTJTzo6YOHmmt5N+sOSATsgTxwErMnmeJwYx0T33HohdefJKMfns";
    PACK += "rHmFjdOBpePq4sy2DYXIlyayhRl1oMnW2Rn8tMXPkjCRdRmj/n7MMGgQ";
    PACK += "HVqSyK+8hZMXvoD6+3GUOovASZ9Y5CaOH4lhLgchaZUbucRn/jP8+OEd";
    PACK += "J0wMdYfhIb4JV8IKcyfH5wgQY4B+Pb0/VVzCHsZRcLKN2W1CML316O4d";
    PACK += "TVWFJi/Xwb2eG4IkuYDopziKrouoIDc9n5/+7wqMn36+deIJ+ib9wE4C";
    PACK += "rDd4lAND13SzIQ1FjBwnhWFbwWHBlwG2F8KIywgWmnyvmZ2dHV0sxvWB";
    PACK += "SyPMdCTf612ZsIt2dO4eBLOnI/HMU+Ek3gqpzk2oZQob3fww9g91xJ/r";
    PACK += "mL/s7pb2LxONdzDeYWlXGWryru40d4u91bv5mdKRzi/ZlM/RCAcBn2Yd";
    PACK += "6dzQTd+dZWpavL38np5oGi6afIhBAwJNYalfeYiF0XP0EMZKscenoxtH";
    PACK += "skuwgJge4qvBaODO05tC+7obBOHRVhwE210KrKYbnZAuv/1yC5rjTw8C";
    PACK += "90RLLlRJwA5+MYXbBKFLXvLwwO8CXXCbyIck/SEehgxDTUB7ApEyvBdy";
    PACK += "HTZwvyLCgRaE4UgjofDs0Uj2nd9SDLcWRrf5pYUaGA/cB5seKudHo2IO";
    PACK += "PS3qhiP4we4wwFGkwUUz25A2L2S3Z1m+rth9OtKHccD8EV8dfsclAI50";
    PACK += "H59tgdoIRFuTLSSUlu6FRwSU97NVt1S6MfVuGEQ60ml4BD8Q4oJDuEtm";
    PACK += "q3WlvFYaHm1DHUjnLNRsdS2fP8FcDeg7l3e+Ubd3jR23/mzXVG2oH/qq";
    PACK += "Wm2nudtg4ePRKKltrMsbbkXsDXGzJdCB9X03whySXOru+13uv60lifVo";
    PACK += "4PeY1nVHScFu4I/qPEIOf6IAn/z6wDq//G8UBq44mSbTpKN8JL9Jby75";
    PACK += "Jow6APl64dAnrtozTLjje3aVIY8QUg9HbtdnJ+KFdwSEORCiIADKnz+n";
    PACK += "eeB+yp479IOT7K7K7KnuenC/skxgFLPuIHk5CWRGyRKpN89r/eBkNOB3";
    PACK += "FMrHkPqYMDHeQUj9ZyFhblDy8RDU913gQyBX3fUO68fyOaR+3yf1Y80f";
    PACK += "un2sTE2AGUQagDOZv0IX4D5xMeKhSw8wrWPiJY9DP33k0KjxUFqwrkK6";
    PACK += "BkLTJIUN/O4BATwxAplOnd8oqY1cAleRNJPLHev4EJg5Le0TX2LCtGjg";
    PACK += "jtSuRiwcyX7xx2QhgHU9wGB6F/cHWTfyyVlfZAAoz40GwpZYSQh7vQiz";
    PACK += "QuioYsio5H0InnGBP/TTAkqP0hhV8lpK0h0A45m/XFK8ZyNMr5rMRpEl";
    PACK += "ZSOIiQ9McX3f9/z0hQJZA28sqo9gVofaYd2FI2wfM7+rHdYHLuFXWx/W";
    PACK += "fQ+HfeqOBjx96MIFWa4AnUMM9ll1zE03NIAoDkcn4jEFI/XtRDsKqZeC";
    PACK += "0BH1OQSB26V2PAxIZB/z64aP5YY/96xI7KYTo/49Hz0EFXcZxVE8c3lT";
    PACK += "tttlMZxt8o12IXabfFMeo0F4JB95IKLk+WSGA22uTnLSyr58+ejoqHHU";
    PACK += "5nKS5vr6+mXenq4i++NhYAOW0hF/DFzSl4+cbNZ3X0tn3rt7Bzq0dpkk";
    PACK += "9HmuU8zd5+IyoCVpGEX3+cLPdhA1zz+IMG7wibhFcS8pqKcpuqhCruyA";
    PACK += "p5w3n5wv7ezoEe1CZlFGBN4RtO/wqnh51SFYaMGCIaSH5oGfsYVCAouL";
    PACK += "Yg+DmZt8ZYRe3ggSxjXgLA6YVNj07GzBaKWiHfPsjO1Yu8CahmBGIZ/v";
    PACK += "g2Rmp8mfCU8Xz/e4l1HgGdCRgHvVgRwZ+EpEz84CyatuEs9g4ptMwJKL";
    PACK += "uprwawYzbe7AqqQgXV8k4LZTZN428U6Q49x2nbTmIJEAtIFX13Wb2AZz";
    PACK += "gjxniGgxhcMimt4/I3BE7Yg4geBH4WepVoNyCxa4CkGXEd3MD+XetkG5";
    PACK += "gH5yiMQ0TSE/o8zB3ktYkKMtOtXf/T02zd/9Qzbd3/2mf66/+7Nwur97";
    PACK += "153u795zp/q7H/vn+rvfC6f7u9+Z9n2PX8Vrogd+tVN8xCqd4jslNXNG";
    PACK += "peyLB9ake4y6XSxnjxPHXtkMAInA2bnSmgLcd7sne4LnKs3RdbuD8l5A";
    PACK += "+z7p7wnySvYhjKp9+x+QeX37wwh8+8PoZXz73yw41sdh1pMbibtIHKYm";
    PACK += "yia3KlAcIsxx1+UyreS8ImBB0T1oMOoPDbMx5F8vf4MY2tcNl2nmpnnZ";
    PACK += "7MShwwRmOzvTdSmw+vWv/fpiHC4KjWQEphdZX9wwda+HiBZRKAVsut6J";
    PACK += "wswqhvepMaIYLKu3oR+PYP07FelyUFxHA+I+k8v8VA+c3EhRaSgUQ5GF";
    PACK += "g5whHEU6Oo0wsysrGqc2Lw9xDzheVUsokzJXc/MU+jeRbDC0s5tMv5vo";
    PACK += "I93xZEaMdnaRNJXhdUnPN6UwFMTSfUNxZleKlKx5Ug5GlKb4PcOt1Whq";
    PACK += "FugKeHCcxNU1UzYFjvwoybJf/9qvg8kNnUz0nSBx/wBryzB96TQ3HB/0";
    PACK += "pU5cqwU7PpyUITh0mnG9zl0/lBwdv15Hcb0Oy6zk5X0GQ6Dm2Rl4ojRN";
    PACK += "LwQLM5kbWVfis7NcfuGZAvAKySmBpmsu04DA0BF/VLyhGp4fgTgGjr9a";
    PACK += "LWrIsJ+RoW+4JCQnwzCOrvADPnKirEL1I8pVYpooGh8N/AAb2QBNodYd";
    PACK += "j1OVIt9GqAr8idx5IEnfzFUPboZANtq6bm5yRGDreiZPDj3F6AA3mNuX";
    PACK += "0uxUUA1lhJhbiKqbK8oX/Y5A5+JLW/2ynZ4k8ut62dc7/BgROaycPUAz";
    PACK += "7QF2AGkIGmKhaSIsK2yWZGgIdi2Xr7QeC77nFQi6rigQniS2gwUP1TS+";
    PACK += "QglCNsuAJFmAs7OSoslOSt1fCyYSH6Z9SzzudDGo99IPDwRRIpKfhWly";
    PACK += "QkqIDzf95EPmiyc/3UvLpEsmPtyZ+MBXa5wfQuLMXOXS3nPtBDbz06Jf";
    PACK += "T6iVRT31T5JNd5VCiSPTlNKJB5QsfezbGcsF4JDuXifXB4TPzgzsFGpm";
    PACK += "crnAh97h+iZ9U99KnZUMrrU2dVtJ01Nge+BnWp/CeIWlYcJNMPtJAozm";
    PACK += "2ZkOLhWy9xGY8+BG4q8EnWhw5yTVAgEKQ4Cq7NBOrcW5kVdm/uapHCiP";
    PACK += "s1Ky21uJskq/zgkg0ZNkxxps9pVrWlmh+VeuuZb04wYecCUN9gqQr257";
    PACK += "lmx37FTsOV1HheaNWZdUNLdasQFT7FTQ9uX3Y4IR9YcQdjqv69MfwSQU";
    PACK += "keqTMFUKrqkKxJv+prp1bV3Zwa1WUuX9lPyV9bYq8EGrme5tTncXMHgR";
    PACK += "FaTIO48KZF3L6YgEjXxXkMgd1cpLIvfmah7JL6XIPsMqrAynVmzSAk5l";
    PACK += "kziVle+LPaZa20l0JrXcqQI7F8tjMspHpkBOQTIf5iNNnXLQ9N2JDZqd";
    PACK += "5Q0SepzTNrk7ryrigIAPPBq5XquJ8A9ptHGh8dWp6/mhrhgAxAou4M1u";
    PACK += "pkocW2r3EDkvEqCB1dhJCsXMTETBCxlkJx1O3k9KVlJikhT8G5JkaNbJ";
    PACK += "hdZKv0T5L4kAhxeB+EeQIUH05fQ9iH5ORUTKOImPh/p5+j4xnZMk9MAH";
    PACK += "p/8cD+ADsazriz4Ks0zI58zAlHaVqHwkFxGQxxEULr6T/aC88cLXtAdj";
    PACK += "BKJ22HVgGawWx409vqD8G5aG7B4OMMMaLBBYp6VwcZcKO+FcEcCUhUo4";
    PACK += "/CjwNHKTMAQ4M5NIw2qoRTk8sMyyQlrWNZKRGwJ20nMa3MsliOKGhNFN";
    PACK += "EQXe1ntuEGHdxiLyCg+Gw41EyCb4kiQ1gquHZdqq8QQNUpoODgIJWYm5";
    PACK += "VN7IPUm1JbuscuCKHZVKFeYNBPm11tL2Cs4juOZBntZMcYfjyVkXb+S8";
    PACK += "9Fgy9mRi3oSwAgyd5g0gZB9Rzl1cph2qL7I2MMYREkaIJgWWkSNMuadk";
    PACK += "A+gM3w1kxWPVjj7K90xtTNI0um7n0xHNhiCbTN+zrLKxDnH2mMHEqqa5";
    PACK += "Rf8JD4Ci9tQ5zXfVpkgmSG95JNX2AW9KijdzODJNFIhys9BVO9cVZY2G";
    PACK += "rpgJlg0OsSRIEpcwZ7pxljfBuiSXV1Yh90E2bJPPGD8EhLmRYD2czKR4";
    PACK += "k4uDLTgOREhiIGYAvpK+ijgyMlwxiILt9Bt/L35O/bB4K1G8P/QhQip/";
    PACK += "A1MLpgNqKAp25XGR8MVjVsT1SYbNR3zIUgIMQbuKGVWAAcZZLcBnRs3A";
    PACK += "I0bJ2U3M14qAlMarwoUPzsJCMa96OkZKyJDK8QDcTB9BIsDJ1nHBAI+f";
    PACK += "ZG5rNf4m5haqS1Yncc/LUvjqSxzTYfxwLd+vYrcRcfDL5eUIXCw0g+2T";
    PACK += "27BsDN6jQEMhwgGDTxe8O7qu5M5mbjqmmKiFKDMrVhRmFmKdpKB8dgYI";
    PACK += "ucGjbdyQ6BY88rBUekidQq7f50yBnc+ugnyxGiI1CJdIPoxjJqqMSc6G";
    PACK += "EMgxEbw7ErsfrDZTAZjVCTZIYuoLUajYDgTLIzvBLlhi8pzEsTokC1sG";
    PACK += "5tSBMwlOEGNvh+ymxxs8J/Y0C47DIVtNcwITBVxSJ9LlSLeTz6AD4+I/";
    PACK += "0QddX9xjBjERE1SB6DtW+86HuxPspiiGgGN1oDQJ4Sp5e0FpeylaWEjE";
    PACK += "3iKnNJmCw9eBFHOcuVbyw1vpcgY/9zOZMWtUGAiWBGA9Mtabplk8OnMH";
    PACK += "YtmJmZgi2ufAmno4RoXDkTfCUbiTxfYR57kMmMYKRygiahSg8tG0TO7p";
    PACK += "fgmiifF8zRTkilnbptkhDgHfeuaQMcsmme9viBtSdaCKyeAgoqzBwFVH";
    PACK += "mD+xJrF0hyjRB7l2D/CDREfKCQRQWEJJKBE8k31csomJaSI6iezTHU6V";
    PACK += "BXKjHJeFj5k0Ee0IjFm9zLUak6hNAdUMsWZNHLqqKDWJCnnYT9jAEq14";
    PACK += "y7IsuDpHsMo6mHpMyc1NAMCHjf+5e0cvspVVanewK1VZzlthLrgHTvco";
    PACK += "nPlTK9k8dLnOuTxjOpxajTOgvZBiv0/uSzXX9KptoS66TdGJWxbXI3FM";
    PACK += "3b46GhWYR57WwMe4+5hEbg/fCbtusCWr2MxiqiUhQafmNyaZMJwWHZtj";
    PACK += "G4+NiUjR4tDj6vDHD28vTJ+dszM9tVjWfaJhEyBOJjisk+Lq29S5Tc/O";
    PACK += "yv05DN3zD8GRgyqFdbh56wpEAuPweb9nmFmQVHNRFxc16Yg5t2mjx10W";
    PACK += "ASF1sPpiJuQefzXUbyIIV4cVssPWIZ7Irn4Dnjg7Tz9UImtnESyUmgBH";
    PACK += "CrMA3AhcmQruCSAFeSQNFMxT8S7pmOSkGed2tSOCGd4izqlL/CE357rN";
    PACK += "tal+SETorQULuRFExXsIifC6zy3gboMJ3v2YAc+fT9wGn4RC2rtgRCbS";
    PACK += "jrcCfKw8vknDeCTf71MP9DhpUjcM4mHWEfEawWNPVtITNRwlzw+kd2zy";
    PACK += "vj2gYHAj3+7hvqt+vQ8d5NIN6ntXKXaT54eiRvl4k3jKG5ixqq9gQJi8";
    PACK += "X+c9zL8ppUWCWoFMSeoAE8p3uX0ZvIHF3PXAHY6Sl1vpJ2mkxx+TQYR0";
    PACK += "NHDF9DB3f9t/xsd55HvhEU98JnwT4SkMh7w5PwjuZzVx01DlHaQmuVcw";
    PACK += "CLyRmBzmk4TRYZZ2N7UrzNIm6krAYowiz9nR38X7Bz64AgzB8vhu+ExH";
    PACK += "+n19t6OGYr1Fyi3ZIm8yWTCfiyAacelVZlhm3vh3ETeieF/IKo2miW4R";
    PACK += "sDS7BX5p45w91LZbiHvESvxkEnGoFCvqwOeTLMeCQtAzEdn0FikStUDT";
    PACK += "8/Y3ISwwM6VVgc0W9dGxoo88kmQGENvcEjclsYmITVjGm5GU5yINH0Dh";
    PACK += "fs/Q63UdZKQQ/GfbNQiCiNSIAlUEJ1MQulxwShy9G0Vb/NVMTJCyilFg";
    PACK += "2iLCkQgM4XrOm8bpEJMYbOv5Ap+6cnuBXSD/pXJLww8e7mO+SwY81R/2";
    PACK += "+Q/IbeHhAJ/0MZG7gO9muLsNfkcudTkopyHgEVig8DxHvAl1Ha+GKmoF";
    PACK += "zb23g3c5TZ1QnAvJwp5DQRcoyWZ7lV8fMgPtLaO95Nor1LZiyaok7FTX";
    PACK += "mN3VsmDoe3ucROBR7CtKFPu90jR58BAmwCghE9OGZWohFnNaumWqxO8H";
    PACK += "oXLSZxDGAayeBthN6/ajTA1R0OjCBVKhNAg/BqqHJ+bs42WaNGDvTrzX";
    PACK += "wWyymBZTfyKNB2liE8lAqcjEoR9BDNg6N1ZP3fiaRcc6SwD/NXHJQAZ1";
    PACK += "WzkXBKCrXdrHXNoZ0W4q+xRuqQj0BpTiaBTyCEOPo4SS4SHXK7+CMEI9";
    PACK += "/zdxA4wfCIMgC5JofCyvP4iEGSVySaGn3SiV/PZB2K1e7/E4VO/yKABC";
    PACK += "a82Sd+cwjpFchqHdDuOs1LMAAvY8BkVu+kmGX4UQaQoEXRfMAdl04X8i";
    PACK += "5ho2bZc4O3jXjoiDFdWUK+LERCQJEBMBv+gS2DkucZJR8kEhJoOVT/ga";
    PACK += "dyPpZ6xED3PzhL+h8i8H0Cyfzm7eZOumqwjGuqGpUsVmpxsmMWpk+sMk";
    PACK += "e2q7wutDRkRSaYCbelLWagY0jGDQalefkkKgs3TqBVc9aZQhToBngUE4";
    PACK += "iqFleYhDQTuFkwD8iV9rSK4HfvdAbgv5ljh6J4k3wng/wPmMSlox+90Q";
    PACK += "oleGR2QypTTr3fCwJKU06+NR8b00201w4NBtgzoLNJW9mNzmQQIpdRb4";
    PACK += "1QbJLWSSBxR6RfkihDLJGxDZcOLpEHvBWaAdGaxOidSx0OQxyIsWMySn";
    PACK += "/KvccO0mYomyhWTiGyKsHEN5H8M+5gaM74AUrkLr9g5DOkRn9g+xLu7q";
    PACK += "Ujg7qMgCjZ30mXc97yY4uoBaGxNMDR28qnX0DkPvsDSXdGKtzigVPFg0";
    PACK += "IAIwvcMUPOTl3XdRjCIB466UQir3EgG7ITSMaUwF1DZFOCgZgIIgN2lz";
    PACK += "JF2BQyKmcmQKrH2Vxx8LAoEzwgDe3pX4suc5pzJ/LrL4VR6XIwgcCLmb";
    PACK += "dt4r7Xy+/q4ne9bzcoExUm13aR1+z/C88pga6KrAO1dJMk9B0Mm1KQJe";
    PACK += "FaiW9TXT7ITB2ZkBI7ZgxK6KXt5kijwIAknySz4absCdUBk2JZ8rZe8m";
    PACK += "c9Jnzp4D5+mFvDBwvIHbj2pL1voayK8tTlcm+WGbpGWFnR82x1n4ZLfP";
    PACK += "TzUZWD/t4LGbBsIUWZrtTH4FBtb+M+xxaVVH8W+XR2k6DKREkJsoCLqU";
    PACK += "hTyShE2U2N2U2030kpOUzyCX1hemfm0tpyPO2R+lHZMKYeGbz6tCyRjK";
    PACK += "6kvDTUODMm7oOOUMHK5o7HQykwA53WAemtQq4uSICHJBviOho0hpwclB";
    PACK += "FEdZnDYIb5rEyhoL00yoWxC7juOE4klYxEL9/LUTihCIvP5kinuREYC5";
    PACK += "mEyn+XTWgStFIn8f4oCNy2YWMKns4ILj0ATKiBMg6oSZ8Ci5vQbFaXdi";
    PACK += "0Z1YCPThghmUFEvHFPM+iY+UB3ZNPsZOnHYMVs8Xo42TwZdXH0ItVdWH";
    PACK += "0H5l9cXRrwOBwIefrh7MQDHfupXMEnMh6mV7GkCRjLBIwvRC9zexrQRd";
    PACK += "feDm6FwO0unO2tyCr4Xdu1XcvctAFIvHlczaU1BuWM4fzuJmiv3Ca5E3";
    PACK += "BOS3aYfzx3K21H3KL9F0nW1cHf8KeVHuez50HBp6+dJZRCU0yH9SI4Kh";
    PACK += "d3KfSHiEDvO5K4Krobt+LttEYD10Oz+cslh4yA9yefJR9tBJvidKcD70";
    PACK += "LF+5GvAPPZBn2ju4wE1se3J138EpTfMOboBkcTj02Za/jykY/OXMlTi5";
    PACK += "UpLJeBAgjKTuyciCRYszpdlaAyYTfjLjEXGwP8IOD2jXDZ61W5vZo73n";
    PACK += "oSNPfAvCProun+/ca2VD2FOjzOArV67ALTI8KHO7ZbebdeMIMly+7p1Z";
    PACK += "5pnF23tGnZUldI86S831pba1lFX2SI1ch2v1LMqZbKCZxDeT761ChJSl";
    PACK += "gsHjWtEqsrki7SnTKtqyjpXEgrC1Ji0Ll1dkCLlmYmRotWSmlrUkcy1Z";
    PACK += "6zLbWnM9ybfSXpMZ263VFZlzZXm5LbM2201rVWZurbSaS0mwutZSa20t";
    PACK += "aWxpbXl1JWlvfbW5nPYZ12DqWkuWHL6YR9mN9traipVUsrK6utpqylra";
    PACK += "7eXlpaW2bHhltWmtra0sZZU225bVai+1lhIjzqVWc3W1lc5mmiBXYWVt";
    PACK += "qb28tJxObpogLVvbK2ur1npqOpolJBa+Mhxd2oUspSA5yMUBj4M8RzcS";
    PACK += "kYbvuARHCVOXhvq2OmrsbuF15mGPZ+bXqIx80k/efYfUkkEsd6QPiCVa";
    PACK += "ih2/9s2gE/NQ2NR5RIzYtI2w5vgolLQaT4VgcvJuMIfUvhkgPyvhm3Yx";
    PACK += "b8JhKh2WeNoSikLQjrNaYApjHSNwaK1OEXhL1RkKrjihcINsrsAdLwlc";
    PACK += "cOrRzLC83zMMWltKiEp65pBacwVIJdyAuAJwfY+cA960mRwoyUfBNLCa";
    PACK += "QzvWBuuYxGk364+A70eB09zYIIieOSDghDzfDDqp1WEmMvBmiN2YhTpa";
    PACK += "hPiFcjMnezjZuf/i9itbXMbtC9yr9WZxhxY2ZGH/lW+3elE+V1cDXx14";
    PACK += "WSC6VHaS3z60sH1gh+VDPsotpm5QS4mXL2AohGvxmhsbPooc8J7qiKvJ";
    PACK += "Ng0jrhFTKAKMuEYFUPOrNf1d56FnxCAbs6MNh0v+RNOyL2dObKKw5nwz";
    PACK += "Vob0TlgQM6odq9XTCVrmNJm1iW1cy2ZtU5lAS7mVwDUS6dqz1D/kGd3Y";
    PACK += "cJrIeEbTHSn3Lz/8INpkxggVgp/vwH0EVqfdvEJEoMREyNeZjOLfS6/A";
    PACK += "yw/mDAJoLThOCgJ8gvLLx697U5bPAU8mWEGQSojFY9kuFyEGlPsVvGok";
    PACK += "XPsm6+RTIIjhuc2j/BLWeKFhzETsI1dNzeMsSGNFZCXxvjqelEwuAKly";
    PACK += "VUUgR0zA7bC5sRF04E52uEoSfuoQ+0r8kprzzVCBrdt+fj7yPTxzWKcU";
    PACK += "pXayOzLShjlCpZ2gxs7gXocah+4dunsG5nfQrtQhPXGsjHS6k2Mtak4d";
    PACK += "o+YG3lzawJsGzg41voc2myt2hhyWbCFeeuKiZz664aJLLnrkore5rPUO";
    PACK += "v0JxJC28hvJ3IH/fJyJ+tztCb2WPXQ7Dx56jg5sihpBLGn+KRxoL4+5A";
    PACK += "MAriGWLO8AcRZsaNj7sgA9W8/UA8yPAxsox843XK53ikQaQxqAh+RT0e";
    PACK += "DUca3KckA6zAV+VVZDrAJ7yiA3zCo7nBQzzSuNCSx2zhFxlo3XB0onVj";
    PACK += "Ble0MayJbnUHPBCLdEwCRZ7GDTE1aZypxBXJFqkflZ2BIiqZT1IFSzeO";
    PACK += "wpjptpx29d5XMVKWupHAe4BdEPgOJ3PzWYc4PYmahr9D1YPJzHI6lexJ";
    PACK += "ChR4n4cnxhA1oSHTb3umWr4fsnStVBlyEEYTH94qrU3ZTltEFe+VeL+D";
    PACK += "oQw3jD/kFvdOuGlg53Qf+Dns3Sc2Q1445B/FFWeIo4Htk4jh4RZwRDZF";
    PACK += "Sg12iITOCew+XJ9gGtk7we4YqWaFoPJhppL0zAfXOYR5tOFiA2cQFTHV";
    PACK += "ZWX1omAhMzhOdICBKa/jTK+x5RH6U8GBp95EXNA5pOAjJ2nEnC1ijBjK";
    PACK += "iqAkpKYCPzL3kOceluZW4EfmHvDcg9LcOQBK5GPp6ian1/vcv8YI0RYx";
    PACK += "3uc+N0ZoSqfGrNKs1hKwSq5fUKtHbyn1vjW13pJomPcV36k7zEgWLS8z";
    PACK += "kbj9TWYwMxfEUwgfuZiICx9BwsqTjl1uHpvmw40UQB2GHrlGdlGGesvn";
    PACK += "DSg2NjOLpOSCExDwghnThKgpL49t+FHm9ZhvlWRyYrWWBDhvk14owtUk";
    PACK += "bY9zpXOyqbezK5bSLHn5Eij/UrpmcicAK5EoGpPZfQ90oOrWRZM7C0Fg";
    PACK += "HJTDAGZOm3cqbNLTr5IWgAOKqE5nMu4qaB+vhQ5FRHaRuwiCkISXNqiJ";
    PACK += "pMpaLEVq4tKn6vpKfIByM4YWmh3W4MHwjERav6CQj6PUWYBPJ6xughmV";
    PACK += "/b/lwc0a/EQeZc29TY0RD+wjDwoTDXMfh/zjMPk4yH0c8I+D5OP7JLUO";
    PACK += "gotG38q9Kh5eUpuqjtGR9HceTtDb4dmZAX220DQpojFF3rblmaoKYJ+L";
    PACK += "h7KLyIwgPRjuEgNukxzzm8Xu0MSY+fQuMe5QDi3ZtZ8iKHmaiRPZkga7";
    PACK += "Q3cI3PupDo77kBUGB0cVqMayGb0rMG5uCe4KvJqb+bsCe+YmnOXmG4g8";
    PACK += "bt/fZWoPqdMVlkfnd64j719LK+B6pC7fNSRXXGQ373M8NfmpVutmsMsV";
    PACK += "+sShrFFxKzOKAu6gkMKKV4yR9QSFTpeol1Tm3pzU++2J00T3shBbqQHA";
    PACK += "EydA+SI5GvxVGlx6iQaVEtzOIkjafS9MP+R0R9sinSI3QMREnB6kmefU";
    PACK += "A89IDyvThKgn4QjU0G7fFUdDmlOWRKy2VKvVmxvHXkpKgFEKB4AgrwYI";
    PACK += "AV0FvD9hCo5PXGC/Q7XDKExXv9Bd+JDovwInHGeETElXBapMa+AogUhV";
    PACK += "shsUBOFK89zoTArMsbPlA/bF/FDOVCVmmbZPCteTGQLFKRzIJDuQMRzI";
    PACK += "TKkm1Z9gBbvLg0Se4fOdtRPaWDb9lFXb5SpJrncVu1LW5QaOiH6omN2X";
    PACK += "OQgIBimxA1NsS7pBGOHUPixlV9KU0UnyGCc2XgkXljAZkhdTeA5MPOVN";
    PACK += "BKxN3sORysmU8DX8VZiGJM+HEKZYvkm2LHvjzFn2Go9UdkbJKpnMhHsB";
    PACK += "bi19jtM5AN//PIOTmzqFw8ynpBXDUgv2L0ngHnjpM8QDlk7+GHOfePEi";
    PACK += "GEPxovDBako2rRlPLBMOwQ46327uRVjX+CHJpaZcbLrceR54MjnrgpIY";
    PACK += "jyCGtEzfx+CPsR/ECZ/o9himyrvIoC6w8hHu1RChJXId5dAhnwduNMh9";
    PACK += "HIUjvo1yQ829yMHk1EQcNHMwm+eb8bHPJtno9L3INw8zs6qMjy5lsyXA";
    PACK += "KAVUTrqC2Y4geGkGDP1+asDJQUGp7GiAU6jhTasD4wnqUGRLah6ZJHPl";
    PACK += "VGe6vCpFTwzbDj3DlKL6u35BDXfbLejd/ECImk+8or7tmTupBCqoeJor";
    PACK += "48kUflx4Utx0xxe/79HC8XFVGjq+lxpBvEfFFTeIOXd88FJLrm2lKHCk";
    PACK += "C65PNI9teolruMdUxw+43zUhvzK7SDA9g5ihjhPs4F1uHdkRomxSF1p4";
    PACK += "6sCVsBB+i+2QOhVZwzrd7VDInHbPCeTVFCCno5vNOk0CBGR4/kOqmrwc";
    PACK += "4JPrYLYofbTAYh/euePPptT+iyShgBW+U802P1KabRO8rRj/1LSSNNRu";
    PACK += "bUAIA57a3sSqYPsJze4kVJKHUZascNBHuECbF2+W2OPRD/lFD/Lyhz3B";
    PACK += "bN0mEUuuieCO9PIyCYV/S+5+EAUcX7zJ8/iRSBQQIUn8WJPuUAUD/1h4";
    PACK += "BOOdeJfXsRPvOmQTFHE2j+OWitihfjjZOTw+oJwDxZ5jhIlzYJomAwxM";
    PACK += "frBDaVIj/RGdhaa5+YTawwjJ6hV6aZuFoxH2HPlxnPqaqqEET0eibtmt";
    PACK += "fDRBP5rogXI3aGFCO+AFSRr5+jaLCeBWkQRNUYbCneYOCByQvBZ1lBAu";
    PACK += "rWrynlBTxBlRxm1P3pJV3tVCuU0ySXFmnRUH67V4fz+Y6K36DdyDpywG";
    PACK += "7/AILtaOcpM9Rn70QCSD6PAJheiNHFMdEeeUD/fBAJw4LLTP24lsC4l2";
    PACK += "edgWCzF/CFH3hiO7xEERN9LPZ2dwz7G8+BhNQJiF/OgRjSP+PEZPfOcI";
    PACK += "G0fERB51uJvyEUGnhz4+ssFDmbl+YFtjEz3zIJ9HTdQP0ShEtwnaCkQB";
    PACK += "j6JTcTq/Z1tIPD2F3gcQf/699AnSRm4fvyd/eR5Gg7fxCZQDllE8uoF8";
    PACK += "AH8U8dTHEHoKbt4SXrL2DR8Js2E+YfAAE0ZxADS12N7l85TLkkYk3cSN";
    PACK += "Hg2H6XVVjupFsAnRj+SznctoF+obIzhzh3zYk63r6UeBgHEjy80jg90G";
    PACK += "uIU/OA0PkpERm0YfFKNypuu3SfKIRln60yz9qWmPQqcfOha6TRwMC2dm";
    PACK += "/Xs6rX9Pi/17ao9CMFgeRAAFW4GJ7nli8bcCdAr3I/G75XuYcmC5w4Hl";
    PACK += "nmeiJ14GI/nFgXzDEPI98Ux0w8uAL3Wa5FJ4C+HAHUXY49cBWmgU4dhL";
    PACK += "VwNqucRbu+GZ6JFSC1wYsR+61LvhMrdssLkMyYDzpaTldS6RR1riLT7y";
    PACK += "THRLaRGmgXfokM/SLc9EVz3n9GbUtfWbUdcdYR1tg5fuvkttXdPRHdxj";
    PACK += "tn6V0vAIHnX0eCRfH4909JB7JYp3/qwjMN+XKdy2H93Aga3f4LI/Hb3r";
    PACK += "E1u/v62ju5jEdhLpDl50dHU0igpJ25x4tHXxeyeEa3buhs8eUJ9wwRps";
    PACK += "PP0x8T1MGL/yTh+jDzzndM3Wr7ndAxkKft3WH7n7Omq2bP06XEeuo2bb";
    PACK += "1oX1P2qu2Po2bGwdNVdF+zQMdNRcs/WrAaSu2/oDzmihlmXD9XaR6Elr";
    PACK += "NZu0dotPV7sNefvggIDaS+JZTEN7GVr0dNResfVbIdxs1F7NzWx7TZnZ";
    PACK += "9np+Wpes3KQuLdv6bRJhCp9Wsvltwhi3mvDQtvWtFjws2fpWGx6WbX1r";
    PACK += "CR5WbH1rGR5WbX1rBR7WbH1rFR7WbX1rDabKsvWtdXhoQoUWPPGqoe4W";
    PACK += "1N2EypeWbP1ePBTz0YReqUvVai3Z+l3MXH2MrnnO6dWA2brAnDqSE23r";
    PACK += "Er8CTDDX1iVC1RFfFFtPkK6uXjyoGE1PHKypsKKIkDcnkwyu43KugTeg";
    PACK += "ubmwAFRwLiTWDT9zc3/sCR8LBV8c4JPcvuVagwN8knTuqrfD3yFiNfwm";
    PACK += "ipc80E6E4stwayomAFKYE85IErUSfm3hvM4x/nVJKIOszM7Vwdl+bmKb";
    PACK += "pcUjffMD2T8oBRGqc92CQLgIbuewLRSEXUHYzH4eUjzCLpNlOXlQdkIm";
    PACK += "xH0FxTAxDXwOgCqQvT63XNXQ03FDZUcDvzuYrwtzNzI20bscKb/pmegd";
    PACK += "5WxKlX02d9pmA9tC4q4ROEugzZhy6gpEBwQCbzxQEv2A0y/wC9QKOwKq";
    PACK += "zkKyUvAK5PTUA+oPXXrCkf8JR/7veCZ6W4FlIamJeENw/D1K34XQwssS";
    PACK += "Sla7FCpKFnxsovf4LLztmehD5WhSb16Y4UR9yiv50DPR++oxjwPmltI1";
    PACK += "4ktyhsp8QuZwQ/lUxw0lDUCDZ31aWeXTXJVP1SqfllSZy1DyPW3xfU7b";
    PACK += "Bsy9K6DHRG/xEb/vmWjfc3bWUbONWquo3dpFl3xnH9dq+vVMssVRIdQv";
    PACK += "nUs/kEoBni8JmHFX8tnJe61mfECcNJyGmk3IA3BfNASRWQst1GoLHxD0";
    PACK += "gcszGAuX/LOzD0ittrYBf5vNK84HxETbkQOn5FGU85+85paaj0iRqNyI";
    PACK += "+5kmgCWbCqx+pM1gJl1N0b/MtOA4rdZ6p0zoWhS0ZqLcNBDjlCs0H7sF";
    PACK += "szvBiqDJ2M8w5QoBx4mw1BvhKctNBuuXTkZRkpkcSW4SDVcZWzoDHKuB";
    PACK += "h0dLXqEAE2+h7UgWUaSoSshg6B4/ZLajWu0okt5ERbFWIeYf6ace4E+Z";
    PACK += "qZi1FHt+drZwya/V5JrDqQZSLpB93fGdRCLG5wRJr5Gih7gUgKvek4UJ";
    PACK += "4CHlWEOiJHDpFwgLniTG4nHqZAawThEZUhd9l9ZqzQ3xlChd02mFROHv";
    PACK += "zyc4+VB2ECdZxhO9rVjQD1zojTgxgU44COX1F2JdyleBK3n7zil3k4cA";
    PACK += "CCDVTn6B6YZnPXmp89p1EX0BeGeIqhASEaZFRKoQARaiCG7Ggmd+OxcP";
    PACK += "toBd2uUZGQ7EzzEP1JC0ElOefIQxRGJQSLbraoAp4B6TyL3qcz6Cb0cJ";
    PACK += "7yz1KpsLC7S/I47ZXZvlHG4V50U3U7tdd0HTxpxuAFf/hOS6EMCbKDPS";
    PACK += "ENcL4SPtiW9kOVCih5A6PlAhYmHFJGQhNkGBdHKNbDaW4fKuSTMBXBTm";
    PACK += "Bn2YANaFi1FVy4Mgm5d9Jv2ZRrCt012k3EaQ7TIZrVMMJqUfoZ53XUAo";
    PACK += "HA3v403jEnX0kIjpU3A9ugQRbAehMz160iDM3y2UVoV06UOom+gSdSTS";
    PACK += "G4QNmSHn24NuUOcSNe0blHvXus4NMP9fKD1pzs7WN8qPIHEG3aDoEkUD";
    PACK += "5fqWPRDdXgO5xDXCkXBi4KKHJKEqkrV8xzVhaa4l9g6ZEXXmkZa7vddJ";
    PACK += "xOq1GiwVNZPF2tntvOkaDEF0dcQjPZjopmsEfbiARAkL209NmUXIL6E7";
    PACK += "3DSg1+gaGEwBqKBrBK6OOqfrMrJYek7ValCL4kLSzy5lcCZUZ9JDXZyr";
    PACK += "2Qs/ABMQEmNUAvcVIY4rTJXcqjmPW8icc5MvwGqhaLdfDLkmrG8WuJl8";
    PACK += "8zJnei7Dvc9Y6JOBi5JBrHACfdLPnYcXyW4BSlPtrnI9KKNpX2/xO6Pz";
    PACK += "91pP3kIkhpEP/qN+ZU7RRkwIftUYRjwaoJogDbwkIuL+qrnTRlqaUcfq";
    PACK += "0Cx8Jk0sewKH7FARTDy5+JyhwDw7W4Ax7QS7CMy805E1Swy1HkaJmX6H";
    PACK += "o+Jc4LL/j7t3b24a2fqF/z+fgrh4XdJJk23nBsj0uCCEYbgOyQADeVJ5";
    PACK += "hN12RGTJtORAduz92U+t1bfVLTlkZu/nvG+9VRSRpVarr6vX9bd8+LEm";
    PACK += "PbrwYB2xqgFYlIy9QqIfOPbQhyjD6CCxWVDTlDFlCQx8kL9ww0dcw7tJ";
    PACK += "wTTSVH1PrAaCy5VIVLvdN8SP+lgFfYKvnHfD4DCs4L4DSFkVWru6wvZ7";
    PACK += "kI4vAzSQbrce4sKERPP23PqDJIaDVE/+TVUH+WCcdLTDRGUVevq3ylYH";
    PACK += "jEEqhQF8/V0zCcONjWjtQ0CO7+8DmLenvPgT7IdmLgTXokDNZR7Fg/pO";
    PACK += "BrbyYoTrfAswgn57JtOZOQEGKhuTtl4Y6B6dDvuj0joarcAW5Ch0mD46";
    PACK += "ElPCJCiwiyIGztJ7WXm0KK8bbJKw1N6F/xOM3Ozv8w8mAYBNB+DkdEy0";
    PACK += "QQV3xeF4t2qRe78X0v9tOCUEP/ZYEigVJBDH54DTTojfZOr6BnPGEPcP";
    PACK += "iLwYw2xgRJKl5kdAR60Hb7cL/3yQ4G73ZRoF9+zg6ullGiJVWmenPzID";
    PACK += "m1qrzFQSzKpySxRjFAcM/HKEeMnudEEMO1jLRVxs+Xd5zcitw0JH2s4y";
    PACK += "cLcslIHaEDzr4SQ4eh17rXcgjzHBs/6Qie8EPmkqNMZuVhYKIY3eiRT7";
    PACK += "AOgHLUSndC0zfQdfJdV9Z4IpE1IMBgb8xCHwphbFuNstf5EqlhFj90sE";
    PACK += "HuYXVVSw0hjU8ZeMB3m3m+FKRN4akQ5VYi6xpbLtvlGya46L291+i0QQ";
    PACK += "Hyh6CI9wregXMvsC3rXlM10+xt1g2D1cTBGgzFaixjmL1BeZqR+4Xo1u";
    PACK += "nudYHBiX8hc5BDyQ8VjVgMXUMESqBcx+ME5U3oHDlmfMqyPWDqgYaSN4";
    PACK += "gWH8jnYClCahri6s4FoYWxfLwWCBpiZQQ4tJzepybm/8Uc5Xyo/UGlVx";
    PACK += "lPyUGvpmZDxWPYdVwdFfVZhkmORTAMsJXwyf/VHOwU28nGu/D61FWa+G";
    PACK += "AX1JKw/MPmsJ+ZtGqHmvxY1PASSVdb82uH9qlyB2Q2GrTLxz+SGArPj7";
    PACK += "bvCpXC4/W9DDzxi5m0cSQJIk/1y3kQGJpETGQ8mvcSclMiALTBRjevOw";
    PACK += "GK8AhSmSIR2TIRFrbvw42OVMAqap2UGJJNuJ0S1kn6ifzO6hRLr9xMge";
    PACK += "MvfVr1XM3oPbjIzew35eLqP3Be77UR59K0HSVG1CSVM6SbMmkqYuYQZR";
    PACK += "S5owbYGkWRNJE63yxmXkc+15kv8hKT92vbIoHifB0XgKXqR+QmCLwrkp";
    PACK += "Tnnnu76u4QEAcuLdGVzUTGFNvagJeCzM6B8y6jw2NzrMXYPdK2a2bGaA";
    PACK += "Zte/YbFo6XtqMa19Ry3AmDmnZtOoP+ydDiM/sFkrdlkCRta3FMYLpeZv";
    PACK += "6c1CscJGpP3zVaHLZaQzybyot+gIuR+spYAdlpuL4Si4n7HXo7Ah7n1v";
    PACK += "VMgvEsb3m0n/clmCOUyvHfyBIsaLmtwWGvQPb7JC4fffBEHa7eLjb6lX";
    PACK += "MRJTJ1mgQjTlv+VRhw5cJ2afg7sZWSEvgmeVXglf1H2v65C8YWRjOn9U";
    PACK += "vJN+KVWE5oGKgFQRmaO0+D1Pr8zfP85luZiemyhJ8D02QZJgqnbBlOBi";
    PACK += "if8d6sBNNNOpqx+Zev4KPBTx6u2lfnbswjvHCw3DrEIxxWxeZ2J8RxQj";
    PACK += "eTWv8WoM/wNcz51pWf+uLD0a4U6HeWrXYwj9fKpjQX83saDv53cgcR7+";
    PACK += "J9BhQF+CAXZsfqoWQZRj8IGZQelTVwDCp67eLmp9Ab2aKeA9HV2Knsp3";
    PACK += "wEcZ/8uKqYlzPfAiYJ+SCFisWV9D3eYSatfXUL8sp9gz8F/WY6ZCVpXP";
    PACK += "8h3lrYx/4LNVnULOGx3QekdHb98BBeZ7dAdWcbsHJJj30ATzqjFRLsv6";
    PACK += "U+qEv6M8W1UpbPf3NKvhc8qrtTVs9qLWQUcjDPHDDGHvMdstoFLChnoL";
    PACK += "gv9b+ehHZTiQtyD7P5f8R3XyVp6y3yv+XAaU/BncO+mdBpDHz6X2zOzH";
    PACK += "7KKOfq/gjOpsPqsUZ/pcst8r9qxib+Xgoo4+pfDYp+Bw/7N/n9BpePrC";
    PACK += "f6opMjxxzvYsQIpUj41eDJ4+Q59pcr9EfWNZPAF3a7z/BT8UkPLBtIh8";
    PACK += "aEd24nyaGfFnPvXK4nb8eVm9DWzNxPmZeY7P4Ru2/pveeF+36J41udGD";
    PACK += "c8cMht7jJM57Mb8TavvIkjO1W37DVkTjvE20ufmaX30z5v0WH3yCHvPK";
    PACK += "xMROQpsHcyYbRmxRTFt43KAQsya+FgTA296sCXx3Zr6WJpLK1XJljWCC";
    PACK += "/9gHFH3xv6BCEP7uJ2Dnvi3MGTZKi7k+s+Bvrc8sc6CMbnOgqJNg7A6F";
    PACK += "GT0U1Hi0EXNKhUeWCt9Ifx3h1YNAY0EMAaX9ZdMpntzHoo465pzGo9gc";
    PACK += "d3iueSSZvg+6mFFaR28BN9VZYAJZSSl2lkvjX3sPefDOQISe2Ww6jiSr";
    PACK += "DTYZuOa0OG877hxtPwhNH9UatIgEbzZSH5nmgLSZgyJCeTeBitgIAwOR";
    PACK += "6Bg4nd8d8c0duqF06cN7j3gGacEN6pM8yU5ZxRdbRgvIUr7wmz9APMKF";
    PACK += "/RyrAJCg281b3YqjODZQt6+rKGcLlkJoXaWiwKBNGe8NMisLDTKdSOlW";
    PACK += "bWH/gYYgOGJp8DMF/1gGcK9Es/3Wy1d0UmenCIxvdWD6plmOsYFl2eyc";
    PACK += "nSnn6M4AQf6VrFyMwFLEtjHvdgEqj0hSwe2q9NdgDwG05ZLvxqwYRQUT";
    PACK += "TIJdCQFrJe+oqAOFsQubZBPVUjItxuWMpjTZ2Y/1qb9NVnwhbV7Kk8fy";
    PACK += "FHJXPZaQhYulaTOZQhFfY/KykN53u9F0il0s4uXyqowgKBx2gbqEDQHR";
    PACK += "/ibOw1M0QCIyX9FQO+MKNAYyYJlGXZVR4+PwKR9BvBg5o6/2GHiOZlQD";
    PACK += "yKW0f6/HBNzjzm6S89/MHWNbz/mbbFXwfOtLVowjI5NDz3K9ANjGr+Vy";
    PACK += "iY58JKBNZ0JycU36hmIBl8soR8d8Ocw3iE93A1kZvnWtQSGMIR5Sl+Qr";
    PACK += "MA+0FodEnreo9DY10WyMxyWF51CEBj0forrbN8hPdXdbX1o4WJGgXWag";
    PACK += "7TyeXWxgKFOdThGKDswkyyX82bW0aV106UAjpObL5YIuqAfd7oLoCUk8";
    PACK += "r/7CbqwIkLTIt34QccUz06CoUi2q8LVuN4Jna9rDKtWYKmhMFTbGdD7j";
    PACK += "mW4B8vcIu6ebgS19VUeLmGXBkEEMtmogfnBPNW4fstyWPLPAu3cEgsQS";
    PACK += "49ZK2h6vDtMoCEpJecnmEIpcxOwc7Nn6NBlzMUKgEeWMMLYLS7024h8y";
    PACK += "dsnFoOmv5fxvvgGEBOL/GVrcHgOL0af8I92ULr72Upu6O2zEZ2WjCHpq";
    PACK += "XXIVhdkocmM4Z1BWhwGjEVFFanDOt/2m3xw83BqzG4ZW+hG+6wMt/XBm";
    PACK += "fl6FUElrI5b/fizomnhn/sqbmtvF95J+e/G+/E+P+H5KVVjlZ/33RZqM";
    PACK += "+F2vyBe49clrgg0o5f/07pvwUf7Cu90aCG5iqPnb8d+FevrrgdZ/LW6W";
    PACK += "RmfzqwpP/ivHOLILvnHV7SqTpRoRNuVXw7FBXR5vdmzOA3QgGw+uYI8b";
    PACK += "5nDCUzYbTBz9mfEJ0uZjPvOTScwMRHO3e+xQo2b8mE3dz2P+qYgmbBqz";
    PACK += "Y5NK5kqpsKWMJuyYzeI4jtmFJssTPjF0qffoymnHx8hQjaIxuzRuV/OY";
    PACK += "nXvK8DFRhl+tNOZ1VHfvK3pzLRLEy+cuNgmHVbuh0JFmI1rIuapQOR3y";
    PACK += "q21w/qTsdqNLRE4nEULLZUFDreC0eFVHl/FyeXki6lPHiEILR8vlOMY+";
    PACK += "zp01Zj6cJ3jHz/I6HPumjrGm6sp0roN+2GjY3iQbCcZGPGWX/HKIrcJ1";
    PACK += "wC7dpF0A1sRljLculstLDQi+1+2ay/1YdRsTHyXRSPHJlzyN2QiOBWUv";
    PACK += "vuLnFTvmgT5lygNlzESPdIdF4TC3TA58+Ypf6Yp9VcqUN/QxE/t2J2YX";
    PACK += "fGS2QfKljkYxm/FLeucyZmqpXUXHbLLZUYSRjdR6GxvzygUbB8F4M3as";
    PACK += "g7braA4LLsVmqqqmUJUiwbB+oaorU9WMXQVVXbBjfgVtPWajbvcyrpU7";
    PACK += "yxUfsSm/ZBPeYzN+NZgNZvxlHc3ieLK5idt3xnvsmE8Hx4NjeHIcxzP9";
    PACK += "ZNB7NLk3G8RXcP8qZpN798z92b3JIJ7C/WnMZuY+FNBTyPl0uXQ7Gm+Q";
    PACK += "fA9qJdcDU7WuanVFoD7U9WBkK/mtis7ZmI3YFQo+buld+EUu2CUUgaS2";
    PACK += "Zvemwy91lMZ2qfMx8fgYr/H4YCMvIcuIOn2Mrb8GJpGKgdYd8HJq/Q4O";
    PACK += "qmgcg/HiYxof8FQ9uD7giynSxUOeTbGbEW1L3O2O/DZ4jibjtsTq4yCx";
    PACK += "Oqz0A15Nkds6wB8HkWBpHMfXv6bROTvAtWQ9mA673cNIsDHItaE/YHTI";
    PACK += "x36y1rjbPdxyud7pQOi0dJhSfMzMTzbWmWtXmsE7DCejAfAIY3cYL5eH";
    PACK += "671dut3oc80PwXCdGqt13M7SvS/4t5J/XoP7qA7WT5hVyTvnQwgYn+Wy";
    PACK += "vBJaytkhLDs3qoN2rBFYidOYlGjlX21deEifYQriLBbJDT78miOC8j94";
    PACK += "mxZy4PGeobN4+A6oRde+YUBOwpe0NtIuqx/GEw43xKd6iD76YLiL2r6n";
    PACK += "fVHNiIDXhI644Bhx0fKasQf8gECTFN7wHN273ehTvVz+gJ8t7w1/cN7S";
    PACK += "jm73E+hKzjCOIE6icc3nAKlxKzQMCDTogeMumO1T9gOM9YeOHfmBhP2y";
    PACK += "in4wsZYf+UH4kcNVzM6GP9BXn58l0Rl/jxhkZ+7QNQ+RH4rOuJgOMeaj";
    PACK += "iJNC/YURT1WDAh06NC91zZub5oWqdg+qZm3D56Th6Spmc9uyVT2KzkHf";
    PACK += "RJQBUvqpMK+Nsg6cbnQ9Sc08rV1SEAXNKA+Rt2vHozKJAqgvlQNEFOCV";
    PACK += "OHY0d7yoA/uKcnS2woxoAOe1YdG7FoVCecO2l4iTqcvVXjnDqOpCCjBa";
    PACK += "86dNyPeXNfGybqRQG5d33NsmoRGGyyvmyrolCoXiSXDeKqpuMcNU8pqA";
    PACK += "jLAMxqmwfcccNwOjOClQi+qyG4Ea1ePlK/tihYlmFGlbuFFN3agueMry";
    PACK += "YVTBgIEDG2hd1aOMDmzBKraI4ziBZFKthc3ompLgVmXgNVaZ833uwSit";
    PACK += "c3vJVoq8zqf8H/8l/6sY/mPKZnC96PV6veV/LZ49e/b0H8TB+5+VC8+K";
    PACK += "SEyW9lEdCsxfH29JMc/TkYjmU/bf/+u/3e/ZlHWok+ZXSbL81fyf4K7L";
    PACK += "8CMb6KteBGl0drf3qIZ3kpvsgZ+1tvlFmC7ySyPtuO9Kikd2WY1kNkeH";
    PACK += "c+uTqzOKus61P3RZaH+SXZRGrt2QgtSi/a4psaXSkqqFgF0XmfEkrgRi";
    PACK += "l5d+oMjQ3dawQex8al4ZQeh+20v0gXntTWVe+12Ws6wS3hv6nil8ab/x";
    PACK += "bSEW4nU2kmWdVhfeO/4jA8rypvJyrQ9bQojfVFtSVGV+KVCXHG/V5wKe";
    PACK += "bykv6asp5EzP3DK4Qm9gNxKRh4eDpgtKl7+XnqmCgfFgXNpMX9QFHqNb";
    PACK += "aOpyQGUHMwrVXsYIFJirMEBMBvyPux2ryQX52qsij9kX8D83yLry3j3F";
    PACK += "QKDN4G5HkajO3aG92ugsl3Jzc1DwfKXIYxEPsA7XqcvaRSVsaABEsCFQ";
    PACK += "B//QsGDyvPWVF/aO0wDX2C+1b1X4JcIrdu6alM3YJnU17PjvYe+9aLtm";
    PACK += "GMQrJDXoqyrFZVYuKjPiDia4NxADHV/kjbZF1sfwPg3SiC0rbMsK07Jr";
    PACK += "3aie88Kq7Xjrxna79ebmqqUxjTxYBwW/hdmIfRS8c6ZOIEzKdLezeVCw";
    PACK += "XNq7YIKr1F1R27sWD1k9qTP7BK0O+oXjqb1t7BD6yXf35HlajHOh7pPU";
    PACK += "ADRF4clH5aRWu+QwNMMH8SHW0SI1L0BFs1wW8KoKIOE1OTs16bQpWcmZ";
    PACK += "6z3ROWVeqeAXT59fqHbZ5TPQxVx4A4CG+e1rzyqISXlJrDFUu1wK6AHb";
    PACK += "EDp3mlLdmMt9dwlgaeZ6x2YHtMdOfZtcbDS3r3fO7ezQY+6fOW3oSQ6W";
    PACK += "PLvgigz9ugsI2nauyrV741pzjwnNi/Qcnvd+EQUkZrVJ6IrsRBSnTP3R";
    PACK += "5tvi3j3SlLvau6rY3DTF7OvOUq+DyI4wUWop+GEdHdUxm+IVKC3e1vyI";
    PACK += "ZCidB3l3MRWpFj5hU2Oqpg2bzfCotgk7PEZMAtupl/dvBa65/LUGYH1f";
    PACK += "zNLqQoyRwGo8HAg7MnWuffF14zUd8gBdw/1Q3sE4jfykBM/L0npeSp0Y";
    PACK += "k2Zp/iutq9eXbzYKwyIIVLgI4uhHpCwOKdNngHtnDNzU82gqYvY8KmlK";
    PACK += "gQ8VYdNKO80bnB/VYaLDfUh0eDcqURy4G00FJmW2As8o9AvxZhBjKBot";
    PACK += "1WyBBPsZ7bOX0dfSAzDPBQUjB+idw2TJGKPZc+VaG/ag94BlgIWD0C0K";
    PACK += "DQ4EmIHF2bteaeBnS0m8Dcr9WY+BTqybRyGn/jwul0c1bA83ygwHU+jB";
    PACK += "nNr7mJ7AYepUNw7sRiNj5f7DOB4UgBWg5+RtHTN5+4ZywchaMY2ME3XT";
    PACK += "TDw05ptCKWZv0C/kwA+qyEcwdN+M1Df8JjA5+TdhMhmRdObIw73B1Lr4";
    PACK += "GklcWytQz42Dstv9ZjGbrw9Kg2soeI/V/MPAhd99UyCcH3gfwDppEnMT";
    PACK += "3wE+2uPyjuQy2ujFWuy0BvmV1y8dnpcbdvIbSYL7TfBvwkB4bvbjmL1O";
    PACK += "o9cZ+1HjnrXw4bUanFWDqagLzPRU8B6ba7jrWc577FBg9hzo23OD8iB4";
    PACK += "n30WvNMhUpv2ia2Lk6LY3Dzls5zZ63kOdQqokEQGlnafHoqTHwIKfhLM";
    PACK += "Xn8m189r+LjQJPkTAGR/FppG7mxDniIZ3+sPZJf/K4IsSTErNnlfJ8VV";
    PACK += "Bep4E7N17/QelSbfV34v/3/2BiWPZBdey+J7fcpMbcdM/vILz1h+j2fY";
    PACK += "60ePXGXL4tGjfClhIMpNoZVvWKYkj6hrEkZCCpfjVk8dDl0/Zjgefdaj";
    PACK += "x/LzzPHTYHXKB/E853Vxcu9eAcntYIRP7Wy13R/Yl5/Xg/h5zQ/Fyb17";
    PACK += "P8SpGl398mfRfv9T+31l1dRr81L//Qpb726YUzQb0XP3dxHtab0W/NeL";
    PACK += "B4WJuULOuvP08NXhH4dPO4zkA8FoRDVqXGAOGwyPAHWshVuHoDZ7l6tA";
    PACK += "r4lKewMBtjrejB4Td4PkR8A5aZ+jvYRyCQ7OwsUIq5C/wrcggD5hjYFD";
    PACK += "Y4HY3BzQXNq/K8EFDORlDVm3beh2jB5CGxrf2Ca2rF2CM+ThQYIAQYg2";
    PACK += "b+e2n8SJoJ/p7yTtPX7QrLLgz+2P62ycfBIMjICTvPyefBYrZbkM0nPz";
    PACK += "a5eLGyqTQmh6nxRMilpeQY6yxKW3WzFcOP0H3spZv0I0J8KL1j7egAwk";
    PACK += "M6J6AoTKsej2TZJK4WeuJedinmlG/KsRay4Vp2GFezwe9YJTIjniTgSK";
    PACK += "pz6wNTWsAT8kXpO9KwHOhbqWYTaKJOieTbu4ad+93d7D+8tttR1hAGKV";
    PACK += "sefmz/60lhUZpz8s9gDRmLrDqEWo2aFCjQIo0K9deTTyic3hs8H5lXBo";
    PACK += "CjCAXw0Dht+HpvWYhmtQKUVVUh+VG7vb3SC/92KdKB6Bi2uO/n3nIh0b";
    PACK += "X78v5fiq0+1ugC5PFXKrFvcYJJXHOi5FcwoXoyhm/oAi2a0HsaZ/rFZ7";
    PACK += "m84r+D+orhixzSaGCLYM6LXNNhMklb3aXxthqvqd/n2Y0sROEfkq+6sq";
    PACK += "DaNFUvqLa0WkfJWONUXVa5RIG0SdtFwaPQepYqU3qU4udSn4lRjid5wH";
    PACK += "H/0iTQpFWVSYCIKccCmgqy0tJvjh6FUH33OnmHv6GLf2Xcs63lWs413H";
    PACK += "OqLpcHpDGhrCIxVExBGoSp8wt20IdAmJaW4CmmjQjDP0PNH6CvNTV25S";
    PACK += "xPfDhdF7GBtyQsjnqpV7373PDHYPRMaXHPTu9jAkamQpJmEn8KYfnI23";
    PACK += "ts6UpvsInvJyiDeTqOZWV5oZm0gOj6qB8akc6pDIxUl5msB/PFuxmtZX";
    PACK += "guHLh4DRavWgZ9sPdlWi4w07ikGBh8oJuqkxfK8DdY0rusaEsZjolnvU";
    PACK += "oC6OKuz0lc3/RM2ixrw57Qz1tN75ntXnEDRS3bnubPpYM1tfy6yIOuxO";
    PACK += "J97srDqJoCziWwrQtXWWFZmDUo3E1tk8vYLoCooNNAqw8adsotakqmfG";
    PACK += "p46XGswshzWlHNbklE0phzVTO2LiuXbbmjeEZ2tTPixW56ZawMC5rNIK";
    PACK += "2FZtmlT1wdtTEwpKqpnAeBkyOcXYPLzFJnFifiIW4ZqPTcmRrr5kHvAD";
    PACK += "3cSpqoD32NS8rcgGebeEomzm3tbvzJgYRjPqnMNmlpGa8Zlu2+zRBIZa";
    PACK += "D+02NH4WJ/4d+lsnemYTMsNZNKXwN+STNpcSqTCmrV+o1rNjW8HEevhP";
    PACK += "jIpyGE34szKasSkySew4ZsYvkMM4JdGE5xEMgn+frEH3GeXQM/N47QPO";
    PACK += "+bd6OFelENmrsiYx8EpEsN7E0Z1o4skRnB9Yc9kBNYsd2DcOtu7eVSU4";
    PACK += "51Xd7b6togPg7CbYkngYHas+qK/H7Bhp2j8LPb34W/fsOE6iY17kkeqF";
    PACK += "ap55UzGsbqRurIeAct1iInbhco2P+wbnM/+OXzibzdWAYQwOlvZvwSS/";
    PACK += "vs0k24lZLk9O18743PSHHdzQo/vw1T9q8lV28JcX17nZge40IChH3S4s";
    PACK += "m46zp06cjTW2DXtWRp3O5sQ0I/jYwK/ZLq+JVQtpsXJiV5mWLZ9Jm+kU";
    PACK += "FoxabEzTqZYFM4vZzC0YfDJRt3RbZkpq+9NiS+KsrW04Fq7qRLkMT/wD";
    PACK += "AwbuOJq4Q4PN8Ei9W0STeLn8Hf64IfqjJp9hKm+j9633imC3m0bGIQUw";
    PACK += "YzfEwVAcnhvmGZ3AmT+Bs+YEmn2uRFZF1DqdTfhcUKmdu1k4d7Mb5g6a";
    PACK += "CFRm6AhZYkFCyWS4gmlbwcoWBAqIc8HUwBxEMzINx2YaZmoaZnF7R90m";
    PACK += "U356OAOzNTMwojvSDcoxHeljf6SPmyM95VMMOpmZ7LYLWBUw2FDvwK/X";
    PACK += "DvZxONjH6wfbfOFYjyV2d5bgT/PRCj+KXwxm4DZvp8Hben8c8mN/f5gR";
    PACK += "O4yOyeQcmMk5VpNzHK8dm7n5kJufCUxu6/xcuh1iRJoDxW0cqj9nfMJ+";
    PACK += "cHA4fqxYIOeu9uPRzKibf4C6+UxxF7/8GEaP+Rk7U4OfPOZnlguC+t9w";
    PACK += "WH1nbHby41RvlTc2i+2ZYx7O+GMt9a1Et3vW7b5pYTGAZzoDTquM3rAJ";
    PACK += "OOkdmvE/4G+SQ8tBvWGH/A07449hHMFbcBZg9xaqpq/d7j+h0h8xO4Cm";
    PACK += "ndmmIUMZ9PmMAznTPaGefNCgs0aDzkiDztghP7PWGPpZDP864xIbFH7x";
    PACK += "MR9FZ2zKftivPnZfFd3uYzdI9v6Zya/7mK7PHwn+VIP3uNHWx6Stj9kh";
    PACK += "TIbj9s6aoaCv7YkL/Xgdr/yxJPGsIVFGWkM28YFnEAskxr2ekqtm/EDJ";
    PACK += "P3B46SkKi/ZjZzA75AftC5q94TOU26OYrO2NN1vjshAw5KTArdf4a73G";
    PACK += "3yjXUr3MX99qmb++eZm/bszUazJTr9khf22WuerDX1vgazr+Bhe66w57";
    PACK += "46/1W2y+W6z1tR83a769AcKjDc1l/8Zf9m/csv8rzW5f9n94y/6P9cv+";
    PACK += "wi37nzAH3e7MuOF/q+GHaz0GV4WySsz+Nquh9XdGPAIG8ZBPBoeeq8qh";
    PACK += "4S/wlxGjmJKfdAmlW7wfX8MqsyMIg5xHh6zZYsLDTfnEKvdsOtrD/5io";
    PACK += "dahErRsbptqj+d/DgJ+l7cPndrtiClt155Dbuldk9oykEUqXVvCY6bXo";
    PACK += "fe4/JOlNuTv1QVq3XIue9UM14zTQL5sodQaMW4w/1MTudrtrhUDeEAL9";
    PACK += "wr7Ex5tCoJqbiT83N8p8dErQ7qC0QOG8TOIBUcGsbhI1p3zSHCrHOR9a";
    PACK += "zllt48N1nLMFMLO7HWisx0278y9knf+aGAIKHRQ3nIbCTNf+MGof0paV";
    PACK += "VhjF2LObBidmMCxxUnjS1gWqps8LXo3AtYClI7zqx+w8Bx8pJa9dalu/";
    PACK += "1HiUX7PAfvsEEil9zbgsuC5LtKEE2/c8N04jg+fReQ42jTN9Q6VipJb/";
    PACK += "zCjCjacojR4AxxJ7YKBdRxv0wCxYdWu0sw69m0vwn3VnjvQfxXGy5qGu";
    PACK += "rOUVVNYW2qWURBUQx3DjUAaeDWqAdJJwsNCAeVYUo0w5QVnDmDLtGtci";
    PACK += "06RIbOWuOWBsHKtckP4LIfT9a+Fpfulow7B9BawEEaOt4Vp7uiWCGcMS";
    PACK += "lktqVqDhFeYVFoE5lwBN0KaJD40IYN9CS+tl7nWVX2M3kh6jzU7M0SEL";
    PACK += "LpVlkzs7Aq7SD3Ww6n7FlfXBWvc/1Gh3+VA3XXZGBD9E2SrqLZdP2KKf";
    PACK += "51aNrZtQsF+zCEFu9Y0c/7BcPwa0TlIPZImtMck9AQYyQHBq+pa8HhgT";
    PACK += "mlvACLDo5rqwZREumrVYUAEu11/bXo3Mqy1YtkGVhr20CeCJ1celskn9";
    PACK += "VDYftaOKCkB7B/7z/PpLWgmVCyq0TeJcP0krDcOnbJJ52rxXnadSjJNr";
    PACK += "7bqgbpIhNm/iEloxMZlAJu0kyFgz0Q4l0EvSQlZ77VW56+v1fbDXjfbr";
    PACK += "TefuhJ2B6fae646JLXVhWy629BX1+38haLSIipjBbFkCuw4eEekU05ji";
    PACK += "CaYGBaSpL+noQv1yW5ZIbnXonEe6Pmjiudwx+jXwZdTtjl51t5ECmZ0k";
    PACK += "jZtJYxcpSzavE23TDnYP+vnpd3mtdk5hjyaomMw7c3vTVAt7UyoA6nW1";
    PACK += "073pvmDH45Mf9lP7a8XtIHhkul90d/sPd7d3e2oQzFDWasuCe5n1u8Ed";
    PACK += "x4olZIdWj3nBfstUI4j/VuV7HdNGNM45ekhx6ZUtMOrLJo+ARaCjkLT5";
    PACK += "N1yyhZUwdExJxslSK7bstVp0iirhykNa4Vbflr4iS3DLXJKFOCjNHOaA";
    PACK += "bZOUvFRzlTGT0MEEjZiW+a/U7pVaHRd4d1DQbStv2LYNmlOafSnDfSnt";
    PACK += "vmQ+lTMEE/z7w01ufQAag80BuFyv2/A1yvZc5eFJ5W9SRYaV02LemNEM";
    PACK += "EsD7TQIjueqa3acAtGSnPnyqVozCTVqwlFfY6kGlTzwkx6aXJU+TTD1I";
    PACK += "WcYrfG3uLdm5W69zPvfW64LPG40FLHsMT9RfmDfGMU0W5ovh67yKkZEv";
    PACK += "beeQuwWwL7MiBhn4rvKUV6orC16agKoxgNDBAh/xhVv6yFvK7hgk0XF8";
    PACK += "HXQHG0L2zEjtlB5ukoW3SRbNTbJo2ySxQWq65IJd8YVBYgICNgJ3NeKD";
    PACK += "2Icg9kt+ZavWQsall6Dp+pxfKlXbiJ2zsfPEOeeXXmD5nZ3kUrt4XRoX";
    PACK += "r/29vZ37y/72A1WiF35xzNu+OfQ+mFyysZ4R87lzldaRNkd9YDuBFd5b";
    PACK += "rdzg2CFX8+O72i35/i4b89zsVviSJhjmFj9ZnCZjxRQu4lgRjlHLtI3/";
    PACK += "jWljc3s+pXzOR6zi53Fi18iIZUs+NqCLeE4tKB/d3KXuuQaw4wu2AHAK";
    PACK += "eHdMdmO44/mYte7plaat4EIOacicRgqaysgm4RXLm/uu+aE5q12z6Vld";
    PACK += "O+rCa3Bdz5ZImArBcn1May92ALar9ZSUrkW2VnVq9uLB13rJM6aZaLzy";
    PACK += "/UXPyYH6uPJ8qGq7NuyVlsJolBe4vNUOpLOmIJ21Auk00w7Dl2+Q2XOP";
    PACK += "tKAMgoDaFvlNuvCHfQzoyNVmkfFK5ZCYSwjqeYlRSnMZs1Kaq8xcOUb8";
    PACK += "KQ1YnzcctO7vuogR4qP0LvMcm+9GmVRxMqVUIR4vBYMPCuLda6BB7jxU";
    PACK += "kF79fgJop7yRfiYGzi+dCUzR/f7ot+R5qZAWO504gGMUCNL0YEizKAF3";
    PACK += "C55/pAZtGRPKVxNj5Wv+vATczXj1PHppmuyFmRYYRvRShYZI+D+jgtkY";
    PACK += "PZye1lEmbSiLBrR8WkcvSXxLoT+lFJEDnZon8garoO5WL1E4Km29WtIg";
    PACK += "jdH5BGE2e2Qyj3PjNKsl9kHt6fZq4gOq3Yb9fYCsHhH9eEE8QVlhXSkK";
    PACK += "BQdhvC3Jz41O7FIOGm2u/e5D8NHzfF63pLgUaf5WjoUkYILoaku8oTdI";
    PACK += "YCut14u2vNa/jeYKFoK+ZYEQV9rNVBi0MfShtSp/f7R0PRZ91N3wfc3g";
    PACK += "M5qrs1XZRugLbEu1Jtz2rET8NZucK/NcTHsD8eispKE9Z5AfYevseykv";
    PACK += "foNECoiv/EHIKisLnc1ZW2vNa7ynAAZk6Eb6NKvm4EkqJDsqb/AxZY9r";
    PACK += "3mPvFYX6U4duqD/fMSLqV0joxRaS99jRFOCLrYuesNHpVr+z3acL/ltm";
    PACK += "E+41U+X5MMguMWcAiQwegJjZDmJTTgqS2a7Fh/dT5uA0WIkfflzzkr2H";
    PACK += "NRMcDQrk1efh1S19urDPbqe6PIDhCaOP99+nybMp5C+KAMmD/VrE16WK";
    PACK += "ys8mERnC7b1HvGxoxcCiWW7yPvvE/1zbMNKc1+5T+vj+tUAel5Q5yFnN";
    PACK += "/7Sb/k88X/VPNenwsfd0qutGw3qtx8TnTMOJCr6QiGmty2AXScFfhS14";
    PACK += "7Q2bUkY46cz+xP6qn9/cJREW9Zc+mYF/H8zHJy6ST/yT1hWyTwRrRago";
    PACK += "vD85lQMEf0/kEs9ZvtliRaEEV4Opj4V1TUlUI2zaNvjkJ16zP7kYmKgK";
    PACK += "sUZP2oeB/xMVcsHA/Rmo0NwY/kkkXDeU6q4Srb7pO9+UYsBxqbccTUPf";
    PACK += "yKBW0gMwMT7cHtcPrEhChNmL0imff8NERLxWbTKRA61DAptEychHoDaW";
    PACK += "YnwkxouRkDa670/kx1x/S8j76KTbkjJnuScNZob/1GoipU5gRhGxIrVy";
    PACK += "gB4qfB7aq680KifJidJhoFzTlY2EaVYzdXLmnKdIeFCyfFx3EWlwHjv0";
    PACK += "nqjSQrdSlSc9luJwJumWumDnaXWYTjUGXJJueb+ZoI/cDypjMsmDt4a0";
    PACK += "aCIiyczXVPI+LUqrFs3/4y0aVFZ8WvCKn7OMyzixA3HO3huV+JyBKDBf";
    PACK += "pTylGiOHbQRXZewqzLhMdDUL9hx6FhwQMeZ0QltKeHRAWScWZfqXWh0V";
    PACK += "89eofmOl4zaoPCSIPCRAHiqNOGS7VWK3yjb5SMRG1xUaCEAwUvvxJGg5";
    PACK += "K7bGmi84dfvx8H9qP7qvsdxtRVa2sadu/xRNnVPG7QDgMImoZJlZiAwQ";
    PACK += "tsnggO0qjwfPodDt57T0ZtHpeMlEl3Hr3JaaLJ6UTJJRnUI8EfFh9oJZ";
    PACK += "3zOphjrnNaRW5MDjyGCycpTISzQx+o3Nme4FkBhFzV9k0eWIwNcDDyRi";
    PACK += "zCvEEHHguEjn1XmJSZSXy3K5/GT3xie/euDqu30dDWQ8/Xu7D1gqo4fs";
    PACK += "PPxKDiKihlVSluHPa5bMLoQQAXHbUWry5XIGiQ4g76bV75PwKhvkTeJx";
    PACK += "dx7swplI+pPUTOH8FStW8/e+st5ZB4BGVfUhCvraplSXUmgbEfPeQ25R";
    PACK += "PQbbIdj5uLlhpaUhLQLKbmVdpL7kxLyowQhBA0Ang0t2NYJUvt1jHzLg";
    PACK += "cuRD790pKCaU9w7NKTGiZl3yHbRDYwsIxEBt8+Uihw3mB5vF1/LWJDUA";
    PACK += "qbxWgecDZw15KzDdRZ/do+kEvpIIo19pfl4HzkbivCDgMIqbe5NuQmSJ";
    PACK += "bmUGZIb4OLNiQKiSSrLGfk4EBIfhptIGUVMP/zElS/89bq+QwApCAVLp";
    PACK += "5t+ib1yDMlEwlWQwqdlYVLUsrxJI/DevEknZsv/kcnbFdfgkF3pduyd0";
    PACK += "bbeUh3ydyh7DjC2e6Wcy+ALgKRK8MiCFegSA6vljRuybMrRy4Jp5b7Y/";
    PACK += "ZKj1V0Yqo/4S3tD0R7q8vejUTjU7rxo2lN9wRfLGS4Mwwc6fAbP4Z/P8";
    PACK += "Knm2peeS+JN8yyLJ4AFEAV+3tB7aU0JyYOMkcpvOlp4rwZPKY8FfyOjB";
    PACK += "zsPe/t4+e8B83deLzCv5Ko+QrIfFDkZhsV22HZQ5aymzG5Q5Gjnxv0Uu";
    PACK += "iB3+D2QjhmBmCnunvIxWWnyi5mf9ghPOvfccXJRv5b5oUFRebBiznM4S";
    PACK += "hcReYX2rDh2NvIwwIvYMxV8y74g/9I54XFw1r4PFVVveyF9CBpXJhcPS";
    PACK += "RVQzedI/jYeQ5A+8TvyFcSJYfco8xJn/W01Rc/HzBv0ejD5wAdsqoQz4";
    PACK += "Y1n6jiYcR+03+sz6MwXqmziJngvgHjDZEn8DSdQt31wg31wwry7g+kiT";
    PACK += "LqZ0jD4MPsB6ACPS7i/FsEh2mTKKqDE6KkkC1YH3C5LIwqEq0EOujmKC";
    PACK += "mVMwv6gkC/LZLani4dR3z/husrQUWu6SRu4KBS7IzeR+BZoU9hrO8/g3";
    PACK += "SFNVuFTsBSdeUcQXQFHMFFbSW6GzU+Ux+6di4CT1XPjR1mCW/1utRT97";
    PACK += "1+CciJ9l6AxhzEHKIlha1V3p7sf4oG6TXphVE8SGVcqCkuqoX/AyymDo";
    PACK += "QHrxRVvEgCIirRIxFyyLTe4h39HMibla/5BbDzN9Q4mqTEuseehhltvz";
    PACK += "Q3FwKdAlvQpXdkpzOqUIogzzyVrnk07oa4+tdGNNUGvfq9xYml7ADaJ4";
    PACK += "08To14KDnrFnPd2MbqZY6xrksxuYO966BhEEwhGx7IWuOH/bEwe953N+";
    PACK += "LUVqUMWS14ItKnFg/VnUTwNBg78MT4Y/fpvNMVvqpVCAluZ2UQmJaOa0";
    PACK += "8Kv0qlzU3i0AONOXhmc1vyb6Sm8XvH4qviymyjvT3JgIKY3HprrnUqia";
    PACK += "jywQuP+4XMiRKXR8VYwOfyiUtWPgLE3Lx3gBOOBfcnGWVW/E9yMBx2eW";
    PACK += "C5ls9Ffs9+mNY+bgcgn/8GuD/uEZEh5Yp0ys6Ii/piP+pGodcfq9257+";
    PACK += "L2QEa2in92AdD9CYr9ZuefUgc9Q2+2tfNVyXXQl+SbWNPLGqecazG0/o";
    PACK += "FV1Z4UipjePXX7iUcwDfm9Qs1E0QnSdgRP7nhDXRIqvVKybbZbXDpqwm";
    PACK += "m7Ka2UoUw7kprYITtEUpbUinahBVe75WwTb8kjW3YQtgdMv6V9WSzRqk";
    PACK += "chP8a6U4Di5Oei6hOr+gPRfAq7G26tlJbUbAJwDkO6t2UtC+UN4zLa8p";
    PACK += "OCutOtSW3wA4qgcoQwUvotgCTKE+4q+pjiR+fhXKSYWW3661Xoh52iJr";
    PACK += "Qsr1winZk8rXnUlWEt3ZzRowKFs0NGDFShPLxqT9irIL/7yVjUVRZ5NM";
    PACK += "yN+lmGQ/Bg4FrAAEQwQrLABgEIEJHVZh7AMNboIJupN0NuvNzlFnE8CF";
    PACK += "F3Jzk/UegTdCvck7zzubhfdKzOB20jEo0kfTzU1XiQyLb3aSjl1eoWpm";
    PACK += "dfNh8Ozmw+BwtJacv8hayfnFqI2EHowaBPlsZMnmjxElcxel2fXfR27n";
    PACK += "kokyUTBlVElFfP/ChnZqdDNkvwPDGprtRPzT7a2+f9I7Zaq+VikN6XjL";
    PACK += "Jp6O2rfufKQX5rPRzRP3+v97E3d4y4k7/A9N3J+OLQ1oZ/J35/Tw/805";
    PACK += "da4bH4TVzGCeEu13pdDqrmvlhVnHOiDJPXNOG4BNLGJwyKApkvE3uGo4";
    PACK += "jsEBnzuIoYzoxRt4dQU6NqB/VWHGP1ENglQvDT0A88U9zy+asCIa7fdD";
    PACK += "zq+z6nW5KAADr3kSI+adDzJcxcNfQYIF9yDcGqLAg+NY1MEKNOaKZhVa";
    PACK += "i5Aqk48SiEv+QqALx6A03qTgBW6SqEQlcR+EIwPDNCBZDY1B0Gp3lOw+";
    PACK += "SXUdx7aNRyqzyX+sneDv1Wf/c+19VsqRccL3md11jS1UY52W4QVIszLW";
    PACK += "eYO2Wb3h3EdtA2vbQGxJs4EAh2caiMKw2zzvK+pkxDIPyNyhqRsTx1Z1";
    PACK += "Xi4Al3o2h1RetfaSpQ4Sa8pEEqtPCEgc+Nk5xLis+n0hhXLsMq8ON2qJ";
    PACK += "A7BcwhW4QSXURepNAHG+0Wc5P6rRKEsw7QNDTUmjs42CZFjy1yIqQUnB";
    PACK += "54BsPHxbJwQZXPpVVgzgkrnUytwhwurncXKEkwGYbLXKI9TgMdSoEthA";
    PACK += "81tLIvpG4nlOSf4B8GMp0GsdriAu2L8Lg5//JRj8MmaEEP5aOUJou8lc";
    PACK += "Hh8zpx+zPD8SI5FdCg3a66Mjri2IC8FV+P7N8eNnh2e3rvdn5XX1djpE";
    PACK += "t/sh32ohPVFtSrEgEHWRNQNbaO4vDI7nBdMZwRqnhYJ6BMdoDD0cmPRZ";
    PACK += "dCnfuIZzU9Ss5bJ1LbtiuGzLOF7bJPj8VNRPhcwu9b1nspzhiDHSFmr4";
    PACK += "1EdiCVRnTb1kHtfVTiu1oeU5tQOrlHFNEkRKt006npet4KL51s0Fl8uo";
    PACK += "Nunc2A3v+OPRViKK2c/bGFaztmCkiL5u2dp1m5vZ0HIdxmEV6tD42TyR";
    PACK += "TjzNxi3Nc8EqWklELfn62HPW+g4kzEP/l2KTl+NIKu8PL+mcNJirhdYD";
    PACK += "l+Bb9N//C8XoO1NItZPWWTG9U9XAxN/5781yayaqKp2Kzf/+X/ALH2ie";
    PACK += "TcvPglWK/6yZei1n42wqqkYc6Y8ySBcYvK/N1Kg4Nbo3dVPXp4/qYaPm";
    PACK += "KnOjMSqLqszFlkDVQG0Sl6r+Fjdn0SpWWq/7m03/9VGkF6/TuXce63sJ";
    PACK += "YoRa87E9OAvgMe71Ya+q6OgdZmMd+bUGONFmC6N8Vr4XNqbaMiKkiUeQ";
    PACK += "Te8I80dcgZ8b071esYLkOrmhFTbtDDIHLUQClwFBZJJ+QJgJgVdtdV1q";
    PACK += "SlgyyqFZrd0wrV4Z24wj5/rtMoT8Lb2dcoD6O3+n3Pgpm4HFp1DRsfWX";
    PACK += "OFb8xbGoo5P6PKtO4+S43krH4wh+aaTiTJ3Ao4sB3Gw2yaw1dm0fHeNi";
    PACK += "zsxZkiWdzgqggsiEfWxkPplnxfQgHZ37odXX3iNs7m9Ts5tV2wcSkWjR";
    PACK += "XUq7/qFnF2AF51QMs28w9wYwxOdpFRVgLs2x7yBN8V89baGSsWqdr455";
    PACK += "7kzv0JdHu6t6qOkq9ETDpPuHocJL11K0iznR9xJlk7WZzQhahs6iaSN+";
    PACK += "W2HuXnrpM0P0fW1chjxKQxcXuLe3s5840tvffsCsl1t/p9+7v21+d/m9";
    PACK += "ve0HvT1mMBD6uBJDGK+hety/D2DUak/2cQxR/Liq0aDWxxyYxjzdj5mI";
    PACK += "SSOwUVaQzZkGB/9nAxz8LSJ1g0mcgC5UgvqZqQQGtnEp2ne1r16cnBcY";
    PACK += "soSFgjRBf3qDqfJ1gq7d8lRSTMw0TApcVKCkdCEXKOsVHKIDCHLJxlgM";
    PACK += "AzSFEH3BjPZ2b2/HjEKX/ytnhUImwET0X7vdott9C2ZR88qS95nuPBov";
    PACK += "dedpBIrXJ+pwr03HhZ+no5U721gsojLudktPF0I2XIHEIpXOb7RoLzrU";
    PACK += "IVP9PVgfgCZVsqcjzfpJ1U8BEFGqWUxrmDF4BUQTxMYBYKhaAcCTiCgz";
    PACK += "7yrU2aTUYhYfJo+5tYZmvPSjtQwUgO4GQ+OYOaFryYooYxIzRSE2u/q8";
    PACK += "DZUyk2RVPW52BMBfg7vST9tNckWNwjnb8OdMNBtfS/xK2EJI5o1OJLWf";
    PACK += "9ETyko4M2oldlg4kAj6cjnKPsP1T+1RXwBoDkJIwJJo2JhC9/UapWFKD";
    PACK += "JFbeHIiCRweuCYjOO8/GY1F0YhVdR6hfHGouERDhlTa5jeCk+b0scy04";
    PACK += "W72l8SK8G4EPv4jZuVjywgatREXXZViJvdyU3OkGtuynluDrYQatJrAz";
    PACK += "3FXDbmip+HlLW8KlvMarrTT494ZDtvYuKfxPSR22bPHZJffGojUQLU4g";
    PACK += "ONivxxAlTeFydTLj6JF8Kp6jl6LREaFDNpclhZLSWRfwxDZ7da+/7cjq";
    PACK += "du/h/f7eNoUUp0ta78M5pHH15WTL4oGYXIMyx5wUReOkkP+DJ4Vcf1IU";
    PACK += "7SfFp/CkwN6Zrm70BlPIyWBC0lVaGdO3mmiZbHS+Yk3f4PELBHCRRaZ6";
    PACK += "JqFC43HlH0kZJ7WxBa9DYqdVIgsNxpEZxQRLkYA31B4pVXuYeJhhCuqO";
    PACK += "NE4AlqA5jSxV85dq1njOi/UqjXMjSs1bNQrZbfQPg3NS/mdqp1ZFRLZ1";
    PACK += "q/LLJYKcyOUSIqvSuNv9tYpqljHJ0pg5GJVxM0ZFi/tjUAIAw5HBTFZh";
    PACK += "OaarBxa3Wi5dQsTlMq2HUdtQKf0PLI45LJRGlTGDxOz1cvm+wlILJtmY";
    PACK += "VTA7w+hnA7dedZPdQnWzvqTfgexGhU12W4VNdpPChlT3M8VKHSpWAA7q";
    PACK += "b7/Mgj3IG7FivIqZ2Zjg711pvAy7OXnKJF/8e60AXb1xl/CIhIY1axIL";
    PACK += "lvLagJbWFHl1uEg+iEg9YwvX9hQ2s8+VjAmFqXwKY+ajohTGBCwOK6Aw";
    PACK += "VZxEVSuFqRSFMcL36AYKM4jmNiH83ycx8f9dCnOuSQClMJWmMKxBXVgr";
    PACK += "dRkowJ+QEpHqL9dSmFE7hRkBhblsoTAppTApUphLVoEVqR8Po/lPBk8N";
    PACK += "922GrVlyLZ1pzmGD0FhDGbSV3aKJt6E3XqVrqE5bbWTPkrdusTTpq/3e";
    PACK += "9u5actU2eAAIFEhE3e7Yu4lzDMP8F9r3738Ee3IL2nnZRjsvCe2sIC75";
    PACK += "/0dDogi5yQvhc8UEnDTAstCcvlZVNlBUVBrlbncjM8JY3u0+VdsZvAQ1";
    PACK += "g1xCwBM9PP45dWnRTYy63bvFWi0yHQsdNaXVRcRblOgBLJOfDQ28C/d1";
    PACK += "UQhMaDlz9VCBsYG1LdHc+0KVCV1OlY2G9LjXIiu99dzYSXJ7c+JpK+1Q";
    PACK += "JRQP7jZuYM5WvUbBSK8vu139ujk1YfQVsJIPp03m+nOLHhPTC7LHWZQT";
    PACK += "KWZ7b58RdZ/tI3RqknnpUbUQSzKkojLJJkntEZeGMcle+pcEbwJX+TPl";
    PACK += "xhN79IP4xFqWMFugUnnBM9BRLzgVWVtBVzb6SZQb3FG2GEYgqBEpsb/9";
    PACK += "EBVqa7BbjFoJNOaok70bPWF5tx9bwEa7lVCWFI1Tm2TRVq5SFlPJVj4M";
    PACK += "VDJDowjpJ4LCK9n7DxJbwmlHlI4gyqiKCNb9xEDOlaBn0FrC0ihZWMav";
    PACK += "4U5iNETMvJxkKxZJ3SRiDQcnHqee6YGnD9WbZXFS8j9y0AYy4+oqAAkf";
    PACK += "HWb0jdJp94iir7RYTMLu8dJcBdM7zqKiucsnGSjNxQKYKZUsJG+6A7gJ";
    PACK += "Aew8MiEW2tLM6RsVpQRdWaByBaM4Ab6DDGtmxjS3GlXE5CM5Qaq1Y+zm";
    PACK += "yvgcR5kdcodxlaupU7VLf/ylP/6AVecSKepFIUHHmgP/I7eqxRfY8s8Q";
    PACK += "rTH3fnb7u/sPer393diOxbCEV4GkgtvDH6Cpzcg0uiR/ZEolvTRTaieS";
    PACK += "S9CSeStQtE0xYDbY7Jww2wkhO5mnLruBBGUktK5asTJYMBnzVrMHBf+v";
    PACK += "om19yZXVX5npFtyuXCaVNlvP92UG90X7hMfM3/YI4qBDjOL2QfTABxGl";
    PACK += "jUy2C82O6BI4EadExbUfExwCMiWt0FfS0W6x8EF8YIuv7WQNyLe4JwwF";
    PACK += "qJv5s6mTUzMK3kWWPgasZtZkBNA0iVvdP0dIqhHhslq29o9YFPRWJx57";
    PACK += "YO+IfTalu723P4yIinHvPpP8RxnZoIXtbTDi6f6AQQRO/bYTxbE4plO1";
    PACK += "Z25U+9YjNLkhNPLGwScrjOV2AvTezWH3BnuXLrXyZ1vXLVll/GjOSxav";
    PACK += "J9lZK8ku40HTLGGiXsxQKhMvxlFSxEEE0dTALzr9Mjj1kJ9YvAJDd6x4";
    PACK += "V7k1nlZWDS35gpXcZdd+GMdqTsHapiNT6ISuEHM1yrqUVijeZCyWy4Vu";
    PACK += "0Wcb4W+hMrPuvUzjYO4mOd/WgJYKEXM/yfkDemd/V2Nlbj9QF9t7++pi";
    PACK += "r7+tH/W2dSEIPFFXu72HutiD/kNTDiBR1OXO9v19XVJZuVUBNGfpqva3";
    PACK += "+7u69N727vaDB+ZjmAjWfA+V//qTqH3SrzzYefBgv2fe2b9///52X7+0";
    PACK += "s7O3t7u7o9/av9/vPXiwDyOx4w3F3s7+g/u9h/1tGKP9B7s7e7t7+wH4";
    PACK += "Z857q5xHOVDMalFhjgidpiCLcTKGPYDsVmsU/uDCVmwt+iHbXzxX6O45";
    PACK += "BrlKdDyGABqbE2YRxeEm7web3CLTUGzMYeTt6MZ25x89twpwFlM+okfQ";
    PACK += "NF4bGgCnC+HRmUqR7i3xmF2B7yqmrL8rGqfEoTj5ITY3T/knwez1Z3L9";
    PACK += "vGafgDnNxuwz/C0vhZzk5Xf2vFZu0EhmJU07ZWXi3sN9H0CicpA8Xt4K";
    PACK += "H5DeS5niclZA7haLmukBKfxeNq1LAWvnIN9DYeA6q56ko4vvqRxXEI+I";
    PACK += "UqgNOLQ/j+tUKlznHgYSJpLVaZaDaTLN8tdAcPNVEpVbpDpNNHUNGjx/";
    PACK += "q1klcspQKSQ734L6eKEvoGJO5frHP7cCE+xUBqcE1APU0fg6OBkAeAki";
    PACK += "WUXSSEOSy25/ue0dPA51kIgtIRirSCDGQ1iAVeEhzRJ3n3ZhqtvFNQIR";
    PACK += "cc7AZWFi47aHPtar8LFeVVRnE+sVVdoWN1zlAmpFexUh2iu54Sogjkci";
    PACK += "RHq1axbdxA3Sa5f3MTtU9ATk8J+Y3bE52GN9XOTqrOhMSokLrYOjXli2";
    PACK += "WSVqGBQurQsnjkdk/yM0MEHIBu4SPDmMhFLwnLCOuf2AoViaDuXuFVZ4";
    PACK += "HGnMfgeUYwgTAOSZmFDzzhezT0zzVexu60cGub+QeP7T/jhvptykAHOy";
    PACK += "F8tdMxn0MudipZra0zJM0Nq6nIr6XMhOYnqkWE34T/MCwUnUNo3OySXQ";
    PACK += "LmmL73XI93ubzfmO6ViFxg0rdLmai5oCl5P8I34GJT93VIwIKFqVAPlJ";
    PACK += "qOOFx4UZfxIaYGH2pN56jRScO0oAD4GaPdLBChCXhINsUOFlblWwwjKk";
    PACK += "bvOSFS/cknTLs71OUpO/fNdO1ysLUqK3ZE0yKOwkbwFhjYEKzmNfkjHc";
    PACK += "95i7ZG4saXG3i04C9PFu8i5z0Q/NLHt+Xb3EnAnowntmVIh5aNnTPrp3";
    PACK += "o/OcST9/VxzeMLtHf2MnQR42VGVZjtawzk1vzSFSO3vadPtxq1xjl1rI";
    PACK += "Qw+tjjBp1iS4XeaMuD7puUyUhBC+5XXsoepYuNSRe2+ec8jJm87aM3lA";
    PACK += "O4Swro2BIiqmPOQNcn32uwQMGhBNUVKv+TGTGquc7kPFgRt2fScJXM56";
    PACK += "zDqRrXz3Ox3f+HXEphl7MmLvR4OvI+7H0DnIbXO6Fx5RNn6uewD9rlMO";
    PACK += "xmIrncNmwzimiCQBI5hBUHgD00kWAUUo/OO8wK3cPM7JaawO86L1MC/C";
    PACK += "w7ygh7kOhVCeq3iWF+FZbp5QirJaDaYZdStfDZ74I+eHJzWcD2FF0Agu";
    PACK += "tKv4yQK0Dy32RNObQrMAWTFf1J0k509LJalIdQUZHgA9npxglcjByJ7k";
    PACK += "KkA3ZzrCQp1eiN+LD2TjQVgTUJVUihTqemu/+7b5XXsUmpiWsjjIM8i+";
    PACK += "0mLqleZpI86lLEZ4f5LHq8elCtBEQ9ag0On7ShmlEFScI+K7BF/1t98B";
    PACK += "A38uZH0VgadO3nrzJD3VEYXZJEL5rKqvcqHjGRYcCmD1GVS/iBdhLRkY";
    PACK += "AAoEEbsG3/2T7JR3OtrVCxymOuO0mApZLqr86ljUvxWFkM//eP1K+1N1";
    PACK += "DDdufleL+RyA+1GoK+rDcYYh2R9TWajkn16p50hks7IInqeLunxWjhYV";
    PACK += "jOCfRbPvw3K5jGCqUJdUYjZVpf1LFSmO3ahKgzslYTRUZhkdbAPjkxj4";
    PACK += "xLYRBo+OBeBPb+hNt9DjHQ44VKuIjB7qjZaxXi6rbrdqu98yB27eqrhq";
    PACK += "m7fFSXYKXhYn2WlzEuGunkZ4YocLrBp6mMApn1eKkGFX1k31EOC3h9XW";
    PACK += "2dl5PcvNeC34YrgI7lUm3hi07BXijPlzU8Vxgt+y62ZoHGk2SIZYck9n";
    PACK += "hsX2+3V1OptVnPxnVl37Iotsf7DNZXE8kmWed7rdt1GnUteg4CiVRbwy";
    PACK += "g9yyKCEPV9EYEL164PDFhJK8HAROoGns+1asVoP3bQQaDjMZFHU2zjeF";
    PACK += "xTzY+BprIiysjK6psTbiJCqyJctJmgrlQWwPzLolNTlIcDHNCOKgzYRj";
    PACK += "DRKfRaV0eVTmeTqvxLiTFGELZCgTFm0tkKEEKC2KBci+2IiWJqlrr12J";
    PACK += "b5ogtl4pWvHgiLnW3tO8vpUkWAFWLeWuUMema9a6RqTEwiSHqpY54eeY";
    PACK += "XK4zbKlHE/9e7jQJObHc4Y6Hz/9bnyZfXPchi5tD3wPEOapiBlhoEuM3";
    PACK += "vUlDZPiH59q/2UktViOs/+4lOjmbycuEf+9rXa7RQCde8qZdw3FKCIJm";
    PACK += "jiftmwdU3BnnoD8NSlqm1Xc0gcRL7Hk0VbmORMwgG44zcB4Y7wlIm6Ud";
    PACK += "f8KHjdKar/ZM/GbBGdP+Exlh6ilDE5K1/gBbWfXUyjyOjoBhCAXm0JOH";
    PACK += "3SX77iCL7kLWJ+3PH8dsqqMTw/HZS17C1OnYviDTlALCUo6ZDcQDGEd9";
    PACK += "9j6hQTLMuPSj//9PvfqtHnBD6oRIDff1QN7f33d5YFx3lB4uyIqFww3R";
    PACK += "jHTuTZdsKJnPQ+sVLU8+ilMwTp3k8pSXTHDfIMUMyzzO0rycdpK3UWeU";
    PACK += "FiORd4BrhV95WQn4QWlqNpHpTHRwgRs/VfVDzL4ApX0bdSDONXzvMhuL";
    PACK += "UpdMF+OsVFqunPcG+aO3hUlSlG9uxm+jt8VJfhpUoMKesX4MVm40bDbV";
    PACK += "1WezdGpamGfFhf8OW9PAsQCaXWHhupxO82bXlWyRVQAlgvVkxWWaZ42q";
    PACK += "jGQht86+S5D3NG7p9fe0er3I62yei2Rjo9ya6R+rGypzwkXV+mElAZSx";
    PACK += "0XKaUwAZvRLYyLLJ6xl2vjzJTgdZK/u04JZ9GsotaIXmhTQDW26t4342";
    PACK += "ON/odbtfZeS9xxZouuEn7ltscRon5HuaNet2ww92Opv/sW9CXadx0uTP";
    PACK += "kAU2/Fm2nj+T8apd6nwtwf6+wGkCp7n2aVSl0ipqXzRqY81R2ktaxcZy";
    PACK += "jWAoPcFQ8jDvlSRQ6h5bp73gc5uFkHP+cJgn+VYJEbJPdeZBpsLj6nqe";
    PACK += "/OMf379/3/q+s1XK6T/6Dx8+/McP4NpV1oHLFGJ9blF6WKC8M5LZvO5A";
    PACK += "bHG2pZD8dY7DqDPOLjtAkDMjOvDOI1X+l0f/9Q991dGJ1mflpVB6FZ05";
    PACK += "HH/EdoXJrawii7r5uYJdZ5CUOKtWaE1sPI+ZarGaKvADB8wbu42Hmb3k";
    PACK += "Gz3k+P4JNtQML7j6Hcdx0qj6zTHC5DKhibZAoi3ZV3UwbfTR75EeLQJS";
    PACK += "2BpzOf+qtAA30XRBaTpuCvn36Hrz3b9B20U8CCpp0veWRt6KxgtC45t1";
    PACK += "tNH5li9ZWo86nNxqkSjxFd4GNns27Jfe1+Lmw0CSwyBfp3ha/3HvlNBN";
    PACK += "fntTk51/gFQnSA4hL+r4KJXCATQQIY0sLeb24qQ8RTOyFjmH39NIsAp8";
    PACK += "Gv+y5G+l4itVh66kKdKT7YspOF2/VQhapxN3u98K1RDykj1Y8JmS88tb";
    PACK += "yfnlT+T88hbapTIe2h6WN8n9iS12kSHcWwXOmetPG4GnDbiLbvTXnzYC";
    PACK += "T5v2xSqV7WPDypqVqB/Xtcy+LGoRdfAhHplndaTLxnH78nakjyxmtLgr";
    PACK += "oI9Sq8gWMAV+GWh+Ik2U/wfaomZpvxw5Z9dpV2/UnwZj+2VR1zAudKCb";
    PACK += "x7MbXom9tfPv5dlW5AqjU81t00QIWlitQvVKbWKJgyO6PZp4jWi5nygc";
    PACK += "yqaU814dJoHOHdhNI8IQ6BenObudPIOili9+sXZhRhvMfHkmaJI+BtGr";
    PACK += "D5gSvSRUlLXgV06ci6nyyVkckRG0b7KCOSATNFj5dshgSG7FZd5Q+aps";
    PACK += "YbDugDHN57CKpPA5rFhzBX+IH5ilGWGp9FjQeZDrJl/ZI59HT2LWNEr+";
    PACK += "zHW/ERnQNFri7H3tdi89w7nn5ugFIqBlfDGKlPHXLeKHD/b2exi6YM1e";
    PACK += "Jcf1QXhUueb7giZ132jkf+0/UMuxkRiPlRRyIAzuaKkIYLVLNfxqCrET";
    PACK += "jQ6qMWiiEBDXr4GaKOiwqukGZQfDAHnVtcCpFh0RDaCXdoIP4z7Amc5k";
    PACK += "X6jRod2MKA5ttHa2XQCHokvK1Kh7AC6SDY9WoimKqCEZm/FND803vhMn";
    PACK += "4BqITtREHmmVRYh+JzY2fz0IqPIyaiACyiCj9f4ADXVRv2eqe59FgWNA";
    PACK += "S+n7t9bTKYM57ry2hRe4A7iXlZW9EbyTceIZx4x3f4xm9jdFhCemJdvf";
    PACK += "FIb7TY5oN7mhZRz9hFjmeZ54zgjmk0zyzAOR8CRKX9j0ggH9WApQWhes";
    PACK += "zXBecgzFMT7XXa5Vz/s4Is7HycY7NGNsNJyMCVcwfoZBAwLMHlOqxfW9";
    PACK += "bKKhlL6vkPmCpc/GJ502LaO6b9PKTHsUmbbqQm3N9SNVGu3PgiO0Eb4R";
    PACK += "LkmvV/6klirMPdOKU8zF5rob9t4hd4GZ41qloDBoPkoO1zFzRixXP1eB";
    PACK += "ZUVtjcApZbntwvKox6ByB7WL710U/3JceJG/2w8QGMQtXUMWtRO2y5Ww";
    PACK += "IWM8VY5z8LoX9KhpVlcEKCrFug1QeBtAtaIXG4dW8xJxa3XQQxB36tZ6";
    PACK += "t7vxtUk41DGy/b/fRfG9NidaHA5onIt7+2vDM/B8d4eoxFD2q9AhMcPU";
    PACK += "h8pllzmoK1s+S2xJ49ibWfbVm0hIxahueJ7CtRk1awls9xt+hyyGFwFU";
    PACK += "EH9e9C4dFrCokgL9reB4DM+bprtQqfza26NT2M/O09CMCidpzGTIOA2j";
    PACK += "c0GBoPQJq5rnk8/ufqO+OAnPo217bpJ7e/TeKnRD3Nf2L+Is+VRndVtr";
    PACK += "JVtvyILTRtnyhOZbTJu56N6DO/eX6O2vsgQF1q52+5arM9KVWk7EcmO3";
    PACK += "+YwdB7QdtfPPN8WnruOM6wacYSPzCqSiBzZyZUG+/sYw9R+aDmBT3QOf";
    PACK += "Wbot23OTrxwu/rXLysqzZFmh59xHhYWOcHF3PXjYY1E34GGPRZ0AwOaR";
    PACK += "NmGY5Zd7uZnQLoeC5oZjh0xsvQdOAsi2hU55aZPwflTu/saHxc9s6TJL";
    PACK += "Z8ZcrCppqwB7+KXyYCP/mFqHiM8lr3Im+J+QRPEPCAbH21qFkJUFUqwO";
    PACK += "5nxQPbuu4E4C2hdahIliTG8eFuOVkpdEcl3wCIbElx8JVuKHTHxfLr9n";
    PACK += "xbj8blNTAhaDqQ3K0t8q15AEuUuC9u5AQRiBd2fB5VZajM5LiSH+ytZq";
    PACK += "br2dTCBmDAPwQAeiwGnNL/UUUzo66ZeV9lIP7zFiZFr/jTtipZAZwCvo";
    PACK += "Xp9V8F/Ke2zOe+ycC6bd4GtUNA8GzhtzNDiH1bFc6oimc/ulDc53MBI+";
    PACK += "28xjBqXK5VKuKVXxbBNiKanAvgOq/E1+7kR/rdmOWTTi59TmYPnZMT9n";
    PACK += "53w0MM3MJtE5+G/oWAkEfkX7ere7uQk+QSrYOosZ3C3h7pyrEwQCxtWH";
    PACK += "aDzThoVIA33GOR+zMT/fAtzJAlUIq3M+WhUcvInu9ZfLCv9qVk2tugUu";
    PACK += "s2pl8hfhfihgCHWBHhboeQWwQy9Kfo2TLMZgxwBsarOYjmAFQRLxKgcS";
    PACK += "cMTrwZEdFNi2/Ig53/YoOOD6PS23OIf/mES/H4H1w7ickHqva35kM3ID";
    PACK += "LI+XyNIJWT19vsYtzuqBf0d/L/Hc07NJdOkBaF7xy4DzviB31MEx9QGm";
    PACK += "+HQdJkrk4UohzhTQt+EVAZi6itlFPJiGaRJaUXEmK9L4HXSHn/G10vJg";
    PACK += "Rld7fzijllTe6STe84fd7mxrrAmPNmPBLWqHaxQI9G5aYamPLiNyB9rc";
    PACK += "QNm4A/lDLNH4iOEA2g35OFZOFI5NFCQSyiwfUxpWkQqEObI3zal8yb9U";
    PACK += "DCk8uyTo00XoSkQYfiXJG3l4KLfClOIyyP4KJBJ28mBcIg4opljpqsw4";
    PACK += "JmwvN1mwB/ZKg99iYlUDmTtXcFRlvMp1gK9GfFbO1MTZ7Gnuskj77ffB";
    PACK += "pcPG117jCw4v08YXjcbDcaO0mYPCtl1GMZAW2kQ4zGvaxFlG/eH0kR9+";
    PACK += "nyLOtCiA9xJIXOcvJMGLVVvm7CGkuklIAmzSll/X5GqtbwhD+hWCWmIb";
    PACK += "vK+EhFB8FwFQgYkV0LDfJPGN+xJWIe7UoJFk9kcuyY86Iz+Op+TH9+kp";
    PACK += "NspXUjhMEdvMUK8h2hQlohUjwIfXMP0MPxhqU8j+GpEkjsKFT5jLHXe5";
    PACK += "S/AWUnhLeJzAbcMX4Yv6XuxFcJEQRlSd3SaMcSB05MYeSAjqct9d9h+Y";
    PACK += "RmhHuNC/jvQuNuEcEE25NoYTqN2Gq8/2gAw6WcvnWYidX6dTg5q/t1xK";
    PACK += "FaDir76hZ7J4MCwIa7GVYfo5deIgWUmKlntRUEUEiYhdLZh72XunQMQ2";
    PACK += "VKDQYBkRK4WRDv0uSzya8PQyebOWy9oY9yxUb1RTe58Ls5EqxCYSDpzE";
    PACK += "mpRgyu1w+VNsmY3W5260L//maLeNqT8Kt+7B5U960Poc+e4Xaq8+9ZHx";
    PACK += "FzZyUsenNrS370w4lRcR5HIe0MzS74T1yn8HJtmDcjbL6mfZFyHfF7MQ";
    PACK += "wxNFujXlot8B4kTzBIv42tp0vQMhF8tlXmCKe2MoVTPzArw7xED32XaS";
    PACK += "veASRiBnLxwJfirATemF6h7JceUtcEH3CGWHijgJb8TJC/8OiQjzA/Ie";
    PACK += "JH+1Hd/LiDaF4ecph9ftQhHo6xdI2hcn38voBVvbhN3EDBZ7Qb/rc5G4";
    PACK += "anot40irCrnsXcttA0nLhXK9X2dpAM7JMSiOsYohPw9lqzQThbYDw0iV";
    PACK += "qGGcorXD5viISh3qDwEXXS0dIF8F4ApZzNr5KtvJQSgkqD7o9QbWjmYu";
    PACK += "OxmAb7Yselz10qTtCo3kGtyxCGNPW+uNyAb5iL1arGn/dj9pv7+dFFpj";
    PACK += "OYxyAdnnchFD1GCrXtQtgFxwGTfqNGyZvU+OqjqlbFfAZNeEpw95iUGT";
    PACK += "Oyw4iSfx2BHx/c7dKVppS3mYjs5dhiMbn/jOz+ci4wE690QSI6ww7wuY";
    PACK += "6FWGlxyTL9J+vBI+nrxlAj0tlgtJ6Q3kI+suJzc3TTOKE3lqBduSg/mr";
    PACK += "ZgueDTTXs3AisKZ9C4/2veALGkyJZJ16qtzZ8Yu07Wj/hd3bv7Ba8IXh";
    PACK += "pbJJ9GKdFwloRt+NEDUtB6pBjiDlcUYwDgaVowYVZWFjFzmCvKVa8yms";
    PACK += "eUg3n8arlfLR99QN2w/2dnEaamuSdKFJLwF0XniBSCRnzsjXUDoLJRz5";
    PACK += "yJi1ySc30r9XQn3wPQQGMdndVbrIj0W0w4Tl2GP2NIcbZl9fKQWlZUyv";
    PACK += "4pV+a4++tb70yqNhYSP2+tsuAUK3i5TNxP8GUn1LF25824CPdXe229IW";
    PACK += "Qi++we6CMNL1rUfd5S6idlCeKjfhle3pTlhGkrP4j5KSLXT6L1Y1yVCT";
    PACK += "+DCzKJFsg8ZNe5ChmU+duR2Zgn8s3CnSmfVym6WYW5R9LaMFy0zsHv4q";
    PACK += "ddwmRHk9qgxxyDa5Hqw5Rmayc/iz2T8dzH2XzJydx8n8RpfMK1rK+Vzi";
    PACK += "mJ/HyUUW5WzOzmHzGOrieyLeLaMGPIj1kDtPGw+NL51KDZD7jrFbxC92";
    PACK += "cMMzTgMoNOp5qZEcRs7VMGe0HBuhqyEYbehtDC1oeh+2vF82nA+TtkLW";
    PACK += "I/zkNOl04JvxKleBOLfbgPtrCAEuvJ865G1DgjJvGzTz/MAazZ0q+7YN";
    PACK += "22ltGN3cxQ1xYLgzvoDTUgDeu/bbHv/pfTfA4fDb5BBGTQwj2EkxXDZv";
    PACK += "51dycppl1XO0xPOSbZTLZd4SlUnutda3XEZyARbpWA8Q8jQBPwWJUfja";
    PACK += "kbMWZo/rShXXNWemwznE9DboNZqFrzGmvL2BjC4k12MID96Yo16LujQC";
    PACK += "CTrigs1tgOfc8RwoLvMjPqe6eE0qxvyIjbhGL2HjW52BH4tol0HhluOl";
    PACK += "n+RFRJ8pXf+YHBjOKnj5cxb7WnIIozX14bYA4LFLzXWHrqmXmusOjcOX";
    PACK += "N3PduLIB1TfYTnthdxoLZNzupXct0+g8drAfq5H1oRgZDmjMjvgoTrDk";
    PACK += "as7nln1RbONcrYNzLoxlyqjcVMoe62Y55+eKXPBzQlLSIW4mPGpsJl7w";
    PACK += "Hzd+756S1XsCgT3VPE+vOqxTlAV4mGezeSnrtKg7cVJu6cdcPY2TaOF9";
    PACK += "uuLnoccutiLj1oG+AXBgPxkPK1O/0m0v1Nv2o8cpaR/4368njCujizm3";
    PACK += "CC/e0MGokYYTcpsOO50k6MUNHzLfUR/a4Hx7G6yW+npnuTxvBfVeLpW1";
    PACK += "Ecr6UDLnvlYRrJTnLVAy1FipkeHOW1Wr56FqldxwFcDAnHe7eunF+FEt";
    PACK += "GjQehSpXUxJfsmgzPmZRy8HUpLv9wMLkvUSkt/deYL7i5YG2dLcVQy4S";
    PACK += "ggFkZisAAfo4snmvpLFI3BErgqrTIgYZNkt6QpyxupMMsJZvBj9bzSIz";
    PACK += "aUF3d3YMVA7qyAeXKqgk94Zjx5jflMFdrhXqFroWVHwil3qzoa7vDHVV";
    PACK += "sKKreCVcK1d1F7Axidsqv7fbe3if+CG9tUH8cAj9aVGbXLrNEdVNquH2";
    PACK += "jzB6NqmhPGJAv9SaR7RctYVhZ0mTPixfc7h/xMy/G5nFxSGSX8UX9khf";
    PACK += "rHk/F4MF/yg1o5/jofVR8ozBGQ9pbjZSfebm1HDOj5j1JGUZaXDWDp2c";
    PACK += "p1GOUUX6aLCycsaOeBUn+Fxt69J+5YiXMMSl0t6UDrJ7cMRz9hFggIHn";
    PACK += "WBWpmQagTlGAI/Hgvk37SAHx9fdzdsTLOHFVEIA+VP6Epn21DY88Q779";
    PACK += "hNOwEBOdvLpuL3wrqz+oi5/m0R4LAeqM6dfnN/RHdrvdjVzEGoNLuXw3";
    PACK += "k1NF2nXbpIhutfmH0qjzAAiexAPZksMlyllTMXgLn4F4ZVAFqLzrkkw/";
    PACK += "hpQgpR+jrl0LsqZBPKPecYVBZfROIjsb6jyiFM86iJPB9uaipcDqscoP";
    PACK += "VcQ+m6W2aTBtTjdoJxD8kEw2wDXICtrP8e8FjFUuWAwYfnSfiZpABtVW";
    PACK += "JUeYILmSI46/QgHRk4zosGwnDYTCupU7UNsmDR1lUs/WPudpmLtvEs29";
    PACK += "Iud8ThwilQMWjuqXAjjP8JA2fh7mNA49D42v6s/9QGCTmplDFdMM/Dn1";
    PACK += "oTMOvEPGWvenXBSOiLfZSuOEWIBMArjX9Bopml4jBMznZ8Sr7fOGeBky";
    PACK += "S5XDf70J+Y1NALJ4KwLocqBauehpHu0yO76VGl88zW9BIRtGj7ZUfbGl";
    PACK += "ieSzrRTUbwQk7FitXGpt+y5dELpsGTR4zxKvm9/L8Bv+vZpwNDdM7sKf";
    PACK += "XJs95XrRMrmLlsmFSp5P+eu0Pt8aiSxnZ3mYzPxpVs2haUKyetGe6fyZ";
    PACK += "CO8/gTcOymKSTdkr3mOfFYl+qf58AWdLhOMu+GEd9WL2jffYSEFnsa81";
    PACK += "AGjmgCSz4D32TpP3icmIATePC97/R4/9qe8doTPgVaZ+HSvfW/YOfYWn";
    PACK += "+tcF1PgSgK2OdTmRg/dnDXACLoOuiGyK+ldd5QY+fBfFiQDT3L3+UOSJ";
    PACK += "yEH/4jbG99q5lwR57ftJ9Kpr2JUvWNmX7r0vydmUJEVxQQq5CfvL+ZsU";
    PACK += "c2kq+PkPaIEHI6LgyvN2S1wq5Azh0pb395PnaaQ0y+CTQ/lcknw+m0R7";
    PACK += "vUcvC63d84bEksEHewBMKBEHHJCzsRvchoN9jnWU3mcwcppn3W50N18C";
    PACK += "tBkE6e12uxOwwX2JYzYTCjKgUObhVy680Uu+clzAyG7u9XrsTd7t/oB8";
    PACK += "oqQXM+EbRUY6LwfSgouxy7wm+QL80bCBwy9JLzYOEr3YacXGVYQ2AlqL";
    PACK += "UYyZe7/LrJRZfcVdIuCay+492VIG/c2uFY2lX4DN24+NC05veDCNytTL";
    PACK += "OxAn+ahxj11OIwJ3iqtRDRMMiwpyMoDlhvK+SiMZ2wiKgr/OfDt7wX9L";
    PACK += "g5wXBc/y9twPBf9nGohiUBhkzElUsG8jv72rllGrG8NLzpNvI+sy6HYi";
    PACK += "s7sujHDYvq+TkDZmHpRZRYRp5el9DOumvlc/WRkB0HYkuzs9Y7uXXbEl";
    PACK += "fswzKQhe8XJZxzU/zHFpq3moudRe7K8Gr5Z8W4vJn0dRPIg+A1T3cvkF";
    PACK += "FwoAOujlRlb9XTRax/FgXN6B4+LJ1PBwzsr+CcZtEWuPAYApeAIxLGe5";
    PACK += "9TQs2Sues5fW65L3kuizI701/6ZOFQuxDEt0G01c70rUcpsoIcD64d8z";
    PACK += "hJ6NzVJWE1PwkVTt7cUMN7rU+xyU06wwTMl+rB/asFLUoaumEulWjbda";
    PACK += "4RuPpxHCwtnhZaaJpW5iaZtYmiaWrom3baM1oU6yIqvOxfhjKS84UABz";
    PACK += "QwVZSlioHkOThAE4QDA1wN8b+NJEsD9FIM1ANnLdCsjrttPrbe/sbu/G";
    PACK += "2hO/5nIBy+AeBJz1e480qgGuWLUUtTu+HkQ/7wqL8q6MFcoxHGPgN5kV";
    PACK += "U5OVpVG+a/H6t+psJspF/TwtxrngIove1J5/guqLFVlXazq4G3QQQv62";
    PACK += "d3FSJYGNBq0XHl8QXAe5NO71B71HcmB0Izv9e38ARMGg5P1HjzJwSgBL";
    PACK += "ZPaLyp2QgQKO/6tcqbxDTMLuuQcpzaL+du8XOexv95LdB3C1+6CX9Ht4";
    PACK += "CX+S/kNV4OF2L9kRO7/I4Y7YSXZ38C78SfoP93v/+/k0kv+Aqxjq7fce";
    PACK += "AW70bQdJ/mSQ9lqWR7sssrP9EFRdxnfcrduAqHJeDANqnPgOsN8zenC+";
    PACK += "KxzepdmHN0IsaqpE0luCa99hrkPmN9TOrPlEIJdGfIsPMuWz7JpygF7Y";
    PACK += "ExvcOxFcJBOBKLPgkJhfRRPh8S6Pp0bu0CpTbVWwYReQW8lpagJNQUFh";
    PACK += "X8FbqpSicpLYLZ1kUKNHgisG4LelbMJaH7TxXERlFDObunCjr0l2ZnhD";
    PACK += "gGYxIqGJdPX9RaAnzuQZOxGN1bxwaCpO9a1UbHWr5rwONec11ZzrJvUG";
    PACK += "tRMH6lA1bqUH6qOyMq+6KZrUDrq+7vJ/FQsGf+6in7afHAp5AkKXuvxf";
    PACK += "yMaq4xVBUZAsDHqP6oGZVUUR0OGt/+hRMRAnxSlyDF3+L0lYihJFVDi8";
    PACK += "b+QigFsYqMWkaatS/wWJz8hB4VzA9KofmIw56hiCMd026ng8oAbSwJZw";
    PACK += "yQp1QMk4NjD660/RunGKFniKtp03dht7x1fb6RoeaDUjVIj5PSUi/4LS";
    PACK += "DWRp+kp01h8GYXaSFWmeX12/4gV7dQMjT+bpCUpMU0cnprVhj7tdwumS";
    PACK += "idIfVy15Joj4xCT/YHah90BxPB8gsbH1YI9cez9wkFy98uwVgAMFnDZZ";
    PACK += "Xosovj4XvLRBnhBETM0FmlJeBzOipQp/CnqWm/VOFkO07vXRcOGfOvf6";
    PACK += "7HyKKIgvqZdfwV+2mImMccgFWSufQhpkDXmrIGgX6ZEGUAB9cQXer1qK";
    PACK += "yaNQKdsWRO2fcS8zH4YS7EBBmpb+TgJRxkF2kMatXvI+i2QQWhyYs42G";
    PACK += "DyaI2sAgaJYL9pILTEhjZ01ZAr/wc8jZRnUPxYLfzTlqICaCG9XDh9pH";
    PACK += "MOG9Qf3oQ23OinpzU2nmP9Qn9Sk65WagCc9FeinGJD7Lu+/8SnPtWcxK";
    PACK += "CGBQoS4INOQpQ8HXGP2P1R9gfNRFtrJvcbn6UHsZdcjJ+0nLW9p/ueAv";
    PACK += "za5B+eGzBdjiBzn7nlOL1/tAUytDk5fc+oYHrpd2xTRKjbbxn159B2UN";
    PACK += "TM1jGOZP/E/+Xgc4FaCvWUgQURZeGDVrzSWixuYb78P01Vq5ZHjahPi0";
    PACK += "2nwiC16witdKNPnCFoajwZyMzPl+EoQ/DVnp7qFPblO3mPKKzfmCgc5a";
    PACK += "R2RE80C9ca4UKPCn39d/97QVd8znRFs+HkZzzw9w7Pmsz8O8noFFZq4x";
    PACK += "N8bqb5wEteGYztuwpVbK4e1dFWV4xo3sGhx5OVdfVtGIZZDoHQ6ske5o";
    PACK += "t/uxikqWMsTXH7GKpwMTMxvwZZfcj3YFr+ljUQ+u0Pm5CjCd+JXyVLjU";
    PACK += "T63B2/BE7vC+dk0AdChbsnIZRrf3Y+L68BWtqWqisDEXrvsXtvvRBcXK";
    PACK += "MjN64fHEL6vowg3K4yy6KqKKLWLXiFXJK67vsm86zuYbJG9+Z3MQvCv4";
    PACK += "SXmavNNJgkswlWYQdaDpeOkB0tkkstgu4Iju1QYGyOR9nPJXYHatgG95";
    PACK += "DqMzjX2v636y4BUWnXDlUspmvPQV7VHZAk+m9sQEWOOnQmaXei09k+UM";
    PACK += "R5vuk+VyFm6wmaeBPwB2OQBVPK7tzt84rtFHfhZDQMZt+n3MP0C/F7bf";
    PACK += "x95MGKOx1qRYcrv6As4Vmns/gOjvA/ZSxdITaeIldwcN8ZdS5MfqZhz5";
    PACK += "BR0QLi/BnarGcHBEeXOQWxCy4UGeEAIOy/k6+qaIyDcVt/gNGU9cRLsx";
    PACK += "++xw077WXZO6dc8pZ4N7y+Wkjj6zL6SZmr+lLN+21pzdrMUKVVdfQ9VV";
    PACK += "rlVXOVVdmdMHmEcyCNLxNz7fuw3uH2bUiE7rm+sBfFiZqV7aY+rFKHpJ";
    PACK += "OvmkUaTb3ZiNo7hR8gUJ1K0nNCiXCXYOQXNBGKsfrMrM8h1+gYqSlyDK";
    PACK += "LdZAhHyhQcEDe0wHVlThpDIrAuP5pcmf4kSmGIpzLmJidHzJjeC/snSz";
    PACK += "4E+nKpaIWgY1pYdq7zPyGsk/GAv/8BQhslgYmqzE12983xzUpik6ZNwY";
    PACK += "SWvSXrM/Vi85xE+rZWMLDBwU4B6Zsje1HyH5geW+wIBszxpJ4b1NQu4E";
    PACK += "Bb8olLM4mf4Ekpevx+UdlF5Um6eu0T+VTkEioNLDwIQueOLDwPMFCXJE";
    PACK += "3kb6QJ7KoagGZvD70JJb20Z03jRNfQuCSAfNORyjcpYZe9FL7jZuzMAV";
    PACK += "gSpBtnv7u4ZgmZVo7y2X7+RyGb1TkGmTKMsZsZHoYRgbjKJVDGenraW/";
    PACK += "9/BhT2caDD7qHi2XZXxdBhJmc7GovGj8w+CDFkoXilbuNlhXBPApYvZy";
    PACK += "FBXgDTiZRi/KGPFLNj6X7EXJP5d2aM2L7C3sSkz4dj5G8rhgH3gWNKRU";
    PACK += "PAx5D4b7HaiSre1TgOETwT8tZdJQgUZUN/lZjr0oUV9TXlNpEyKQyuJI";
    PACK += "jCBJNaBa46qBnEGD4pGViorNzTjn9UlxymSklWXs2p73x3U6ukjQOX50";
    PACK += "wcbZVFR1km+pixVukyND/JV5V/CrzNp4haYM0UVuYUOJPgaXQKPLUWlA";
    PACK += "0WApHmfDl8XmZhIZCyjQZ7gEqT9QhEB9QC6nPl6E4K/S6AIQWYMFU/xM";
    PACK += "JbH/iwB7rYAp0jUqaqWRaxUe7bT2zddrCcdOP46t4QnmCJfikdvfoctG";
    PACK += "yY8wetV6KUZHVp1KXN8WvPSDCxeeJKzcmXqD6tHCTHtlFKcpX5xUKqff";
    PACK += "EU/D78/5kdFLzG90F/lYRA/YHCBIjEeQbbLxB4qtS/CcHfHzdggf+KCR";
    PACK += "s8xRM+JzozbJJtGvo2geM3AXTptuPM7B2bo2j9gRH1ufitFKeVNcUjjR";
    PACK += "QSusj+3AlXtEczDrk/+CX1nnjisf1uOKGxbTVrFaHfESD9OobCGoaltY";
    PACK += "t7nMdKJkRxDuqbC/wjFDsOMjZjn/7d7uA8/VsfzZ1D1kJSttiKCSRUrq";
    PACK += "sjK1Q2CVzqVzWZladv3IcesrJae4pa2W2MRruZ7tmXFqxSWerR0YI5nE";
    PACK += "M+rIOqMDkwVfgOyMRyxaNMaGeEItbhyfp3n0EAy5TtL4GC2Ycd1hB6gs";
    PACK += "hnC/zF+PGsTsGAJl3Uge25E8Nn1YuJE8JiNpo2ahfrAUI8ELcRN+LwFR";
    PACK += "1WIiAC5GO3BCS0FAThBEglrBeW2xxYkGNjxaa2td6BO5J7XQeSA7F0q7";
    PACK += "8Ep5ZmNS4qvaXNdcmT6dnIZOLH2rVq+pQ8lHmrLbgMHE+D04swklqTd8";
    PACK += "04ope52l4ORvw8+tVsEU6TtQpza/NY2ZeDv5udXX7ZZSswShWajxEzBm";
    PACK += "HzD8WI3ZVW2uhRq/2hu/moEKHcYP4hlMT1d1m5fgr9MQnwSMPQfp6Nyp";
    PACK += "DRUEOwAIIewnv5W1ukDpFkIqv3SLWInjKAzvamEYn3g29S/d7l6v9wua";
    PACK += "hxdDbWVJigW6KOnVQPB+JkryrTVjFLhy1bwP6DFvJHsjHz3i/6e5d21u";
    PACK += "20gahb+fXyGyvDrAasSQtuM4YEYsW5YT71q213Kyuw/DUmBySCICASwu";
    PACK += "tBkK//2t7rkPAEpOss97trZicTD36enpe4+I98ZR4UOjN7kKdKvMVWB5";
    PACK += "Y0bLUutLTdhEa/iNCFBjwObK9BKx5XtAapVWPks4iHwHO+UTXIiplfjH";
    PACK += "yuTph22O46NHgTwvw8fZHdiU7yY0NgZ1pPhWP4eV3KPHvl+3Q4ZcCG7C";
    PACK += "clwunXSi/N4aQTsdZhxz7Zns+O3tSnM8CwwmoASIIrI0h63WfAOSvcDg";
    PACK += "oyoz/XjBqI6L/mg0FO4AHBPwyr+a3Q0fP/36GxlgNoVbuIkxWNGCffa1";
    PACK += "LbhMJW7njjQzz48/5jJovZN8klOCWQJWqUZ66yUUQOAM+u+IWwqUJAcu";
    PACK += "Q6Z1Ten/gCbHzg5wS0fSDS82BeKxK82TidZtZBQPHjzgFbSlosCOI9KW";
    PACK += "38CR/HJZNdiDgF9gb0hWMdgUBJDzoNFeONsa3rTytxhZFHAHvX9ilN5Y";
    PACK += "DJfTn2IrGwb47tqODaA3rSAmXo4oH2Tcxkb2hiQVQaZweUM49/T4+C0O";
    PACK += "UzBZM+ZNhRGAT0pljJfbThtGKq6uo4b8UoPrKIlKktPYywfXWbiDFFUY";
    PACK += "ThkcP3ICZs8wn3+tQAHI6E/My9HBV1EmJQ0tgEga8uGS/rs4WAOq/Otw";
    PACK += "lcdBSf9jVIF5iFDwvlHb8Vx7NHxCcnBAU6GNSxnrx8hgit3Ezc1xnWDy";
    PACK += "SRzg+mOfhDxOVc7h3w47/Xv7/HfR6PNRwALAMG/nnpFgwuXgnoLAxc0i";
    PACK += "25LyIaapHJ4suUaP7GIESa4pEynb3YbczjFSbVPbfx5J/b34GOTE/Bj0";
    PACK += "RmQOD3gQDfBfIuZ4hS90wZ6nVbII84gVQTTo/EY0nQf1jF+1feUHH8OC";
    PACK += "8fucNm54SsyEr/sYKBqt2HkEsgq4XP8jzyFRbolCWyQjnMWNxo/v0Ri5";
    PACK += "Xka3ZXdyEDNeL9mBhvlXQFsiDQtJaAg4n9uyIyaQvN84gWzRPEa3lFmd";
    PACK += "ProFH0Yro4F8sjBrDNiuxkC0JHYcJNB4MbkMv1boxrlEKmL5woLO4+M4";
    PACK += "4vY2XdcgpcoZ0Hl1OW6NpAtkzhLyMcXbMeHCm0B7feGH1Moc/uihTz4I";
    PACK += "wBYriIxtkl5KKsy5PWEr5LqMZS59OJ1Y5v+IPCv9USPHi7tmpZeRR7ZO";
    PACK += "zJMMjA23pzv6w3jlX028onLIiGGd/tw5PD1YXZ9VY+4Pf2/DoUB8cs3K";
    PACK += "fKMNmspG/BwpM3zgrcHW4VqQMejm7rsFkALCIATBGE80j7gRbaomChdG";
    PACK += "/Tg+7hkkYes10hc/VYZ7GoK162npG76uhvRMBz61BWha/KZFaZWVyURF";
    PACK += "o+JcZ6FSbqONLy5KMZkF/RvzTkckOT5NfFLgh4fCDTh1le/aEy+k4aBY";
    PACK += "hzlbjKVTnrRAkcEGJgW3MykCT/yVcXOVTJT7RDWiRV0rJSzYWpi5dazY";
    PACK += "WrKOT9JI7SFB3r5SHwWnWVA+sNbZq4UP/YiqIEjSwxVxjExJ5LZ4KnIT";
    PACK += "qTGjrpQKIFON9GIqaiRPIdoV26vsxUR8FZEWdIlpm+LWFkmcljZENB1H";
    PACK += "Tiol7lziSCVTGunMJepMFURGeompbKQK65RG8omI7Vvc8Vao5BCxRGIu";
    PACK += "htTdaFbjknnc+sczM5eNSDeyfNyCLBEP2oP5olhU8cl/mjhypN63F3OB";
    PACK += "vLB2A1e6ebl+L56WdLpkcATjwgzGBTlCuT9v5ki6QZJUzlcgc+BwFUxP";
    PACK += "UJ3BM/tRe6iw9AMVxKA7D4v2d0uE0EM0vgwdocjfDZVmuY44XmEE/7xh";
    PACK += "OzD2hj9VCh/4wd9G/FOiRqyjGCveEWwe/mXuJl82lCI/DPwv72dpfLLC";
    PACK += "QZe8zAowjSU23YhFJl9p1TEiS/NyzIYo1mbqtbFkKVTcYmArALfeAWFo";
    PACK += "C78VLw8/7LDeeqvfGT56UqHLPpknoOtWlRnRGoRseVqmCLA9r8dub3tg";
    PACK += "xM89MqWs0IxqsRJ20oJzZ5ZkV3SLY0xGAeYMlLk+uV6KKZ4eaaLPkWwz";
    PACK += "Go1FIsV3uuyxxCMPDTeAsiO+oRQ+KHMoL6GwMxhbFWzHb9hORK7ySWLB";
    PACK += "DjN/kYRDGJOxDYwU12aOUOM4wEraOByMMO2AmtuphITEtX5IHLjwVWUl";
    PACK += "KuIJ6B4TU10uo2BxfWUic86JpGeipgpBljRsT2waygnU0BQjWheCOVH7";
    PACK += "7aDtuCLzirVlZyvbsrOVdnY2ohN4Me0ZL6474/9iDMclj9JPEiOERyzv";
    PACK += "AoHYf8Iu9iHnbVWwKBuaEYwxpfpIh7g2aoqEtH5Ev5bqHikfFfKR/6g8";
    PACK += "RB9KL9FvXIx2fhz/XkRBRJ+S+JY+NUWhv6WaUXnHvNFDoA1IDNnnLGil";
    PACK += "v6VEnDJNiRCYvHEaP+KN3aZvWpq+dpp+2970dUvTRahWG3tqkVJ4a++d";
    PACK += "kgUyJ+qGRhBiD+dhENGRE+x1CYXf2mWfYSNHThjZd1j42C4sSih8QnJb";
    PACK += "Nea8eo+GgKI4nyozODNbnAQ7FMkNsh93pqVopdqoUgPkh7KBs3HDv4Gg";
    PACK += "viivUzlTDUO+D3F7q4cPdTNzFovQ7MfAZHsZXi/ojWpzhJeplJCb/T8B";
    PACK += "SgIfqY6JXbrNcG8ey5wTOUs0zy9LgulMYOVSJ/tLLEHq3mKsAzcAlMCx";
    PACK += "57JDLj/YZHwH0CUoYAO7oDZP4T8rjRYMMkVQBtZgknaxDKQ4USHVVIKI";
    PACK += "ESY1JsEhZ2i89A33DN7YNJuyehAMnJoY/DDohoZpFS/X3pJ0mUK8BF5q";
    PACK += "e0zBp9OR/JaUYbKKmUmFOB5ASOdUmJb+PQvNUtPTWW+OVWAr56w1vjaJ";
    PACK += "HTkPODhr8tGCJWW0jFj+LmfL6LOktpqGRVTSZHyuV2mVz9lFuGK5SqP9";
    PACK += "IixDh5oqKvOpQKvswrgNQFkpsIFP3HEYkkiM0DSqhyqgW/rU9wPwU0jh";
    PACK += "JjwSMlZ1h7THtZmmlTWypHZJVhMhWOU9GvJRofXoErPiWkF/kVrOlf92";
    PACK += "lK+PvgvzFeZJkgF+j49VyfTRTOtFzNLAMM/cSzwe/KskN2wX5Oaz3++f";
    PACK += "5EQhAkbse166l9gKaLMUJGhPOWe9LzE9iqNyGXMh0vfgMsZNj1Xik4bR";
    PACK += "4tCX7mLMMJgvLYP5spGoCiQtjroDQhGpxJMgFjLbONGuLsVJX7J8xXg2";
    PACK += "jXO7V0tV7hqxumsYcSdBZtsPJILmHPOZ6awy+RxjdJT6OTPc95YH70BR";
    PACK += "eYlkMPV3ojaF5ktP0K7a2obkXF0f00+lh2Hc/iZY31ShL0j4xOWkHI53";
    PACK += "pZdgfEB9Y8Q7ERNUgcfK2jC34Pmt8VDKAD5yHimfRwTziH3NNsCkUaKg";
    PACK += "ZGVSZCvRbVC66BgcXP/GIEQ8tBQaNH1pWQ3yC62+RNjP7RzVau25MEiJ";
    PACK += "eYIHQ9uPQVhiEoEt7L/5siPfJ5Fe7+dYXApmbHhPvLWWla+is5rRzbRv";
    PACK += "txPizEmq2ahg3M4q1LE5GmzDHflKjbiV3DhgbPyNUYnBYfa7cpIEpTFk";
    PACK += "KHxNxdAEB1bsmH98XLmyif9ZaZtfRIiowl7KpKA5g8ivDTOaiVEeaHsC";
    PACK += "H4iUIo3ZgOFVZKaUZI7sNr5C15G49mgQxeofYs17S/33vGqWmSMJd4JG";
    PACK += "dzJkRos08vHwW98fy/sgHyG/HlvjVyIQsTUBWWgYSnPb1fYJ6EjALetV";
    PACK += "ps/AHtpJ/p6XZriat7EMi2BM1ifllJUz/lIb2/tDfL/trZICSYDrYr5m";
    PACK += "iypmigCwtjda6k1+EKLtzf5jnM5v2OKtoC7LMF+xMmAkE5RWUNZjHXQV";
    PACK += "DJnnpXoySw6z5XdzMGceyDZo4jyel4Mii6M58xIyRE02tx95G2LUV73K";
    PACK += "pSGz4UIaZmYHHcF1Mn5/6/wejcyYCPEf7At9i42Sp7IHEaae9o/wkTtF";
    PACK += "2DnN0igpT+X+H/VNQ6Ui9Py94TFjEeMQqcSUNOVNz8mU5uPchc6Qfoas";
    PACK += "6WP+qHihiMIW0XgpzC+GHLJ6I/h/v0+K0PCHb8nlRSPCEPoi7QacewdS";
    PACK += "LAXMJ8/BMjLCVG0Y+B6yA+ELP/btjEvcsaN7kVXnIgt/XNmLLCgSr0NY";
    PACK += "mKY377/QQiy0+LKF2re3JAWXOfqkMHyrYvNwpdtHyyTQf1k5Lht7E7ft";
    PACK += "TTyO3b0pBACIvYEQeTirCL0ipEblb9zPiVMQclewYf1TaCGFFps3bvJm";
    PACK += "pUXkMVfvDooiX7kPkHLA5Hv8sXjgvFeYO/N2JOwm0Y3CCC1ghkgQcc5s";
    PACK += "33j7RITdF4gbRjxmlZP1E40M36JlDxnBDtU+wSd1BEjot6iBISV9+Ui9";
    PACK += "R9j5o8cPR9988/Cp35YdUw6CxqKyJqga+EiqbV2PX4R3j4iB80giLSPt";
    PACK += "+JR8xXJEcIbBHNmCTKjr8YOQNn1/fqrHH0LLTFDO/SczcMVPIAewYkEk";
    PACK += "dT3+MW0YGEoWwk5MEi29ByLDGSQdhIwrUjRspGIpe4arREIhX6m+dGM/";
    PACK += "sdIVjmXuu/9ULN/x5Nlp/iyOPT7oFAah/ZO/Xb19M+Ayy2i58/r9k9I/";
    PACK += "+b+zKQ4uhp79X5gXBClIzBgFMiDEtJxJCGJgcLlM8w36gsEfEp5+iyGA";
    PACK += "A2Ycc0iRb4HLyiDSHHnA7TqsSKx2ihZmJ/tS0Wth27h+vpRxJirY9F4v";
    PACK += "0flOSkhwUtfj9yGNq/FNSJ9zv96PK7qvCqDf4whyACdlvnsHLxRYKl2A";
    PACK += "rKQIpqucfCzJbzE5D8l1SOJqVpPXCd0vo2SBhurPdz+kRfkK3rRkzoLX";
    PACK += "JflYgRQHcGQwJFuWF8C09kdPB48Goz7hhBzL34Xzm3DF3oQbFvT5I7lI";
    PACK += "N/2asIzujS5eJwP9S3X3OhmIP1s7fJ0MWopVVR5S06wlgmyCxCSPFuyH";
    PACK += "NL250haOjeIXaFz7LizXHRXeMwC0ZgXDtMcq6uoQP7qdFYzT3VxclqtC";
    PACK += "KeGwywWRx+NH87K5G5P0PVsG3QFL4azNQ36+w5O3yH4tIAWCTdv4IJNn";
    PACK += "ZjwlnZCTDDo+3d7+z6oxieJlCtPOWbG2F9pemKal2idRw9qmFZML52vj";
    PACK += "5khsnibzKGb5TzYYn4Idxely9OjR0+XT4dPh6cPhw8fDxw+f9Gvjkb6+";
    PACK += "fn/x7PzD9YuLnz68ffv66vr712+fP3t9/cPbt3+/vu7RfpUs2DJK2AK8";
    PACK += "DX5K6OEGpPdTAs9nVAD1uDg+/gn0ZRmwYQVOmickfBdTqJeATsFjGbik";
    PACK += "0J8S4UXC/D0SRz8l43MQwVxdnL+/+HD96s2Hi/dvnr2+un7x9vrN2w/X";
    PACK += "P15dXL99f/3vtz9e//PV69fXzy+uX756f/GCflxBQ545+h2kBIlbn4mH";
    PACK += "B0VmD1tFZg+FyAyw5bICJb/jtD4caqd1KaPjxpq1nhRyPPaURIes0eG3";
    PACK += "3yrvgt6I5LTfB8PQpbLc7mnBhGaayjyal5c8YhyKNxPaA3FsQxZrZrAE";
    PACK += "Qwj3O7RpymnNViCoadbA8IxI245s2jaBnyhE4pRr+QWUK0hy57DpuJVw";
    PACK += "2V68vUQxrEt/dDlLm6lLVaAoxeW64kjBo/OlinOReqUWA/iJDqkLomSP";
    PACK += "0beoNAONSeExf/BrGiVen/R9omMcPAU3G03lA2pC48xO5EQYX31cFeur";
    PACK += "XTKnLRgOg25hNUHFtnlT9J7Fd8Dvr4qzL0F0mFhdNmBYdtsGxY+HX/sy";
    PACK += "Xq+KmZvIrhZc0F/c3vI0WgDoKQB6BIBuhtn1kkNAHiOQJweBHJiYJpAn";
    PACK += "dwA5BBbqAHLkUsU2jWQW6YkQPiAvh7LGNmiHCJKYGhxiDn+XSwKOnZz4";
    PACK += "Cc2nbEZiYLlWrBSoHXLIesngusD9grt5l6ZESkTvqjdNSDwL7qzH49Sg";
    PACK += "rbRht/JDLO9kQwL2e6FtJKFNiLSUacuzsu3C91BK0gA6/zD7PPFszkvO";
    PACK += "QEwDbLf0x3YGnFfVoi5goiGjX28kZi+A9SOSKSKxRgE0rvmVb9sVtyt5";
    PACK += "lZSpHsDeShHUG5abtG+mxn4g5nF9Whxkpl0SrGPgQwGe5mcgqFh6N2HB";
    PACK += "7/iiopel55UbEi59erbvV6jDh+va10KyYskd7Xv3I0WoSYooB8nDbQbz";
    PACK += "NZvfvDi/6DVSIt+zoVcsfU2WNOTGNSyChEvQowKJQ6slBOzm8ZWWsAur";
    PACK += "yt0ADLu1pAuIWLWqTIpgvjR+kVVlodr50vzJKYKNGOo9o7vcu85B8HC5";
    PACK += "hL+XS/j7Ff4NI4kkd7msB6IFbY5WWpaBbbY1E/DSMyMUXTOrTULP9iXk";
    PACK += "Z0POwsvpmbcfDAY5mbJZ8A6UQoDP/NqKDfnP2KTKjyJBNafLo5eiipHP";
    PACK += "OTPqPsvzcDeICvwXbX4wzHC+80p6Jt1tKe0n1eYjy/uGBDPJ+LRjVh4l";
    PACK += "dAoh/GJ6to9VAueUnu1VOK4xVItoCX9G8g2KFLGYg/DJr+XNQYxuTPmd";
    PACK += "RH/QSw6DSVXrEYyCfY8ToA7gLVywj9UKn5oXIIJK0k9walCpogwnAFdF";
    PACK += "Bl+A2M/iz9vbalCkG+Z5GVn79CyfroF0zXylOIzHOa2wqxBfU3fI0BwS";
    PACK += "rF69wWBQoXhbRuJLk/M1JH9tlnho8Gb3aDzxWOL5fBMynn4iB+225+lB";
    PACK += "TyP/r6Ph0P9qNBySdVel0Ki0oOuvRk/InHpbsgMcgxJ9eoXSEm/rj7di";
    PACK += "d77bjf0t7R/1T7Zy87f1WF7kKFmm3i9/mf9cPXz0cnT0YD/31uRrvz76";
    PACK += "Cv7M8M9N8Qv55f8cGf9bpkl5WkS/seBo8CRnm3Hz6ycWrdZlcPQxjRf2";
    PACK += "53kap3lwtC5i78EeV7oJP3tDwv+MEohsfTp6OPzrgoweQia3BVsdjYbD";
    PACK += "vxw9Gv3FH/8iT2XCMXmAe69UwrFxvV66pkd7PIzAg/1C0Y+MrBJTZnfK";
    PACK += "+Lk9i2NfEDRxwKblrEbDAKBpxOkHZkzePNMjwnHHVA0VyaHANB4IGhAI";
    PACK += "eb7sPQrYIM3QHkLQEC+FkhUr1iSl+2gR/PJgDyxKff0AAmwu6l9Inn4K";
    PACK += "SjJP42qTBAmRPeMaSz0QREPFbvlXzkoLo8V3HlSeomqdpDPioXKchD7g";
    PACK += "MHyfg0iOUOGABZmzOA5CPVyohrLGCQfGr9onLz21TNLHHT5ncVz0SR86";
    PACK += "HOhJgdbFIF2WLCyrnBUKS0X0bB+JxwK6kNfSLPNSXBHza7KvfZIaxgKZ";
    PACK += "o2snqUA0gLMZUpwvuAb5HNf9gsEzNxgMyhpS0w3C+ZwVRZr/ne1ISL2Y";
    PACK += "eimtBtFCHmcaFBOBhvmNtJSkWRzO2bPYUg9MCuOD1x/0Sf+67weq1Pvq";
    PACK += "58FXK14oSBgFmGKkarBmIWfJhKHnRBaJJiRDtxw1/ZfJJKPmz6BAh5Uo";
    PACK += "mcfVghUwD3+S0YXA1nPKHXjg790RRggFfWCJ9fhWbseAkujct+/Tdrqb";
    PACK += "ySs6rwPscjG1NnLmk14oQ0UzQZvhsawl7AvsFvr1L8SYdEY4mxzkZMEy";
    PACK += "EMAJcH3BlkEl/i7AeG/FypdxKA61kJDfG86IuqgLAXbTNZy3t4CUnry6";
    PACK += "s6QFGDeXl2HmzenZfGB37fn+rG4Dd/4ZAB7/cpr1fR/m+JqFS2eOHCjf";
    PACK += "5gsQg+KXl4nnz8hCTHuOUV/mxmzlEzQXDwFHSVtdQ81/R892A3tYT9PD";
    PACK += "C28rset0fe9FGX3hXZZgszhC4YG60f5C3lisLO+xXeqtCVPzWXPtKKN8";
    PACK += "8B8QwAuDrl4sLcswBCGOPj2MV6xuaR4AMpWorSRojx0I+2wSFe/g4q3T";
    PACK += "GC4QCOutEpLpv18tgmRg/ZaAOMB/SVF9FPMEKJyn8VUWJsEQkKn4i9/T";
    PACK += "7/O0ypSsE/ZQNkP45NTYdEYqWtCzPfpriAqQrVf/UhSaVbgJM6/yScSp";
    PACK += "u0Jj2Aps66LafBQ8A/szMbsgVXtV3x89/yCQko2geamXAnoG3Iz61Yzu";
    PACK += "+dcPfFx6tsd4MT/ozSmouhArVj6LYwWwBEt+isDOnlmgzL9wwtwX0P8u";
    PACK += "ShLAyzFbloe+50DGzIgnFcHiuqUkEi+Gl9LcRgw5bvSannFZuQeobhAt";
    PACK += "IDev7w+WEdj5eM/TNGZh4usXYzojBfUiGtu9xb+ntwh6C8Gzmn9f07Oe";
    PACK += "p6Kc5xrBr+E6QKpUL+6pOBLOV3XznoNSegqkMaDGEP5TzPB9NXFCxEjf";
    PACK += "ObO+L87gnAEn/v/UcaIiUmxT2rVN6cFt4l99gvsD2tv+HNcJy27ZmeYm";
    PACK += "qP15zZb/bWCXi9c0MMePXtwOx5GCvIqeVRzyom7Ii4PpzIKXFPYDBu63";
    PACK += "w4m7ZLUX7+Go/oubYYHC/+pu4Mgd29FYtdqPl2latm6FWRtIgpKewSUt";
    PACK += "Z4McZAIFmI62jGT2ZwFg50DuUX3BYG6/DkboHLJ5V75g0GbfNnB1jto4";
    PACK += "hC8YtNGzPsA4FJ3eeX4lAlsCwMaf3gIzEpUdJ6k7tg+yY8COc/yyQZ0B";
    PACK += "3APtGLrzPL9s8MYgzsF2jN51rl82uDuEs3SDamtZutFODS6QRyJwUD6W";
    PACK += "xo5Ir2oCztcvkyDp6wO7Y8zDgoqu+TkH+l+bnTMH++S6Jufu+X9tdu4s";
    PACK += "jK3r3jYbpEgnpJNuKHSeIemiQELJjgIzinKGcjqcOaxoqsDWeHeQfY2o";
    PACK += "V9Gk2aJyW0SyRUG9kObNFqHbAliZGV6cjJ5lzhZ5vrxBHY++ucGm5fDz";
    PACK += "uF00E9EhqbQyaEHm/n5ODQ3lnI7AQ0IJFCMy98lCwseWnm1hiq8KQSbg";
    PACK += "BAW3shW7vht7GLPWYaB3ipuqPPWVzE9Gfk2Gfj0GdS/OsaBIdePkBLe2";
    PACK += "pXvOCc5JtAimOfnlwX5e/zJzCQahGr/u+4LXgt2tyY5OZ+OFmuiN6HVF";
    PACK += "ARx2xks0Hc7Ikt6I2XGuE3ZH8J8bcgXRliFl4fGxqsWlJpMNdUoCTxdB";
    PACK += "w6FPQEq+sgFiJWqAkefGX5mMJvKXNyILJkz4nC4gj+qG7PkuzMkGOO8b";
    PACK += "u8ebQbQ4tDM2R37lcOBXk18e7Hey+QU9uxATxPmJM6x/kaIwdSzI9Msz";
    PACK += "rv3xectKyI7/de7XW3kP1LebgcG80y1YEfNvW5/Mz4bHx6G3I/NTAJeM";
    PACK += "8qdGgAhuyoIIEInEXOa1749DLyMRuDgW+pCFMAw5QBOutdTFAm8YaCsg";
    PACK += "Btwrb+iQrOh0OBtvLcHBtik4mHgrgOW1Z37TF2bDe91LQcaVEmSc13Qz";
    PACK += "3p3QK7JSO+b7wY6OcPJLqqT8g8FgpTjLG3pzsiS4EuiG7sh2ILqkN0SN";
    PACK += "s1Pj3NS1Fgh5HDEW90SMYOUN1/1zRW2fMXlpKxQWSXlQTtI8WoHxbJAI";
    PACK += "qImFwPHVIojINdp2FuhPG+xrcl0l0X8q7lygS5WkHAQ3KIQ120HY2ref";
    PACK += "EjAkZHm58wqlurLrQZRxVGNR/sZw6Vjhi0BHHF+FhkC3sxtq1vKqgVwj";
    PACK += "eKU1KuP0fzSWZayisdqDa2nU/t0rCgdKxjtwZjfxOkaiBxo196CtBz/o";
    PACK += "7HtaaXVL4c86e6gtDUkh3h75znshtfqRgBvepSAqqo/v008FBJzTAiXx";
    PACK += "1OIHIFmSzKsGoiYp6Fkhf6DY+R0C9fv0E9atBhLIJ5xsST95ugyNPAQq";
    PACK += "NZsakkrxHFY8cedYakBRVaTqe1yvm4kcnwJzZj4JaSYVBgYKREgE3h/U";
    PACK += "RoEjELBY/xlfHyDBkJ6hZq4iIQlRVtMixIa595E4kd0D6Xdt/H6+452/";
    PACK += "WsiBq4HxWQ2Zs0U1Z54XkgzkS+E0kxg6WsxoRkIf9VH3mYIe0hKi8zwE";
    PACK += "puDVzEggr5P6CncslALYUJlYfGop8iqQ58n7WpNIiWT5RAK0HkC5LGzN";
    PACK += "y3DOSrZ4n34CMzS0hBQw2vx4fHzoK/hZwNEIVtnpF3a7dcRJa6nnB6j7";
    PACK += "fJezl/hOmp+I1cREAa3TNyu0L8HCIm3LsMZoLMXCXJ1fPD8ApdhlmNnz";
    PACK += "v4ySy/DzgfmbFdrnb9Zonb81Bl5vtCXtmIWv9QIdY4ATBcmW4vWVPE9O";
    PACK += "pPBNaYGQhytTofbzfVciV6av008sPw+ROhKcX8/reZgyXGHRUra8vfUg";
    PACK += "mXGjR1VudCc++bakF25hthyEVZm+R5c4yujZMwYcAOZgaCzKmlXeNSvM";
    PACK += "TerOyrdE0BAwfbzpHnrdNfSXDtuxvUDmew3TC7tKPV53T3DbOcH2+el5";
    PACK += "GHtQj7etI9ze9mTcLrCFEiw+jrszxu0l3FIodwxAWiCmRc4POY398e5L";
    PACK += "J3BlTKBj/A541TogYw61P7760il8MqZgDQRG1uNP3Yd23t0wGZ93t3tX";
    PACK += "GYcds3Kak3hGE8xTZPSizMHOaH58nH5H43r8DnJ2FGm8Fbibxzxlop+S";
    PACK += "JDOK0RiFlVtPWblNsjAv2Ms4DUuw1cPQq7xS0l4p8QOYkU4g8QbrDKLi";
    PACK += "TfgGYhmejr4aQhgTmrRXif0J1EDb+vQs8gX3kI5TGpGIVlJtnpJohgtr";
    PACK += "PTX4B1iX42P8azQT6Y1KupfHzq9okC2JXXLFMIrKlgWbJWH/qcJYVl0v";
    PACK += "SZjnr0TtYGv9fBbHwc4quUo3LLiSfQSfluQTC28u+K9zGJYv/D3aPL2r";
    PACK += "DIkNrkK7FknTW/AO7COfVWV032JQI1TMnJF9mQR92Jx+jZToqyQqozDm";
    PACK += "3l0MqnEKikNEIWRVjFcWHb/lDxuvnibnZgNhq3XNvL7VUR+zlPEZ5OlG";
    PACK += "0cq9EdmEn8VPXvcFcn6j4bD2SQdFBIRbVaYvxYqoooQhaQUyNznTdAjK";
    PACK += "x2A0kN3ktIFa1TXBB3ls26aaRj5xOXDgxKgkwR4rmWdo1PnIRS3929vc";
    PACK += "zXOQ68hn0IUAD9v8NPfhkwltcTnQ4FMLWsLaFbTeJfIFQENYgzWTMOFP";
    PACK += "2kqDtkIANwSgSeMcPIhuSNG7RxI/spVr05NP2/qe+cqpIS7ba4hFnocC";
    PACK += "sqxVKrNXz8PoMqo5S8DOwYRUPVJvCJH8rFk3qxfalEXUjxv1nZoxr9nr";
    PACK += "MYOpFtN/VUhyWZCp6txegSjE889OR+ZpctSslyqXKeDd1rvKeSjqgyve";
    PACK += "kwW8hjlXpSKo++5N2HIO151OGyTJg75jdE1bwAT44mJ6FpuzUCdxCvHm";
    PACK += "wLTbXLSy97aOAx92bvlpAT1m6MvbxubCcz0siShai6cTEdRbWvthBrGl";
    PACK += "BzF1mLC1q+Siq7a+UT4oeu85i6pAusw5SRB1wTfCR4tqI5yBIZRo1Ybb";
    PACK += "c58UQWbIK6bK4C93dS+TKZrGF7MAhEt+XRPFgBro1Do4uq+JU3TJypDu";
    PACK += "VWPTZsg9F1oqTNwqLBBW8GjZI9ecwkFAnMSGTFHsbaTEhQKOkfvnJgGI";
    PACK += "skFA5gtRSGWDgzjNgkTCNbySUrLeSKYFG4KRlZb6tD5p2tPlYDUgGwmY";
    PACK += "nrZujLxCzX3zysl0JrAnGIvrV7lxkeZtaAkiJvri5rYw4xrL2E+jedWd";
    PACK += "2l5P8JXOR6B4Tda28dlrb0cPNgOfKqJrbMKkCmNeKUpWGHq4rdMJ65Q+";
    PACK += "BO0tPFsLtlrawSk9BuvT1OPE/IHRtYPeyFdOQWW7r1CpiYbj417JA7Bk";
    PACK += "JnMiRVfC0o2z47FBiig6JD+RXkupQWWkwRCVYiTMbPpfMXtHidIixB0j";
    PACK += "pMrZMT9Lb29zQ8uXnlHMoJHTFPS3eU3mf85A39050LIxkPZmSSzvGa6u";
    PACK += "TK2hIj2Ujq0WndEIS2Ia+YGXn/FfkU/i7yJ054wgVopPkHuqyYJPQVOV";
    PACK += "Q5LTIY/jcv+1pvQk9c9oenzsnZwkJD/hS1SC9fyrpCYrPRSIZ2V8KFFn";
    PACK += "LIlaeARSematlQt0y0wH7uM+N7wH0/EY9NJj7huEaqFlnEJgEFHzq4c+";
    PACK += "un8WaV56HlfPpKeRdrwU9f7yENPcxtN8FnjxND8dzU7gh//Vw5pkah2c";
    PACK += "Zl3m6cYDQdoVg7Q2yuzDnL/PUTLosMlGtb+zEfjDkLWqL7eMZBXdF9Um";
    PACK += "KDKyiZIgzIC1COYZYZ9LULYuM7JhYRIs4N9FFCbBKiNccxBk8q9z8AEN";
    PACK += "NhmZ4x/rrCbbg2xVuFrlbAW+xSBIxmcRvbyJItJK6iUmN67lQlrm1hT3";
    PACK += "KGGRFfawJnK8KE3u5OVWoCgFPuUebNz3oq7BwcnmyLzhD7bgywdUCnFK";
    PACK += "UjCT73czamW6WsVMds3pSCTmZBGer/bhUtIXJKImyl4UCFdJWgVA0yTG";
    PACK += "u4eCVPX6nYd8Ka1EaytbIOdyD5bArSq5AZvIv72F35YCTDbkiWYUF/A9";
    PACK += "39S7KXt5FA2S3d4x0bHo1iXev7zvBfv8dml1/cE6URE0xGTArUNQwmKs";
    PACK += "kGA6basDEFETxUg+M2H7z+Xq7UBq0l1TYLgMdHUbqCPiKGgnInkRecSw";
    PACK += "HOR4/Sln1I/AY3BmdsIRjVxQczESGnmEWtcDp51Ft+67zafbqKDzSwvH";
    PACK += "bs2thW232h/m3a2qBgOfVQeqdfESClOUQK5qSttGTq4HYVc9jG/BaXGz";
    PACK += "Y5sMV5B4fwp81UAYFvEtbl+T9m5Vkenr2kp+O98c6rvx1WttRQ81aiW9";
    PACK += "5a4oyttpNOlYrKK7G+V+O+/ZQIOAOuUGS52ssU0Sh6JcQGjHzPJ20wgd";
    PACK += "2ri9/jSR9FFpGEckmgjXjHU3Wp94nZ3TQ+1APS0MIrjOtLUL2FiF0xIE";
    PACK += "t7aaBp+O9Igy8mvf7dIq8nxQXCJjnXQcwivTNIwfGGvpwy6RTZ8pWok2";
    PACK += "XINbuuk1R8RiVCIlyqJCK5CkwanJ4e0yMzaIp6IYKUr79raX6Ag9HAqY";
    PACK += "6ahSug4oZjqZPg/Y2Z/kSJcoSp1HDQLRRcQ3NG06LwBNls943nVOY3aJ";
    PACK += "49Ed8f7CeO696IrisbTP/cC6BeucaHgHhNl0nSPLOyOJ9MbgEjxHjkhe";
    PACK += "emWnp6LsUtn3guwTU7egyWDSokQVwzatzGBQX4yqaKjXYUtnXDQoOjK6";
    PACK += "jqcSSk5HB3s/KOzCnXTfqMbWdz9TjarGS+WMICg3d3D1WtlP1cA46cbr";
    PACK += "1PRrteyrbTEuVrS9eiRCMB6LBlNg2FdrBnk6G3fcPT+lsTZejSj3+yAV";
    PACK += "/hHPuEFTpcyCZUCMsRT2RYNiHS3BfSDENIcSQLW8tPDH4dnp6Pg45QZP";
    PACK += "lQysHJIRQlid4mApXK1KSVJ3GTq1536bGy7CBPiNNzYUbazJpuJP+B68";
    PACK += "seDWoh8SyGl98unwRRc+U8Gm4m7w97jsoknjuovywxc+i/itkWjPdU5G";
    PACK += "dCYE9g38NTbk8mI0Lzb8NkEagSiSu2FxUTopZBYI3B3Pq5qOmPDFlKD7";
    PACK += "d7tXglug2GYwrveKZq/42TSqv2e3HEvXcjXcxY6L7UlmLYYPHR5eUPiF";
    PACK += "I4tleV52x5Kye3dc1/YRpIdnnH7pEXht3rXWXKMvmKvB2b+LEk1O24Bq";
    PACK += "m3uAlbFC+7FFfnFOXsCro6yDrfCiDk2g0yQK3GpOhRT6rNWrB18l4WOw";
    PACK += "ys3rJhwefcKPJxebGtdt6jYxJkmpsHip6FneaddTQWoIo2bcaf5SaTIn";
    PACK += "nXCYD6KJuMo8MxRyALioFi2hoZuTS1fCgCNMwNeuPpR7aJpOTeOWp9qU";
    PACK += "TZgqxGBYd3Ia3FVIWO6j3Se1oj48i2Pzowdx7w57QJd3u70qd3bxGMKl";
    PACK += "VuIjTtLFhtH8zJB1K/VXL9UnE2kjVx+fp7LTurW5XstB7U/cCL5OePTM";
    PACK += "tfmSGk4MaljNvp0olk0wqldKspRnLwo4DNa+f3DF7rJsp7c/acHGyf5X";
    PACK += "V8wv211Lbqysr3ntVupVLKOdfrWoibsoWKtyg4Y1xnHNUJqz8coJ0Dxf";
    PACK += "ogJ10G2CRJOWrYKllUCsAvVqctogd1qPmGtWtGOcsi3Ft8R4GzXXeXsL";
    PACK += "ASqsVw6ITsmS6h4g4GY587XQW1axPUfF1Okh0/v7hSDA2AsmM4AAl3On";
    PACK += "zmRh2GPkLTzqoSg0zek2nUz/6DqM6AH/1YW4E25xNv4zjuSLAiXwR7Sh";
    PACK += "73BeEPVilKbUohE2o75rBxoL5dzMjzHdYwi60ddDUKxdwd8Ph6Bcwz+F";
    PACK += "oebls39dXz17eYHRs7+/eF+TtWSDijLMy7fLZcFk1HEowMb4c8HiMjS/";
    PACK += "Y8E7lkN0j3AlakHq4SL6TUmkwHaQ798Vll5Bp5zJOj+gsfsxPmT3yLsC";
    PACK += "PzLzN2aeW9/NkvE2OE3GVWRpcpEs+sT88CLK2Vw8aWXeJxKZ8qEabBwv";
    PACK += "RhWcXRMm1VEbPt0p6IH9d63nOInS8vTxfqeoaRurvN7Cw1C5AjvqNQEs";
    PACK += "GkH/GMsyAgp/RSebjQqjRQ4tsICg4bbRNQc+Tb5D16KsVncsL4UgKyFC";
    PACK += "FEQ616be83xQoIBgSLQ8DATIymYDsgTTs/gklbvo+WCJcYcQDKejkMqz";
    PACK += "Jdgu/v7JWVM7Gf3RyeF0+OTwAdewYbD4fCqeEBfsOTAEORKwNU0UcW8y";
    PACK += "bBzk76+LlVf83uaZbgPUyCoaQH7Vsu623YXrMnDRixIzmmG0um6QthKJ";
    PACK += "uVoibrr6+laZNCPJhfM2t4hLTsC/NjYcjfkRapZyWLtRYE1o1z5DyB+d";
    PACK += "DX3Fahqu09JXdyqqnY4MpkP25fknxgSkXGwohuPnKtW/WoJkqk+YwaiQ";
    PACK += "ljA/JoRo3jAVljD57W0P+L90kEFQ6KKUHKEq8HyyhYBqQGaVaTVfg9+V";
    PACK += "+lPs+tnIN21pIsqMi1FRNmGNgApIVazo2XSlF0BWjTOZ+cF0CjJjkhuF";
    PACK += "4JqIs5oYsWXVpKbD2WCO+WX+5Qep/JOAdSXJqLciGMVaKKqXWlGNSRec";
    PACK += "iwhQiw7iqD8g57i+C+OatD46KI8r4/7kdBSMyDX1lqeed0U39uFsBsab";
    PACK += "LYHvKhj6/l8vyGcd++H6K88772hs4ufzYOiT08G3+D911JtB4/1W9+KZ";
    PACK += "cEN5Qy5n9Nk4nL6ZmdF61QwuTy7/+pkMdcDe2ifAR20squK6QVJ8hlxW";
    PACK += "XvtmiUj/fRl6tn97Czmm+ixZ9FG75aLEjWDeNhiurQapFVnTFT3LvD5q";
    PACK += "h8jKJwso2GcedgMF7Se6FH0tWwmeP4eUaiebgGukiTJiXKRzTEViZWaZ";
    PACK += "yFLe0ZbuYX0yd8yKnq29lYJwUmXGF4giwm/wXGS5w6xKr6OiZAnLYaeq";
    PACK += "givTyHZgdOuTe7WsMminhvTJwphKDSE+3LnCdwgDHsNzAnE3BlmOWbEF";
    PACK += "bef5ZDUoyjQDPXLIjRfAVg3W2HKhIbGUs2SMzj6+a/rYF1/47ssWzmcB";
    PACK += "8LQzV/4717XwvCU1l+Yw3ktzO2/odeb5k30WFgX4RfVGddAbjTnu84yJ";
    PACK += "h4vFPddLbqwVdzR0l0tuIAXKwXZdkHXngG2ABeN13N2VuLsr654WxiWN";
    PACK += "rBs6bFzPYcvdrJqYAJ4djHB/UNDDO2mX85jcxl1iHrMul/K0LP7QMJpV";
    PACK += "ud9Qun5DqKTX1NSMCmxcTvZ1p2r0yiEv97U22OcUAJyTXFDXGHja5WQt";
    PACK += "JFYHRoKaerS1IaH6kJZhbDNhrUajdgCr5q1UodQco/L8JLZ4AG1IOjRE";
    PACK += "TfedRTP61p85Ey56uO9c2iJ+/ZmzQVHQfSfTEmTsz5lLXZPvY54cWefC";
    PACK += "yDwz8e33seFUKG1YvudsPIM4VJB/BH6UKA85ErjaM7xIe5ARtq6JsFCs";
    PACK += "x5+iZJF+akO+rCj7mBWeiDrtTxKvJnOZlP4eZlKryVFGvo91hPhtZTq1";
    PACK += "qnSXiOkRbXLX1veH1eYo/o5iyLm8r++pN9dtGlIU/emwFIXbsurayAhJ";
    PACK += "1veHaME8m1zUNa28JchHawmfNHtSEaZqQ6otCtuVbSJkmrbzlcLpScxV";
    PACK += "ftKFwAxfFbQr4vRcW8w/wd7a4NA1vw+Lvj+3/0O0uB+vb1c0efwPzhGY";
    PACK += "FslJ+yEpTy73i5cMeA5vnpSHLboc5lo0Ro2Yud1qJD2gMqxSRu4dIca6";
    PACK += "FUAtU1FCps75uVoyO5Ri25eGkglDKUrVJkqoUSyNwqDZQX3VnaoqjrCE";
    PACK += "wEtMGxIJ5Z4S6qOkvy0MmzJVUcHsILXZWWxIxu0L4LocNje+U2ae+P7Y";
    PACK += "3GcjvQAtvX7rhz5R5gvP4tjOY9AVXdnuzJTPW53ZSQUaWt5mh+0fjU4d";
    PACK += "3Y7Xpkttdtvx1ejXVbV4fhv8NXvu+mx03dBh8L5bMDDg6ib96T4Kd9Gr";
    PACK += "bn0vcehV53Hg1omtE/ISpFvzdmrSQMcKCwralaMxHadbQrYeD3WqiYE+";
    PACK += "pT2u28br2CyvFcgcoTO+ZzGZpvw9gygpqfEsaJ2o+T7C67o3H7jmOrSR";
    PACK += "cWMC+KglYD5ko0ytXHXus9+iHTbHOTxMcgB1NHG28T45i2p9qSRodBwn";
    PACK += "j7PL36emQly9V4bl8zq3k61NIP6KjJg/OXjhIK6XsnWbHEAlnjBL77j0";
    PACK += "8nPbF6TrblozUaADQZx+DGM3Phk7GPfs0FePkf719Qp7vYYgp9ynoHUU";
    PACK += "Dgl3OSO3tr3bI7m1mYqWZn214pmxO2Om3VXjHlvQEUGts87kju+NaGpW";
    PACK += "TSveGbszptpdNe6xvgMR1jrr2XHWOqvxaGsXXYwKnxaHChnP8U6fTKON";
    PACK += "6ZdpFHPfTKNAOYUSpYkBbzxzdNcORvHVnQ52diyR9liNnj8tkTHo9MQ7";
    PACK += "EFtHSZ0N77z6oPraWZSjyVY2Ox0un0bL+7h9tlT/4kAwYFtqRQVsPRx7";
    PACK += "8+6uD95bpr1pI+BMm4RQgXEjilIjxJF1hxqRhUAiArpgBwDzWt9mw60x";
    PACK += "9yd5kDvuiM2JgExNyFfuCiOUgPu5kpnE5TSfiRAy1p6WuGrDTbBxr9rC";
    PACK += "ezRrQfJh5VHYHMAp9UpNN1oUnblbiDQ+dyEN9jkLkwVb3EeqcSHqGohC";
    PACK += "NkckkYXgYlYyWY/H39JRtlwGDDIjgwyJDa55CIyClbKthgCwGhHGcmxw";
    PACK += "/Z+KVczjhgMU+hanD8bzXk498wFXndq5H5vf5aAW/Wo/zrwKiAgAn0t3";
    PACK += "rjHkoif2tMTpyT49HxdZczdkc4W5zR7Yu9vNFtj1IB2kQdHBlpsD7A3b";
    PACK += "UYMmN6t5Pvj8mjOGeMB2iSnDtrqX5ot29Rz5DIzkfdDOMh0wZ+djyXJw";
    PACK += "/As0tJ6rpp/f5ewdB7YoTVoeFGWrL20AeAdNmtncCJNchrXlrl1AbtgF";
    PACK += "dOy5Z1uHWseh7Dgcu1C5B8rqAnPA394KT3ERwSIXTIK0NjTZmd81TEvU";
    PACK += "uAkfOuh5PTH4Ddvh0NICVYaPbt/wGK0CcVYGdMmpyiIMv2dOcyhf0tb5";
    PACK += "4pQm5nzcSeTpp+L57tXCDxq13M6MVBFmfBed+nKca9uDnERGhpFc+18b";
    PACK += "CM5xwL5K87Lpft1aX/pfux8dKrT52WtvRw82a/XBVkhNcRxus0nXkhWz";
    PACK += "0fzQ4YfN74sCUxV1TWMNJ3EXB8YJwKPpvCOEwySiewxwljcBpOwCEHX4";
    PACK += "kMk8mlYzfEKCiOagnoi1BCMOeinppcfHEtOD5CGSkvTekIdWOz7u8ZTY";
    PACK += "0lQNs+kVNZWeQUeFCpxW6xvbfOMS0ze848Jyy26LXntVvE8/qd666Tqr";
    PACK += "nkHPJYHENY3t1TjYwL3NKIjOhN6nn3SL7vmY1azptJHG+uW16eKeiPTb";
    PACK += "7aRtYEgepL4FSeIDnlPGHUETcA6TcfHHvjgQCKaeW+HySUJzF88pAzdL";
    PACK += "b9D2uDhxTOTb1BHIxHhagJI7r+iQXFd0NCQ7af6chSuGpprBeQVUGENL";
    PACK += "gOuq9sm7LsIPiD1JsYGpMBTspAGyS33oevUhAlG/yQaJqNtaqq77EIPv";
    PACK += "5Lr+V6lBNeoBclCv9L70oOq1QRDqvqiOOZnSs3ell5PU1x4tmgZ0N7qb";
    PACK += "WnRrerGm5JyBOe51puTlkx3aIMSu1Fifq97NnbQ+sA4vl7yL0a323cZl";
    PACK += "xgMFw4DZBW2iFwJfMXCWEw6vtQY9HU06fAaClganI20Z2pbEHuKVcZO/";
    PACK += "mOiblta1tZPGWi2iWJ97PjmvDlHF6N+TmvvqUsuZC5lxcF7Zs0B7gtZJ";
    PACK += "oAlAPrn+E+ZgG8ZfV+aRqwl0n7ja5BExDh87hcPXP/9qgAWpzMhy0Vfq";
    PACK += "YrgHY2BAeUZiahw8kO1qTo2bR3OCEGeFW9QAFi0KOR250qbIMqc1Epid";
    PACK += "jhwQ4jHgolr67sLsBC611Khq1qAM1chBZyLNj49zyEvlCSce9ulIRnLG";
    PACK += "9Fuxh+kHeKYqHngPZhIfCjpgz0d7KYXJu5xto7Qq4LNB8wp6RQONPrWz";
    PACK += "oWr8hn0uVUMkmvSZoTintSsiXHyNnVBuAPym94YB/DWc9EZB/l3MQ/xm";
    PACK += "zZnad5Ge5ZCSiw0Sc1ottU6w1hICinRVG0KNOOyu4K6Aj9zFx+qdbdLW";
    PACK += "Clza2kiOovnZ4SnaKnhdbekdTVs5C11NsRbNlpNDvHzQ1Uox8fpKe615";
    PACK += "KDrvbh7gzZyzKFa8pDiZrw5BtOn7I5vcMXYuqumhD8ovgFGR6evqmlxJ";
    PACK += "Aq9MIfQC+ZiWZbrhHmgvuwi7PP0kY3xc3SfGx3tV3yDadCcW0WZzdBDa";
    PACK += "w3U+z7W7A1DlwtehEDc+WgRhTZXENqx9WFZEJSio1FP3aldRGclzitwZ";
    PACK += "xr4GD+eZCByil+ap5FwkU1FD+HaKSBtrIhkt3G3PW9PCfvuKQZlm8iDX";
    PACK += "ZniJHeiHK8mAVBAbzNuBKlgeGEbtWDQ75N9ln4t79TkYDIwAqJVvBA4p";
    PACK += "00ysZk625mr4BOYHVzT/faPLNXre9q71be8zgoocwk8hPDjn8EtOAeKb";
    PACK += "3DHD7H4zbIkXotn4vfAz09cwJ1b0Dh5nw1FeGNI4qV7vT0D3Ata/WoYb";
    PACK += "txjFtQX+4Fw8wU3M5Qa48T30Jf8vB/cAuITYHuLC/e7gHsD4xYLVOh3J";
    PACK += "/O4JRILhwD8pOeedcRzCU4c9x1F5SUN1KDLBSyxTGbKbSrGT4Erq0sGt";
    PACK += "4UFyyDDQYTGvAcI1ZHcxcDc359Y0jNft7lvDIRjosJxc3TsWggYTDXxX";
    PACK += "jUAIsL/3iYKgezscAkHf8kYEBOvOfnkIhGsFeDBn6qRrNmL66J2/YSzT";
    PACK += "TRSvBFFmGtECdC4BlWsxApmRAqsuoZTnTyoeghkOpq1fEYVAhO+B5AR+";
    PACK += "R7CPSIh4Ih3sI68NxwC8IHZabpsKIR2HBueiYiW4e4lbyV+hgzkRxfiK";
    PACK += "tdA39HdNicPDHbOSj/3BiemJOMEZ/sh23WveZjgGk6o5GJbB74jLAC9V";
    PACK += "d0gGN3qPWG5dk8sDNOUVi0VQgXtoit8b9W2qUhWjxlg9lbp3kJ9h6WUV";
    PACK += "l1H7pysU+ZofWsSKEuWpai1o15nkQcTr1LVRrzWIFQv7qDGPLvchc3ca";
    PACK += "7kOWtpFXE5i22T+qVsysaoZ3ZemqgWVfIid1TgFtJLXiu1sC8CqtnwK/";
    PACK += "SWyp1aQBJu/bw+wL3GiTYsCywK6+YDEr2ZGogqo2e83A6bnrbl+2UKPc";
    PACK += "vXS3Sw8cyPnS9cE177k17/cV2KWifzYB2AQ+Ka41ay/7vl+OlEbtttCZ";
    PACK += "JoyQlq4UErTUYVJ/O/lUeQwyjMCFxtRr8iQxhqTQkgUQ4PegeMidqkKW";
    PACK += "0iTxd66ladH4v7OermmrdYkr8DuX5SqF/3cW1TFnI0qui00U/1DSjuNQ";
    PACK += "N5/YT0Jiy+9ITns9r1RRVc11Jr5KZ6llmKWyH4gbqKOXTGNUSWJGFfCA";
    PACK += "zm3NnoMb3FUcNhRx3D2Mkf17rFEusXUphyYuKWZ71mjwJjKymHvmlbQT";
    PACK += "xLRx2r72nekkIBpOvrvrMKXEyZzcH9tWC4V24FuQ1yq6RZq+m/vvGsXr";
    PACK += "ppDXRM1UF9seWw50mwrY0jBIcJ/BsuGh5XTqruRAx41Fl/d0/+I96L23";
    PACK += "yEPmbocSdum3MBXQJELkGslTjQcxCXqxNrVSFw64aRWvnKtEKnwaU/U0";
    PACK += "vq8guzi8fAnxombglQI7O19H8SJniY5n2huCc2dl2EI04Ktx6UyRhRz/";
    PACK += "JUeRFsT+vp5ueE8gQABw65uohZOZxR/uOIzjfu1sdDNpihQBufYPFnVp";
    PACK += "SocOVRSCo0NV2t0r+Wex8vtP0qHID87TqdsxVadW+2yRR/jSDW0wFgdn";
    PACK += "26jdMd9GvZYZf7Cu9QGTEHkZtUmglE4YhiEKAXB5SZvfTmz67dTkvUzl";
    PACK += "LGX2ptIzltKKEqUVycSLmrsMuNcysrNMqgQhz6YV2Gc1mQA2LZED8ANV";
    PACK += "s5yRHDOZRQ1DntSIyt4CnNCjamTO4j3cvIojJ1inb3gsIW1V+uZ2t9Jt";
    PACK += "OZ2CW+e+JimVjb2IVMrXKVL6CZ5dEzrM6MvKKyAdQLT0Mnj1eUT4wifx";
    PACK += "tED2p/AJiLQbaw3VWr0CcW1BRJUg9XT12ieZr0zLGqIfiZ855Zh6JfIs";
    PACK += "viYgc00/xrV2kX8pdsXN4dTwwx7pNojfMOsFV35h/H0UJrpry1UsfpkW";
    PACK += "U4h3e0OSgsmPZpSdw4xEpC60tIsBglqA6mXlRaT0JylFTTDQWQosTAiR";
    PACK += "kxDCuRvebFxJDM078Cr1FCBYgrEXdgq6+niCNYN0wmvAhsDqLyr6lTcd";
    PACK += "nn47O/G/Wm3IKyPB4PXSe1l6VmYVf1Cmr9NPLD8PC6AkX5bcYrHju09+";
    PACK += "u6O/Zg8+eWO0uaz++Bxe39Ff2xx+aiRapFYjSOtu/lbo7iyeoDJ/gtG2";
    PACK += "yQt7bLsPe1B91S8ryzkRgj6Uk2HAzsrJCMT0GvpLI0CEtDwyMmHyBPGQ";
    PACK += "3h36GH015H9ARvlJvx+INHrMD4y2MqE3C/p9PdL10sY+3Oz4omqGkgXL";
    PACK += "w86vwlZRoYzcTlqBmWtE0goQl8u/I5qFecFeJaUXk9EQgtOpghQLCjqN";
    PACK += "SDXjeRoRi/G1o4MWGrrFZ6nEPyM0gT0z9DHzNCmjpGK10XA0U4mReFHk";
    PACK += "Y2A47PyssjqrziLVWe2khjyVi8QLt8npPoyzdZhUG5ZH8+BVRszfALRX";
    PACK += "LAHJ95YFv2WkZJ/L4A3/1/74OiOLsGRltGHBTxn5GBbRPHiR1eRBlzAU";
    PACK += "dqcr5aGbu1HU1S5zUPCjJMGD0SEh6hVva8hPRW8oOo0K/iyneYnxUcDn";
    PACK += "ruRn/Xe2uzOz/ZWcWCMJ3iFGkYcGBVABhhbhECHuCJgLX2YrdWmQZqK8";
    PACK += "O5LgpQeS4G3ygTwvI+VeaubDBW57SFLjArmRGqEXE16UlfZkkw8QVjb5";
    PACK += "AEHByB0IW/Yiyr9kwyArqoVYvDuyCPoG7uiHxbwf9BesmEv2wTm135Pt";
    PACK += "T0GknelPA2praUuGPzWXlux+qt3hzH6qmkFjbLqqaImwGLmNLQYjM/GZ";
    PACK += "ZzECFNjK/R4fJz0+N84+i1aG+i6ypx5x5ducns3NzFRFez1u+OVWDoGs";
    PACK += "zMiappMErdb46SIylORSpPC6zeUgTj4+zifVJANtN+xEP8hoP1ws+kFL";
    PACK += "86IH2ctlLipolLMMEp31A7cL+YFkXJOOH4D+ub0Fk9BMJSHzfV4FxuSU";
    PACK += "32IcUm5+o9LPw5qCdT0joUyFNCSSwD0FO5jSsBb7rFZ3nsaWrdSiK/C3";
    PACK += "79cQ0fbInOwkpJwkt7d8ArT0XM4omPtBZqZUg0bicRXtVA7YkE4bCzLs";
    PACK += "j2opsc6L0kIMzahESBTbEP2CFXNsqg0H7MvTqJAELh7yfAU//oT/GyDK";
    PACK += "EFNzr4KO1qHCcDeWgFSCkqnkpenXEE2iHsVc0y1OGmIgzGIexkpBnmPq";
    PACK += "Wi9BA9V2jhlPQqzSv72NUS4YqaVZWDBITdfAvLx/HCgxv3t4Yjs181aX";
    PACK += "Z9K4mq1TaZy9sXBo1Hb6HVWSoHUK8piarkRuDl6BSBsGME5eA/5Eq+cw";
    PACK += "H8DGW+ClrXdg6BbbHXPx95hCbuBLZx5m1h0Ycx6zMFfYXwUPl6jbzvQs";
    PACK += "tCl28CvjguuMqh/MV+WQVIaTxYZMJuFM/t1uonLSTmQwOXMRraEF4Rvy";
    PACK += "KJfi63Kwcut5uR/0RgdiecrJOfpxi/7sVo1b1QytuNGrnQ9XLvr+6XAL";
    PACK += "9/Za2XBt9ZpWsjb01m3aOMtw2v7kGE27H722NvRAk1ZDabEZykrabjJp";
    PACK += "X6OyjnaLQZ/wIaPTNCPvM3KVkU8ZiTJSZeQmIxcZeZCRbUY+Z+RdRl5m";
    PACK += "5DIj59lMs8zvl8AJG2EXjnJ82z9kwOmgFup6ycKyylmh9U7TGYrK1Jcg";
    PACK += "B6lZrKuqKE4LMtdaT4gUuUqgbNBggWwAaKngxT5GdSIRXQDOUJvKcuW5";
    PACK += "MGkv9lKy8IO9zMi4qAmXuHGzloZZhmmJUY/NVUkp1UIA+HxcUG9OFwOH";
    PACK += "a7QX0/jsFb42wS1qbobBCUVwiltbO0vEivT8WU3M6QYF4c5nAUwr5ALI";
    PACK += "hU8yJON6Q/IuTzdRgXc0jSFS56Bcs4S7qqFcIVTShFCKDjx/nKHL2oCH";
    PACK += "3JzTs4KVH6INS6tSuN8h8zHnkcnx/gccg+KNx3XG9r7WpGCK5V0IZDsH";
    PACK += "35sFUSfnj9WfNPLmfk3ke4Ld6xMuoIzIsXh/JpKCUjsQR8dnDzR+11wU";
    PACK += "/moRAHySrXzedvJx29HYcWh9tXDZXve76Eoe9i745cF+O5lugcKcz0Q8";
    PACK += "wUHfD+b1LzVxTDu4PCHGW2+W3962FNqTsyxE4N40G4CAzzB2EXvboeUV";
    PACK += "NQNxnfHcttSbT+JD7hyxbU2jnbKnC568dXt87G25FsIJE2TUJL2t38Xo";
    PACK += "bvm5NSQxwkhD78nCrDEj+v6KjhZ4jfWl3Ndkz6PrBlux3h3dioC7Mp6m";
    PACK += "IvJkLztFrf2d7SbWr2BnUHKT3SBacLtPMoeE2lsJbORGg5t3Q7eDnCUL";
    PACK += "lotQR4rIvlHSExsCdblnAB0fCDzRWhD0luwaCHpLdoOWbbXHaq3iCRyN";
    PACK += "WBatVRqZYdoODJjMaxWN6AVbFs5dF0FoiQgSxX/pY7bbgrmNxi5Kl7Ml";
    PACK += "O3KjpL43lFK+kuNj74YOfYjiznN0YMMljTMvJityQ3Y+2dCVPOSlnAyV";
    PACK += "qSaKydxTf5MluTkZobPKslbqmaM5Ipm2/bCW1Oe30g7jqddp1RXLXKDo";
    PACK += "6VLywcDe2RFAuwc1Y4iKE7BLUW3kjG71LmYggYnjTW+OGG5Gt2TOweFe";
    PACK += "U4DB9PqNsH6d6xdozU6XjMZWFp7SO7SjZ7tGflRfn9H24Bk5idwUzAVI";
    PACK += "j7TvnudPF7N6bN+vmKx9JUld0OF48Z15NcVjvDg58QUMG18BdxrpBQzq";
    PACK += "vrUQnL9VDiWtyVua4brPlE2bQpdhGc5Iqdihu+3Scn3PME+uv0/NC5bS";
    PACK += "oS/MSqYztfSQDsfhd9LUfxzKBWf0M2hyOMHLH9J4Gs5ISCLQq+JfKREc";
    PACK += "VEMWJwTOiZZhI0WU+STR70qGAJqRSn20yXih0ESsXIyzQZpH8MJJAxHa";
    PACK += "VltM0ideQRstlG600HrfTGoqae41GpD0ZEQy7R11VNU6oVLOG5WYq+mg";
    PACK += "TaAyAhTxbFtCLWDAHgUbbzPgCLjZ1xSCSWtLhJJvVo6Z0/LOMBygnnIi";
    PACK += "ZUCRq+rVyusjZlvaJtwQrwhKDXBMGyIqwGPqPA3N9g+Z1FKr3XIivuXp";
    PACK += "RjorTp7J2sGv8i/dlfooFN7SFZukYCYQYQBcU64peuXaAYx5pMU9o+GQ";
    PACK += "VPqSFCT096F5RUJ5RTLzinDsYOME9F0cc8wA+IBs4b4kZI5kpYIj+I1u";
    PACK += "9PPBAuYiL8xcxTXBe7IVL5cIMEjn9m/irem8cdRrddThdxGqCbcKlitP";
    PACK += "1Sch+FLP6ZaU3hxkaltXN7/POEzNfZJO53gp5xAdgJdZ+kXo4vb2d/fA";
    PACK += "Bch6Lt7BdgprZraFBWQW0EAZa1hMDRD89f9NuNEQMxbbKWEJYqfc45g5";
    PACK += "Gfx7YW13CEJ2tT6OuHkw9R85jouO164rpm5bOlV5G6xPZsxF06cHvdxM";
    PACK += "z24IW92QU8J9yP29fWKla6KLR6dLp4uZc1/3NTnw+ZKVkAhOqSRrAxan";
    PACK += "s7HjdNaUb3AKihkZ+Bbyge1tzSR4wB4pzShQYeMdvAh4kqBVgWZEhtwM";
    PACK += "dkQIIxbI2kCqpZ2UT/AusNzlOJo1vAWPlmcIVERJ7QvBSkRbXOuQbAX9";
    PACK += "nPDZs4OReqDkaw/bLUTL2L4ZMRapyePjynrmI74LdhjhNmFS2rVdVXO7";
    PACK += "qju3q62GlxsbBT43vhA+kWx8H0AUOMQCOICFeRMoVVAu2e+WDsdbTe1t";
    PACK += "obuQxtPtTABQOIgWY6en6W5GQxWq1ZuTHQkH1maQG0gD14R6aHlT+/By";
    PACK += "KHfRvT2X1JpLRlM9F6AP0abPHjv7orF999tAgwDtDccfcxbe1HV3pR6E";
    PACK += "ajs+9g51A3ZqMOc1iEXVAud0OJ5/J3XB4/nJiR8tvYWzudF0PptBPLiR";
    PACK += "NtQTfwwVzvghE1aFZA0OT/fzq/lisvPz0jTJUli67IgRUx4QPJHSDATS";
    PACK += "iE+r1SctkfdUUlyeL9RE4tKQBN/zvYo4ZEeIookgXSP9LFX6WSpqmpOQ";
    PACK += "xn9NSUbDk3gcgRUsKsxDkvG7uB7fMf81PTxEsKZvM+9wHZ+s1R2Gh4Bf";
    PACK += "/Dk9268dvmnuk7lDcx0fzxvU/EJT82ubml/4ZF23ZG+xgw85p9g3YeNd";
    PACK += "9wPuKBpJl/ZEOWDhuSbu41zKx7l0LFfbPdrlaOIhzeWroI2DhRQvtJ7O";
    PACK += "Qtj7mFg6tDSNtQhymardE/FQjlp6GofwuAgz471tZhY65gfqC4mSLcul";
    PACK += "Rs6qZ30h2jwotOyQYJK1ZOb17Ap8VjPhhJ7VWqwScuNCLyNrv4GhUo2h";
    PACK += "6Eial3AMnU7nM7KjERcmkRu6c1ayot6Cbu3t3KL2WtuT9EZkSYeAyW/4";
    PACK += "47WhmTbA2iIJcEXXbhHmnxU0NrmgV+oH9HR+e3uBPA/IEPsYJ0rZqp0r";
    PACK += "U0f8CCGijG9ghTpe0vPj44vJMDif3ASnNxjLZQnhrI6PvaVYJN/pjKwJ";
    PACK += "zscnyx6lQ9nRCmr+lUJMqZ19avrDUlHMIh/zmv9b+yRUwJUJeF2PYyUH";
    PACK += "8dY0O8AIGEKLSv+NKVdClzZPXGN0g0BPDN79DtdT6yrf+0H5R2wbA0+e";
    PACK += "g2Bjss2FeOwiZpBzFisFPIetbox1ZdMfMzQFNmx9le/I7e338FE3/DFr";
    PACK += "tyxWLcAERfvVCbkg4ixhGAkBRgwvf2UwCbhJW09C9s5wXp6nmyxNWFLW";
    PACK += "vmfM4vuOWXDzyv7xsYq2+OAB/xOMEHebj2ncPz6e9nPoe7Bhm7RPxI9l";
    PACK += "mn8K88V1zpb9mY76onvAi5dHeIrGVF4utThpjyo7UK5Y+jeuNgQdIug6";
    PACK += "XoZx/DGc33BKFzMCc53nNJnRbT6oCsbRMDe3nVc5MJjB+yUE0vd9Ms1J";
    PACK += "3KyYDERFWyOpJWrys9ZQgkedp5WuRExeZiRjXAHprgWNCb0I5YltOkin";
    PACK += "2IvAzQBEk2ICaOz8ir5nUmdlg6vW3P8z04/iK69fZGHSJ/t5HBbFm3DD";
    PACK += "gn65PgVUchrNIfRCP8yj8HQdLRYs6Qf9Mq/A8w0abld2O2wE+Wk/RYty";
    PACK += "HTwlawaJeIKvyTZin56nn4P+8Gh49PTo6z5wKHHQF1M/T+M0551mYbnu";
    PACK += "k/0i6F8+5nV/GP7Wh4V2jrhIPyV/3phfHw2PhuunOKaJFDLTHF8HVSyB";
    PACK += "LVfMV587M/aJUAEq6Utu7niUZFXZJ5hZPeij19XH9HOfGAubr2/6RPhj";
    PACK += "BeCw9TE+GI8gZ0s9WOzvweYkRrxdsnyDlCC1umnz20UP6rsH8wFyBdAa";
    PACK += "te9yevV8AUpx+JHF/aD/c/X16MnTn6tvh8Nvf66+fvn1o5+rrx8+fvFz";
    PACK += "9e3Tb77ug90k6jj/rE3M00+uN6y5EPG51e+uZe581k8eXnz7c/X06eNz";
    PACK += "nK9lFggkRDNjC5jE+cRjt7em3MRco4QnUwmcgwudhKp8gNNwRuOmTyHm";
    PACK += "GwNjkA0rw2D/MVzg6vBfskmTNMgH8A+R7hD5QPxFbtRA83SThfMScnnx";
    PACK += "v9yjiDnFlVLDYp/HY3VV3AOYx+0tj78e8Xn4h7AP1ujXJBWkmFBLp37Q";
    PACK += "73M/Eznh4+NU+f/1KO33kbaKYAVAQn1CTKCIKNXPGGZeUW4w7OmgyVWP";
    PACK += "0soYDgM/hh8Lr/rLyP9uxE6/lR/xS55WEF/J94OW0r+OhkP/K/hPrZ0A";
    PACK += "0ySdtK0KDjRKbiavvP7HqiwB6Qqwlj+N7Unz1WkSbtjpxzLpA/zG0fwm";
    PACK += "yAdp8jpKbvDXRB2Tv7c+eDFCuZS9+rVI/dSx2UFbKUS0A+WRwoy/AY8F";
    PACK += "qX2jpSdS8V5fz//zonyfpqUiGBpfMGYpf5qAljMpHXlijTYiiy/z93JX";
    PACK += "F+m8gi70dP6eKbs005y2IGCsBepJuHgQxV2F6by9HQ0xhA3nxd6Bdfs6";
    PACK += "jRcsv73t/1w9eTw6/7n65sXDhxphXTwFVDX65ufq4fDhkz64JvaY8GSH";
    PACK += "G4iW0YXAIa8WBcA/qag3JO+ZIi98bzoDcWE1Hc5ISKvpCMy42uqsaQZ1";
    PACK += "FjSDOvNGnX7fJ1s6hzo7Ooc6N406oE1f0Ruos6Q3UGfTrKMFEkMdGTmv";
    PACK += "gdPZQMtzupmOZmPV7mK5ZPPS9wyAA6kZ3/9L4EdNB+CoBd998PfR9MPs";
    PACK += "+Ni7nH4QIX/I0rsE68RpRCA8J3pN6rlesk1qjShA4R+ZV5LUr8m0hGbk";
    PACK += "mr5cens48SAReeyL4EISY9IxqyCWYCtYEzs1GrH891dmFPyrui0mVUqU";
    PACK += "PZia4yX5oKZ5ObjO4at9tWSpH1yi3bH9LcLyJHXLE8BSg3kq01nqL1AG";
    PACK += "366jxefGSNHis0JaH/A1t93HQiITiopdEeUL0poEbkdag3jp1fv7pXXg";
    PACK += "cKC/Melqc2m51F96H/zg0ohjnzj9oqWtW+j9xnzyG0juSUtmgfOGgRyY";
    PACK += "MZAGhxi8E8WuLDK4EB+a4qbgM35yUt7ZWcv6tU8+01eeQZq/zMMV4C2C";
    PACK += "bIpBzhiYflGecox0Kj7yN6FgYT5f90mm8VQQE9RcBFsVPbXfJ60nsfMu";
    PACK += "ZVwRrv4AX+XWd3hRnsLT3a8JUmrfjI76J1IDddI/+rl68s2T0dHPn59/";
    PACK += "c/Rz9c3zr58rSu7x8OKof3Ld4e9mCNBUN2AV80w4WOW7vUTFP6RF+Wpx";
    PACK += "fOw9o/DKOE+GZ1fzZZL3S3+PvNAb+mziDcmrpWCE3gF5FPveZ/LMD155";
    PACK += "/UW0bay4TNP4Ywh8wWdFF7RWDcvwFFF9vyZvSFsV/Hr6KQ+zI+hY/eI8";
    PACK += "B2/bbCC+AqXX58CB+/gDUn5opS7jHZunqmda5n2yB0IOsEZNLoXlYWE3";
    PACK += "0ZfwQzfBRn41PpuyRvKqsj5o/x9ynVDvVzaRLGQfyIgT71U16R9FxWn/";
    PACK += "5FWFVJyY7wfuvyG5psl1QqEl0O2B9xuTxOft7W9M0nz4Nycij489GO46";
    PACK += "mVwnJ/0jPha25836Pt9KsSEfUPGstvs6UcTTr2xiLqfNxcPzFan0K5sc";
    PACK += "5pqTBNJFkn/EXsvm8uMgH7hINgH/UQ+Z239meNy+H3xJQxBcCOa4/Jgu";
    PACK += "dibMtN+5Seu3LwAoJ2m6C433Bq1+X4OBqGhDA9QpFxwafmNIPh8fe1A6";
    PACK += "X676PrkXhPzK6K9s8is76R9BXwIygr7xg+/eoh1MfmVdJwkMUftxBGLb";
    PACK += "JG7HvudpfJWFSXAhzoHYiIdtsnLHce2TJ08f/lw9+fpiCP/9Bv776MlF";
    PACK += "34f/kQ68ZSTOqTvROVB0p1GyTPk43zx/eH7UP/Gu70rMcDLyT/pHXx31";
    PACK += "T4xsHNdOngIfkTly7h0PCnAu0KeQuihWx6gCEidgbI6KjXzuZLVFVAB+";
    PACK += "XAS965YME5yVx9tsUIbXVm4HyLfncvGPL4bP8L9DKXXQciYuURo9liKl";
    PACK += "0WNbpvTw8dHDx1KqlKQJ65OizNMb5siYROk/sbuHjsRpM/r6aPT09Mnp";
    PACK += "k6Mnp09Q6IQzEHKkthMsot9YXzz4goq7visTQTsxcG3lexEMsUMftGza";
    PACK += "k+fnL/l28debg2m/JtPRkDwckq+HZDQczg4gFS6yl4jFXsulX5PLkz7v";
    PACK += "+isJUgLJ/WGgkZlFugAmUd9bgeX5/7/A8u3R6CnAyamEFUA5KIgpgdlS";
    PACK += "TPC/MiN2k5DUtFFQJbfHkXE6MEpHOWUzztDjn4McmPUq2fBrLmiszN/X";
    PACK += "Ii4T1kKyDQKdJyz/4cPla9rvGzVxihHNkfWuaIxPQAEs3aUkzoC990EY";
    PACK += "o9YQot5vn2F6nMwnoEKqqG0PDVw1WftgFMN1AN4r7+8ZIlvpDpAQZAEj";
    PACK += "zc9W6lqQBscfVE0pANF8fVCZTL7B4KsP+Is0GJSgajItxKRe1cD8J7wj";
    PACK += "uLF0zxcWhAQOIihqEkIaJL82pSNhGXJL7j0eU/CvDNyboFhDtzAsxF6P";
    PACK += "j8XZ8k1D41UizviZKefz9yYDn5YtHDy7E1hKB1ggndnYlQud/+P6w7Pn";
    PACK += "ry+un799+8HWe7XX8fwx6K7G/+f/A5v/llJ/2QMA";
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
                lastAppHomeHead: "",
                lastDeductionHead: "",
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
                snap.lastAppHomeLen = String(lastAppHomePayload || "").length;
                snap.lastDeductionLen = String(lastDeductionPayload || "").length;
                snap.lastAppHomeHead = String(lastAppHomePayload || "").slice(0, 500);
                snap.lastDeductionHead = String(lastDeductionPayload || "").slice(0, 500);
            } catch (e4) { }
            try {
                var pw = parentWin();
                snap.parentWinHref = safeHref(pw);
                snap.hasJQuery = !!(pw && (pw.jQuery || pw.$) && (pw.jQuery || pw.$).ajax);
                var doc = pw.document;
                snap.clicks = {
                    app: !!findClickAnywhere("应用"),
                    party: !!findClickAnywhere("党费"),
                    deductionMenu: !!findClickAnywhere("扣分项台账")
                };
                snap.sessionHref = sessionWin ? safeHref(sessionWin) : "";
                var fetchFrame = hostWin().document.getElementById("cq-fetch-frame");
                snap.fetchFrameSrc = fetchFrame ? String(fetchFrame.src || "") : "";
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
            { key: "parentName", label: "上级名称", sortable: true }
        ];
        var ORG_DIALOG_COLUMNS = [
            { key: "_idx", label: "序号", sortable: true },
            { key: "name", label: "组织名称", sortable: true, link: true },
            { key: "status", label: "数据状态", sortable: true, badge: true },
            { key: "parentName", label: "上级名称", sortable: true }
        ];

        function mapOrgRows(rows) {
            return rows.map(function (r, idx) {
                return {
                    id: r.id,
                    name: r.name,
                    status: r.status,
                    parentName: r.parentName,
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
            if (tabId === "org") renderOrgView();
            if (tabId === "deduction" && !deductionLoading && !deductionReady) {
                loadDeductionFromCq();
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
            TABLE_DEFS.quarterly.rows = [];
            TABLE_DEFS.annual.rows = [];
            TABLE_DEFS.config.rows = [];
            TABLE_DEFS.partyQuarterly.rows = [];
            for (var i = 0; i < 8; i++) TABLE_DEFS.quarterly.rows.push(randQuarterlyRow());
            for (var j = 0; j < 6; j++) TABLE_DEFS.annual.rows.push(randAnnualRow());
            for (var k = 0; k < 5; k++) TABLE_DEFS.config.rows.push(randConfigRow());
            for (var p = 0; p < 10; p++) TABLE_DEFS.partyQuarterly.rows.push(randPartyQuarterlyRow());
            ["quarterly", "annual", "config", "partyQuarterly"].forEach(refreshDataTable);
        }
        var alertTimer = 0;
        var alertLeaveTimer = 0;
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
            if (alertTimer) { clearTimeout(alertTimer); alertTimer = 0; }
            if (alertLeaveTimer) { clearTimeout(alertLeaveTimer); alertLeaveTimer = 0; }
            host.innerHTML = "";
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
            alertTimer = setTimeout(function () {
                el.classList.add("is-leaving");
                alertLeaveTimer = setTimeout(function () {
                    if (el.parentNode) el.parentNode.removeChild(el);
                    alertTimer = 0;
                    alertLeaveTimer = 0;
                }, 250);
            }, 5000);
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

        // 扣分项台账：selectTab(应用) → gotoapp(党费) → treeMenuClick → loadData。签名走父页 ajax。
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
        var deductionLoading = false;
        var deductionReady = false;
        var STATUS_TEXT = { A: "暂存", B: "已提交", C: "已审核" };
        var PERIOD_TEXT = { "1": "一季度", "2": "二季度", "3": "三季度", "4": "四季度", "5": "年度" };
        var watchedTenantPageId = "";
        var sessionWin = null;
        var cqDisposed = false;
        var fetchFrameTimer = 0;
        var onCqKeydown = null;

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
            } catch (e2) { }
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
            lastDeductionPayload = "";
            lastAppHomePayload = "";
            if (alertTimer) { clearTimeout(alertTimer); alertTimer = 0; }
            if (alertLeaveTimer) { clearTimeout(alertLeaveTimer); alertLeaveTimer = 0; }
            if (fetchFrameTimer) { clearTimeout(fetchFrameTimer); fetchFrameTimer = 0; }
            try { if (window.__cqDataTable && window.__cqDataTable.unmountAll) window.__cqDataTable.unmountAll(); } catch (e0) { }
            walkWindows(unhookFetchOn);
            sessionWin = null;
            removeFetchFrames();
            try { if (onCqKeydown) document.removeEventListener("keydown", onCqKeydown); } catch (e1) { }
            removeBundleScripts();
            try { window.__cqFetchDeduction = null; } catch (e2) { }
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
            if (sessionWin) {
                try { if (sessionWin.document) return sessionWin; } catch (e0) { }
            }
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
        function openFetchFrame() {
            return new Promise(function (resolve, reject) {
                if (cqDisposed) return reject(new Error("aborted"));
                removeFetchFrames();
                var iframe = document.createElement("iframe");
                iframe.id = "cq-fetch-frame";
                iframe.setAttribute("data-cq-fetch", "1");
                iframe.title = "cq-fetch";
                iframe.setAttribute("style", "position:fixed;left:0;top:0;width:1400px;height:900px;opacity:0;pointer-events:none;border:0;z-index:1;");
                var url = consoleHomeUrl();
                iframe.src = url;
                var settled = false;
                var startedWait = false;
                fetchFrameTimer = setTimeout(function () {
                    if (settled || cqDisposed) return;
                    settled = true;
                    reject(new Error("主控台 iframe 加载超时 " + url));
                }, 30000);
                iframe.onload = function () {
                    if (startedWait || settled || cqDisposed) return;
                    startedWait = true;
                    try { sessionWin = iframe.contentWindow; } catch (e) { }
                    hookParentForTenant();
                    waitFor(function () {
                        return findClickAnywhere("党费") || findClickAnywhere("应用");
                    }, 22000, 400, "主控台 iframe 中等待「应用/党费」").then(function (hit) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(fetchFrameTimer);
                        fetchFrameTimer = 0;
                        resolve(hit && hit.win ? hit.win : sessionWin);
                    }, function (err) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(fetchFrameTimer);
                        fetchFrameTimer = 0;
                        reject(err);
                    });
                };
                (pageDoc().body || pageDoc().documentElement).appendChild(iframe);
            });
        }
        function ensureSessionWin() {
            if (cqDisposed) return Promise.reject(new Error("aborted"));
            var existing = findClickAnywhere("党费") || findClickAnywhere("应用");
            var reuse = false;
            if (existing && existing.win) {
                var fromFetch = isFetchFrameWin(existing.win);
                try { if (!fromFetch && existing.win.top) fromFetch = isFetchFrameWin(existing.win.top); } catch (e0) { }
                reuse = !fromFetch;
            }
            if (reuse) {
                try { sessionWin = existing.win.top; } catch (e1) { sessionWin = existing.win; }
                clog("已有应用入口", safeHref(sessionWin));
                return Promise.resolve(sessionWin);
            }
            clog("打开隐藏主控台 iframe", consoleHomeUrl());
            return openFetchFrame();
        }
        var lastDeductionPayload = "";
        var lastAppHomePayload = "";
        function hookFetchOn(win) {
            if (!win || cqDisposed) return;
            if (win.__cqTenantHooked) return;
            if (typeof win.fetch !== "function") return;
            var orig = win.fetch.bind(win);
            win.__cqOrigFetch = orig;
            win.__cqTenantHooked = true;
            win.fetch = function (input, init) {
                if (cqDisposed) return orig(input, init);
                var url = typeof input === "string" ? input : (input && input.url);
                noteTenantFromUrl(url, init && init.body);
                return orig(input, init).then(function (res) {
                    if (cqDisposed) return res;
                    try {
                        var u = String(url || "");
                        if (u.indexOf("crrc_deduction_log") >= 0 && u.indexOf("ac=loadData") >= 0) {
                            res.clone().text().then(function (text) {
                                if (cqDisposed) return;
                                if (text && !hasTimeoutText(text)) lastDeductionPayload = text;
                            }).catch(function () { });
                        }
                        if (u.indexOf("crrc_party_dues_apphome") >= 0 && u.indexOf("ac=loadData") >= 0) {
                            res.clone().text().then(function (text) {
                                if (cqDisposed) return;
                                if (text && !hasTimeoutText(text)) lastAppHomePayload = text;
                            }).catch(function () { });
                        }
                    } catch (e) { }
                    return res;
                });
            };
        }
        function hookParentForTenant() {
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 6) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                try { hookFetchOn(win); } catch (e) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e2) { }
            }
            walk(parentWin(), 0);
            walk(hostWin(), 0);
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
        function cqInvoke(appId, formId, action, pageId, params) {
            var origin = cqOrigin();
            var url = origin + "/ierp/form/batchInvokeAction.do?appId=" + encodeURIComponent(appId)
                + "&f=" + encodeURIComponent(formId) + "&ac=" + encodeURIComponent(action);
            var payload = {
                pageId: pageId,
                appId: appId,
                params: JSON.stringify(params)
            };
            var jq = null;
            try { jq = parentWin().jQuery || parentWin().$; } catch (e) { }
            return new Promise(function (resolve, reject) {
                if (jq && typeof jq.ajax === "function") {
                    jq.ajax({
                        url: url,
                        type: "POST",
                        data: payload,
                        xhrFields: { withCredentials: true },
                        headers: { ajax: "true", cqappid: appId },
                        success: function (data) {
                            var s = "";
                            try { s = typeof data === "string" ? data : JSON.stringify(data); } catch (e) { s = String(data); }
                            if (hasTimeoutText(s)) reject(new Error("表单会话超时"));
                            else resolve(data);
                        },
                        error: function (xhr, status, err) {
                            var body = xhr && xhr.responseText ? String(xhr.responseText).slice(0, 400) : "";
                            reject(new Error((status || "ajax") + " " + (err || "") + " " + body));
                        }
                    });
                    return;
                }
                var body = "pageId=" + encodeURIComponent(pageId)
                    + "&appId=" + encodeURIComponent(appId)
                    + "&params=" + encodeURIComponent(JSON.stringify(params));
                parentWin().fetch(url, {
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
                }).then(resolve, reject);
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
            if (key === "crrc_radiooptgroupfield" || key.indexOf("radioopt") >= 0) {
                var pd = String(cqCell(raw));
                return PERIOD_TEXT[pd] || pd;
            }
            if (key === "crrc_datefield" || key.indexOf("datefield") >= 0) {
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
            return v == null ? "" : v;
        }
        function collectDeductionCaptions(payload, pack) {
            var map = {};
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var di = obj.dataindex != null ? obj.dataindex : (obj.dataIndex != null ? obj.dataIndex : obj.fieldId);
                var cap = obj.caption != null ? obj.caption : (obj.title != null ? obj.title : obj.header);
                if (typeof di === "string" && di && typeof cap === "string" && cap) {
                    if (!map[di]) map[di] = cap;
                }
            }, 0, []);
            var packCols = pack && (pack.columns || pack.cols || pack.columnMetas);
            if (Array.isArray(packCols)) {
                for (var i = 0; i < packCols.length; i++) {
                    var col = packCols[i];
                    if (!col || typeof col !== "object") continue;
                    var cdi = col.dataindex || col.dataIndex || col.fieldId;
                    var ccap = col.caption || col.title || col.header;
                    if (typeof cdi === "string" && cdi && typeof ccap === "string" && ccap) map[cdi] = ccap;
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
                return { key: key, label: label, sortable: true, numeric: numeric, badge: badge, compact: compact };
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
            hookParentForTenant();
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureSessionWin();
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookParentForTenant();
                var consolePageId = findConsolePageId();
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    sessionHref: safeHref(sessionWin || parentWin())
                });
                clog("扣分项 consolePageId", consolePageId, "suffix", suffix, "session", safeHref(sessionWin || parentWin()));
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_DEDUCTION.menuAppId + suffix;
                var listPageId = CQ_DEDUCTION.menuItemId + suffix;
                lastDeductionPayload = "";
                lastAppHomePayload = "";
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
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
                            CQ_DEDUCTION.dataAppId,
                            CQ_DEDUCTION.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                return Promise.resolve().then(function () {
                    var alreadyParty = findClickAnywhere("党费");
                    var appHit = findClickAnywhere("应用", ".kd-cq-homepage-tab-item-text") || findClickAnywhere("应用");
                    step("before-click-app", { alreadyParty: !!alreadyParty, hasApp: !!appHit });
                    if (alreadyParty) return;
                    if (appHit) {
                        clog("点击应用");
                        fireParentClick(appHit.el, appHit.win);
                    }
                }).then(function () {
                    return waitFor(function () { return findClickAnywhere("党费"); }, 15000, 250, "等待出现「党费」入口");
                }).then(function (partyHit) {
                    clog("点击党费");
                    step("click-party", { ok: !!(partyHit && partyHit.el) });
                    fireParentClick(partyHit.el, partyHit.win);
                    return waitFor(function () { return lastAppHomePayload; }, 15000, 250, "等待党费首页 loadData").catch(function () {
                        clog("未捕获到党费首页 loadData，仍继续");
                        step("app-home-payload-miss", { lastAppHomeLen: String(lastAppHomePayload || "").length });
                        return new Promise(function (resolve) { setTimeout(resolve, 1500); });
                    });
                }).then(function () {
                    return new Promise(function (resolve) { setTimeout(resolve, 400); });
                }).then(function () {
                    var menuHit = findClickAnywhere("扣分项台账");
                    step("find-menu", { hasMenu: !!(menuHit && menuHit.el) });
                    if (menuHit) {
                        clog("点击扣分项台账");
                        fireParentClick(menuHit.el, menuHit.win);
                        return waitFor(function () { return lastDeductionPayload; }, 15000, 250, "等待扣分项 loadData").catch(function () {
                            clog("点击后未捕获列表 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return [];
                    var data = parseMaybeJson(lastDeductionPayload || res);
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
        try { parentWin().__cqFetchDeduction = loadDeductionFromCq; } catch (e) { }
        try { window.__cqDisposeOverlay = disposeCqResources; } catch (eDisp) { }

        // ---------- 党组织：树 + 表（布局对齐官方选择器，样式走当前 shadcn 主题） ----------
        var orgState = {
            activeId: "crrc-dw",
            expanded: { all: true, "crrc-dw": true },
            includeSelf: false,
            selected: {},
            page: 1,
            pageSize: 100
        };
        var orgViewState = {
            activeId: "crrc-dw",
            expanded: { all: true, "crrc-dw": true }
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
                rows.push({
                    id: node.id,
                    name: node.name,
                    status: node.status || "已审核",
                    parentName: p && p.id !== "all" ? p.name : ""
                });
            }
            (node.children || []).forEach(function (c) {
                rows.push({
                    id: c.id,
                    name: c.name,
                    status: c.status || "已审核",
                    parentName: node.id === "all" ? "" : node.name
                });
            });
            return rows;
        }
        function orgViewTableSource() {
            var meta = findOrgMeta(orgViewState.activeId);
            var node = meta ? meta.node : ORG_TREE;
            var rows = [];
            (node.children || []).forEach(function (c) {
                rows.push({
                    id: c.id,
                    name: c.name,
                    status: c.status || "已审核",
                    parentName: node.id === "all" ? "" : node.name
                });
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
            orgState.activeId = "crrc-dw";
            orgState.expanded = { all: true, "crrc-dw": true };
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
