# 仮想口座アプリ 「SAVONEEEY」 :purse:
閲覧していただき、ありがとうございます。<br>
「SAVONEEEY」は「SAVONEEEY」は「袋分け管理法」を仮想口座によって実現した、お金管理アプリです。<br>
本アプリを利用することで、好きな時に何度でも、仮想口座内でのお金の移動ができ、簡単にお金を分け整理・整頓することができます。
ゲストログイン機能も用意してあるので、お気軽にご覧ください。

### URL: ~~https://savoneeey.com/~~ (8月27日に閉じました)

![SAVONEEEY トップページ](https://user-images.githubusercontent.com/80745545/127300289-8b33f179-437c-420a-9ba5-468475351dcc.png)

## 作成した経緯
生活費でさえも、お金を現金で持つこと機会が少なくなり、銀行で貯金することが多くなりました。銀行でお金を分けて管理しようとしても、一つの銀行では一つの口座しか開設できなかったり、他の銀行にお金を移すと手数料がかかってしまいます。そこで、web内で仮想的にお金を分けて管理できるサービスがあれば便利だなと考え、今回このポートフォリオの作成に至りました。

##  本アプリの特徴
- インフラ
  - AWS Fargateにデプロイ
  - SSL 対応
  - CircleCIを使い、CD/CDパイプラインを構築
  - Docker による開発環境のコンテナ化
- バックエンド
  - Ruby on RailsのAPIモードを使用
  - devise_token_auth gemを使用し、トークン認証を利用したログインを実装
  - ユーザー新規登録時に確認メールを送信し、偽アカウントの作成を防止
  - Rspecによるテスト
- フロントエンド
  - Nuxt.jsのSPAモードを使用
  - UIフレームワークにVuetifyを使用し、整ったUIを意識
  - Jestによるテスト
- その他
  - git-flowを用いた開発
  - チーム開発を意識、issueやブランチを活用した開発
  - 自分で撮影、編集した写真・ロゴを使用

##  ER図
![DR図](https://user-images.githubusercontent.com/80745545/127298592-f9d90414-944e-486f-a32f-b84ccb465b8c.png)

##  AWS構成図
![AWS構成図](https://user-images.githubusercontent.com/80745545/127356514-0e982c26-dffc-4cb9-b0e0-1c0791b7cfb5.png)

##  主な使用技術等(詳細後述)
- インフラ
  - AWS( ECS Fargate / ECR / RDS / ALB / Route53 / IAM / Certificate Manager / System Manager)
  - Docker, docker-compose
  - Circle CI (CI/CD)
- バックエンド
  - Ruby 2.6.6
  - Ruby on Rails 6.1.3.2 (APIモード)
  - Rubocop (コード解析ツール)
  - RSpec (テスト)
- フロントエンド
  - Nuxt.js 2.15.3 (SPAモード)
  - Vuetify （UIフレームワーク）
  - Jest（テスト）
  - ESLint/Prettier（コード解析ツール）
- その他
  - Adobe lightroom classic(画像の編集)
  - Adobe Stock(画像の取得)
  - DesignEvo (ロゴの作成)

##  実装機能
  - 基本機能
    - ユーザーの新規登録、 ログイン、 編集機能(devise_token_authによるトークン認証)
  - 仮想口座関係
    - 仮想口座の作成(タグ付け)、 編集、削除機能
    - 全ての口座の残高一覧
    - メイン口座への出金・入金機能
    - 口座間取引機能

      <img src="https://user-images.githubusercontent.com/80745545/127354917-9eb56354-c491-40aa-b741-87d759460c63.gif" width="300px">

    - 口座の取引履歴閲覧
  - ほしい物リスト関係
    - ほしい物リストの作成、編集、削除機能
    - 口座への紐付け機能

      <img src="https://user-images.githubusercontent.com/80745545/127355756-8ada2285-f27b-453c-92be-8a3528094f5b.gif" width="300px">
    
##  使用した技術詳細
- ### インフラ
  ### Docker/docker-compose
    - 開発環境は、全てDockerコンテナ内で構築。

  ### AmazonWebService(AWS)
    - ECS(Fargate):AWS Fargateを利用してコンテナを起動すれば、ホストマシンを意識せずにコンテナを実行することが可能。
    - ECR:Dockerのコンテナイメージを保存しておくためのレジストリ
    - RDS:AWS上でデータベース(MySQL)を使用するために利用。
    - ALB:Webサービスに発生する負荷を分散するロードバランシングサービス
    - Route53: ドメインネームシステムウェブサービス
    - IAM: AWS リソースへのアクセスを安全に管理するためのウェブサービス

  ### CircleCI
    - 自動CI/CDパイプラインの構築。
      - Githubにpushした時
        - Rspec
        - rubocop
        - Jest
        - eslint・prettier
      - masterブランチへmergesした時
        - Rspec
        - rubocop
        - Jest
        - eslint・prettier
        - AWS ECRにdocker imageをpush
        - AWS ECS のサービスの更新

      を自動化。

- ### バックエンド
  ### Ruby on Rails 6.1.3.2 (APIモード)
  - 使用した主なgem
    - devise_token_auth:トークン認証を実現するgem
    - rack-cors:CORSの設定のためのgem
    - dotenv-rails:環境変数を利用するためのgem
    - rspec-rails:テスト用フレームワーク
    - rubocop:コード解析ツール

- ### フロントエンド
  ### Nuxt.js 2.15.3 :APIモード
  - 使用した主なライブラリ、フレームワーク等
    - eslint・prettier:javascriptの静的コード解析ツール
    - Vuetify:マテリアルデザインのUIフレームワーク
    - Jest :JavaScript テスティングフレームワーク
    - axios:Rails APIにアクセスする
    - vee-validate:Vue.js用のバリデーションライブラリ
