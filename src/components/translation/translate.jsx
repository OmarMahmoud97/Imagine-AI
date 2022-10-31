import axios from "axios";
import "./translate.scss";

const Translate = () => {
  var SpeechSDK;
  var phraseDiv, statusDiv;
  var key, authorizationToken, appId, phrases;
  var regionOptions;
  var languageOptions, formatOption, filePicker, microphoneSources;
  var useDetailedResults;
  var recognizer;
  var inputSourceMicrophoneRadio, inputSourceFileRadio;
  var scenarioSelection, scenarioStartButton, scenarioStopButton;
  var formatSimpleRadio, formatDetailedRadio;
  var reco;
  var languageTargetOptions, voiceOutput;
  var audioFile;
  var microphoneId;
  var referenceText;
  var pronunciationAssessmentResults;

  var thingsToDisableDuringSession;

  var soundContext = undefined;

  try {
    var AudioContext =
      window.AudioContext || // our preferred impl
      window.webkitAudioContext || // fallback, mostly when on Safari
      false; // could not find.

    if (AudioContext) {
      soundContext = new AudioContext();
    } else {
      alert("Audio context not supported");
    }
  } catch (e) {
    window.console.log("no sound context found, no audio output. " + e);
  }

  function Initialize(onComplete) {
    if (!!window.SpeechSDK) {
      document.getElementById("content").style.display = "block";
      document.getElementById("warning").style.display = "none";
      onComplete(window.SpeechSDK);
    }
  }

  let authorizationEndpoint = "http://localhost:3001/api/get-speech-token";

  async function RequestAuthorizationToken() {
    if (authorizationEndpoint) {
      try {
        const res = await axios.get(authorizationEndpoint);
        const token = res.data.token;
        const region = res.data.region;
        regionOptions.value = region;
        authorizationToken = token;

        console.log("Token fetched from back-end: " + token);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function resetUiForScenarioStart() {
    phraseDiv.innerHTML = "";
    statusDiv.innerHTML = "";
    useDetailedResults =
      document.querySelector('input[name="formatOption"]:checked').value ===
      "Detailed";
    pronunciationAssessmentResults = [];
  }

  return (
    <section className="translate">
      <h1>Translate</h1>
      <div id="warning">
        {/* <h1 style="font-weight: 500">
        Speech Recognition Speech SDK not found
        (microsoft.cognitiveservices.speech.sdk.bundle.js missing).
      </h1> */}
      </div>
      {/* <div id="content" style="display: none"> */}
      <div id="content">
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                {/* <h2 style="font-weight: 500">
                Microsoft Cognitive Services Speech SDK
              </h2> */}
                {/* <h3 style="font-weight: 500">Javascript Browser Sample</h3> */}
              </td>
            </tr>
            <tr>
              <td align="right">
                <a
                  href="https://www.microsoft.com/cognitive-services/sign-up"
                  target="_blank"
                >
                  Subscription
                </a>
                :
              </td>
              <td>
                <input
                  id="key"
                  type="text"
                  size="60"
                  placeholder="required: speech subscription key"
                />
              </td>
            </tr>
            <tr>
              <td align="right">Region:</td>
              <td align="left">
                <select id="regionOptions">
                  {/* <option value="westus" selected="selected">
                  West US
                </option> */}
                  <option value="westus">West US</option>
                  <option value="westus2">West US 2</option>
                  <option value="eastus">East US</option>
                  <option value="eastus2">East US 2</option>
                  <option value="eastasia">East Asia</option>
                  <option value="southeastasia">South East Asia</option>
                  <option value="northeurope">North Europe</option>
                  <option value="westeurope">West Europe</option>
                  <option value="usgovarizona">US Gov Arizona</option>
                  <option value="usgovvirginia">US Gov Virginia</option>
                </select>
              </td>
            </tr>
            <tr>
              <td align="right">Recognition language:</td>
              <td align="left">
                <select id="languageOptions">
                  <option value="ar-EG">Arabic - EG</option>
                  <option value="ca-ES">Catalan - ES</option>
                  <option value="zh-CN">Chinese - CN</option>
                  <option value="zh-HK">Chinese - HK</option>
                  <option value="zh-TW">Chinese - TW</option>
                  <option value="da-DK">Danish - DK</option>
                  <option value="da-DK">Danish - DK</option>
                  <option value="nl-NL">Dutch - NL</option>
                  <option value="en-AU">English - AU</option>
                  <option value="en-CA">English - CA</option>
                  <option value="en-GB">English - GB</option>
                  <option value="en-IN">English - IN</option>
                  <option value="en-NZ">English - NZ</option>
                  {/* <option value="en-US" selected="selected">
                  English - US
                </option> */}
                  <option value="en-US">English - US</option>
                  <option value="de-DE">German - DE</option>
                  <option value="es-ES">Spanish - ES</option>
                  <option value="es-MX">Spanish - MX</option>
                  <option value="fi-FI">Finnish - FI</option>
                  <option value="fr-CA">French - CA</option>
                  <option value="fr-FR">French - FR</option>
                  <option value="hi-IN">Hindi - IN</option>
                  <option value="it-IT">Italian - IT</option>
                  <option value="ja-JP">Japanese - JP</option>
                  <option value="ko-KR">Korean - KR</option>
                  <option value="nb-NO">Norwegian - NO</option>
                  <option value="pl-PL">Polish - PL</option>
                  <option value="pt-BR">Portuguese - BR</option>
                  <option value="pt-PT">Portuguese - PT</option>
                  <option value="ru-RU">Russian - RU</option>
                  <option value="sv-SE">Swedish - SE</option>
                </select>
              </td>
            </tr>
            <tr>
              <td align="right">Audio Input:</td>
              <td align="left">
                <input
                  type="radio"
                  name="inputSourceOption"
                  // checked="checked"
                  id="inputSourceMicrophoneRadio"
                  value="Microphone"
                />
                {/* <select id="microphoneSources" disabled="true" /> */}
                <select id="microphoneSources" />
                <input
                  type="radio"
                  name="inputSourceOption"
                  id="inputSourceFileRadio"
                  value="File"
                />
                <label id="inputSourceFileLabel" htmlFor="inputSourceFileRadio">
                  Audio file
                </label>
                {/* <button id="inputSourceChooseFileButton" disabled="true">
                ...
              </button> */}
                <button id="inputSourceChooseFileButton">...</button>
                <input
                  type="file"
                  id="filePicker"
                  accept=".wav"
                  // style="display: none"
                />
              </td>
            </tr>
            <tr>
              <td align="right">Scenario:</td>
              <td align="left">
                <select id="scenarioSelection">
                  <option value="speechRecognizerRecognizeOnce">
                    Single-shot speech-to-text
                  </option>
                  <option value="speechRecognizerContinuous">
                    Continuous speech-to-text
                  </option>
                  <option value="intentRecognizerRecognizeOnce">
                    Single-shot intent recognition
                  </option>
                  <option value="translationRecognizerContinuous">
                    Continuous translation
                  </option>
                  <option value="pronunciationAssessmentOnce">
                    Single-shot pronunciation assessment
                  </option>
                  <option value="pronunciationAssessmentContinuous">
                    Continuous pronunciation assessment
                  </option>
                </select>
              </td>
            </tr>
            <tr id="formatOptionRow">
              <td align="right">Result Format:</td>
              <td align="left">
                <input
                  type="radio"
                  name="formatOption"
                  // checked="checked"
                  id="formatSimpleRadio"
                  value="Simple"
                />
                <label htmlFor="formatSimpleRadio">Simple</label>
                <input
                  type="radio"
                  name="formatOption"
                  id="formatDetailedRadio"
                  value="Detailed"
                />
                <label htmlFor="formatDetailedRadio">Detailed</label>
              </td>
            </tr>
            <tr id="translationOptionsRow">
              <td align="right">Translation:</td>
              <td>
                <label htmlFor="languageTargetOptions">Target language</label>
                <select id="languageTargetOptions">
                  <option value="Microsoft Server Speech Text to Speech Voice (ar-EG, Hoda)">
                    Arabic - EG
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (ca-ES, HerenaRUS)">
                    Catalan - ES
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (da-DK, HelleRUS)">
                    Danish - DK
                  </option>
                  <option
                    value="Microsoft Server Speech Text to Speech Voice (de-DE, Hedda)"
                    // selected="selected"
                  >
                    German - DE
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (en-AU, Catherine)">
                    English - AU
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (en-CA, Linda)">
                    English - CA
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (en-GB, Susan, Apollo)">
                    English - GB
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (en-IN, Heera, Apollo)">
                    English - IN
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)">
                    English - US
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (es-ES, Laura, Apollo)">
                    Spanish - ES
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (es-MX, HildaRUS)">
                    Spanish - MX
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (fi-FI, HeidiRUS)">
                    Finnish - FI
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (fr-CA, Caroline)">
                    French - CA
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (fr-FR, Julie, Apollo)">
                    French - FR
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (hi-IN, Hemant)">
                    Hindi - IN
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (it-IT, LuciaRUS)">
                    Italian - IT
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (ja-JP, Ayumi, Apollo)">
                    Japanese - JP
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (ko-KR, HeamiRUS)">
                    Korean - KR
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (nb-NO, HuldaRUS)">
                    Norwegian - NO
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (nl-NL, HannaRUS)">
                    Dutch - NL
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (pl-PL, PaulinaRUS)">
                    Polish - PL
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (pt-BR, HeloisaRUS)">
                    Portuguese - BR
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (pt-PT, HeliaRUS)">
                    Portuguese - PT
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (ru-RU, Irina, Apollo)">
                    Russian - RU
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (sv-SE, HedvigRUS)">
                    Swedish - SE
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (zh-CN, Kangkang, Apollo)">
                    Chinese - CN
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (zh-HK, Tracy, Apollo)">
                    Chinese - HK
                  </option>
                  <option value="Microsoft Server Speech Text to Speech Voice (zh-TW, Yating, Apollo)">
                    Chinese - TW
                  </option>
                </select>
                {/* <input id="voiceOutput" type="checkbox" checked /> */}
                <input id="voiceOutput" type="checkbox" />
                <label htmlFor="voiceOutput">voice output</label>
              </td>
            </tr>
            <tr id="languageUnderstandingAppIdRow">
              <td align="right">Application ID:</td>
              <td>
                <input
                  id="appId"
                  type="text"
                  size="60"
                  placeholder="required: appId for the Language Understanding service"
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <a href="https://docs.microsoft.com/azure/cognitive-services/speech-service/get-started-speech-to-text#improve-recognition-accuracy">
                  Phrase List Values:
                </a>
              </td>
              <td>
                <input
                  id="phrases"
                  type="text"
                  size="60"
                  value=""
                  placeholder="optional: semicolon-delimited list;of;words"
                />
              </td>
            </tr>
            <tr id="pronunciationAssessmentReferenceTextRow">
              <td align="right">Reference Text:</td>
              <td>
                <input
                  id="referenceText"
                  type="text"
                  size="60"
                  value=""
                  placeholder="pronunciation assessment reference text."
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                <b></b>
              </td>
              <td>
                <button id="scenarioStartButton">Start</button>
                {/* <button id="scenarioStopButton" disabled="disabled">
                Stop
              </button> */}
                <button id="scenarioStopButton">Stop</button>
              </td>
            </tr>
            <tr>
              <td align="right">Results:</td>
              <td align="left">
                <textarea
                  id="phraseDiv"
                  // style="display: inline-block; width: 500px; height: 200px"
                ></textarea>
              </td>
            </tr>
            <tr>
              <td align="right">Events:</td>
              <td align="left">
                <textarea
                  id="statusDiv"
                  //   style="
                  //   display: inline-block;
                  //   width: 500px;
                  //   height: 200px;
                  //   overflow: scroll;
                  //   white-space: nowrap;
                  // "
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <Iframe src={translate}></Iframe> */}
      {/* <iframe */}
      {/* src="./translate.html" */}
      {/* ></iframe> */}
      {/* <div dangerouslySetInnerHTML={{ __html: translate }} />a */}
    </section>
  );
};
export default Translate;
