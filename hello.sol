pragma solidity ^0.8.0;

contract hello{
    string value;
    constructor(){
        value = "hello world!";
    }
    
    // 파일시스템 : 파일에 저장 된 내용을 가져올거냐, 메모리에 저장 된 내용을 가져올거냐.
    function get() public view returns (string memory){
        return value;
    }

}