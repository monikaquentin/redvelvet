import { ec as EC } from 'elliptic'

import Aes256GCM from '@/functions/AES256'
import Container from '@/components/global/Container'
import Input from '@/components/global/Input'
import TextArea from '@/components/global/TextArea'
import SubFooter from '../../components/curve25519/SubFooter'

import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { hexDump } from '@/functions/HexDump'

import PropTypes from 'prop-types'

Curve25519Multiple.propTypes = {
  t: PropTypes.func
}

function Curve25519Multiple({ t }) {
  const curve25519 = new EC('curve25519')
  const regexKey = /^(?:[0-9a-fA-F]{62}|[0-9a-fA-F]{64})$/
  const defaultPrivKey = curve25519.keyFromPrivate('00c0ffeee465ace1f57976c38771cd5252975d3645422e2340a96b105def8ba4')
  const maxAdditionalKeys = 10
  const initialState = {
    errorMessage: '',
    privateKey: '',
    keyDisable: false,
    keyLocked: false,
    plainTextMessage: '',
    dumpEncryptedMessage: '',
    dumpCopied: false,
    privKeys: []
  }

  const [state, setState] = useState(initialState)

  const keyLockedValidation = (next) => {
    const keySet = new Set()
    const invalidKeys = []

    for (let i = 0; i < next.privKeys.length; i++) {
      const key = next.privKeys[i]
      if (!key || keySet.has(key) || !key.match(regexKey)) {
        invalidKeys.push(i + 1)
        break
      }
      keySet.add(key)
    }
    return { invalidKeys }
  }

  const sharedKey = useMemo(() => {
    let next = { ...state }

    const { invalidKeys } = keyLockedValidation(next)

    if (next.privKeys.length && !invalidKeys.length) {
      let iKey = curve25519.keyFromPrivate(next.privKeys[next.privKeys.length - 1]).getPublic()
      for (let i = 0; i < next.privKeys.length; i++) {
        if (i !== next.privKeys.length - 1) {
          const jKey = curve25519.keyFromPrivate(next.privKeys[i])
          iKey = iKey.mul(jKey.getPrivate())
        }
      }
      const final = iKey.getX().toString(16)
      if (final == 0) return false
      return final
    }
    return false
  }, [state.privKeys, state.keyLocked])

  useEffect(() => {
    if (state.plainTextMessage && sharedKey && state.keyLocked)
      Aes256GCM.encrypt(state.plainTextMessage, sharedKey).then((cipher) => {
        setState({
          ...state,
          dumpEncryptedMessage: hexDump(cipher) || t('pages.curve25519.error_messages.bad_key_exchange')
        })
      })
  }, [state.privKeys, state.plainTextMessage, sharedKey, state.keyLocked])

  const deriveHandle = () => {
    let next = { ...state }

    if (!next.privateKey || !next.privateKey.match(regexKey)) {
      next.errorMessage = t('pages.curve25519.error_messages.hex_key_format')
      return setState(next)
    }

    if (next.privKeys.length === 0) {
      next.errorMessage = ''
      next.privKeys = [...next.privKeys, next.privateKey, defaultPrivKey.getPrivate('hex')]
      next.keyDisable = !next.keyDisable
    }
    setState(next)
  }

  const addKeyHandle = () => {
    let next = { ...state }

    const { privKeys } = next
    const previousKey = privKeys[privKeys.length - 1]

    if (!previousKey || !previousKey.match(regexKey) || !sharedKey) {
      next.errorMessage =
        t('pages.curve25519.error_messages.key_x') + privKeys.length + t('pages.curve25519.error_messages.is_invalid')
      return setState(next)
    }

    next.privKeys = [...next.privKeys, '']
    next.errorMessage = ''

    setState(next)
  }

  const lockHandle = () => {
    let next = { ...state }

    next.errorMessage = ''
    next.privKeys = next.privKeys.filter((key) => key !== '' && key !== '')

    if (next.privKeys.length <= 1) {
      next.privKeys = [...next.privKeys, '']
      next.errorMessage = t('pages.curve25519.error_messages.minimum_key')
      return setState(next)
    }

    const { invalidKeys } = keyLockedValidation(next)

    !invalidKeys.length
      ? (next.keyLocked = !next.keyLocked)
      : (next.errorMessage =
          t('pages.curve25519.error_messages.key_x') +
          invalidKeys +
          t('pages.curve25519.error_messages.is_invalid_duplicated'))

    setState(next)
  }

  const x1PrivKeyInput_attr = {
    id: 'x1_private_key_input',
    label: t('pages.curve25519.other.label.x1_private_key'),
    type: 'text',
    name: 'x1_private_key_input',
    placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
    disabled: state.keyDisable,
    value: state.privateKey,
    autoComplete: 'x1_private_key_input',
    onChange: (event) => setState({ ...state, errorMessage: '', privateKey: event.target.value })
  }

  const sharedKeyInput_attr = {
    id: 'shared_key_input',
    label: t('pages.curve25519.other.label.shared_key_input'),
    type: 'text',
    name: 'shared_key_input',
    placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
    disabled: true,
    value: sharedKey || '???',
    autoComplete: 'shared_key_input'
  }

  const plainTextMessageTextArea_attr = {
    id: 'plaintext_message_text_area',
    label: t('pages.curve25519.other.label.plaintext_message_text_area'),
    description: t('pages.curve25519.other.description.plaintext_message_text_area'),
    htmlFor: 'plaintext_message_text_area',
    name: 'plaintext_message_text_area',
    rows: 3,
    placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
    disabled: false,
    value: state.plainTextMessage,
    onChange: (event) => {
      setState({ ...state, errorMessage: '', plainTextMessage: event.target.value, dumpCopied: false })
    }
  }

  const keyElements = useMemo(() => {
    return state.privKeys.map(
      (key, index) =>
        index !== 0 && (
          <Input
            key={index}
            attr={{
              id: `x${index + 1}_private_key`,
              label: `X${index + 1} ${t('pages.curve25519.other.private_key')}`,
              type: 'text',
              name: `x${index + 1}_private_key`,
              placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
              disabled: state.keyLocked,
              value: key,
              autoComplete: `x${index + 1}_private_key`,
              onChange: (event) => {
                const updatedKeys = [...state.privKeys]
                updatedKeys[index] = event.target.value
                setState({ ...state, privKeys: updatedKeys })
              }
            }}
          />
        )
    )
  }, [state.privKeys, state.keyLocked])

  return (
    <Container header={{ title: 'Curve25519 | AES-256-GCM', subtitle: t('pages.curve25519.multiple.subtitle') }}>
      <div className="page-curve25519-wrapper">
        <hr />
        <p className="warning-paragraph mt-4">
          {t('pages.curve25519.multiple.description')}&nbsp;
          <span>
            {t('pages.curve25519.other.supports')}&nbsp;
            <Link title="Write" to="/curve25519">
              {t('pages.curve25519.other.link.to_single')}
            </Link>
            .
          </span>
        </p>
        <Input attr={x1PrivKeyInput_attr} />
        {!state.keyDisable ? (
          <div className="flex mt-1">
            <button type="submit" className="default-button" onClick={deriveHandle}>
              {t('pages.curve25519.other.button.derive')}
            </button>
            {state.errorMessage ? (
              <p className="error-paragraph">{state.errorMessage}</p>
            ) : (
              <p className="button-paragraph">
                {t('pages.curve25519.other.link.button.p')}&nbsp;
                <Link to="/curve25519-decrypt">{t('pages.curve25519.other.link.button.decrypt')}</Link>?
              </p>
            )}
          </div>
        ) : (
          <div>
            {keyElements}
            <Input attr={sharedKeyInput_attr} />
            <div className="flex mt-1">
              {!state.keyLocked && (
                <div>
                  {state.privKeys.length < maxAdditionalKeys && (
                    <button type="button" className="default-button mr-2" onClick={addKeyHandle}>
                      {t('pages.curve25519.other.button.add_privkey')}
                    </button>
                  )}
                  <button type="button" className="default-button" onClick={lockHandle}>
                    {t('pages.curve25519.other.button.lock_and_derive')}
                  </button>
                </div>
              )}
              {state.keyLocked && !state.errorMessage && (
                <button type="button" className="default-button mt-1" onClick={lockHandle}>
                  {t('pages.curve25519.other.button.unlock')}
                </button>
              )}
              {state.errorMessage && <p className="error-paragraph">{state.errorMessage}</p>}
            </div>
            {state.keyLocked && <TextArea attr={plainTextMessageTextArea_attr} />}
            {state.plainTextMessage && state.keyLocked && (
              <div className="encrypt-result-wrapper">
                <label>{t('pages.curve25519.other.label.disrupted_message')}:</label>
                <pre>{state.dumpEncryptedMessage}</pre>
                <div className="copy-wrapper">
                  <div className="content">
                    {!state.dumpCopied ? (
                      <CopyToClipboard
                        text={state.dumpEncryptedMessage}
                        onCopy={() => setState({ ...state, dumpCopied: !state.dumpCopied })}
                      >
                        <button className="default-button">{t('pages.curve25519.other.copy')}</button>
                      </CopyToClipboard>
                    ) : (
                      <p>{t('pages.curve25519.other.copy_success')}</p>
                    )}
                  </div>
                  <p className="button-paragraph">
                    {t('pages.curve25519.other.link.button.p')}&nbsp;
                    <Link to="/curve25519-decrypt">{t('pages.curve25519.other.link.button.decrypt')}</Link>?
                  </p>
                </div>
                <p className="info-paragraph">{t('pages.curve25519.multiple.info')}</p>
              </div>
            )}
          </div>
        )}
        <SubFooter />
      </div>
    </Container>
  )
}

export default Curve25519Multiple
