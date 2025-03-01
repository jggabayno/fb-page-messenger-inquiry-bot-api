import inquiryStatuses from "../../constant/inquiryStatus"

export default function inquiryMessage(status: number){

    if(status === inquiryStatuses.pending) return 'Your inquiry is pending. Please wait to be assign to our Project Management Officer.'
    if(status === inquiryStatuses.assigned) return 'Your inquiry is assigned. Please wait for a Project Management Officer to contact you.'
    if(status === inquiryStatuses.call_back) return 'You haved talk with our Project Management Officer.'
    if(status === inquiryStatuses.closed) return 'Your inquiry is Closed.'

    return;
}