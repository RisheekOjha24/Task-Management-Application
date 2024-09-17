import Swal from "sweetalert2";

const sweetAlert=async(
  confirmButtonText = "Yes",
  cancelButtonText = "No"
)  => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text:"You won’t be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: cancelButtonText,
    confirmButtonText: confirmButtonText,
    reverseButtons:true,
    width: "25rem",
  });

  return result;
}

export default sweetAlert;
