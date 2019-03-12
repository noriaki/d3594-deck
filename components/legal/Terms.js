/* eslint-disable max-len */
import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { name as appName } from '../../constants/app';

const Terms = ({ classes }) => {
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
        サービス利用規約
      </Typography>
      <section>
        <SubHeader>
          サービス利用規約の前に
        </SubHeader>
        <Typography paragraph>
          前提として、ゲーム
          <Link href="https://d3.wegames.co.jp/">大三国志</Link>
          が提供する全てのマテリアル（各種名称、画像、ロゴ、映像、ゲームシステム、武将設定や戦法設定、プログラムを含みますが、これに限りません）に関する権利は、NetEase Inc, / WINKING DIGITAL ENTERTAINMENT Ltd. / WeGamesJapan Co.,ltd （以下、ゲーム提供者と総称します）に帰属します。
        </Typography>
        <Typography paragraph>
          { appName }
          の提供者は、これらのゲームマテリアルに関する権利を侵害する意志は無く、本サービスがゲーム利用者の円滑なゲームプレイの一助となり、その結果、大三国志の健全な発展に寄与することを切に願っています。
        </Typography>
        <Typography paragraph>
          なお、大三国志ゲーム内で提示されるアプリ利用規約も合わせてご確認ください。
        </Typography>
      </section>
      <section>
        <Typography
          variant="subtitle1"
          component="time"
          dateTime="2019-03-12T11:00:00+09:00"
          className={updated}>
          発効日: 2019/03/12
        </Typography>
        <SubHeader>
          サービス利用規約とは何ですか？
        </SubHeader>
        <Typography paragraph>
          サービス利用規約は、あなたと
          { appName }
          の提供元（以下、サービス提供者と呼称します）
          との契約です。
          サービス提供者が適宜提示し、かつユーザが同意する規約または条件（以下、総称して「サービス利用規約」）の全てが含まれます。これらの規約に同意することによって、サービス提供者が提供するサービスにアクセスしたり、利用することができます。本サービスを利用した場合は、サービス利用規約を承諾し、本契約の当事者となることに同意したものとみなされます。
        </Typography>
        <Typography paragraph>
          ユーザは本サービスを利用することで、
          <Link href="/legal/privacy">プライバシーポリシー規定</Link>
          のすべてを確認し、承諾し、同意することになります。
        </Typography>
      </section>
      <section>
        <SubHeader>
          { appName }
          サービスとは何ですか？
        </SubHeader>
        <Typography paragraph>
          { appName }
          の提供するサービスやWebサイト、アプリ、各種データを「本サービス」と総称します。主要なサービスは
          <Link href="/">https://deck.d3594.com</Link>
          を通じて提供されます。
        </Typography>
      </section>
      <section>
        <SubHeader>
          サービス利用規約は変更されることはありますか？
        </SubHeader>
        <Typography paragraph>
          サービス利用規約は、新しい機能や技術、または新たな法的要件により変更される可能性がありますので、定期的にご確認ください。重要な変更が発生する場合は、本サービスから適宜、
          <Link href="/">トップページ</Link>
          などの場所で通知し、また必要に応じてユーザの同意を求めることもあります。
        </Typography>
        <Typography paragraph>
          このサービス利用規約が更新された際は、更新された条件を承諾するか、または本サービスの利用を停止するか、ご判断ください。サービス利用規約の更新が有効になった後に本サービスを引き続きご利用になっている場合は、新しい条件を承諾し、その条件に法的に拘束されることに同意されたものとみなします。
          ここで述べるような本サービスによる変更を除く、それ以外の方法（メールまたはその他の通信を含みますが、これに限りません）での変更または修正は無効とします。
        </Typography>
      </section>
      <section>
        <SubHeader>
          ユーザが
          { appName }
          に対して許諾することは何ですか？
        </SubHeader>
        <Typography paragraph>
          ユーザは、本サービスを利用して保存した部隊編成に関して、武将の選択や戦法の選択、組み合わせを、サービス提供者がコンテンツとして表示、実行、配布し、本サービスの運営を可能とするために当該コンテンツを変更および複製、その他のコンテンツと組み合わせる権利をサービス提供者へ付与するものとします。
          またこれらのコンテンツに対して追加できる評価、文章、画像などの付随的な情報に対しても同様の権利をサービス提供者へ付与するものとします。
        </Typography>
        <Typography paragraph>
          またユーザは、
          { appName }
          が自らの裁量によりコンテンツの受諾、掲載、保存、表示、公開、または送信を行わないことを選択する権利を有していることにも同意します。
        </Typography>
      </section>
      <section>
        <SubHeader>
          サービス提供者は本サービスに関する、どんな権利を有していますか？
        </SubHeader>
        <Typography paragraph>
          サービス提供者の有する権利は、以下のとおりです。
        </Typography>
        <Typography variant="subtitle1" component="h4" gutterBottom>
          ゲームマテリアルを除くコンテンツに関する権利
        </Typography>
        <Typography paragraph>
          ゲーム提供者に帰属するコンテンツを除き、ユーザは本サービスに自身が投稿、保存するコンテンツを所有しますが（第三者の権利を除きます）、本サービスに関するすべての法的権利、所有権、および権益や、サービス提供者が保有することを認め、同意するものとします。これには本サービスに含まれるすべてのソフトウェアが含まれます。
        </Typography>
        <Typography variant="subtitle1" component="h4" gutterBottom>
          本サービスを変更する権利
        </Typography>
        <Typography paragraph>
          サービス提供者は、自らの裁量で、本サービスの一部または関連としての新しい要素（本サービスの以前の機能や操作感に影響を及ぼす可能性がある変更を含みます）を変更、実行する権限を持ちます。
        </Typography>
        <Typography paragraph>
          サービス提供者は、これらの変更が本サービス全体を強化すると考えていますが、必ずしもユーザが賛同するものでない可能性もあります。サービス提供者は予告の有無にかかわらず随時、提供する機能、データ内容、コンテンツおよびその他の機能または継続してアクセスまたは配信する能力に制限を設けたり、その他の制限を課したりする権利を持ちます。たとえば、サービスの一部や全部を有料版として提供することや、その際に無償版では有料版が提供する一部または全部の便益を享受することができない場合があることを承諾します。
        </Typography>
        <Typography variant="subtitle1" component="h4" gutterBottom>
          本サービスの一時的または永久的に停止する権利
        </Typography>
        <Typography paragraph>
          ユーザは、サービス提供者のさまざまな行為により、時として、または同様に、一定期間または永久的に、本サービスへのアクセスまたは本サービスの利用が阻害され、または妨げられることがあることを理解し、サービス手強者がそうした行為や結果（コンテンツの消失もしくは利用不可などを含み、かつこれらに限りません）に伴う一切の責任または義務を負わないことを承諾するものとします。さらにユーザは、本サービスの変更・停止・廃止について、サービス提供者がユーザまたは第三者に対して責任を負わないことを承諾するものとします。
        </Typography>
      </section>
      <section>
        <SubHeader>
          サービス上でやっていいことの規則はありますか？
        </SubHeader>
        <Typography paragraph>
          本サービスの利用は、本サービス利用規約に沿ったものでなければなりません。本サービスを利用する前に、ユーザは本サービスを利用することに伴うすべての行動に責任を持つことに同意する必要があります。
        </Typography>
        <Typography paragraph>
          本サービスにおける禁止行為等に関しては以下のとおりです。
          サービス提供者は、ユーザが以下の行為を含め本サービス利用規約に反する(他者の知的財産権またはプライバシー権を侵害する場合を含みます）と判断した場合は、そのユーザの投稿、保存したコンテンツを削除または非表示とすること、さらにユーザのアクセスを禁止する権利を有します。
        </Typography>
        <Typography component="div" paragraph>
          <ul>
            <li>あらゆる違法または不正な行為を幇助する目的での本サービス利用</li>
            <li>他のユーザの権利（プライバシー、個人情報の使用）を侵害する行為</li>
            <li>本サービスのユーザに対する迷惑行為または詐欺行為</li>
            <li>知的財産権の侵害</li>
            <li>好ましくないコンテンツの投稿（サービス提供者が判断する、性的な内容、脅迫、不正、迷惑、侮辱、名誉毀損、卑猥、侵害、憎悪と認める、または人種的、民族的、その他の理由で好ましくないと認める内容）</li>
            <li>本サービスの提供を妨げる行為</li>
            <li>本サービスの複製または再販、不正使用および不正アクセス行為</li>
          </ul>
        </Typography>
      </section>
      <section>
        <SubHeader>
          その他に知っておくべきことはありますか？
        </SubHeader>
        <Typography variant="subtitle1" component="h4" gutterBottom>
          補償について
        </Typography>
        <Typography paragraph>
          ユーザは、自身による本サービスの使用、本規約の違反または本サービスの使用に関連するすべての行為に関連する、いかなる第三者の請求に起因または関連した一切の請求、責任、損害（実質的および結果的）、損失、および経費（弁護料その他の専門家への報酬を含みます）について、本サービス提供者に補償し、損害を与えないことに同意するものとします。
        </Typography>
        <Typography paragraph>
          もし、このような請求がサービス提供者に対しなされた場合、サービス提供者はその請求および訴訟や法的措置の通知を、ユーザに送信します。ただし、ユーザがそのような通知を受信しなかったとしても、ユーザの本規約に基づく補償義務は免除も軽減もされません。
        </Typography>
        <Typography variant="subtitle1" component="h4" gutterBottom>
          責任の制限および保証免除
        </Typography>
        <Typography paragraph>
          本サービスは法律で認められている最大限の範囲において、「現状ありのまま」の状態で利用されます。本サービスは、細心の注意を払い開発され有用だと考えますが、事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグなどを含みます）がないことを明示的にも黙示的にも保証しません。
        </Typography>
        <Typography paragraph>
          本サービス提供者、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。また、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
        </Typography>
        <Typography variant="subtitle1" component="h4" gutterBottom>
          準拠法・裁判管轄
        </Typography>
        <Typography paragraph>
          本サービス利用規約の解釈にあたっては日本法を準拠法とします。また本サービス利用規約から生じる又は関連するいかなる訴訟又は訴訟、紛争が生じた場合には、東京地方裁判所を第1審の専属管轄裁判所とします。
        </Typography>
        <Typography variant="subtitle1" component="h4" gutterBottom>
          さいごに
        </Typography>
        <Typography paragraph>
          本サービス利用規約の各項の見出しは、便宜上付けられたものに過ぎず、法律上または契約上の効力を一切有しません。
        </Typography>
      </section>
    </article>
  );
};

export default Terms;
