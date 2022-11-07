# StudentsSocietyDAO

## 如何运行

1. 在本地启动ganache应用。

2. 在 `./contracts` 中安装需要的依赖，运行如下的命令：

   ```bash
   npm install
   ```

3. 在 `./contracts` 中编译合约，运行如下的命令：

   ```bash
   npx hardhat compile
   ```

4. 在 `./contracts` 中部署合约拿到地址，运行如下的命令：

   ```bash
   npx hardhat run ./scripts/deploy.ts --network ganache
   ```

5. 在 `./frontend/src/utils/contract-addresses.json` 中修改地址

6. 在 `./frontend` 中启动前端程序，运行如下的命令：

   ```bash
   npm run start
   ```

## 功能实现分析

1. 每个学生初始可以拥有或领取一些通证积分（ERC20）：通过点击“领取通证积分”按钮实现
2. 使用一定数量通证积分，发起关于该社团进行活动或制定规则的提案（Proposal）：在上方输入框输入后点击“发起提案”按钮实现
3. 使用一定数量通证积分可以对提案进行投票（赞成或反对，限制投票次数），投票行为被记录到区块链上：在输入框内输入提案编号后点击“赞成”或“反对”按钮实现
4. 赞成数大于反对数的提案通过，提案发起者作为贡献者可以领取一定的积分奖励：在第六次投票结束后，系统会判断赞成票是否大于反对票，若是则发起者账户增加1000通证积分
5. 一个提案最多只能获得6次投票，第6次投票后的投票无效，第6次投票结束后进行结算

## 项目运行截图

登陆

![image](https://user-images.githubusercontent.com/96375650/200304980-58a1e788-c9e7-447a-a294-a34b255ddd7d.png)
![image](https://user-images.githubusercontent.com/96375650/200305071-6cacba7a-c217-4575-a4c7-8bc7e889c48c.png)

领取通证积分
![image](https://user-images.githubusercontent.com/96375650/200305351-c83a6244-d143-47d5-aee6-d292b965b152.png)
![image](https://user-images.githubusercontent.com/96375650/200305411-aa9f8c1e-1993-4be5-aa34-b3b164b2160d.png)

发起提案

![image](https://user-images.githubusercontent.com/96375650/200305467-0414a9b5-9eaf-4ad8-8431-0600b67fa232.png)

![image](https://user-images.githubusercontent.com/96375650/200305522-b605f723-b98f-4243-bec7-54757b7f6d77.png)
![image](https://user-images.githubusercontent.com/96375650/200305578-39876414-465d-445d-8848-37b6364dde9a.png)

投赞成票

![image](https://user-images.githubusercontent.com/96375650/200305653-7e07bb1f-47da-4f1f-8b83-0aeee981fcae.png)

![image](https://user-images.githubusercontent.com/96375650/200305691-225df409-7ab4-4bfc-8377-8d7a54b3858b.png)

![image](https://user-images.githubusercontent.com/96375650/200305745-189d0893-8252-4cbe-a3df-b15a5745cd3a.png)
![image](https://user-images.githubusercontent.com/96375650/200305794-1eaa32ff-976b-4ca5-a96f-31a4aa1a7a07.png)

投反对票

![image](https://user-images.githubusercontent.com/96375650/200305854-aaf4fa2e-052c-48ca-9ca5-79ea697bbf33.png)

![image](https://user-images.githubusercontent.com/96375650/200305907-6e4949cc-face-4db9-abf5-7129a8ec8292.png)
![image](https://user-images.githubusercontent.com/96375650/200305965-940dbfec-4a12-46c3-abe6-16e34ec05e4b.png)

![image](https://user-images.githubusercontent.com/96375650/200306017-9f860f82-99ed-467f-81a3-73a4aaddb861.png)

投票结束后提案赞成票多于反对票，提案提出者获得1000通证积分

![image](https://user-images.githubusercontent.com/96375650/200306062-4aca67d6-b584-41b7-96aa-9fe9e519cf26.png)

## 参考内容

课程的参考Demo见：[DEMOs](https://github.com/LBruyne/blockchain-course-demos)。
