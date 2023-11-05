import React, { useCallback, useEffect, useState } from 'react';
import { Guess } from './components/Guess/Guess';
import { Header } from './components/Header/Header';
import { Flag } from './components/Flag/Flag';
import { Footer } from './components/Footer/Footer';
import { Content } from './components/Content/Content';
import { Input } from './components/Input/Input';
import { Statistics } from './components/Statistics/Statistics';
import { ANSWER, END_TIME } from './constant/keys';
import './App.css';
import { getInfo } from './service';
import { isFinished } from './util/isFinished';
import { readAll } from './util/db';

export const App = () => {
  const [codeList, setCodeList] = useState([]);
  const [answer, setAnswer] = useState();
  const finishedStatus = isFinished(codeList, answer);
  const [openStatistic, setOpenStatistic] = useState(false);
  const showStatistic = () => {
    setOpenStatistic(true);
  };

  const initAnswer = useCallback(() => {
    // Read cache in localStorage first
    const answerFromLocalStorage = localStorage.getItem(ANSWER);
    if (answerFromLocalStorage && localStorage.getItem(END_TIME) > Date.now()) {
      setAnswer(answerFromLocalStorage);
      return;
    }
    // If no cache available, send request.
    getInfo().then((res) => {
      const {
        answer: resAnswer,
        endTime,
      } = res.data;
      setAnswer(resAnswer);
      // store into localStorage as cache.
      window.localStorage.setItem(ANSWER, resAnswer);
      window.localStorage.setItem(END_TIME, endTime);
    }).catch((err) => {
      // TODO: cache err and call Ralf.
    });
  }, [setAnswer]);

  const initCurCodeList = useCallback(() => {
    readAll().then((res) => {
      const todayStartTime = new Date(new Date().toISOString().slice(0, 10)).getTime();
      const codeListFromDB = [];
      while (res.length > 0 && res[res.length - 1].time > todayStartTime) {
        const codeItem = res.pop();
        codeListFromDB.unshift(codeItem.code);
        if (codeListFromDB.length >= 6) {
          break;
        }
      }
      setCodeList(codeListFromDB);
    });
  }, [setCodeList]);

  useEffect(() => {
    initAnswer();
    initCurCodeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (finishedStatus) {
      showStatistic();
    }
  }, [finishedStatus]);

  return (
    <div className="App">
      <Header showStatisticModal={showStatistic} />
      <Content>
        <Flag answer={answer} />
        <Guess codeList={codeList} answer={answer} />
        <Input codeList={codeList} setCodeList={setCodeList} answer={answer} />
      </Content>
      <Footer />
      {
        openStatistic && (<Statistics open={openStatistic} codeList={codeList} answer={answer} />)
      }
    </div>
  );
};
