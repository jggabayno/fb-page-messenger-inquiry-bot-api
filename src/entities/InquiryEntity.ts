import { InquiryInterface } from "src/interfaces/InquiryInterface";
import { UserInterface } from "src/interfaces/UserInterface"
import inquiryStatuses from "../constant/inquiryStatus"
 
export class InquiryEntity {
    id: number;
    user_id: number;
    platform_id: string;
    company_name: string;
    designation: string;
    description: string;
    status: number;
 
    constructor({id, user_id, platform_id, company_name, designation, description, status }: InquiryInterface){
        this.id = id
        this.user_id = user_id
        this.platform_id = platform_id
        this.company_name = company_name
        this.designation = designation
        this.description = description
        this.status = status
     }

    async validate(){

        let errors = []
        
        if (!this.user_id) errors.push('user_id')
        if (!this.platform_id) errors.push('platform_id')
        if (!this.company_name) errors.push('company_name')
        if (!this.designation) errors.push('designation')
        if (!this.description) errors.push('description')
        if (!this.status) errors.push('status')
        
        
        if (errors.length){
            throw Error(JSON.stringify(errors.map(error => `${error} is required`)))
        }

    }

    async validateOnDB({getOwnInquiryPersistence, getUserPersistence, getInquiryByIdPersistence} : any){
        const isUpdate = this.id !== undefined

        const ownInquiryDB: any = await getOwnInquiryPersistence(this.user_id)
        const userDB: UserInterface = await getUserPersistence({id: this.user_id})
        const inquiryByIdDB: UserInterface = isUpdate ? await getInquiryByIdPersistence(this.id) : {}
        const isUserExist = userDB.hasOwnProperty('id')
 
        const canAddInquiry : boolean = ownInquiryDB?.some((row : any) => row.status === inquiryStatuses.pending)
        const cantSubmitOtherStatusThanPendingWhenFirstSubmit : boolean = ownInquiryDB?.length === 0 && this.status !== inquiryStatuses.pending
        
        const hasDataWithIdParam : boolean = inquiryByIdDB?.hasOwnProperty('id')

        let errors = []

        if (!isUserExist) errors.push('user_id does not exist')
        
        if (cantSubmitOtherStatusThanPendingWhenFirstSubmit) errors.push('You can\'t submit other than pending status when first inquiry.')

        // add validation
        if (!isUpdate && canAddInquiry) errors.push('Sorry you can\'t submit new inquiry while you have previous pending inquiry.')

        // update validation
        if (isUpdate && !hasDataWithIdParam) errors.push('id does not exist')
        

        if (errors.length){
            throw Error(JSON.stringify(errors))
        }

        // if(isUpdate){

        // } else {
        //     // 
        // }
    
    }
}