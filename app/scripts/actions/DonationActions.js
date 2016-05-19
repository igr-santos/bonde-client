import { FINISH_TRANSACTION, TRANSACTION_FAIL, TRANSACTION_DONE, EXPORT_DONATIONS } from '../constants/ActionTypes'
import $ from 'jquery'

export function finishTransaction(params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/donations`, {
      method: 'post',
      data: {
        donation: {
          widget_id: params.widget_id,
          token: params.token,
          payment_method: params.payment_method,
          amount: params.amount
        }
      },
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: TRANSACTION_DONE,
          data
        })
      }
    })
  }
}

export function exportDonations(params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/widgets/${params.widget_id}/donations.csv`, {
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: EXPORT_DONATIONS,
          mobilizations: data
        })
      }
    })
  }
}
