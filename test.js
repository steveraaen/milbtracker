var test = [
 { yr: '2010',
    age: '20',
    franchise: 'SFG',
    classes: 'A+',
    playerID: 'adriaeh01' },
  { yr: '2011',
    age: '21',
    franchise: 'SFG',
    classes: 'A+,A',
    playerID: 'adriaeh01' },
  { yr: '2012',
    age: '22',
    franchise: 'SFG',
    classes: 'AA',
    playerID: 'adriaeh01' },
  { yr: '2013',
    age: '23',
    franchise: 'SFG',
    classes: 'AA,AAA',
    playerID: 'adriaeh01' },
  { yr: '2014',
    age: '24',
    franchise: 'SFG',
    classes: 'AAA',
    playerID: 'adriaeh01' }
    ];
var arr = []
for(let i = 0; i < test.length; i++) {
    test[i].classes = test[i].classes.split(',')
}

for(let i = 0; i < test.length; i++) {

    for(let j = 0; j < test[i].classes.length; j++) {
        var obj = {}
        obj.yr = test[i].yr
        obj.age = test[i].age
        obj.franchise = test[i].franchise
        obj.class = test[i].classes[j]
        obj.playerID = test[i].playerID
        arr.push(obj)

    }
}
console.log(arr)