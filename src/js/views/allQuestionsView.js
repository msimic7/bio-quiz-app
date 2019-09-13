import { DOM } from './base';

export const renderPage = () => {
  DOM.contentMain().classList = 'contentMain';
  const markup = `
    <select class='opt'>
        <option value='0'>Celije</option>
        <option value='1'>Virusi i bakterije</option>
        <option value='2'>Ekologija zavrsni test</option>
        <option value='3'>Zavrsni test citologija</option>
        <option value='4'>Citologija zavrsni test</option>
        <option value='5'>Biljna tkiva i organi</option>
        <option value='6'>Beskicmenjaci</option>
        <option value='7'>Kicmenjaci</option>
        <option value='8'>Protozoe, sundjeri, zarnjaci</option>
        <option value='9'>Tkiva test za prijemni</option>
        <option value='10'>Biljni organi i razn. zivog sveta</option>
        <option value='11'>Mehanizmi nasledjivanja test</option>
        <option value='12'>Molekularna biologija test</option>
    </select>
    <input type="text" class="inSt">
    `;
  DOM.contentTitle().insertAdjacentHTML('beforeend', markup);
  const markup1 = `
    <div class="btn btnAction" id="btnShowNext">SHOW NEXT</div>
    `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markup1);
};
