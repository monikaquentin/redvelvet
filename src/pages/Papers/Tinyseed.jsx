import PropTypes from 'prop-types'

import xmrseed from '@/components/default/seed/xmr/xmrseed'
import bip39seed from '@/components/default/seed/bip39/bip39seed'
import slip39seed from '@/components/default/seed/slip39/slip39seed'

import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'

const TinySeed = ({ redL }) => {
  const [read, setRead] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState('')
  const [seedData, setSeedData] = useState([])
  const [indexesMode, setIndexesMode] = useState(false)
  const [inputValues, setInputValues] = useState(Array(0).fill(''))

  const totalizer = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]
  const Seed = (proposal) => {
    switch (proposal) {
      case 'bip-39':
        return bip39seed
      case 'slip-39':
        return slip39seed
      case 'xmr':
        return xmrseed
      default:
        return []
    }
  }
  const maxIndex =
    {
      'bip-39': 2048,
      'slip-39': 1024,
      xmr: 1626
    }[selectedProposal] || Infinity
  const proposalButtons = [
    { key: 'bip-39', label: 'BIP-39' },
    { key: 'slip-39', label: 'SLIP-39' },
    { key: 'xmr', label: 'XMR' }
  ]

  useEffect(() => {
    setSeedData(Seed(selectedProposal))
  }, [selectedProposal])

  const handleInputChange = (row, col, value) => {
    const trimmedValue = value.trim()
    const isValidInput = !indexesMode
      ? /^[A-Za-z]+$/.test(trimmedValue)
      : /^\d+$/.test(trimmedValue) && parseInt(trimmedValue, 10) <= maxIndex && parseInt(trimmedValue, 10) > 0
    const inputIndex = (row - 1) * 4 + col - 1

    if (inputValues.length <= inputIndex) {
      setInputValues((prevInputValues) => {
        const newInputValues = [...prevInputValues]

        for (let i = prevInputValues.length; i <= inputIndex; i++) newInputValues[i] = ''

        newInputValues[inputIndex] = trimmedValue.toLowerCase()
        return newInputValues
      })
    } else if (isValidInput || trimmedValue === '') {
      setInputValues((prevInputValues) => {
        const newInputValues = [...prevInputValues]
        newInputValues[inputIndex] = trimmedValue.toLowerCase()
        return newInputValues
      })
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pastedText = event.clipboardData.getData('text/plain')
    const words = pastedText.toLowerCase().replace(/,/g, '').split(/\s+/)
    const validWords = words
      .map((word) => word.trim())
      .filter((word) => {
        if (!indexesMode) {
          return /^[A-Za-z]+$/.test(word)
        } else {
          const isNumeric = /^\d+$/.test(word)
          const isInRange = isNumeric && parseInt(word, 10) <= maxIndex && parseInt(word, 10) > 0
          return isInRange
        }
      })

    setInputValues(validWords)
  }

  const renderSeedRows = () =>
    Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="seed-rows">
        {Array.from({ length: 4 }, (_, j) => {
          const inputKey = i * 4 + j + 1
          return (
            <Input
              key={inputKey}
              className="paragraph mx-2.5"
              size="small"
              placeholder="???"
              prefix={
                <div className={`paragraph !font-semibold ${inputKey.toString().length < 2 && 'mr-1.5'}`}>
                  {inputKey}.
                </div>
              }
              value={inputValues[inputKey - 1] || ''}
              onChange={(event) => handleInputChange(i + 1, j + 1, event.target.value)}
              onPaste={handlePaste}
            />
          )
        })}
      </div>
    ))
  return (
    <div className="paper-tinyseed">
      <p className="warning-paragraph">{redL.warning}</p>
      <div className="content-section">
        {!read ? (
          <span className="readmore-button" onClick={() => setRead(!read)}>
            {redL.read_more}...
          </span>
        ) : (
          <div>
            <span className="readmore-button" onClick={() => setRead(!read)}>
              {redL.close}
            </span>
            <p className="content-margin">
              {redL.pre_content}
              <a href={redL.official_tinyseed_link.link} target="_blank" rel="noopener noreferrer nofollow">
                {redL.official_tinyseed_link.label}
              </a>
              {redL.content}
            </p>
            <div className="seed-selector">
              <span>{redL.choose_proposal}&nbsp;&nbsp;</span>
              {proposalButtons.map(
                (button) =>
                  selectedProposal !== button.key && (
                    <Button
                      key={button.key}
                      type="default"
                      size="small"
                      onClick={() => setSelectedProposal(button.key)}
                    >
                      {button.label}
                    </Button>
                  )
              )}
              <h1>
                {selectedProposal.toUpperCase()} -&nbsp;
                {!indexesMode
                  ? redL.words.charAt(0).toUpperCase() + redL.words.slice(1)
                  : redL.indexes.charAt(0).toUpperCase() + redL.indexes.slice(1)}
              </h1>
              <p>
                {redL.use.charAt(0).toUpperCase() + redL.use.slice(1)}&nbsp;
                <span
                  className="indexes-mode"
                  onClick={() => {
                    setInputValues(Array(0).fill(''))
                    setIndexesMode(!indexesMode)
                  }}
                >
                  {indexesMode ? redL.words : redL.indexes}
                </span>
                &nbsp;{redL.instead}
              </p>
              {seedData.length > 0 && (
                <div className="wrapper-seed-rows">
                  {renderSeedRows()}
                  <div className="wrapper-input">
                    <Input
                      className="paragraph mx-2.5"
                      size="small"
                      placeholder="opt."
                      prefix={<div className="paragraph !font-semibold">25.</div>}
                      value={inputValues[25 - 1] || ''}
                      onChange={(event) => handleInputChange(7, 1, event.target.value)}
                      onPaste={handlePaste}
                    />
                  </div>
                </div>
              )}
              <div className="wrapper-table">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {totalizer.map((number, index) => (
                        <th key={index}>
                          <b>{number}</b>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {inputValues.map((word, rowIndex) => {
                      let total = 0
                      let addedNumbers = []

                      return (
                        <tr key={rowIndex}>
                          <td className="td-words">
                            <p>{(!indexesMode ? seedData.indexOf(word) + 1 : seedData[word - 1]) || '-'}</p>
                          </td>
                          {totalizer.map((numItem, colIndex) => {
                            const currentWordIndex = indexesMode ? word : seedData.indexOf(word) + 1
                            if (currentWordIndex >= numItem && total + numItem <= currentWordIndex) {
                              total += numItem
                              addedNumbers.push(numItem)
                              return (
                                <td key={colIndex} className="td-x">
                                  <p>x</p>
                                </td>
                              )
                            } else {
                              return (
                                <td key={colIndex} className="td-strip">
                                  <p>-</p>
                                </td>
                              )
                            }
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {selectedProposal && <p className="info-paragraph">{redL.sub_content}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

TinySeed.propTypes = {
  redL: PropTypes.object
}

export default TinySeed
