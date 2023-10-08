locals {
    url         = "https://zsprod.blob.core.windows.net/nss/znss_4_0_4_osdisk.vhd"
    split_array = split("/", local.url)
    offset      = length(local.split_array) - 1
    last_node = element(local.split_array, local.offset)

    list1 = ["1", "2", "3"]
    list2 = ["4", "5", "6"]
    combined_list = concat(local.list1, local.list2)
}

output "split_array" {
    value = local.split_array
}

output "offset" {
    value = local.offset
}

output "last_node" {
    value = local.last_node
}

output "combined_list" {
    value = local.combined_list
}