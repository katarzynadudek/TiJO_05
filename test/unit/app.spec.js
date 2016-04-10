describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function () {
        it('should return number of vowel and false ', function(){
            expect(app.generateMessage("text")).toEqual({vowel: 1, palindrome: false});
        });
        it('should return number of vowel and true', function(){
            expect(app.generateMessage("kajak")).toEqual({vowel: 2, palindrome: true});
        });
        var text1 = app.generateMessage("kobylamamalybok");
        it('should return number of vowel and true ', function(){
            expect(text1.vowel).toEqual(7);
            expect(text1.palindrome).toEqual(true);
        });
        it('should throw exception', function () {
            expect(function () {
                app.generateMessage("");
            }).toThrow(new Error('Empty string!'));
        });


    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome');
                app.isPalindrome('ala');
            });
            it('should call isPalindrome function', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('ala');
            });

        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
                app.generateMessage('ala');
            });
            it('should call isPalindrome function when generateMessage is call', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('ala');
            });
        });

        describe('and.returnValue', function () {
            var text1;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.returnValue(true);
            });
            it('should call isPalindrome and return true', function () {
                text1 = app.isPalindrome('ala');
                expect(text1).toBe(true);
            });
            it('should call generateMessage and isPalindrome should return true', function () {
                text1 = app.generateMessage('ala');
                expect(text1).toEqual({vowel: 2, palindrome: true});
            });
        });

        describe('and.callFake', function () {
            var text1;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callFake(function (str) {
                    var strTemp = str.toLowerCase(),
                        strLength = strTemp.length;
                    if (str === '') {
                        return true;
                    }
                    var halfLength = (strLength % 2 === 0) ? (strLength / 2) : ((strLength - 1) / 2);
                    for (var i = 0; i < halfLength; i++) {
                        if (strTemp[i] !== strTemp.slice(-1 - i)[0]) {
                            return true;
                        }
                    }
                    return false;
                });
            });
            it('should call isPalindrome fake function', function () {
                text1 = app.isPalindrome('ala');
                expect(text1).toBe(false);
            });
            it('should call generateMessage and isPalindom fake function', function () {
                text1 = app.generateMessage('ala');
                expect(text1).toEqual({vowel: 2, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var text1;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
            });
            it('should notice that isPalindrome is call', function () {
                text1 = app.isPalindrome('ala');
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
            it('should notice that isPalindrome is call when generateMessage is call', function () {
                text1 = app.generateMessage('ala');
                expect(app.isPalindrome.calls.count()).toEqual(2);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount');
                app.vowelCount('asdf');
            });
            it('should call vowelCount function', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('asdf');
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
                app.generateMessage('asdf');
            });
            it('should call vowelCount function when generateMessage is call', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('asdf');
            });
        });

        describe('and.returnValue', function () {
            var text1;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.returnValue(4);
            });
            it('should call vowelCount and return 4', function () {
                text1 = app.vowelCount('asdf');
                expect(text1).toBe(4);
            });
            it('should call generateMessage and vowelCount should return 4', function () {
                text1 = app.generateMessage('asdf');
                expect(text1).toEqual({vowel: 4, palindrome: false});
            });
        });

        describe('and.callFake', function () {
            var text1;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callFake(function (str) {
                    var vowelList = 'aeiouyAEIOUY',
                        vovCount = 0;
                    for (var i = 0, strLength = str.length; i < strLength; i++) {
                        if (vowelList.indexOf(str[i]) !== -1) {
                            vovCount=vovCount+2;
                        }
                    }
                    return vovCount;
                });
            });
            it('should call vowelCount fake function', function () {
                text1 = app.vowelCount('asdf');
                expect(text1).toBe(2);
            });
            it('should call generateMessage and vowelCount fake function', function () {
                text1 = app.generateMessage('asdf');
                expect(text1).toEqual({vowel: 2, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var text1;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
            });
            it('should notice that vowelCounte is call', function () {
                text1 = app.vowelCount('asdf');
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice that vowelCount is call when generateMessage is call', function () {
                text1 = app.generateMessage('asdf');
                expect(app.vowelCount.calls.count()).toEqual(2);
            });
        });
    });
});

