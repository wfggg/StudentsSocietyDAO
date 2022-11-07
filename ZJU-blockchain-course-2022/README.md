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

![1667820724345](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667820724345.png)

![1667820791012](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667820791012.png)

领取通证积分

![1667820832561](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667820832561.png)

![1667820856137](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667820856137.png)

发起提案

![1667820899164](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667820899164.png)

![1667820921011](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667820921011.png)

![1667820949253](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667820949253.png)

投赞成票

![1667821145341](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821145341.png)

![1667821160808](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821160808.png)

![1667821188060](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821188060.png)

![1667821205335](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821205335.png)

投反对票

![1667821237604](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821237604.png)

![1667821253298](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821253298.png)

![1667821267211](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821267211.png)

![1667821283730](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821283730.png)

投票结束后提案赞成票多于反对票，提案提出者获得1000通证积分

![1667821342879](C:\Users\86184\AppData\Roaming\Typora\typora-user-images\1667821342879.png)

## 参考内容

课程的参考Demo见：[DEMOs](https://github.com/LBruyne/blockchain-course-demos)。
