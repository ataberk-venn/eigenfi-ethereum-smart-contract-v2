// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

/// @title Migrator Interface
/// @notice Interface for the Migrator contract called by the EigenFi Pool's migrate() function
interface IMigrator {
    
    ///@notice Function called by the EigenFi Pool to facilitate migration of staked tokens from the EigenFi Pool to Helix
    ///@param _user The address of the user whose staked funds are being migrated to Helix
    ///@param _tokens The tokens being migrated to Helix from the EigenFi Pool
    ///@param _destination The address which will be credited the tokens on Helix
    ///@param _amounts The amounts of each token to be migrated to Helix for the _user
    function migrate(
        address _user,
        address[] calldata _tokens,
        address _destination, 
        uint256[] calldata _amounts
    ) external;
}