// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment the line to use openzeppelin/ERC20
// You can use this dependency directly because it has been installed already
import "./MyERC20.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StudentSocietyDAO {
    uint256 constant public PLAY_AMOUNT = 500;
    // use a event if you want
    event ProposalInitiated(uint32 proposalIndex);

    struct Proposal {
        uint32 index;      // index of this proposal
        address proposer;  // who make this proposal
        uint votecount;
        uint stop;
        uint votecount_;  //收到6票后停止
        // ...
        // TODO add any member if you want
    }
    Proposal[] public proposals;
    Proposal[] public proposals_ok;
    MyERC20 public myERC20;
    mapping(uint32 => Proposal) public proposalist; // A map from proposal index to proposal
    // ...
    // TODO add any variables if you want

    constructor() {
        myERC20 = new MyERC20("ZJUToken", "ZJUTokenSymbol");
    }

    function helloworld() pure external returns(string memory) {
        return "hello world";
    }
    function getproposalNumber() view external returns (uint32){
        return (uint32)(proposals.length);
    }
    // 发起提案
    function raiseproposal() public {
        // 委托转账操作
        myERC20.transferFrom(msg.sender, address(this), PLAY_AMOUNT);
        // 把参与者加入到彩票池中
        Proposal memory proposal1=Proposal((uint32)(proposals.length)+1, msg.sender, 100,0,0);//block.timestamp,block.timestamp+300,
        proposals.push(proposal1);
    }
     function yes(uint32 proposalindex) public { //给候选人投票, 需传入候选人的序号及投票者的地址
        if( proposals[proposalindex-1].stop==1){ return;}
        else{myERC20.transferFrom(msg.sender, address(this), PLAY_AMOUNT);
        proposals[proposalindex-1].votecount_ += 1; 
        proposals[proposalindex-1].votecount += 1; // 候选人得票数加一
        if (proposals[proposalindex-1].votecount_==6){
            if(proposals[proposalindex-1].votecount>100){
            proposals_ok.push(proposals[proposalindex-1]);
            myERC20.transfer(proposals[proposalindex-1].proposer, PLAY_AMOUNT*2);
            }
            proposals[proposalindex-1].stop==1;
        }
        }
    }
   function no(uint32 proposalindex) public { //给候选人投票, 需传入候选人的序号及投票者的地址
        if( proposals[proposalindex-1].stop==1){ return ;}
        else{myERC20.transferFrom(msg.sender, address(this), PLAY_AMOUNT);
        proposals[proposalindex-1].votecount_ += 1; 
        proposals[proposalindex-1].votecount -= 1; // 候选人得票数减一
        if (proposals[proposalindex-1].votecount_==6){
            if(proposals[proposalindex-1].votecount>100){
            proposals_ok.push(proposals[proposalindex-1]);
            myERC20.transfer(proposals[proposalindex-1].proposer, PLAY_AMOUNT*2);
            }
            proposals[proposalindex-1].stop==1;
        }
        }
    }
}
