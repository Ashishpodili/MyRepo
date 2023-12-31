import { LightningElement,api } from 'lwc';
// imports
import DOCTOR_REVIEW_OBJECT from '@salesforce/schema/DoctorReview__c';
import NAME_FIELD from '@salesforce/schema/DoctorReview__c.Name';
import COMMENT_FIELD from '@salesforce/schema/DoctorReview__c.Commnets__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const SUCCESS_TITLE = 'Review Created!';
const SUCCESS_VARIANT = 'success';

export default class DoctorAddReviewForm extends LightningElement {
     // Private
     doctorId;
     //rating;
     doctorReviewObject = DOCTOR_REVIEW_OBJECT;
     nameField        = NAME_FIELD;
     commentField     = COMMENT_FIELD;
     labelSubject = 'Review Subject';
     //labelRating  = 'Rating';
     
     // Public Getter and Setter to allow for logic to run on recordId change
     @api
     get recordId() {
         return this.doctorId;
     }
     set recordId(value) {
         //sets doctorId attribute
         this.setAttribute('doctorId', value);        
         //sets doctorId assignment
         this.doctorId = value;
     }
     
     // Gets user rating input from stars component
    // handleRatingChanged(event) {
        // this.rating = event.detail.rating;
    //}
     
     // Custom submission handler to properly set Rating
     // This function must prevent the anchor element from navigating to a URL.
     // form to be submitted: lightning-record-edit-form
     handleSubmit(event) {
         event.preventDefault();
         const fields = event.detail.fields;
         //fields.Rating__c = this.rating;
         fields.Doctor__c = this.doctorId;        
         this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
     
     // Shows a toast message once form is submitted successfully
     // Dispatches event when a review is created
     handleSuccess() {
         // TODO: dispatch the custom event and show the success message
         const toast = new ShowToastEvent({
             title: SUCCESS_TITLE,
             variant: SUCCESS_VARIANT,
         });
         this.dispatchEvent(toast);
         this.handleReset();
         const createReviewEvent = new CustomEvent('createreview');
         this.dispatchEvent(createReviewEvent);        
     }
     
     // Clears form data upon submission
     // TODO: it must reset each lightning-input-field
     handleReset() {
         const inputFields = this.template.querySelectorAll('lightning-input-field');
         if (inputFields) {
             inputFields.forEach(field => { field.reset(); });
         }
     }
}