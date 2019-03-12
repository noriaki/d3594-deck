/* eslint-disable max-len */
import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { name as appName } from '../../constants/app';

const Privacy = ({ classes }) => {
  const {
    root,
    header,
    subheader,
    updated,
    link,
  } = classes;

  const SubHeader = ({ children }) => (
    <Typography variant="h6" component="h2" gutterBottom className={subheader}>
      { children }
    </Typography>
  );
  const Link = ({ children, ...props }) => (
    <Button
      variant="text"
      component="a"
      size="small"
      color="primary"
      className={link}
      {...props}>
      { children }
    </Button>
  );

  return (
    <article className={root}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className={header}>
        プライバシーポリシー
      </Typography>
      <section>
        <Typography
          variant="subtitle1"
          component="time"
          dateTime="2019-03-12T11:00:00+09:00"
          className={updated}>
          発効日: 2019/03/12
        </Typography>
        <SubHeader>
          概要
        </SubHeader>
        <Typography paragraph>
          { appName }
          の提供元（以下、サービス提供者と呼称します）は、ユーザのデータのプライバシーを保護することをお約束いたします。
          本プライバシーポリシーでは、サービス提供者が
          <Link href="/legal/terms">サービス利用規約</Link>
          で定義するサービス（以下、本サービスと総称します）によって収集・受信する情報の内容について具体的に説明しています。
        </Typography>
        <Typography paragraph>
          重要な変更を行うことは稀ではありますが、新しい機能や技術、または新たな法的要件により本ポリシーは変更される可能性がありますので、定期的にご確認ください。もし重要な変更が発生する場合は、本サービスから適宜、
          <Link href="/">トップページ</Link>
          などの場所で通知し、また必要に応じてユーザの同意を求めることもあります。
        </Typography>
      </section>
      <section>
        <SubHeader>
          { appName }
          はどのような情報を収集・受信しますか？
        </SubHeader>
        <Typography paragraph>
          { appName }
          は、ユーザが大三国志のゲームを楽しむために、武将を選び戦法を選んで部隊編成を行うことを支援するために作られたサービスです。
          本サービスにはユーザ自身が考察・考案して選択した武将や部隊をもとに部隊を編成し保存することができます。また、保存された部隊に対して評価を付けたり、コメントを自由に入力、戦歴などの画像をアップロードまたは保管することができます。
          また、本サービスは以下の種類の情報を収集および受信します。
        </Typography>
        <Typography component="div" paragraph>
          <ul>
            <li>
              ログインに関連する情報：
              今後、ログイン機能が実装された場合、ログインアカウント開設のためにユーザから電子メールアドレスや、各種ソーシャルログインサービスのID等の基本情報を収集・受信します。
            </li>
            <li>
              ログデータ：
              本サービスがユーザからどのようにアクセスおよび使用されているか、そして本サービスを使用する際にどのような操作が実行されているか（例：武将や戦法の検索条件）を把握するために、本サービスの利用時にデータを収集しています。これには Cookie やトラッキングピクセル、その他の類似技術を利用しています。
              このような情報を取得することにより、本サービスをユーザに提供し、本サービスがどのように使用されているかを理解し、本サービスの利便性向上に役立つ情報を特定そして提案することが可能となります。
            </li>
            <li>
              デバイス情報：
              本サービスがユーザの意図通りに動作するように、ユーザが本サービスに接続するために使用した端末の数と種類、およびそれらの端末が対応するオペレーティングシステム（例: iOS、Android、Windows）に関する情報を取得します。
            </li>
            <li>
              分析：
              本サービスがユーザからどのように利用されているかの詳細を把握するために、Cookieやそれに類似するテクノロジーを使用しています。また、本サービス提供者が送信する電子メールが開封されたか、リンクが実際にクリックされたかなどを判断するために、それらの本文中にトラッキングピクセル（極小さなグラフィック画像）を含めることもあります。こうした情報は、本サービスの使い勝手を向上させ、ユーザが大三国志のゲームをより円滑に楽しむためのヒントを与えてくれます。
              こうした情報の分析には、Google Analyticsが使われています。Google Analyticsとユーザのプライバシーの詳細については、
              <Link href="https://policies.google.com/technologies/partner-sites?hl=ja">
                ユーザがGoogle パートナーのサイトやアプリを使用する際の Google によるデータ使用
              </Link>
              をご覧ください。
              { appName }
              のWebサイトを訪問した際のGoogle Analyticsによる追跡を解除するには以下のページをご覧ください。
              <Link href="https://tools.google.com/dlpage/gaoptout">
                https://tools.google.com/dlpage/gaoptout
              </Link>
            </li>
          </ul>
        </Typography>
      </section>
      <section>
        <SubHeader>
          { appName }
          はデータをどのように使用するのですか？
        </SubHeader>
        <Typography paragraph>
          ユーザに本サービスを最大限活用してもらうために本サービス提供者が収集および受信した情報の利用目的は以下のとおりです。
          主な目的には、本サービスの提供・保守・改善、トラブルシューティング対応とカスタマーサポートの提供、全ユーザのための本サービスの保護、ユーザへの連絡、アカウント管理などが含まれます。
        </Typography>
        <Typography component="div" paragraph>
          <ul>
            <li>
              部隊や武将、戦法などを本サービス内で検索した際に、探している情報を発見できるようにするため
            </li>
            <li>
              特定の時間において、ユーザの本サービスの使用方法（または考えられる使用方法）のと最も関連深い情報を表示するため
            </li>
            <li>
              本サービスを最大限に活用するために役立つと考えられる、本サービスの機能または製品を提案するため
            </li>
            <li>
              メンテナンス、重要なお知らせ、新機能、更新情報、キャンペーンおよび他のサービスを案内するため
            </li>
            <li>
              サービス利用規約に違反したユーザや、不正・不当な目的で利用しようとするユーザをの特定と、ご利用をお断りするため
            </li>
            <li>
              有料サービスにおいて、ユーザに利用料金を請求するため
            </li>
          </ul>
        </Typography>
        <Typography paragraph>
          なお、本サービスをユーザのために検証および改善する目的で、本サービス提供者は個人情報を含まず、個人を特定せず、特定のユーザとの関連付けがされていない集合データを使用しています。本プライバシーポリシーでは、そのような匿名化/非特定化されたデータへの適用は意図していません。
        </Typography>
      </section>
      <section>
        <SubHeader>
          { appName }
          はデータをどのように共有または開示するのですか？
        </SubHeader>
        <Typography paragraph>
          本サービス提供者は、あらかじめユーザの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護に関連する法令で認められる場合や、以下のような場合には、必要最小限の情報に限定してユーザの個人情報を開示する可能性があります。
        </Typography>
        <Typography component="div" paragraph>
          <ul>
            <li>
              人の生命、身体または財産の保護のために必要がある場合で、本人の同意を得ることが困難であるとき
            </li>
            <li>
              国の機関もしくは地方公共団体またはその委託を受けたものが法令の定める事務を遂行することに対して協力する必要がある場合で、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
            </li>
            <li>
              本サービスの運営の全てまたは一部の合併、売却または再編成が発生した場合、本プライバシーポリシーの適用を受ける情報はその契約に基づいて移転される可能性があります
            </li>
          </ul>
        </Typography>
      </section>
      <section>
        <SubHeader>
          { appName }
          への問い合わせ方法
        </SubHeader>
        <Typography paragraph>
          本サービス提供者は、プライバシーポリシーに関するユーザからのフィードバックを受け付けています。本プライバシーポリシーに関するお問い合わせは、
          <Link href="https://twitter.com/gokuakunori">
            @gokuakunori
          </Link>
          宛にリプライツイートやDM（ダイレクト・メッセージ）でお送りください。
        </Typography>
      </section>
    </article>
  );
};

export default Privacy;
