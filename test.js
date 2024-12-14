// 解析URL，实现一个函数parseUrl使，
// parseUrl('https://www.meituan.com/index.html?a=test&b=2.1')
// 返回 {a:'test', b: 2.1}

import { fromCodePoint } from "core-js/core/string";
import { asyncIterator } from "core-js/fn/symbol";
import { Linter } from "eslint";
import { read } from "fs";
import { stdin } from "process";
import { readonly } from "vue";



function parseUrl(url) {
    let str = url.substr(url.indexOf('?')+1);   
    let dataSet = str.split('&');
    let result = {};
    dataSet.forEach(element => {
        let keyValuePair = element.split('=');
        if(Number.isNaN(parseFloat(keyValuePair[1]))){
            result[keyValuePair[0]] = keyValuePair[1];
        }else{
            result[keyValuePair[0]] = parseFloat(keyValuePair[1]);
        }
        
    });
    return result;
}
// function SearchResult(min,max,input,diff){
//     let tmp = (max + min)/2;
//     if(tmp * tmp === input || max - min < diff){return tmp}
//     else if (tmp * tmp >= input) {return SearchResult(min,tmp,input,diff)}
//     else if (tmp * tmp <= input) {return SearchResult(tmp,max,input,diff)}
// }
// function sqrt(num){
//     if (num < 0) return NaN;
//     if (num === 1 || num === 0) return 1;
//     let result = SearchResult(0,num,num,diff);
//     return result;
// }

function sqrt(num) {
    if(num === 0 || num === 1){return num};
    if(num < 0){return NaN};
    let min = 0;
    let max = num;
    let mid;
    let diff =  0.00001;
    while(max - min > diff){
        mid = (max + min ) / 2;
        if((mid * mid) - num < diff) return mid;
        if(mid * mid < num){ 
            min = mid;
        }else{
            max = mid;
            };
    }
    return mid;
}

function hw(num){
    let str = num.toString();
    if(str.length() === 1){return true};
    const isOdd = str.length() % 2;
    
    let a,b;
    if(!isOdd){
        a = str.substr(0,str.length()/2);
        b = str.substr(length()/2);    
    }else{
        a = str.substr(0,(str.length()-0.5)/2);
        b = str.substr((length()+0.5)/2);
    }
    for(let i = b.length()-1, j = 0; i >= 0; i--, j++){
        revert_b[j] = b[i];
        //如果javascript不允许那就 revert_b.push(b[i]);
    };
    if(a === revert_b){
        return true;
    }else{return false};
}


// parseUrl('https://www.meituan.com/index.html?a=test&b=2.1')
// 返回 {a:'test', b: 2.1}

function parseUrl(url) {
    let info = url.split('?');
    let data = info[1].split('&');
    let result = {};
    data.forEach(el => {
        const keyValuePair = el.split('=');;
        if (isNaN(parseFloat(keyValuePair[1]))) {
            result[keyValuePair[0]] = keyValuePair[1];
        }else{
            result[keyValuePair[0]] = parseFloat(keyValuePair[1]);
        }
         
    })
    return result;
}

function hw1(num){
    let str = num.toString();
    const length = str.length;
    if(str[0] === '-'){return false;};
    if(length === 1){return true};
    for(let i = 0,j = length-1; j > i; i++, j--){
        if(str[i] !== str[j]){return false;};
    }
    return true;
}

function hw2(num){
    let str = num.toString();
    const length = str.length;
    if(str[0] === '-'){return false;};
    if(length === 1){return true};
    let half_length = Math.floor(length/2);
    let isodd = length % 2;
    let front = str.substr(0,half_length);
    let back = str.substr(half_length + isodd,half_length)
    let newBack = {};
    for(let i = 0,j = half_length-1; j >= 0; i++, j--){
        newBack[i] = back[j];
    }
    if(front !== newBack){return false;};
    return true;
}

function hw3(num){
    let str = num.toString();
    const length = str.length;
    if(str[0] === '-'){return false;};
    if(length === 1){return true};
    let callback_num = 0;
    while (new_num !== 0) {
        callback_num * 10;
        callback_num= callback_num+ (num % 10);
        new_num = Math.floor(num/10); 
    }
    if(num === callback_num){return true;};
    return false;
}

function recursion(num){
    if(num < 1){return 1;}
    return num * recursion(num-1);
}

function binarySearch(arr, tar){
    if (!(arr instanceof Array)) {
        throw new Error('Expected an array!');
      }
    if(arr.length === 0){
        return -1;
    }
    const length = arr.length;
    let max = length - 1
    let min = 0
    while(min <= max){
    const mid = Math.floor((min + max)/2)
    if(arr[mid] === tar) return mid;
    if(arr[mid] < tar){
        min = mid + 1;
    }else{
        max = mid - 1;
    }
}
return -1; 
}


 void async function parseStr(){
    const num = await readline();
    const data = await readline();
    const arr = data.split('-');
    const withOutHeader = arr.slice(1).join('');
    let newArr = [];  
    const quantity = Math.ceil(withOutHeader.length/num);
    for(let i = 0, j = 0; j < quantity ;i += 3, j++ ){
        newArr[j] = withOutHeader.slice(i,i+3);
        let acount = newArr[j].match(/[a-z]/g || []).length;
        let Acount = newArr[j].match(/[A-Z]/g || []).length;
        if(acount < Acount){ newArr[j] = newArr[j].toUpperCase()}
        else if (acount > Acount){newArr[j] = newArr[j].toLowerCase()}
    }
    const result = arr[0] + '-' + newArr.join('-')
}


 void async function shootRace(){
    const num = await readline();
    const id = await readline();
    const score = await readline();
    const scoreMap = new Map();
    const idArr = id.trim().split(',').map(Number);
    const scoreArr = score.trim().split(',').map(Number);
    for(let i = 0; i < num; i++){
        let currentScore = scoreMap.get(idArr[i]) || [];
        currentScore.push(scoreArr[i])
        scoreMap.set(idArr[i], currentScore);
    }
    for(let [id,score] of scoreMap){
        if(score.length < 3) {
            scoreMap.delete(id)
        } else{
            score = score.reduce((acc, curr) => {return acc + curr})
            scoreMap.set(id, score)
        }
    }
    const isSorted = Array.from(scoreMap).sort((a,b) => {
        if (b[1] !== a[1]) {
            return b[1] - a[1]; 
          }
          return b[0] - a[0]; 
    })
    let rank = [];
    for(let i = 0; i < isSorted.length; i++){
        rank.push(isSorted[i][0]);
    }
    const result = rank.join(',')
    return result
}

 void async function childstr(){
    const child = await readline();
    const father = await readline();
    let a_array = child.trim().split('');
    let b_array = father.trim().split('');
    for(let i = 0; i < b_array.length; i++){
        if(b_array[i] === a_array[0]){
            a_array.shift();
            if(a_array.length === 0) break;
        }
    }
    if(a_array.length === 0){console.log('true')}else{console.log('false')}
}

 void async function dataDivided(){
    const input = await readline();
    const getData = input.trim().split(' ');
    const c = getData[0];
    const b = getData[1];
    const data = getData.slice(2);
    const catagoryMap = new Map();
    for(let i = 0; i < data.length; i++){
        let toByte = [];
        for(let j = 3; j >= 0; j--){
            const num = (data[i] >> (j * 8)) & 0xFF;
            toByte.push(num);
        }
        const sum = toByte.reduce((acc, curr) => {return acc + curr});
        const catagoryId = sum % b;
        if(catagory < c){
            const number = catagoryMap.get(catagoryId) || 0;
            catagoryMap.set(catagoryId, number);
        }
    }
    const arr = [];
    for(let [id,num] of catagoryMap){
        arr[id] = num;
    }
    const result = Math.max(arr);
    console.log(result)
}

 void async function dataDivided(){
    const input = await readline();
    const getData = input.trim().split(' ');
    const c = getData[0];
    const b = getData[1];
    const data = getData.slice(2);
    const catagoryArr = Array(c).fill(0);
    for(let i = 0; i < data.length; i++){
        let toByte = [];
        for(let j = 3; j >= 0; j--){
            const num = (data[i] >> (j * 8)) & 0xFF;
            toByte.push(num);
        }
        const sum = toByte.reduce((acc, curr) => {return acc + curr});
        const catagoryId = sum % b;
        if(catagory < c){
            catagoryArr[catagoryId]++;
        }
    }
    const result = Math.max(catagoryArr);
    console.log(result)
}

 void async function keyOutPut(){
    const cmd = await readline();
    function print(screen){ 
        selected = ''
        screen += 'a'
        return [selected,screen];
    };
    function copy(selected,clipBoard){
        if(selected === '') return clipBoard;
        clipBoard = selected;
        return clipBoard;
    };
    function clip(selected,clipBoard){
        if(selected === '') return [screen, selected, clipBoard];
        clipBoard = selected;
        screen = '';
        selected = '';
        return [screen, selected, clipBoard];
    };
    function paste(clipBoard,screen){
        screen += clipBoard;
        selected = '';
        return [selected,screen];
    };
    function selectAll(screen, selected){
        selected = screen;
        return selected;
    };
    const input = await readline();
    //有五个指令分别是：
    //1: a  在屏幕上输出一个字母 a
    //2: ctrl + c 将当前选择的字母复制到剪贴板
    //3: ctrl + x 将当前选择的 字母复制到剪贴板，并清空选择的字母
    //4: ctrl + v 将当前剪贴板里的字母输出到屏幕
    //5: ctrl + a 选择当前屏幕上所有字母

    //接下来用户输入一串数字比如 12345 我们要输出最终屏幕上的字符数量
    let clipBoard = '';
    let screen = '';
    let selected = '';
    for(let i = 0; i < cmd.length; i++){
        if(cmd[i] === '1'){ [selected,screen] = print(screen)}
        if(cmd[i] === '2'){ clipBoard = copy(selected,clipBoard)}
        if(cmd[i] === '3'){ [screen,selected, clipBoard] = clip(selected,clipBoard)}
        if(cmd[i] === '4'){ [selected, screen] = paste(clipBoard,screen)}
        if(cmd[i] === '5'){ selected = selectAll(screen, selected)}
    }
    console.log(screen.length)
}
const rl = require("readline").createInterface({input: process.stdin});
const iter = rl[Symbol.asyncIterator]();
const readline = async() => (await iter.next).value;

void async function slideWindow(){
    const num = await readline();
    const result = [];
    while(line = await readline()){

        const arr = line.trim().split(' ');
        let isAbsent = false;
        let isLate = false;
        let another_count = 0;
        const size = 7;
        let start = 0;
        for(let i = 0; i < arr.length; i++){
            if(i - start >= size){
                if(arr[start] !== 'present'){
                    another_count--;
                }
                start++;
                
            }
            if(arr[i] === 'absent'){
                if(isAbsent){
                    result.push('false')
                    break;
                }
                isAbsent = true;
                isLate = false;
                another_count++;
            }
            if(arr[i] === 'late' || arr[i] === 'leaveearly'){
                if(isLate){
                    result.push('false')
                    break;
                }
                isLate = true;
                another_count++;
            }
            if(arr[i] === 'present'){
                isLate = false;
            }
        } 
        if (another_count > 3){
            result.push('false');
            break;
        }else{
            result.push('true');
        }

    }
    console.log(result.join(' '));    
}

void async function secretCode(){
    const num = parseInt(await readline());
    function secretCode(length){
        if(length === 1) return [1];
        if(length === 2) return [1,2];
        if(length === 3) return [1,2,4];
        const secretCodeList = Array(length).fill(0);
            secretCodeList[0] = 1;
            secretCodeList[1] = 2;
            secretCodeList[2] = 4;
        for(let i = 3; i < length; i++){
            secretCodeList[i] = secretCodeList[i-1] + secretCodeList[i-2] + secretCodeList[i-3]
        }
        return secretCodeList;
    }
    while(line = await readline()){
        const length = line.length;
        const secretCodeList = secretCode(length);
        const data = line.split('').map((char,id) => {
            return String.fromCharCode(char.charCodeAt(0) + secretCodeList[id]);
        });
        console.log(data.join(''))
}
}


void async function minsum(){
    const input = await readline();
    let integerSet = input.match(/-?\d+/g);
    result = [];
    for(let i = 0; i < integerSet.length; i++){
        if(integerSet[i][0] !== '-'){
            result.push(...integerSet[i].split(''))
        }
            result.push(integerSet[i]);
    }
    const ans = result.map(Number).reduce((acc, curr) => {return acc + curr});
    console.log(ans)
}

void async function snake(){
    const action = await readline().split(' ');
    const mapSize = (await readline()).split(' ');
    const [row,column] = [mapSize[0],mapSize[1]].map(Number);
    const grid = [];
    let body = [];
    for(let i = 0; i < row; i++){
        grid[i] = (await readline()).split(' ');
        const hIndex = grid[i].indexOf('H');
        if (hIndex !== -1) {
            body[0] = [i, hIndex];
        }
    }
    let direction = 'L';
    let length = 1;
    let next = [body[0][0],body[0][1]];
    for(let i = 0; i < action.length; i++){
        if(action[i] === 'U'){direction = 'U'}
        if(action[i] === 'D'){direction = 'D'}
        if(action[i] === 'L'){direction = 'L'}
        if(action[i] === 'R'){direction = 'R'}
        if(action[i] === 'G'){ 
            if(direction === 'U'){
                next[0] -= 1;
                if(next[0] < 0) return length;
            }
            if(direction === 'D'){
                next[0] += 1;
                if(next[0] >= grid.length) return length;
            }
            if(direction === 'L'){
                next[1] -= 1;
                if(next[1] < 0) return length;
            }
            if(direction === 'R'){
                next[1] += 1;
                if(next[1] >= grid[0].length) return length;
            }
                body.unshift(next);
                if(grid[body[0][0]][body[0][1]] === 'F'){
                    grid[body[0][0]][body[0][1]] = 'E';
                    length++;
                    continue;
                }
                body.pop();
                if(body.includes(next)) return length;


            
        }
    }
    return length;
}
const rl = require("readline").createInterface({input: process.stdin});
const iter = rl[Symbol.asyncIterator]();
const readline = async () => ( await iter.next()).value;
class TreeNode{
    constructor (val =''){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

void async function tree(){
    const input = await readline();
    let index = 0;
    //a{b{d,e{g,h{,I}}},c{f}｝
    function setNode(index){
        if(index >= input.length) return; 
        node = new TreeNode(input[index]);
        index++;
        if(input[index] === '{'){
            index++;
            if(input[index] !== ','){
                [node.left,index] = setNode(index)
            }
            if(input[index] === ','){
            index++;
            [node.right,index] = setNode(index)
            }
            if(input[index] === '}'){
            index++;
            }
        }
        return [node,index];
    }
    const tree = setNode(0);
}

// 最大公共子字符串
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const str1 = await readline();
    const str2 = await readline();
    const dp = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));
    let maxLength = 0;
   for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            // 检查当前字符是否相等
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // 从左上角转移过来
                maxLength = Math.max(maxLength, dp[i][j]); // 更新最大长度
            } else {
                dp[i][j] = 0; // 不连续，长度归零
            }
        }
    }
    console.log(maxLength)
}()

