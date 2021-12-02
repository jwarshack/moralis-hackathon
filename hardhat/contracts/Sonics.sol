//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import "hardhat/console.sol";

contract Sonics is ERC1155, ERC1155Receiver, Ownable {

    uint256 public MAX_TOKENS = 20;

    mapping(uint256 => uint256) public mintTracker;
    mapping(uint256 => address[]) public redeemers;
    mapping(uint256 => uint256) public redemptions;

    uint256 public price = 0.1 ether;

    constructor() ERC1155("sdfds") {
    }

    function issue(uint256 _tokenId, uint256 _amount) public payable {
        require(_tokenId < MAX_TOKENS);
        require(_amount + mintTracker[_tokenId] < 11, "Exceeds number of tokens");
        require(msg.value >= price * _amount);

        _mint(msg.sender, _tokenId, _amount, "");
        mintTracker[_tokenId] += _amount;
    }



    function redeem(uint256 _id, uint256 _amount) public payable {
        uint256 bal = redemptions[_id];
        require(bal + _amount < 11, "Tokens have been redeemed");
        safeTransferFrom(msg.sender, address(this), _id, _amount, "");
        redeemers[_id].push(msg.sender);
        redemptions[_id] += _amount;

        if (bal + _amount == 10) {
            buildSong(_id);
        }

    }


    function buildSong(uint256 _tokenId) internal {
        _burn(address(this), _tokenId, 10);
        console.log(pluck(_tokenId, "key", redeemers[_tokenId], keys));
        console.log(pluck(_tokenId, "guitar", redeemers[_tokenId], guitar));
        console.log(pluck(_tokenId, "drums", redeemers[_tokenId], drums));

    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
    
    function pluck(uint256 tokenId, string memory keyPrefix, address[] memory _redeemers, string[] memory sourceArray) public pure returns (string memory) {
        uint256 rand = random(string(abi.encodePacked(keyPrefix, _redeemers, toString(tokenId))));
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }

    function toString(uint256 value) internal pure returns (string memory) {
    // Inspired by OraclizeAPI's implementation - MIT license
    // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    string[] private keys = [
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#"
    ];

    string[] private guitar = [
        "Ambient",
        "Acoustic",
        "Electric",
        "Bango"
    ];

    string[] private drums = [
        "Loud",
        "Meta",
        "Acoustic",
        "Bongo"
    ];

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    

}