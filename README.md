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
_瀏覽器限制：請使用 Chrome、Edge、Firefox_  
首先會進入登入頁面，點選左邊「Sign Up」按鈕可進入註冊頁面。填完註冊資料並點選「Sign Up」後，即可回到登入頁面進行登入。登入後進入主畫面，使用者可以點選右下方「Create」按鈕創建活動，或者如果已從其他活動建立者獲得活動代碼，點選「Join」按鈕、輸入活動代碼，即可加入活動。活動列表上每個活動的右方都有四個按鈕，分別為「編輯」、「查看」、「分享」及「退出／刪除」。「編輯」提供使用者點選活動方便時間；「茶看」則是可查看所有活動參與者的時間統整，同時可以輸入特定條件，找出符合條件的最佳時間，活動建立者可以選擇傳送電子郵件通知所有活動參與者；點選「分享」會顯示活動代碼，方便與其他使用者分享活動；「退出／刪除」對活動建立者而言是刪除功能，點選即可刪除活動，並且可以選擇傳送通知給活動參與者，對活動參與者是退出功能，點選即可退出活動。操作完畢後，回到主畫面，點選右上方「Sign Out」即可登出。

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

日期與時間選擇器 component：react-datepicker ([https://github.com/Hacker0x01/react-datepicker](https://github.com/Hacker0x01/react-datepicker))

時間表選擇器 component：react-schedule-selector ([https://github.com/bibekg/react-schedule-selector](https://github.com/bibekg/react-schedule-selector))

### 每位組員之負責項目
黃季昕：前端  
盧冠均：  
陳柄瑞：  

### 專題製作心得
黃季昕：  
盧冠均：  
陳柄瑞：  

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
