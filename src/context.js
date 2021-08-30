import React, { useState, createContext, useContext, useEffect } from "react";
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const totalQuestionsNum = 5;
  const [qNumber, setQnumber] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswerIdx, setCorrectAnswerIdx] = useState(null);
  const [flagSrc, setFlagSrc] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesRandomIdxQ, setCountriesRandomIdxQ] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    console.log("fetch countries");
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countries.length) {
      getQuestions(countries);
    }
  }, [countries]);

  useEffect(() => {
    if (quizQuestions.length) {
      getQuestion();
    }
  }, [quizQuestions]);

  useEffect(() => {
    if (qNumber !== 0 && qNumber < totalQuestionsNum) {
      getQuestion();
    }
  }, [qNumber]);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const data = await response.json();
      let countries = data.filter((country, idx) => {
        return idx != 111;
      });
      setCountries(countries);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getQuestions = () => {
    let countriesRandomIdx = getRandomCountriesFn(totalQuestionsNum);
    setCountriesRandomIdxQ(countriesRandomIdx);

    let qQuestions = [];
    //questions
    for (let i = 0; i < totalQuestionsNum; i++) {
      let cntIdx = countriesRandomIdx[i];
      if (i === 0) {
        qQuestions.push(`${countries[cntIdx].capital} is captial of`);
      }
      if (i === 1) {
        qQuestions.push(
          `What is the most spoken language in ${countries[cntIdx].name}`
        );
      }
      if (i === 2) {
        setFlagSrc(countries[cntIdx].flag);
        qQuestions.push(`Which country does this flag belong to`);
      }
      if (i === 3) {
        qQuestions.push(`Which currency is used in ${countries[cntIdx].name}`);
      }
      if (i === 4) {
        qQuestions.push(`Which region does ${countries[cntIdx].name} locate`);
      }
    }
    setQuizQuestions(qQuestions);
  };

  const getQuestion = () => {
    getOptions(qNumber);
    setQuestion(quizQuestions[qNumber]);
  };

  const getOptions = (questionIdx) => {
    let currentCntIdx = countriesRandomIdxQ[qNumber];
    let currentCountry = countries[currentCntIdx];
    let correctOption = "";
    let propertyName = "";
    let qOptions = [];

    if (questionIdx === 0 || questionIdx === 2) {
      propertyName = "name";
      correctOption = currentCountry.name;
    } else if (questionIdx === 1) {
      propertyName = "language";
      correctOption = currentCountry.languages[0].name;
    } else if (questionIdx === 3) {
      propertyName = "currency";
      correctOption = currentCountry.currencies[0].code;
    } else if (questionIdx === 4) {
      propertyName = "region";
      correctOption = currentCountry.region;
    }
    qOptions = getRandomCountriesFn(
      4,
      currentCntIdx,
      correctOption,
      propertyName
    );

    //set the correct answer in random index
    let opsCorrectIdx = Math.floor(Math.random() * 4);
    qOptions[opsCorrectIdx] = correctOption;
    setOptions(qOptions);
    setCorrectAnswerIdx(opsCorrectIdx);
  };

  const getRandomCountriesFn = (count, currentCntIdx, correctOp, propName) => {
    let rndCountries = [];
    while (rndCountries.length < count) {
      let rndIdx = Math.floor(Math.random() * countries.length);
      //get for options
      if (currentCntIdx) {
        if (rndCountries.indexOf(rndIdx) === -1 && rndIdx !== currentCntIdx) {
          let rndCntOpVal = "";
          if (propName === "name") {
            rndCntOpVal = countries[rndIdx].name;
          } else if (propName === "language") {
            rndCntOpVal = countries[rndIdx].languages[0].name;
          } else if (propName === "currency") {
            rndCntOpVal = countries[rndIdx].currencies[0].code;
          } else if (propName === "region") {
            rndCntOpVal = countries[rndIdx].region;
          }
          if (
            rndCountries.indexOf(rndCntOpVal) === -1 &&
            rndCntOpVal != correctOp
          ) {
            //push names
            rndCountries.push(rndCntOpVal);
          }
        }
      }
      //get for questions
      else {
        if (rndCountries.indexOf(rndIdx) === -1) {
          //push index
          rndCountries.push(rndIdx);
        }
      }
    }
    return rndCountries;
  };

  return (
    <AppContext.Provider
      value={{
        totalQuestionsNum,
        qNumber,
        setQnumber,
        question,
        flagSrc,
        options,
        isCorrect,
        setIsCorrect,
        correctAnswerIdx,
        totalScore,
        setTotalScore,
        getQuestions
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
