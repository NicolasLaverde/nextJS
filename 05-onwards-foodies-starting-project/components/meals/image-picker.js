'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'
export default function ImagePicker({label, name}) {

    const [pickedImage, setPickedImage] = useState()
    const inputRef = useRef()

    function handlePickClick() {
        inputRef.current.click()
    }

    function handleImageChange(event) {
        const file = event.target.files[0]

        if(!file){
            return;
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file)
    }
    return <div className={classes.picker}>
        <label htmlFor="image">{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet!</p>}
                {pickedImage && (
                    <Image
                        src={pickedImage}
                        alt="The Image selected by the user"
                        fill
                    />
                )}
            </div>
            <input
                className={classes.input}
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                name={name}
                ref={inputRef}
                onChange={handleImageChange}
                required
            />
            <button
                className={classes.button}
                type="button"
                onClick={handlePickClick}
            >
                Pick an Image
            </button>
        </div>
    </div>
}