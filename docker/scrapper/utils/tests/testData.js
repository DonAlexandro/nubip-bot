// Timetable data
let src = 'rozklad_dzvinkiv.png';

const html = `
  <div>
    <h3>Hello World</h3>
    <p>
      Hello WorldHello WorldHello WorldHello WorldHello World
      <img src="${src}" />
    </p>
  </div>
`;

const wrongImageHtml = `
  <p>
    Hello WorldHello WorldHello WorldHello WorldHello World
    <img src="not_a_timetable.png" />
  </p>
`;

const htmlWithNoImage = `
  <div>
    <h3>Hello World</h3>
    <p>
      Hello WorldHello WorldHello WorldHello WorldHello World
    </p>
  </div>
`;

// Schedules data
const htmlTable = `
  <table>
    <tbody>
      <tr>
        <td>
          <div>
            <font><font>№</font></font>
          </div>
          <div>
            <font><font>п / п</font></font>
          </div>
        </td>
        <td>
          <div>
            <font><font>Назва підрозділу</font></font>
          </div>
          <div>
            <font><font>(факультет, ННІ)</font></font>
          </div>
        </td>
        <td>
          <div>
            <font><font>Розклад занять</font></font>
          </div>
          <div>
            <font><font>на 2 семестр</font></font>
          </div>
          <div>
            <font><font>2021-2022 н.р.</font></font>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <span>
              <font style="vertical-align: inherit;">1.</font>
            </span>
          </div>
        </td>
        <td>
          <div>
            <span>
              <font>ННІ лісового та садово-паркового господарства</font>
            </span>
          </div>
        </td>
        <td>
          <div>
            <a href="/sites/default/files/u284/nni_lisovogo_i_sadovo-parkovogo_gospodarstva_28.12.21.xlsx">
              <img src="image.png"/>
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
`;

const htmlMsoNormalTable = `
  <table class="MsoNormalTable">
    <tbody></tbody>
  </table>
`;

const htmlTableWithoutAnchor = `
  <table>
    <tbody>
      <tr>
        <td>
          <div>
            <font><font>№</font></font>
          </div>
          <div>
            <font><font>п / п</font></font>
          </div>
        </td>
        <td>
          <div>
            <font><font>Назва підрозділу</font></font>
          </div>
          <div>
            <font><font>(факультет, ННІ)</font></font>
          </div>
        </td>
        <td>
          <div>
            <font><font>Розклад занять</font></font>
          </div>
          <div>
            <font><font>на 2 семестр</font></font>
          </div>
          <div>
            <font><font>2021-2022 н.р.</font></font>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <span>
              <font style="vertical-align: inherit;">1.</font>
            </span>
          </div>
        </td>
        <td>
          <div>
            <span>
              <font>ННІ лісового та садово-паркового господарства</font>
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
`;

const htmlTableWithoutName = `
  <table>
    <tbody>
      <tr>
        <td>
          <div>
            <font><font>№</font></font>
          </div>
          <div>
            <font><font>п / п</font></font>
          </div>
        </td>
        <td>
          <div>
            <font><font>Назва підрозділу</font></font>
          </div>
          <div>
            <font><font>(факультет, ННІ)</font></font>
          </div>
        </td>
        <td>
          <div>
            <font><font>Розклад занять</font></font>
          </div>
          <div>
            <font><font>на 2 семестр</font></font>
          </div>
          <div>
            <font><font>2021-2022 н.р.</font></font>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <span>
              <font style="vertical-align: inherit;">1.</font>
            </span>
          </div>
        </td>
        <td>
          <div>
            <a href="/sites/default/files/u284/nni_lisovogo_i_sadovo-parkovogo_gospodarstva_28.12.21.xlsx">
              <img src="image.png"/>
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
`;

// News data
const htmlNews = `
  <div class="wide-column">
    <div class="item newslist">
      <h3>
        <a href="/node/103689" title="До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022">До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022</a>
      </h3>
      <p class="date_and_other">18 січня 2022 року</p>
      <p>
        &nbsp; &nbsp; &nbsp;НУБіП України здійснює підготовку за 45 спеціальностями, більшості з яких надається підтримка, особливістю якої є участь у Всеукраїнській Олімпіаді, що дає унікальну можливість отримати до + 20 додаткових балів до оцінки сертифіката ЗНО з одного відповід&nbsp;
        <a href="/node/103689" class="read_more">→</a>
      </p>
    </div>
  </div>
`;

const htmlNewsWithoutWideColumn = `
  <div>
    <div class="item newslist">
      <h3>
        <a href="/node/103689" title="До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022">До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022</a>
      </h3>
      <p class="date_and_other">18 січня 2022 року</p>
      <p>
        &nbsp; &nbsp; &nbsp;НУБіП України здійснює підготовку за 45 спеціальностями, більшості з яких надається підтримка, особливістю якої є участь у Всеукраїнській Олімпіаді, що дає унікальну можливість отримати до + 20 додаткових балів до оцінки сертифіката ЗНО з одного відповід&nbsp;
        <a href="/node/103689" class="read_more">→</a>
      </p>
    </div>
  </div>
`;

const htmlNewsWithoutTitle = `
  <div class="wide-column">
    <div class="item newslist">
      <h3>
        <a href="/node/103689" title="До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022"></a>
      </h3>
      <p class="date_and_other">18 січня 2022 року</p>
      <p>
        &nbsp; &nbsp; &nbsp;НУБіП України здійснює підготовку за 45 спеціальностями, більшості з яких надається підтримка, особливістю якої є участь у Всеукраїнській Олімпіаді, що дає унікальну можливість отримати до + 20 додаткових балів до оцінки сертифіката ЗНО з одного відповід&nbsp;
        <a href="/node/103689" class="read_more">→</a>
      </p>
    </div>
  </div>
`;

const htmlNewsWithoutDateAndText = `
  <div class="wide-column">
    <div class="item newslist">
      <h3>
        <a href="/node/103689" title="До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022">До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022</a>
      </h3>
      <p class="date_and_other"></p>
      <p>
        <a href="/node/103689" class="read_more">→</a>
      </p>
    </div>
  </div>
`;

const testNews = [
  {
    title: 'News',
    text: 'Lorem ipsum dolor mit semu...',
    date: '18.01.2022',
    link: 'https://google.com'
  }
];

const testSchedules = [{ name: 'Schedule', link: 'https://nubip.edu.ua/path/to/schedule' }];

module.exports = {
  src,
  html,
  wrongImageHtml,
  htmlWithNoImage,
  htmlTable,
  htmlMsoNormalTable,
  htmlTableWithoutAnchor,
  htmlTableWithoutName,
  htmlNews,
  htmlNewsWithoutWideColumn,
  htmlNewsWithoutTitle,
  htmlNewsWithoutDateAndText,
  testNews,
  testSchedules
};
