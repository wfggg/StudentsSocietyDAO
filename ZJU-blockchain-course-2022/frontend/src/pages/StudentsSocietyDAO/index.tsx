import {Button, Image, InputNumber} from 'antd';
import {Header} from "../../asset";
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from 'react';
import {StudentsSocietyDAOContract, myERC20Contract, web3} from "../../utils/contracts";
import './index.css';

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
// TODO change according to your configuration
const GanacheTestChainName = 'Ganache Test Chain'
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545'

const StudentsSocietyDAOPage = () => {

    const [account, setAccount] = useState('')
    const [accountBalance, setAccountBalance] = useState(0)
    const [proposalNumber, setproposalNumber] = useState(0)
    useEffect(() => {
        // 初始化检查用户是否已经连接钱包
        // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
        const initCheckAccounts = async () => {
            // @ts-ignore
            const {ethereum} = window;
            if (Boolean(ethereum && ethereum.isMetaMask)) {
                // 尝试获取连接的用户账户
                const accounts = await web3.eth.getAccounts()
                if(accounts && accounts.length) {
                    setAccount(accounts[0])
                }
            }
        }

        initCheckAccounts()
    }, [])

    useEffect(() => {
        const getStudentsSocietyDAOContractInfo = async () => {
            if (StudentsSocietyDAOContract) {
                const pn = await StudentsSocietyDAOContract.methods.getproposalNumber().call()
                setproposalNumber(pn)
            } else {
                alert('Contract not exists.')
            }
        }

        getStudentsSocietyDAOContractInfo()
    }, [])
    useEffect(() => {
        const getAccountInfo = async () => {
            if (myERC20Contract) {
                const ab = await myERC20Contract.methods.balanceOf(account).call()
                setAccountBalance(ab)
            } else {
                alert('Contract not exists.')
            }
        }

        if(account !== '') {
            getAccountInfo()
        }
    }, [account])

    const onClaimAirdrop = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (myERC20Contract) {
            try {
                await myERC20Contract.methods.airdrop().send({
                    from: account
                })
                alert('You have claimed.')
            } catch (error: any) {
                alert(error.message)
            }

        } else {
            alert('Contract not exists.')
        }
    }

    const onRaise = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (StudentsSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentsSocietyDAOContract.options.address, 500).send({
                    from: account
                })

                await StudentsSocietyDAOContract.methods.raiseproposal().send({
                    from: account
                })
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }


    const onYes = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }
        if (StudentsSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentsSocietyDAOContract.options.address, 500).send({
                    from: account
                })
                await StudentsSocietyDAOContract.methods.yes(1).send({
                    from: account
                })
                alert('You have 投yes.')
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onNo = async () => {
        if (account === '') {
            alert('You have not connected wallet yet.')
            return
        }
        if (StudentsSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentsSocietyDAOContract.options.address, 500).send({
                    from: account
                })
                await StudentsSocietyDAOContract.methods.no(1).send({
                    from: account
                })

                alert('You have 投no.')
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onClickConnectWallet = async () => {
        // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
        // @ts-ignore
        const {ethereum} = window;
        if (!Boolean(ethereum && ethereum.isMetaMask)) {
            alert('MetaMask is not installed!');
            return
        }

        try {
            // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
            if (ethereum.chainId !== GanacheTestChainId) {
                const chain = {
                    chainId: GanacheTestChainId, // Chain-ID
                    chainName: GanacheTestChainName, // Chain-Name
                    rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
                };

                try {
                    // 尝试切换到本地网络
                    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: chain.chainId}]})
                } catch (switchError: any) {
                    // 如果本地网络没有添加到Metamask中，添加该网络
                    if (switchError.code === 4902) {
                        await ethereum.request({ method: 'wallet_addEthereumChain', params: [chain]
                        });
                    }
                }
            }

            // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
            await ethereum.request({method: 'eth_requestAccounts'});
            // 获取小狐狸拿到的授权用户列表
            const accounts = await ethereum.request({method: 'eth_accounts'});
            // 如果用户存在，展示其account，否则显示错误信息
            setAccount(accounts[0] || 'Not able to get accounts');
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <div className='container'>
            <Image
                width='100%'
                height='150px'
                preview={false}
                src={Header}
            />
            <div className='main'>
                <h1>学生社团组织治理网站</h1>
                <Button onClick={onClaimAirdrop}>领取通证积分</Button>
                <div className='account'>
                    {account === '' && <Button onClick={onClickConnectWallet}>连接用户</Button>}
                    <div>当前用户：{account === '' ? '无用户连接' : account}</div>
                    <div>当前用户拥有通证积分：{account === '' ? 0 : accountBalance}</div>
                </div>
                <div>花费500积分即可发起的提案，提案通过即可获得双倍积分作为奖励</div>
                <div>当前有{proposalNumber}条提案
                </div>
                </div>
                <div className='operation'>
                    <div style={{marginBottom: '20px'}}>操作栏</div>
                    <div className='buttons'>
                    <div>输入提案内容：<input 
                    /></div>
                        <Button style={{width: '200px'}} onClick={onRaise}>发起提案</Button>
                    <div>输入要投票的提案编号：<InputNumber id='num-input' size='small' className='number-input'
                        min={1} defaultValue={1}
                        onChange={(value) => {
                            
                        }} /></div>
                        <Button style={{width: '200px'}} onClick={onYes}>赞成</Button>
                        <Button style={{ width: '200px' }} onClick={onNo}>反对</Button>
                    </div>
                </div>
            </div>
    )
}

export default StudentsSocietyDAOPage