function openEditModal(id, firstname, lastname, email, phone, address, dob, zipcode, gender, age) {
    document.getElementById('editCustomerId').value = id;
    document.getElementById('editCustomerForm').action = '/customers/edit/' + id;
    document.getElementById('editFirstname').value = firstname;
    document.getElementById('editLastname').value = lastname;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPhone').value = phone;
    document.getElementById('editAddress').value = address;
    document.getElementById('editDob').value = dob;
    document.getElementById('editZipcode').value = zipcode;
    document.getElementById('editGender').value = gender;
    document.getElementById('editAge').value = age;
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        closeEditModal();
    }
}
