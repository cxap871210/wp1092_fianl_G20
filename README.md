# [109-2] Web Programming Final
## (Group 20) MeetUp
組員：資管三 黃季昕 B06705035、資管三 盧冠均 B07705032、資管三 陳柄瑞 B07705052

### Demo 連結
https://www.youtube.com/watch?v=LwnsKW9VceA

### 服務內容  
<!-- 參考與優化現有when2meet，主要功能為安排活動時間，參與活動的每位使用者可以輸入自己有空的時間，經由系統統整，找出最適合的活動時間。同時增加更貼近使用者需求的功能，比如：建立帳戶資料、filter排序、發送email通知等，並且改良UI/UX，提升使用者的體驗。 -->
參考與優化現有when2meet的功能，是用來安排活動時間的工具，參與活動的每位使用者可以輸入自己有空的時間，經由系統統整，找出最適合的活動時間。  

實際功能如下：  
1. 註冊、登入  
  使用者可利用帳號、密碼及電子郵件信箱註冊，並在每次登入時看到所有參與和建立的活動，方便管理。
2. 建立活動  
  所有使用者皆可自行建立活動。
3. 分享活動  
  使用者可獲得已建立或已參與的活動之「活動代碼」，可將此代碼分享給其他可能的參與者。
4. 參與活動  
  使用者輸入活動代碼即可加入活動。
5. 填寫活動方便時間  
  使用者可填寫方便參加已建立或已參與之活動時間。
6. 查看所有參與者方便時間  
  系統會整理每個活動中所有參與者方便的時間，方便使用者查看。
7. 篩選符合特定條件的時間  
  使用者可以輸入特定條件（比如：最低參與人數、哪些人一定要出席等），系統會找出符合條件的時間。
8. 退出活動  
  活動參與者可以退出活動。
9. 刪除活動  
  活動建立者可以選擇刪除活動。
10. 傳送活動通知  
  活動建立者可以在篩選出最佳活動時間時，或者將活動刪除時，選擇傳送電子郵件通知所有活動參與者。

### Deploy 連結
https://meetup-ntu.herokuapp.com/

### 操作方式
__瀏覽器限制：請使用 Chrome、Edge、Firefox__  
首先會進入登入頁面，點選左邊「Sign Up」按鈕可進入註冊頁面。填完註冊資料並點選「Sign Up」後，即可回到登入頁面進行登入。登入後進入主畫面，使用者可以點選右下方「Create」按鈕創建活動，或者如果已從其他活動建立者獲得活動代碼，點選「Join」按鈕、輸入活動代碼，即可加入活動。活動列表上每個活動的右方都有四個按鈕，分別為「編輯」、「查看」、「分享」及「退出／刪除」。「編輯」提供使用者點選活動方便時間；「查看」則是可查看所有活動參與者的時間統整，同時可以輸入特定條件，找出符合條件的最佳時間，活動建立者可以選擇傳送電子郵件通知所有活動參與者；點選「分享」會顯示活動代碼，方便與其他使用者分享活動；「退出／刪除」對活動建立者而言是刪除功能，點選即可刪除活動，並且可以選擇傳送通知給活動參與者，對活動參與者是退出功能，點選即可退出活動。操作完畢後，回到主畫面，點選右上方「Sign Out」即可登出。

### 安裝方式  
<!-- only in README -->
1. Clone 下來以後，進入 frontend 與 backend 目錄各執行一次`yarn`。
2. 在 backend 下，放入 .env 檔案。
3. 在根目錄下執行`yarn start`，啟動前端。
4. 在根目錄下執行`yarn server`，啟動後端。
5. 在瀏覽器開啟 localhost:3000 即可看到畫面了。

<!--### 其他說明-->

### 使用與參考之框架、模組、原始碼
前端：HTML5、CSS3、JavaScript、React  
後端：Mongoose  
串接：Express、Axios  
資料庫：MongoDB

### 使用之第三方套件、框架、程式碼
寄信套件：SmtpJS ([https://www.smtpjs.com](https://www.smtpjs.com/))

加密套件：bcrypt ([https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt))

日期與時間處理函式庫：Moment.js (https://momentjs.com)

日期與時間選擇器 component：react-datepicker ([https://github.com/Hacker0x01/react-datepicker](https://github.com/Hacker0x01/react-datepicker))

時間表選擇器 component：react-schedule-selector ([https://github.com/bibekg/react-schedule-selector](https://github.com/bibekg/react-schedule-selector))

### 每位組員之負責項目
<!-- only in README -->
資管三 黃季昕 B06705035：  
- 前端：建立介面
- 串接前後端
- 撰寫報告

資管三 盧冠均 B07705032：  
- 後端：建立 Mongoose Schema
- 後端 API：sign-up, create-activity, edit-time, send-time, result
- 後端：密碼加密 (使用 bcrypt 套件)
- Deploy 前後端 (使用 Heroku 雲端服務平台)  

資管三 陳柄瑞 B07705052：  
- 後端 API：sign-in, get-activity, attend, get-mails, get-delete-mails, delete, quit
- 前端寄送 Email 功能函數 （handleEmail, handleDeleteEmail）
- 前端結果篩選 Filter 功能函數 (handleFilter)
- 串接測試前端介面
- 錄製 Demo

### 專題製作心得
資管三 黃季昕 B06705035：  
在這次的專案中，我主要負責前端的部分。和組員一起構思好大略的介面安排以後，就要開始想辦法把我們的草圖做出來。在製作過程中，除了更熟悉 React Hooks 和 GitHub 以外，也為了要製作比較複雜的介面而上網找適合使用的 components。雖然之前也有用過別人分享的 components，但是在找資料時，還是很驚訝網路上有這麼豐富的資源，有很多方便使用的 components。而我學習到很多的是，怎麼閱讀別人寫的文件、按照自己的需求使用開源的 component。在建構整個前端時，也訓練到自己去思考整個網頁的邏輯，介面要怎樣比較好看、怎麼樣安排會有更好的使用者體驗等等。最終完成了這樣一個完整的專案，挺有收穫也蠻有成就感的。

資管三 盧冠均 B07705032：  
決定好要做這個題目後，開始構想後端資料庫的 schema 應該要如何設計，由於平時做的練習多半都已經有現成的 schema 可以使用了，因此經過這次專案的實作讓我體驗到整個資料庫從無到有的構思與建立，並妥善設計不同資料間的相互關係。此次專案，我主要負責後端 server 的 API，使用 Express.js 的框架去實現後端 API 的設計。一開始在設計 API 的時候會遇到各種 bug，像是前後端參數傳送失敗、Mongodb 資料存取失敗等，而在這個 debug 的過程中也讓我更了解到一些操作的細節與技巧。由於為了實現密碼加密的功能，特別去了解各式 JavaScript 加密的手法，像是 mongoose-encryption、MD5、bcrypt 等，深入認識它們加密的原理及優劣。最後，這次期末專案讓我收穫最多的部分是 deploy 前後端。由於過去鮮少有機會做這樣的練習，因此花非常多的時間在處理 deploy 前後端，研究的過程中有接觸到 Heroku、Google Cloud Platform 等雲端服務平台，過程中詳讀了很多說明文件，不斷地修正前後端的程式架構及環境的設定，經過許多次的嘗試後，才終於在 Heroku deploy 成功。雖然最後還是有 deploy 成功，但其實很多操作的脈絡還並不是了解的那麼透徹，因此未來會再多投入時間研究各式雲端服務。  
資管三 陳柄瑞 B07705052：  
原先在發想題目的時候遇到了一些小困難，後來才想到能夠針對原先就存在的服務做改良。以前在與其他人約時間的時候就時常用到 When2meet 這個服務，但在使用上總有些不太上手的地方。我們改善了 When2meet 使用者名稱重複時不會被提醒反而被錯誤登入的問題，也讓時間結果的顯示更加直觀，更加上了篩選結果的功能，並且允許使用者發出通知。另外，透過這次專案我也認知到，現有的某服務即使不夠完善，也一定有值得借鑑的地方，比如原先 When2meet 的時間介面的使用方式相當直覺，我們也因此就沿用了類似的操作介面。很高興能夠透過這次專案，在保留合適功能的同時，完成自己心目中更完善的應用。


<!--
安裝方式/服務內容/心得/deploy連結/demo連結


PO 文的第一行請統一加上 [109-2] Web Programming Final 作為標題
專題題目名稱 // 前面請加上組別: (Group xx) Your Title
Demo 影片連結
描述這個服務在做什麼
Deployed 連結 (如有自己有安全性的疑慮，則可以不用在 FB 社團公告此項)
(如果有給 deployed 連結) 使用/操作方式 (含伺服器端以及使用者端)
(Optional, 如果你有另外建立一個開源的 repo) Github link (請不要給成你的 private wp1092 repo <= 別人看不到)
其他說明
使用與參考之框架/模組/原始碼
使用之第三方套件、框架、程式碼
專題製作心得-->
