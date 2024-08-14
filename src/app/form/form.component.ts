import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service'; // Ensure this path is correct

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  itemForm!: FormGroup;
  selectedFile: File | any;
  isPopupVisible: boolean | any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      weight: ['', Validators.required],
      netWeight: ['', Validators.required],
      mrp: ['', Validators.required],
      category: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.itemForm.patchValue({'image':this.selectedFile})
    }
  }

  
  onSubmit(): void {
    //debugger;
    if (this.itemForm.invalid) {
      console.log('Form is invalid', this.itemForm.errors);
      return;
      this.showPopup();
    }


    const formData = new FormData();
    formData.append('barcode', this.itemForm.get('barcode')?.value);
    formData.append('name', this.itemForm.get('name')?.value);
    formData.append('weight', this.itemForm.get('weight')?.value);
    formData.append('netWeight', this.itemForm.get('netWeight')?.value);
    formData.append('mrp', this.itemForm.get('mrp')?.value);
    formData.append('category', this.itemForm.get('category')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } else {
      console.log('Image is required');
      return;
    }

    this.apiService.submitItem(formData).subscribe(
      response => {
        console.log('Form submitted successfully', response);
        this.itemForm.reset();
        this.selectedFile = null;
      },
      error => {
        console.error('Error submitting form', error);
      }
    );
  }
  showPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
  }

