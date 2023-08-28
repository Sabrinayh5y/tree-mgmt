import treeMgmt from '../../src/index'
import fcnMsgArry from '../data.json'

globalThis.onChange = (e) => {
  const val = e.target.value
  treeMgmt(
    fcnMsgArry,
    (node) => val === '' || node.fcnNm.includes(val),
  )
}